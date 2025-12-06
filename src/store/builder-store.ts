import { create } from "zustand";
import { Block } from "@/types/blocks";
import { nanoid } from "nanoid";

interface BuilderState {
  pageId: string | null;
  blocks: Block[];

  // Actions
  loadPage: (pageId: string, blocks: Block[]) => void;
  addBlock: (type: Block["type"]) => void;
  updateBlock: (id: string, data: Partial<Block>) => void;
  removeBlock: (id: string) => void;
  moveBlock: (id: string, direction: "up" | "down") => void;

  savePage: () => Promise<void>;
}

export const useBuilder = create<BuilderState>((set, get) => ({
  pageId: null,
  blocks: [],

  loadPage(pageId, blocks) {
    set({ pageId, blocks });
  },

  addBlock(type) {
    const newBlock: Block = {
      id: nanoid(),
      type,
      ...(type === "heading" && { content: "New heading", level: 2 }),
      ...(type === "paragraph" && { content: "New paragraph" }),
      ...(type === "image" && { src: "/placeholder.png" }),
      ...(type === "button" && { text: "Click me", url: "#" }),
      ...(type === "html" && { html: "<div>Custom HTML</div>" }),
      ...(type === "section" && { children: [] }),
      ...(type === "container" && { children: [] }),
    };

    set({ blocks: [...get().blocks, newBlock] });
  },

  updateBlock(id, data) {
    set({
      blocks: get().blocks.map((b) =>
        b.id === id ? { ...b, ...data } : b
      ),
    });
  },

  removeBlock(id) {
    set({
      blocks: get().blocks.filter((b) => b.id !== id),
    });
  },

  moveBlock(id, direction) {
    const blocks = [...get().blocks];
    const index = blocks.findIndex((b) => b.id === id);

    if (index < 0) return;

    const swapIndex = direction === "up" ? index - 1 : index + 1;

    if (swapIndex < 0 || swapIndex >= blocks.length) return;

    [blocks[index], blocks[swapIndex]] = [blocks[swapIndex], blocks[index]];

    set({ blocks });
  },

  async savePage() {
    const pageId = get().pageId;
    if (!pageId) return;

    await fetch(`/api/pages/${pageId}`, {
      method: "PATCH",
      body: JSON.stringify({ blocks: get().blocks }),
    });
  },
}));
