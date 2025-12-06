
export default function Pricing({ items }: any) {
  return (
    <section className="w-full py-16 bg-white">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
        {items?.map((item: any, i: number) => (
          <div key={i} className="p-6 border rounded-xl shadow-sm">
            <h3 className="text-xl font-bold">{item.name}</h3>
            <p className="mt-2 text-gray-700">{item.price}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
