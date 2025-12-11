"use client";

export default function FinanceSalariesPage() {
  return (
    <div>
      <h2 className="text-2xl font-montserrat font-bold mb-6">
        Targets & Patamares
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white text-black rounded p-6">
          <h3 className="font-montserrat font-bold text-xl mb-2">
            Salário máximo atingível (NET por pessoa)
          </h3>
          <div className="text-gray-600 font-poppins">
            Calculadora em breve…
          </div>
        </div>
        <div className="bg-white text-black rounded p-6">
          <h3 className="font-montserrat font-bold text-xl mb-2">Patamares</h3>
          <ul className="list-disc pl-6 font-poppins text-gray-700">
            <li>Nível 1 → 500€</li>
            <li>Nível 2 → 750€</li>
            <li>Nível 3 → 1000€</li>
            <li>Nível 4 → 1500€</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
