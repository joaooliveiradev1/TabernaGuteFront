
export function Navbar(){
    
     return (
    <header className="bg-[#0B0E17] text-white h-16 flex items-center justify-between px-16">

      <h1 className="text-yellow-400 font-bold text-lg">Taberna do Gute</h1>

      <nav className="flex items-center gap-10">
        <ul className="flex gap-6 text-sm font-medium">
          <li className="hover:text-yellow-400 cursor-pointer">Início</li>
          <li className="hover:text-yellow-400 cursor-pointer">Cardápio</li>
          <li className="hover:text-yellow-400 cursor-pointer">Sobre</li>
          <li className="hover:text-yellow-400 cursor-pointer">Galeria</li>
        </ul>
        <button className="bg-yellow-300 text-black text-sm px-4 py-2 rounded-md font-semibold hover:bg-yellow-400 transition">
          Reservar Mesa
        </button>
      </nav>
    </header>
  );
}
