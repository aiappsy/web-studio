
export default function Features({ features }: any) {
  return (
    <section className="py-16 bg-gray-100">
      <div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-8">
        {features?.map((f: any, i: number) => (
          <div key={i} className="p-6 bg-white rounded-xl shadow">
            <h4 className="text-lg font-bold">{f.title}</h4>
            <p className="mt-2 text-gray-600">{f.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
