"use client";

import { useBuilder } from "@/store/builder-store";

export function BlockToolbar() {
  const addBlock = useBuilder((s) => s.addBlock);

  return (
    <div className="flex gap-2 p-3 border-b bg-gray-50">
      <button onClick={() => addBlock("heading")} className="btn">
        Heading
      </button>
      <button onClick={() => addBlock("paragraph")} className="btn">
        Paragraph
      </button>
      <button onClick={() => addBlock("image")} className="btn">
        Image
      </button>
      <button onClick={() => addBlock("button")} className="btn">
        Button
      </button>
      <button onClick={() => addBlock("html")} className="btn">
        HTML
      </button>
    </div>
  );
}
