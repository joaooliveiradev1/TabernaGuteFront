export function Navbar(){
     return (
        <section className="bg-gray-900 flex justify-between h-18 items-center">
            <h1 className="text-yellow-400 font-bold text-xl pl-60">Taberna do Gute</h1>
            <nav className="flex justify-between pr-20 pl-50">
                <div className="text-gray-100 flex justify-between ">
                    <li className="pr-5 pl-5">Início</li>
                    <li className="pr-5 pl-5">Cardápio</li>
                    <li className="pr-5 pl-5">Sobre</li>
                    <li className="pr-30 pl-5">Galeria</li>
                 </div>
                
                 <div className="text-black bg-yellow-300 rounded-md mr-60">
                        <li>Reservar mesa</li>
                 </div>
            </nav>
        </section>
      );
}