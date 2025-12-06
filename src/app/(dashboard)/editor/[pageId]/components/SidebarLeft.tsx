"use client";

import { useBuilder } from "@/store/builder-store";

export function SidebarLeft() {
  const addBlock = useBuilder((s) => s.addBlock);

  return (
    <div className="w-64 border-r bg-gray-50 p-4 space-y-4 overflow-y-auto">
      <h2 className="font-semibold text-lg">Blocks</h2>

      <button className="btn w-full" onClick={() => addBlock("heading")}>
        Heading
      </button>

      <button className="btn w-full" onClick={() => addBlock("paragraph")}>
        Paragraph
      </button>

      <button className="btn w-full" onClick={() => addBlock("image")}>
        Image
      </button>

      <button className="btn w-full" onClick={() => addBlock("button")}>
        Button
      </button>

      <button className="btn w-full" onClick={() => addBlock("html")}>
        Raw HTML
      </button>
    </div>
  );
}
