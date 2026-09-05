import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");

const SYSTEM_INSTRUCTION =
  "You are Prakash Singh's official AI assistant on his portfolio website. Prakash Singh is a Full-Stack and Front-End Developer pursuing his MCA (Master of Computer Applications). Answer visitor questions professionally using clean markdown formatting (bullet points, bold text) about his skills (React, Next.js, Node.js, MongoDB, etc.), projects, education, and background.";

const CANDIDATE_MODELS = [
  "gemini-flash-latest",
  "gemini-3.6-flash",
  "gemini-3.5-flash-lite",
];

export async function POST(req: Request) {
  try {
    if (!process.env.GEMINI_API_KEY) {
      return NextResponse.json(
        { error: "GEMINI_API_KEY is not configured" },
        { status: 500 }
      );
    }

    const { messages } = await req.json();

    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return NextResponse.json(
        { error: "Messages array is required" },
        { status: 400 }
      );
    }

    const formattedMessages = messages.map((msg: any) => ({
      role: msg.role === "user" ? "user" : "model",
      parts: [{ text: msg.content }],
    }));

    const history = formattedMessages.slice(0, -1);
    if (history.length > 0 && history[0].role === "model") {
      history.shift();
    }

    const lastMessage = messages[messages.length - 1].content;

    let responseText = "";
    let lastError: any = null;

    for (const modelName of CANDIDATE_MODELS) {
      try {
        const model = genAI.getGenerativeModel({
          model: modelName,
          systemInstruction: SYSTEM_INSTRUCTION,
        });

        const chat = model.startChat({ history });
        const result = await chat.sendMessage(lastMessage);
        responseText = result.response.text();
        break;
      } catch (err: any) {
        console.warn(`Gemini model ${modelName} failed, trying fallback:`, err?.message || err);
        lastError = err;
      }
    }

    if (!responseText && lastError) {
      throw lastError;
    }

    return NextResponse.json({ reply: responseText });
  } catch (error: any) {
    console.error("Gemini Error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to fetch response" },
      { status: 500 }
    );
  }
}