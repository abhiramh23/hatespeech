"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";

// Define a schema for input validation
const InputSchema = z.object({
  text: z.string().min(1).max(1000),
});

// Define the expected response structure
interface ClassificationResponse {
  text: string;
  classification: string;
}

// Define possible error types
type ClassificationError =
  | { type: "INVALID_INPUT"; message: string }
  | { type: "API_ERROR"; message: string; status?: number }
  | { type: "UNEXPECTED_ERROR"; message: string };

// Define the return type of our action
type ActionResult =
  | { success: true; data: ClassificationResponse }
  | { success: false; error: ClassificationError };

export async function classifyText(input: {
  text: string;
}): Promise<ActionResult> {
  // Input validation
  const parseResult = InputSchema.safeParse(input);
  if (!parseResult.success) {
    return {
      success: false,
      error: { type: "INVALID_INPUT", message: parseResult.error.message },
    };
  }

  const { text } = parseResult.data;
  const url = `http://127.0.0.1:8000/classify?text=${encodeURIComponent(text)}`;

  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        accept: "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data: ClassificationResponse = await response.json();

    // Optionally revalidate the path if you want to update the UI
    // revalidatePath('/your-page-path')

    return { success: true, data };
  } catch (error) {
    console.error("Error:", error);

    if (error instanceof Error) {
      if (error.message.startsWith("HTTP error!")) {
        return {
          success: false,
          error: {
            type: "API_ERROR",
            message: "Failed to classify text",
            status: parseInt(error.message.split(" ").pop() || "500"),
          },
        };
      }
    }

    return {
      success: false,
      error: {
        type: "UNEXPECTED_ERROR",
        message: "An unexpected error occurred",
      },
    };
  }
}
