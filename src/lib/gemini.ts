import { GoogleGenerativeAI } from "@google/generative-ai";

// Initialize the Gemini API
const apiKey = import.meta.env.VITE_GEMINI_API_KEY;

if (!apiKey) {
    console.error("Gemini API key is missing! Please add VITE_GEMINI_API_KEY to your .env file");
}

const genAI = new GoogleGenerativeAI(apiKey || "");

// System instruction for the AI
const systemInstruction = `You are an empathetic campus counselor helping students with:
- Academic stress and study tips
- Mental health support
- Campus resource navigation
- Time management advice

Keep your responses:
- Short and supportive (2-3 sentences max)
- Formatted with Markdown (use **bold** for key points)
- Encouraging and practical`;

// Safety keywords for crisis detection
const SAFETY_KEYWORDS = ["suicide", "kill myself", "harm myself", "die", "overdose"];
const CRISIS_RESPONSE = "I am deeply concerned about your safety. Please reach out to the Crisis Hotline immediately at 988 or call Campus Emergency at (555) 123-4567. You are not alone.";

export interface ChatMessage {
    role: 'user' | 'model';
    parts: string;
}

// Store conversation history
const conversationHistory: Array<{ role: string; parts: string }> = [];

export async function getChatResponse(history: ChatMessage[], newMessage: string): Promise<string> {
    // 1. Local Safety Check
    const lowerMsg = newMessage.toLowerCase();
    if (SAFETY_KEYWORDS.some(keyword => lowerMsg.includes(keyword))) {
        return CRISIS_RESPONSE;
    }

    // 2. Check if API key is configured
    if (!apiKey) {
        return "I'm unable to connect right now. Please ensure the VITE_GEMINI_API_KEY is configured in your .env file.";
    }

    try {
        // Initialize the model with system instruction
        const model = genAI.getGenerativeModel({
            model: "gemini-3-flash-preview",
            systemInstruction: systemInstruction,
        });

        // Convert history to Gemini format
        const geminiHistory = history.map(msg => ({
            role: msg.role === 'model' ? 'model' : 'user',
            parts: [{ text: msg.parts }],
        }));

        // Start or continue chat with history
        const chat = model.startChat({
            history: geminiHistory,
        });

        // Send message and get response
        const result = await chat.sendMessage(newMessage);
        const responseText = result.response.text();

        return responseText;
    } catch (error) {
        console.error("Gemini API Error:", error);
        return "I'm having trouble connecting to the support network right now. Please try again later.";
    }
}
