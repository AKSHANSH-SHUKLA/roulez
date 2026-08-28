'use client';

const suppliers = [
  'Hertz', 'Europcar', 'Sixt', 'Avis', 'Enterprise',
  'Budget', 'National', 'Alamo', 'Thrifty', 'Rent-A-Car',
];

export default function SupplierRail() {
  return (
    <section className="rail-host overflow-hidden border-y border-ink/10 bg-paper-2 py-5">
      <div className="flex w-max rail">
        {[0, 1].map((copy) => (
          <ul key={copy} aria-hidden={copy === 1} className="flex items-center">
            {suppliers.map((name) => (
              <li key={`${copy}-${name}`} className="flex items-center whitespace-nowrap px-8">
                <span className="font-poster-md text-xl text-ink-2">{name}</span>
                <span className="ml-8 h-1 w-1 rounded-full bg-petrol-500/60" />
              </li>
            ))}
          </ul>
        ))}
      </div>
    </section>
  );
}
