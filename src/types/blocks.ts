export type BlockType =
  | "heading"
  | "paragraph"
  | "image"
  | "button"
  | "section"
  | "container"
  | "html";

export interface BaseBlock {
  id: string;
  type: BlockType;
}

export interface HeadingBlock extends BaseBlock {
  type: "heading";
  content: string;
  level: 1 | 2 | 3 | 4 | 5 | 6;
}

export interface ParagraphBlock extends BaseBlock {
  type: "paragraph";
  content: string;
}

export interface ImageBlock extends BaseBlock {
  type: "image";
  src: string;
  alt?: string;
}

export interface ButtonBlock extends BaseBlock {
  type: "button";
  text: string;
  url: string;
}

export interface SectionBlock extends BaseBlock {
  type: "section";
  children: Block[];
}

export interface ContainerBlock extends BaseBlock {
  type: "container";
  children: Block[];
}

export interface HTMLBlock extends BaseBlock {
  type: "html";
  html: string;
}

export type Block =
  | HeadingBlock
  | ParagraphBlock
  | ImageBlock
  | ButtonBlock
  | SectionBlock
  | ContainerBlock
  | HTMLBlock;
