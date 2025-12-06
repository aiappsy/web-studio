
'use client';
import { useState } from 'react';

export default function AiConsole() {
  const [input, setInput] = useState("");
  return (
    <div className="border-t p-4 bg-gray-50 dark:bg-black">
      <textarea 
        className="w-full border rounded p-2"
        placeholder="Ask AI to modify…"
        value={input}
        onChange={e=>setInput(e.target.value)}
      />
      <button className="mt-2 px-4 py-2 bg-black text-white rounded">Apply</button>
    </div>
  );
}
