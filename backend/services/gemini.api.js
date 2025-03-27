import fetch from "node-fetch";
import dotenv from "dotenv";

dotenv.config();

const GEMINI_API_KEY = process.env.GEMINI_API_KEY; // Use env variable for security
const API_URL = "https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash:generateContent";

export const generateQuestionPaper = async (syllabus, difficulty, questionType) => {
    try {
      if (!GEMINI_API_KEY) {
        throw new Error("GEMINI_API_KEY is missing in .env file");
      }
      console.log(difficulty);
  
      const prompt = `
        You are an AI-powered question paper generator. Generate **5 questions per type** strictly based on the given syllabus.

- **Syllabus:** ${syllabus}  
- **Difficulty Level:** ${difficulty}% out of 100%   
- **Question Types:** ${questionType} (comma-separated)  

### **Instructions:**  
 1. Extract all question types from the input (e.g., mcq, truefalse, shortAnswer, fillblanks).  
 2. **Strictly generate questions ONLY from the syllabus**. Do NOT include irrelevant topics.  
 3. Ensure **no repeated or similar questions** across all types.  
 4. Return **EXACTLY** 5 questions per type.  
 5. **Return ONLY a valid JSON array** with no extra text.  
 6. Ensure **options[] exists only for "mcq" and "matching" question types**.  
 7. Ensure **type values strictly match**: "mcq", "fillblanks", "truefalse", "matching", "longAnswer", "shortAnswer".  
 8. **For question types other than mcq and matching, DO NOT return the "options" field.**  

### **Output Format (Strict JSON):**  
[
  { "question": "What is recursion?", "type": "mcq", "options": ["Function calls itself", "Loop", "Variable", "None"], "answer": "Function calls itself" },
  { "question": "Explain polymorphism in OOP.", "type": "shortAnswer", "answer": "Polymorphism allows objects to be treated as instances of their parent class." },
  { "question": "True or False: A linked list is a static data structure.", "type": "truefalse", "answer": "False" },
  { "question": "_____ is the process of finding the shortest path in a graph.", "type": "fillblanks", "answer": "Dijkstra's Algorithm" }
]



      `;
  
      const requestBody = {
        contents: [{ role: "user", parts: [{ text: prompt }] }],
        generationConfig: {
          temperature: 0.7,
          topK: 40,
          topP: 0.95,
          maxOutputTokens: 2048
        }
      };
  
      const response = await fetch(`${API_URL}?key=${GEMINI_API_KEY}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(requestBody)
      });
  
      if (!response.ok) {
        const errorText = await response.text();
        console.error(`❌ API error: ${response.status} - ${errorText}`);
        throw new Error(`API request failed: ${response.status} - ${errorText}`);
      }
  
      const responseData = await response.json();
  
      if (!responseData.candidates || responseData.candidates.length === 0) {
        throw new Error("⚠️ No valid response from Gemini API");
      }
  
      // Extract AI-generated response
      let textResponse = responseData.candidates[0]?.content?.parts?.[0]?.text;
      console.log("🔹 Raw AI Response:", textResponse); // Debugging Log
  
      // ✅ Remove backticks (` ```json ` and ` ``` `)
      textResponse = textResponse.replace(/```json/g, "").replace(/```/g, "").trim();
  
      // ✅ Try parsing as JSON
      try {
        const questions = JSON.parse(textResponse);
        return Array.isArray(questions) ? questions : [];
      } catch (jsonError) {
        console.error("❌ JSON Parsing Error:", jsonError);
        return [];
      }
    } catch (error) {
      console.error("❌ Error generating questions:", error);
      return [];
    }
  };
  

