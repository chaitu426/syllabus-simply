import express from 'express';
import mongoose from 'mongoose';
import authMiddleware from '../middlewares/auth.js';
import PdfModel from '../models/Pdf.model.js';
import QuestionPaper from "../models/Paper.model.js"
import pdfParse from "pdf-parse";
import multer from "multer";
import dotenv from "dotenv";
import {generateQuestionPaper} from "../services/gemini.api.js"
dotenv.config();


// Multer Setup for File Upload
const storage = multer.memoryStorage();
const upload = multer({ storage });
const pdfRouter = express.Router();

pdfRouter.post("/upload-or-generate", upload.single("pdf"), async (req, res) => {
    try {
        console.log("📂 Received Request:", req.body);
        console.log("📂 Uploaded File:", req.file);

        let syllabusText = "";

        // Check if a PDF file is uploaded
        if (req.file) {
            console.log("✅ PDF uploaded:", req.file.originalname);

            // Extract text from PDF
            const data = await pdfParse(req.file.buffer);
            syllabusText = data.text.trim();

            if (!syllabusText) {
                return res.status(400).json({ error: "Failed to extract text from PDF" });
            }

            // Save PDF to MongoDB
            const newPdf = new PdfModel({
                filename: req.file.originalname,
                pdfData: req.file.buffer,
                contentType: req.file.mimetype,
                extractedText: syllabusText,
                createdBy: req.body.createdBy,
            });

            await newPdf.save();
            console.log("✅ PDF Uploaded & Text Extracted");
        } else {
            syllabusText = req.body.syllabus || "";
        }

        // Validate required fields
        const { difficulty, questionType } = req.body;
        if (!syllabusText || !difficulty || !questionType) {
            return res.status(400).json({ error: "All fields are required." });
        }

        // Generate questions using AI
        const generatedQuestions = await generateQuestionPaper(syllabusText, difficulty, questionType);

        
    const newpaper = new QuestionPaper({
        title: req.body.title,
        syllabus: syllabusText,
        file: req.file ? req.file.originalname : null,
        createdBy: req.body.createdBy,
        questionType: questionType,
        generateQuestionPaper:generatedQuestions,
        createdBy: req.body.createdBy,
    });

    await newpaper.save();
    console.log("✅ Paper Saved to MongoDB");


        return res.status(200).json({ 
            success: true, 
            message: req.file ? "✅ PDF Processed & Questions Generated" : "✅ Text Processed & Questions Generated",
            questions: generatedQuestions,
        });

    } catch (error) {
        console.error("❌ Error:", error);
        return res.status(500).json({ error: "Internal Server Error" });
    }

    
});




export default pdfRouter;
