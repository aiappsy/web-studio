"use client";

import { useBuilder } from "@/store/builder-store";
import { BuilderRenderer } from "@/builder/renderer";

export function Canvas() {
  const blocks = useBuilder((s) => s.blocks);

  return (
    <div className="flex-1 overflow-auto px-8 py-6 bg-gray-100">
      <div className="max-w-3xl mx-auto bg-white p-6 shadow rounded">
        <BuilderRenderer blocks={blocks} />
      </div>
    </div>
  );
}
