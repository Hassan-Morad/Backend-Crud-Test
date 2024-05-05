import Joi from "joi"; 

// Function to validate request body when adding a note
export const validationAddNote = async (req: Request) => {
  const { title, content } = await req.json(); // Parsing request body for title and content

  // Defining validation schema using Joi
  const schema = Joi.object({
    title: Joi.string().required().min(3).max(10), // Title is required, minimum length of 3 and maximum length of 10
    content: Joi.string().required().min(3), // Content is required, minimum length of 3
  });

  // Validating request body against the schema
  const validationResult = schema.validate({ title, content });

  // If validation fails, return validation error details
  if (validationResult?.error) {
    return validationResult.error.details;
  }

  // If validation passes, return undefined
  return undefined;
};

// Function to validate request body when updating a note
export const validationUpdateNote = async (req: Request) => {
  const { title, content } = await req.json(); // Parsing request body for updated title and content

  // Defining validation schema using Joi
  const schema = Joi.object({
    title: Joi.string().min(3).max(10), // Title can be between 3 and 10 characters long
    content: Joi.string().min(3), // Content can be at least 3 characters long
  });

  // Validating request body against the schema
  const validationResult = schema.validate({ title, content });

  // If validation fails, return validation error details
  if (validationResult?.error) {
    return validationResult.error.details;
  }

  // If validation passes, return undefined
  return undefined;
};
