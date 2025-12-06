export default function Hero({ headline, subheadline, image }: any) {
  return (
    <section className="w-full py-24">
      <div className="mx-auto max-w-4xl text-center">
        <h1 className="text-5xl font-bold">{headline}</h1>
        <p className="mt-4 text-lg">{subheadline}</p>
      </div>
    </section>
  );
}
