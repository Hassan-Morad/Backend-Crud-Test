import { NextRequest, NextResponse } from "next/server"; 
import { validationAddNote, validationUpdateNote } from "./middlewares/api's/validationMiddleware"; 

// Middleware function to handle request validation
export const middleware = async (req: NextRequest) => {
  // Handling POST request validation
  if (req.method === 'POST') {
    const validationError = await validationAddNote(req); // Validating request body for adding a note
    if (validationError) {
      const error = validationError[0].message;
      // Returning a JSON response indicating validation error
      return NextResponse.json({ message: "Validation Error", error }, { status: 400 });
    }
  }

  // Handling PUT request validation
  if (req.method === 'PUT') {
    const validationError = await validationUpdateNote(req); // Validating request body for updating a note
    if (validationError) {
      const error = validationError[0].message;
      // Returning a JSON response indicating validation error
      return NextResponse.json({ message: "Validation Error", error }, { status: 400 });
    }
  }

  // If validation passes or request method is not POST or PUT, proceed to the next middleware
  NextResponse.next();
};
