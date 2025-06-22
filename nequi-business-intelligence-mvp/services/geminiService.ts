
import { GoogleGenAI, GenerateContentResponse, Part } from "@google/genai";
import { GEMINI_TEXT_MODEL } from '../constants';
import { GroundingChunk } from "../types";

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  console.error("Gemini API Key is missing. Set process.env.API_KEY.");
  // alert("Gemini API Key is missing. AI features will not work.");
}
const ai = new GoogleGenAI({ apiKey: API_KEY || "MISSING_API_KEY" });


const cleanJsonString = (jsonStr: string): string => {
  let cleanStr = jsonStr.trim();
  const fenceRegex = /^```(\w*)?\s*\n?(.*?)\n?\s*```$/s;
  const match = cleanStr.match(fenceRegex);
  if (match && match[2]) {
    cleanStr = match[2].trim();
  }
  return cleanStr;
};


export const suggestNoteForTransaction = async (transactionDescription: string): Promise<string> => {
  if (!API_KEY || API_KEY === "MISSING_API_KEY") {
    console.warn("Gemini API Key is not configured. Returning mock suggestion.");
    return `Nota de ejemplo para: ${transactionDescription}. Considerar detalles de cliente o producto.`;
  }
  try {
    const prompt = `Basado en la siguiente descripción de una transacción financiera: "${transactionDescription}", sugiere una nota breve y útil que el usuario podría añadir para recordar detalles importantes. La nota debe ser concisa y enfocada en el contexto de un pequeño negocio. Por ejemplo, si es una venta, podría ser el nombre del cliente o el producto. Si es un pago, el servicio específico. Devuelve solo la sugerencia de nota, sin frases introductorias.`;

    const response: GenerateContentResponse = await ai.models.generateContent({
      model: GEMINI_TEXT_MODEL,
      contents: [{ role: "user", parts: [{ text: prompt }] }],
      config: {
        temperature: 0.7,
        maxOutputTokens: 50,
      }
    });

    return response.text.trim();
  } catch (error) {
    console.error("Error calling Gemini API for note suggestion:", error);
    throw new Error("Failed to get suggestion from AI.");
  }
};

// Example for a function that might use system instruction and expect JSON
// This is a placeholder for more advanced AI features (e.g., categorization in Pro version)
interface SuggestedCategory {
  categoryName: string;
  confidence: number; // 0 to 1
}

export const suggestCategoryForTransaction = async (description: string): Promise<SuggestedCategory | null> => {
  if (!API_KEY || API_KEY === "MISSING_API_KEY") {
    console.warn("Gemini API Key is not configured for category suggestion.");
    return null;
  }
  try {
    const prompt = `Analiza la siguiente descripción de transacción: "${description}". Sugiere una categoría para esta transacción desde la perspectiva de un pequeño negocio. Categorías comunes podrían ser: 'Ventas Productos', 'Ventas Servicios', 'Alquiler', 'Suministros', 'Marketing', 'Otro Ingreso'. Responde en formato JSON con "categoryName" y "confidence" (0-1).`;
    
    const response: GenerateContentResponse = await ai.models.generateContent({
      model: GEMINI_TEXT_MODEL,
      contents: [{ role: "user", parts: [{ text: prompt }] }],
      config: {
        systemInstruction: "Eres un asistente de contabilidad experto en categorizar transacciones para pequeños negocios en Colombia.",
        responseMimeType: "application/json",
        temperature: 0.5,
      }
    });
    
    const jsonStr = cleanJsonString(response.text);
    const parsedData: SuggestedCategory = JSON.parse(jsonStr);
    return parsedData;

  } catch (error) {
    console.error("Error calling Gemini API for category suggestion:", error);
    // In a real app, might return a default or handle more gracefully
    return null; 
  }
};

// Placeholder for search grounding
export const searchRelatedInformation = async (query: string): Promise<{text: string, sources: GroundingChunk[] | undefined}> => {
  if (!API_KEY || API_KEY === "MISSING_API_KEY") {
    console.warn("Gemini API Key is not configured for search grounding.");
    return {text: "Search feature disabled due to missing API key.", sources: []};
  }
  try {
    const response = await ai.models.generateContent({
      model: GEMINI_TEXT_MODEL, // Ensure this model supports tools
      contents: [{role: "user", parts: [{text: query}]}],
      config: {
        tools: [{ googleSearch: {} }],
      },
    });
    const text = response.text;
    const sources = response.candidates?.[0]?.groundingMetadata?.groundingChunks as GroundingChunk[] | undefined;
    return {text, sources};
  } catch(error) {
    console.error("Error using Gemini with Google Search grounding:", error);
    return {text: "Error fetching search results.", sources: undefined};
  }
};

// Example for chat functionality (placeholder)
// let chat: Chat | null = null;
// export const startOrContinueChat = async (message: string): Promise<string> => {
//   if (!API_KEY || API_KEY === "MISSING_API_KEY") return "Chat disabled.";
//   if (!chat) {
//     chat = ai.chats.create({
//       model: GEMINI_TEXT_MODEL,
//       config: { systemInstruction: "Eres un asistente financiero amigable." }
//     });
//   }
//   const response = await chat.sendMessage({ message });
//   return response.text;
// }
    