
export function Galeria() {
  return (
    <section className="py-16 px-6 max-w-screen-xl mx-auto">
      <div className="flex justify-center">
        <h1 className="text-4xl font-titulo text-center text-gray-900 mb-12 relative inline-block after:content-[''] after:block after:h-1 after:w-16 after:bg-blue-800 after:mx-auto after:mt-2">
          Nossa Galeria
        </h1>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 justify-items-center font-titulo pb-30">
        {[
          { img: "/card_sobremesa.png", title: "Sobremesas Artesanais" },
          { img: "/card_cheftucao.png", title: "Especialidade da casa" },
          { img: "/card_navbar.png", title: "Culinária Alemã" },
          { img: "/card_prato.png", title: "Pratos Especiais" },
          { img: "/card_drink.png", title: "Bebidas Exclusivas" },
          { img: "/card_sorvete.png", title: "Doces e Sobremesas" },
        ].map((card, idx) => (
          <div
            key={idx}
            className="relative w-[340px] h-[300px] rounded-xl overflow-hidden shadow-md group"
          >
            <div
              className={`absolute inset-0 bg-cover bg-center transition-transform duration-300 group-hover:scale-105`}
              style={{ backgroundImage: `url(${card.img})` }}
            ></div>
            <div className="absolute inset-0 bg-black bg-opacity-40 opacity-0 group-hover:opacity-70 transition duration-300 flex items-center justify-center">
              <h3 className="absolute bottom-3 left-2 w-full bg-gradient-to-t from-black/60 to-transparent text-white text-2xl p-2">
                {card.title}
              </h3>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
