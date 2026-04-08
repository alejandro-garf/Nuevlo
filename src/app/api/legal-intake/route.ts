import { NextRequest, NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";

const client = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

const SYSTEM_PROMPT = `You are Nuevlo's AI legal guide. You help immigrants understand their rights and legal options in plain, warm, non-intimidating language. Always respond in the same language the user writes in. Never give specific legal advice — instead explain options, rights, and next steps clearly. End every response by encouraging them to connect with a vetted attorney through Nuevlo.`;

export async function POST(request: NextRequest) {
  try {
    const { message, language } = await request.json();

    if (!message || typeof message !== "string") {
      return NextResponse.json(
        { error: "Message is required" },
        { status: 400 }
      );
    }

    const langHint =
      language === "es"
        ? " (The user is writing in Spanish. Respond in Spanish.)"
        : "";

    const response = await client.messages.create({
      model: "claude-opus-4-5-20251101",
      max_tokens: 1024,
      system: SYSTEM_PROMPT + langHint,
      messages: [{ role: "user", content: message }],
    });

    const text =
      response.content[0].type === "text" ? response.content[0].text : "";

    return NextResponse.json({ response: text });
  } catch (error: unknown) {
    console.error("Legal intake API error:", error);
    const message =
      error instanceof Error ? error.message : "Failed to get AI response";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
