
export function Sobre(){
     return (
       <section className="flex flex-col gap-8 px-8 max-w-screen-xl mx-auto">
           <h1 className="text-4xl font-bold text-center text-gray-900 pt-12 mb-12 relative inline-block after:content-[''] after:block after:h-1 after:w-16 after:bg-blue-800 after:mx-auto after:mt-2">
                Sobre nós
            </h1>

            <div className="flex flex-col lg:flex-row gap-12">
                <div className="flex-1">
                <p className="mb-4">
                    A Taberna do Gute nasceu da paixão do Chef Artur Schmidt por unir suas raízes alemãs com os 
                    sabores vibrantes do Brasil. Localizado em Horizonte, Ceará, nosso restaurante oferece uma experiência gastronômica única que celebra essa fusão cultural.
                </p>
                <p className="mb-4">
                    Nossa proposta é trazer para você o melhor da culinária alemã tradicional com toques da rica gastronomia
                    brasileira, criando uma experiência única para o seu paladar.
                </p>
                <p>
                Em um ambiente aconchegante e elegante, convidamos você a desfrutar de pratos cuidadosamente 
                elaborados, acompanhados de cervejas artesanais e uma seleção de vinhos que complementam perfeitamente nossa culinária.
                </p>
                </div>
                <div className="grid grid-cols-2 gap-4 self-center">
                <div className="flex flex-col items-center justify-center text-center h-40 w-56 bg-green-50 rounded-xl p-4">
                    <h3 className="font-semibold">Gastronomia</h3>
                    <p className="text-sm">Fusão da culinária alemã com ingredientes brasileiros</p>
                </div>
                <div className="flex flex-col items-center justify-center text-center h-40 w-56 bg-indigo-50 rounded-xl p-4">
                    <h3 className="font-semibold">Bebidas</h3>
                    <p className="text-sm">Cervejas artesanais e vinhos selecionados</p>
                </div>
                <div className="flex flex-col items-center justify-center text-center h-40 w-56 bg-yellow-50 rounded-xl p-4">
                    <h3 className="font-semibold">Ambiente</h3>
                    <p className="text-sm">Aconchegante e elegante para todas as ocasiões</p>
                </div>
                <div className="flex flex-col items-center justify-center text-center h-40 w-56 bg-rose-50 rounded-xl p-4">
                    <h3 className="font-semibold">Experiência</h3>
                    <p className="text-sm">Atendimento personalizado e de alta qualidade</p>
                </div>
                </div>
            </div>
        </section>
    );
}