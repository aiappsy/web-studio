import { COMPONENT_REGISTRY } from "./registry";

export default function Renderer({ page }: any) {
  return (
    <div>
      {page.sections.map((section: any) => {
        const Component = COMPONENT_REGISTRY[section.type];
        if (!Component) return null;

        return (
          <div key={section.id}>
            <Component {...section.props} />
          </div>
        );
      })}
    </div>
  );
}
