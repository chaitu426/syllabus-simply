import express from 'express';
import Paper from '../models/Paper.model.js';
import authMiddleware from '../middlewares/auth.js';
import {generateQuestionPaper} from "../services/gemini.api.js"


const aiRouter = express.Router();
aiRouter.post('/generate', async (req, res) => {
    try {
        const { syllabus, difficulty, questionType } = req.body;

        if (!syllabus || !difficulty || !questionType) {
            return res.status(400).json({ message: "All fields are required." });
        }

        // Call AI-based question generator
        if(syllabus){
        const generatedQuestions = await generateQuestionPaper(syllabus, difficulty, questionType);
        res.status(200).json({ success: true, questions: generatedQuestions });
      }

        
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

export default aiRouter;
