
export default function Hero({ headline, subheadline, image }: any) {
  return (
    <section className="w-full py-24 text-center bg-gray-50">
      <h1 className="text-5xl font-bold">{headline}</h1>
      {subheadline && <p className="mt-4 text-lg text-gray-600">{subheadline}</p>}
      {image && <img src={image} className="mx-auto mt-8 max-w-2xl rounded-xl shadow" />}
    </section>
  );
}
