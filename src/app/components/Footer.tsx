import Image from "next/image";

export function Footer() {
  return (
    <section className="flex justify-center bg-[#0E131F] pt-[4rem] pb-[2rem] text-white ">
      <div className="mx-auto">
        <div className="flex justify-between gap-20 min-h-77">
          <div className="max-w-88">
            <h2 className="font-bold text-xl mb-3">Taberna do Gute</h2>
            <p>
              Sabor, tradição e aconchego em um só lugar. Inspirada na culinária alemã com
              um toque brasileiro, nossa taberna oferece uma experiência gastronômica
              única, em um ambiente acolhedor. Seja para um almoço em família, um encontro
              entre amigos ou eventos especiais, estamos prontos para receber você.
            </p>
            <div className="flex pt-6 gap-3">
              <div className="flex bg-[#152043] w-[44px] h-[44px] items-center justify-center rounded-2xl hover:bg-[#252499]">
                <a
                  href="https://www.facebook.com/share/18YxeYtx6C/"
                  target="_blank"
                  className=""
                >
                  <Image src={"/facebook.png"} width={20} height={20} alt={""} />
                </a>
              </div>
              <div className="flex bg-[#152043] w-[44px] h-[44px] items-center justify-center rounded-2xl hover:bg-[#252499]">
                <a
                  href="https://www.instagram.com/tabernadogute?igsh=czZxZDJ1ZmtkcDFy"
                  target="_blank"
                  className=""
                >
                  <Image src={"/instagram.png"} width={20} height={20} alt={""} />
                </a>
              </div>
            </div>
          </div>
          <div className="max-w-88">
            <h2 className="text-xl mb-3 font-bold">Informações</h2>

            <ul className="flex flex-col gap-4 ">
              <div className="flex items-center gap-3">
                <Image src={"/location.png"} width={20} height={20} alt={""} />
                <li className="flex gap-2">
                  Av. Joaquim Nogueira Lopes, 2998 - Horizonte, CE, 62880-000
                </li>
              </div>
              <div className="flex items-center gap-3">
                <Image src={"/telefone.png"} width={20} height={20} alt={""} />
                <li className="flex gap-2">(85) 98181-5840</li>
              </div>
              <div className="flex items-center gap-3">
                <Image src={"/mensagem.png"} width={20} height={20} alt={""} />
                <li className="flex gap-2">schmidttaberna@hotmail.com</li>
              </div>
              <div className="flex items-center gap-3">
                <Image src={"/cronometro.png"} width={20} height={20} alt={""} />
                <li className="flex gap-2">
                  Terça - Domingo: 11:30 - 15:00 Segunda: Fechado
                </li>
              </div>
            </ul>
          </div>
          <div className="max-w-88">
            <h2>Mapa</h2>
            <div className="w-88 h-[225px] overflow-hidden shadow-lg bg-gray-800 rounded-xl">
              <iframe
                className="w-full h-full"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3980.258333886889!2d-38.4919233!3d-3.9907378!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x7b8b43a0acb27f5%3A0x61f9392e4c043c28!2sAv.%20Joaquim%20Nogueira%20Lopes%2C%202998%20-%20Horizonte%2C%20CE%2C%2062880-000!5e0!3m2!1spt-BR!2sbr!4v1621362128974!5m2!1spt-BR!2sbr"
                frameBorder="0"
              ></iframe>
            </div>
          </div>
        </div>
        <hr className="" />
        <div className="flex justify-between py-4 text-gray-400">
          <p>© 2025 Taberna do Gute. Todos os direitos reservados.</p>
          <ul className="flex gap-3 ">
            <li>Política de Privacidade</li>
            <li>Termos de Uso</li>
            <li>Acessibilidade</li>
            <li>Painel</li>
          </ul>
        </div>
      </div>
    </section>
  );
}
