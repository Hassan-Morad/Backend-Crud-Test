import db_connection from "@/libs/mongodb";
import { NextRequest, NextResponse } from "next/server"; 
import NoteModel from "../../../models/note.model";



/////////////////////////////////// Create  note  //////////////////////////////////


// Handler function for POST request
export const POST = async (req: NextRequest, res: NextResponse) => {
  try {
    // Establishing connection to MongoDB
    await db_connection();

    // Parsing request body for title and content
    const { title, content } = await req.json();

    // Creating a new note document using NoteModel
    const note = await NoteModel.create({ title, content });

    // Returning a JSON response indicating success
    return NextResponse.json({ message: "Success", note }, { status: 200 });
  } catch (error) {
    console.error("Error:", error);

    // Returning a JSON response indicating error
    return NextResponse.json({ message: "Error", error }, { status: 500 });
  }
};


/////////////////////////////////// Retrieve all notes //////////////////////////////////


// Handler function for GET request
export const GET = async (req: NextRequest, res: NextResponse) => {
  try {
    // Establishing connection to MongoDB
    await db_connection();

    // Finding all notes
    const note = await NoteModel.find();

    // If no notes found, return a JSON response indicating absence of notes
    if (!note.length) {
      return NextResponse.json({ message: "There are no notes", note }, { status: 200 });
    }

    // Returning a JSON response indicating success
    return NextResponse.json({ message: "Success", note }, { status: 200 });
  } catch (error) {
    console.error("Error:", error);

    // Returning a JSON response indicating error
    return NextResponse.json({ message: "Error", error }, { status: 500 });
  }
};
