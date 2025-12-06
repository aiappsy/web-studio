
"use client";
import { COMPONENT_REGISTRY } from "./registry";
export default function Renderer({ page }: any) {
  if (!page || !page.sections) return <div>No content to render.</div>;
  return (
    <div className="w-full">
      {page.sections.map((section: any) => {
        const Component = COMPONENT_REGISTRY[section.type];
        if (!Component) {
          return (
            <div key={section.id} className="p-4 bg-red-100 text-red-800">
              Unknown component type: {section.type}
            </div>
          );
        }
        return (
          <div key={section.id}>
            <Component {...section.props} />
          </div>
        );
      })}
    </div>
  );
}
