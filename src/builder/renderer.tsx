"use client";

import { Block } from "@/types/blocks";

export function renderBlock(block: Block) {
  switch (block.type) {
    case "heading":
      const Tag = `h${block.level}` as keyof JSX.IntrinsicElements;
      return <Tag>{block.content}</Tag>;

    case "paragraph":
      return <p>{block.content}</p>;

    case "image":
      return <img src={block.src} alt={block.alt || ""} />;

    case "button":
      return (
        <a
          href={block.url}
          className="inline-block px-4 py-2 bg-blue-600 text-white rounded"
        >
          {block.text}
        </a>
      );

    case "html":
      return <div dangerouslySetInnerHTML={{ __html: block.html }} />;

    case "section":
    case "container":
      return (
        <div className="p-4 border rounded">
          {block.children.map((child) => (
            <div key={child.id}>{renderBlock(child)}</div>
          ))}
        </div>
      );

    default:
      return null;
  }
}

export function BuilderRenderer({ blocks }: { blocks: Block[] }) {
  return (
    <div className="builder-canvas space-y-4">
      {blocks.map((b) => (
        <div key={b.id}>{renderBlock(b)}</div>
      ))}
    </div>
  );
}
