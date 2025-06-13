export function HomeCard (){
    return (
    <section className="relative h-[700px] w-full text-white">
  
        <div className="absolute inset-0 bg-[url('/card_navbar.png')] bg-cover bg-center brightness-50"></div>

        
        <div className="relative z-10 flex items-center h-full px-8 md:px-16 lg:pl-60">
           <div className="max-w-xl space-y-6"> 
                <h1 className="text-4xl md:text-5xl font-bold">Taberna do Gute</h1>

                <h2 className="text-xl md:text-2xl text-yellow-400 font-semibold">
                    Uma experiência única de culinária alemã com toques brasileiros
                </h2>

                <p className="text-base md:text-lg text-gray-200">
                    Localizado em Horizonte, Ceará, nosso restaurante oferece um ambiente
                    aconchegante e uma gastronomia única, com pratos elaborados pelo Chef
                    Artur Schmidt.
                </p>

                <div className="flex gap-4">
                    <button className="bg-yellow-300 text-black px-6 py-2 rounded-md font-semibold hover:bg-yellow-400 transition">
                    Reservar Mesa
                    </button>
                    <button className="border border-gray-300 text-gray-100 px-6 py-2 rounded-md font-semibold hover:bg-gray-100 hover:text-black transition">
                    Ver Cardápio
                    </button>
                </div>
            </div>
        </div>
    </section>
    );
}