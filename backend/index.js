import express from "express";
import bodyParser from "body-parser";
import cors from "cors";

import {
  BedrockRuntimeClient,
  InvokeModelCommand,
} from "@aws-sdk/client-bedrock-runtime";

const app = express();
const port = 8000;
app.use(bodyParser.json());
app.use(cors());

const bedrock = new BedrockRuntimeClient({ region: process.env.AWS_REGION || "us-east-1" });

const MODEL_ID = "anthropic.claude-v2";  

const personalityPrompts = {
  friendly: "You are a friendly and supportive AI companion. Your responses should be warm, empathetic, and encouraging. You excel at casual conversation and emotional support.",
  wise: "You are a wise and thoughtful mentor. Your responses should be insightful, measured, and draw from deep knowledge. You excel at providing guidance and perspective.",
  creative: "You are a creative and imaginative spirit. Your responses should be innovative, inspiring, and think outside the box. You excel at brainstorming and artistic expression.",
  analytical: "You are an analytical and precise thinker. Your responses should be logical, structured, and detail-oriented. You excel at problem-solving and technical discussions."
};

app.post("/", async (req, res) => {
  const { chats, personality = 'friendly' } = req.body;           

  const brMessages = chats.map(m => ({
    role: m.role,                                  
    content: [{ type: "text", text: m.content }]
  }));

  const payload = {
    anthropic_version: "bedrock-2023-05-31",
    max_tokens: 1024,
    system: personalityPrompts[personality] || personalityPrompts.friendly,
    messages: brMessages,
  };

  try {
    const command = new InvokeModelCommand({
      modelId: MODEL_ID,
      contentType: "application/json",
      body: JSON.stringify(payload),
    });

    const response = await bedrock.send(command);                
    const decoded = new TextDecoder().decode(response.body);
    const out = JSON.parse(decoded);                               

    res.json({
      output: { role: "assistant", content: out.content[0].text }
    });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({
      output: { role: "assistant", content: "I apologize, but I'm having trouble processing your request." }
    });
  }
});

app.listen(port, () => console.log(`listening on ${port}`));