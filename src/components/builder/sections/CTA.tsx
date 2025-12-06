
export default function CTA({ headline, buttonText, buttonLink }: any) {
  return (
    <section className="py-20 bg-black text-white text-center">
      <h2 className="text-4xl font-semibold">{headline}</h2>
      <a href={buttonLink} className="inline-block mt-6 px-6 py-3 bg-white text-black rounded-lg font-medium">
        {buttonText}
      </a>
    </section>
  );
}
