import mongoose from "mongoose";

const PdfSchema = new mongoose.Schema({
    filename: String,
    pdfData: Buffer,  // Store PDF as binary
    contentType: String,
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

const PdfModel = mongoose.model("Pdf", PdfSchema);
export default PdfModel;
