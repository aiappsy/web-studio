"use client";

import { useBuilder } from "@/store/builder-store";

export function Toolbar({ pageName }: { pageName: string }) {
  const savePage = useBuilder((s) => s.savePage);

  return (
    <div className="flex items-center justify-between h-12 border-b px-4 bg-white">
      <div className="font-medium">{pageName}</div>

      <button
        onClick={savePage}
        className="px-4 py-1 bg-blue-600 text-white rounded"
      >
        Save
      </button>
    </div>
  );
}
