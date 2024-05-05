import mongoose, { Schema, Document } from "mongoose";

// Define interface for Note schema
interface Note extends Document {
    title: string;
    content: string;
    createdAt: Date;
    updatedAt: Date;
}

// Define schema for Note
const noteSchema: Schema = new Schema({
    title: { type: String, required: true },
    content: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
},{
    timestamps:true
});

// Create Note model
const NoteModel = mongoose.models.Note || mongoose.model<Note>('Note', noteSchema);

export default NoteModel;
