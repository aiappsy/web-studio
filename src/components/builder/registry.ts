
import Hero from "./sections/Hero";
import Pricing from "./sections/Pricing";
import Features from "./sections/Features";
import CTA from "./sections/CTA";
import Footer from "./sections/Footer";

export const COMPONENT_REGISTRY: Record<string, any> = {
  hero: Hero,
  pricing: Pricing,
  features: Features,
  cta: CTA,
  footer: Footer,
};
