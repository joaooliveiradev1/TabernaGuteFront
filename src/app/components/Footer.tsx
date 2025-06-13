import Image from "next/image";


export function Footer(){
     return (
        <section className="flex justify-center bg-[#0E131F] pt-[4rem] pb-[2rem] text-white">
            <div className="mx-auto">
            <div className="flex justify-between gap-20 min-h-77">
                <div className="max-w-88">
                    <h2 className="font-bold text-xl mb-3">Taberna do Gute</h2>
                    <p>Sabor, tradição e aconchego em um só lugar. Inspirada na culinária alemã com um toque brasileiro, nossa taberna oferece uma experiência gastronômica única, em um ambiente acolhedor. Seja para um almoço em família, um encontro entre amigos ou eventos especiais, estamos prontos para receber você.</p>
                    <div className="flex pt-6 gap-3">
                        <div className="flex bg-[#152043] w-[44px] h-[44px] items-center justify-center rounded rounded-2xl hover:bg-[#252499]">
                            <a href="#" className=""><Image src={"/facebook.png"} width={20} height={20}/></a>
                        </div>
                        <div className="flex bg-[#152043] w-[44px] h-[44px] items-center justify-center rounded rounded-2xl hover:bg-[#252499]">
                            <a href="#" className=""><Image src={"/instagram.png"} width={20} height={20}/></a>
                        </div>
                    </div>
                </div>
                <div className="max-w-88">
                    <h2 className="text-xl mb-3 font-bold">Informações</h2>

                    <ul className="flex flex-col gap-4 ">
                        <div className="flex items-center gap-3">
                    <Image src={"/location.png"} width={20} height={20} /><li className="flex gap-2">Av. Joaquim Nogueira Lopes, 2998 - Horizonte, CE, 62880-000</li>

                        </div>
                        <div className="flex items-center gap-3">
                    <Image src={"/telefone.png"} width={20} height={20}/><li className="flex gap-2">(85) 98181-5840</li>

                        </div>
                        <div className="flex items-center gap-3">

                    <Image src={"/mensagem.png"} width={20} height={20}/><li className="flex gap-2">schmidttaberna@hotmail.com</li>
                        </div>
                        <div className="flex items-center gap-3">
                    <Image src={"/cronometro.png"} width={20} height={20}/><li className="flex gap-2">Terça - Domingo: 11:30 - 15:00 Segunda: Fechado</li>

                        </div>
                    </ul>
                </div>
                <div className="max-w-88">
                    <h2>Mapa</h2>
                    <div className="w-50 h-40 bg-zinc-500"></div>
                </div>

                
            </div>
            <hr className=""/>
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
            <Image></Image>
        </section>
      );
}