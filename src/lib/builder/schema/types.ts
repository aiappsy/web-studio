export interface SiteTheme {
  colors: {
    primary: string;
    background: string;
    text: string;
  };
  fonts: {
    heading: string;
    body: string;
  };
}

export interface Section {
  id: string;
  type: string;
  props: Record<string, any>;
}

export interface Page {
  id: string;
  title: string;
  path: string;
  sections: Section[];
}

export interface SiteDefinition {
  site: {
    name: string;
    theme: SiteTheme;
  };
  pages: Page[];
}
