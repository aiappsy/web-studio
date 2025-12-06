
"use client";
import { useState } from "react";

export default function AiConsole({ onInstruction }: any) {
  const [input, setInput] = useState("");

  return (
    <div className="w-full border-t p-4">
      <textarea
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Ask AI to modify this page..."
        className="w-full p-2 border rounded"
      />
      <button
        onClick={() => { onInstruction(input); setInput(""); }}
        className="mt-2 px-4 py-2 bg-black text-white rounded"
      >
        Apply AI Change
      </button>
    </div>
  );
}
