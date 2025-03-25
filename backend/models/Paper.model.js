import mongoose from 'mongoose';

const PaperSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Title is required'],
        trim: true
    },
    fileUrl: {
        type: String,
        required: [true, 'File URL is required']
    },
    fileType: {
        type: String,
        enum: ['pdf', 'docx', 'txt', 'xlsx'],
        required: [true, 'File type is required']
    },
    syllabus: {
        type: String,
        required: [true, 'Syllabus description is required']
    },
    questionType: {
        type: String,
        enum: ['MCQ', 'Short Answer','Long Answer','True/False','Matching', 'Fill in the Blanks'],
        required: [true, 'Question type is required']
    },
    difficultyLevel: {
        type: String,
        enum: ['Easy', 'Moderate', 'Challenging','Advanced'],
        required: [true, 'Difficulty level is required']
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'Creator (User) is required']
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const Paper = mongoose.model('Paper', PaperSchema);
export default Paper;
