import db_connection from "@/libs/mongodb"; 
import NoteModel from "@/models/note.model"; 
import { Types } from "mongoose"; 
import { NextRequest, NextResponse } from "next/server"; 


/////////////////////////////////// Retrieve a specific note by ID //////////////////////////////////

// Handler function for GET request to retrieve a specific note by ID
export const GET = async (req: NextRequest, context: any) => {
  try {
    // Establishing connection to MongoDB
    await db_connection();

    // Retrieving note ID from request context
    const id = context.params.id;

    // Checking if note ID is missing or invalid
    if (!id || !Types.ObjectId.isValid(id)) {
      return NextResponse.json({ message: "Invalid or missing noteId" }, { status: 400 });
    }

    // Finding the note by its ID
    const note = await NoteModel.findById(id);

    // If note not found, return a JSON response indicating absence of note
    if (!note) {
      return NextResponse.json({ message: "Note not found" }, { status: 404 });
    }

    // Returning a JSON response indicating success and the retrieved note
    return NextResponse.json({ message: "Success", note }, { status: 200 });
  } catch (error) {
    console.error("Error:", error);

    // Returning a JSON response indicating error
    return NextResponse.json({ message: "Error", error }, { status: 500 });
  }
};


/////////////////////////////////// Update a specific note by ID //////////////////////////////////


// Handler function for PUT request to update a specific note by ID
export const PUT = async (req: NextRequest, context: any) => {
  try {
    // Establishing connection to MongoDB
    await db_connection();

    // Retrieving note ID from request context
    const id = context.params.id;

    // Parsing request body for updated title and content
    const { title, content } = await req.json();

    // Checking if note ID is missing or invalid
    if (!id || !Types.ObjectId.isValid(id)) {
      return NextResponse.json({ message: "Invalid or missing noteId" }, { status: 400 });
    }

    // Finding the note by its ID
    const note = await NoteModel.findById(id);

    // If note not found, return a JSON response indicating absence of note
    if (!note) {
      return NextResponse.json({ message: "Note not found" }, { status: 404 });
    }

    // Updating note's title and content if provided in the request
    note.title = title || note.title;
    note.content = content || note.content;

    // Saving the updated note
    await note.save();

    // Returning a JSON response indicating success
    return NextResponse.json({ message: "Note updated successfully" }, { status: 200 });
  } catch (error) {
    console.error("Error:", error);

    // Returning a JSON response indicating error
    return NextResponse.json({ message: "Error", error }, { status: 500 });
  }
};




/////////////////////////////////// Delelte a specific note by ID //////////////////////////////////



// Handler function for DELETE request to delete a specific note by ID
export const DELETE = async (req: NextRequest, context: any) => {
  try {
    // Establishing connection to MongoDB
    await db_connection();

    // Retrieving note ID from request context
    const id = context.params.id;

    // Checking if note ID is missing or invalid
    if (!id || !Types.ObjectId.isValid(id)) {
      return NextResponse.json({ message: "Invalid or missing noteId" }, { status: 400 });
    }

    // Finding and deleting the note by its ID
    const note = await NoteModel.findByIdAndDelete(id);

    // If note not found, return a JSON response indicating absence of note
    if (!note) {
      return NextResponse.json({ message: "Note not found" }, { status: 404 });
    }

    // Returning a JSON response indicating success
    return NextResponse.json({ message: "Note deleted successfully" }, { status: 200 });
  } catch (error) {
    console.error("Error:", error);

    // Returning a JSON response indicating error
    return NextResponse.json({ message: "Error", error }, { status: 500 });
  }
};
