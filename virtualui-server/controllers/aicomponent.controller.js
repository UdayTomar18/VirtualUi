import { User } from "../models/user.model.js";
import { askAI } from "../utils/openRoter.js";

export const generateComponent = async (req, res) => {
    try {
        const { prompt } = req.body;
        const user = await User.findById(req.userId);

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        if (user.role === "user") {
            if (user.aiCredits < 50) {
                return res.status(400).json({
                    message: "Not enough AI credits"
                });
            }

            user.aiCredits -= 50;
            await user.save();
        }

        const messages = [
            {
                role: "system",
                content: `You are a React component generator. Output ONLY a valid JSON object. No markdown, no backticks, no explanation.

CRITICAL: Your entire response must be parseable by JSON.parse(). Start with { and end with }.

OUTPUT FORMAT:
{
  "name": "ComponentName",
  "code": "<full component code as single escaped string>",
  "props": ["prop1", "prop2"]
}

--- CODE RULES ---
- Import hooks like this: import React, { useState, useEffect, useRef, useCallback } from "react";
- Named export only: export const ComponentName = ({ ...props }) => { ... }
- Inline styles ONLY. No CSS classes, no Tailwind, no styled-components.
- All props must have default values. Component must look great with zero props passed.
- No TypeScript. No external libraries. No framer-motion. No icon libraries.
- NEVER use template literals inside JSX style objects.
  BAD: style={{ border: \`1px solid \${accent}\` }}
  GOOD: style={{ border: "1px solid " + accent }}
- Always use string concatenation for dynamic style values.
- NEVER use position "fixed". Use "absolute" or "relative" only.
- For hex to rgba conversion, define:
  const alpha = (hex, op) => {
    const r=parseInt(hex.slice(1,3),16),
          g=parseInt(hex.slice(3,5),16),
          b=parseInt(hex.slice(5,7),16);
    return "rgba("+r+","+g+","+b+","+op+")";
  };
- Escape all quotes and newlines inside the code string.
- Use double quotes inside JSX.

Return ONLY the JSON object.`
            },
            {
                role: "user",
                content: prompt,
            }
        ];

        const aiResponse = await askAI(messages);

        let parsed;

        try {
            const clean = aiResponse
                .replace(/```json/g, "")
                .replace(/```/g, "")
                .trim();

            parsed = JSON.parse(clean);

        } catch (error) {

            console.log("AI RESPONSE:", aiResponse);

            return res.status(500).json({
                message: "AI returned invalid JSON"
            });
        }

        // ✅ SUCCESS RESPONSE (this was the missing part)
        return res.status(200).json({
            parsed,
            remainingCredits: user.role === "user" ? user.aiCredits : null,
        });

    } catch (error) {
        console.log(error);

        return res.status(500).json({
            message: error.message
        });
    }
};