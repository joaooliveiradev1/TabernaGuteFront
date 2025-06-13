export function Reserva(){
    return(
           <section className="py-20 bg-gradient-to-b from-white to-gray-50">
                <div className="text-center mb-12">
                    <h2 className="text-4xl font-bold text-gray-900 relative inline-block after:content-[''] after:block after:h-1 after:w-16 after:bg-blue-800 after:mx-auto after:mt-2">
                    Reserve sua Mesa
                    </h2>
                    <p className="text-gray-600 mt-4 max-w-xl mx-auto">
                    Planeje sua visita à Taberna do Gute e tenha uma experiência gastronômica inesquecível. Nosso chef está ansioso para recebê-lo.
                    </p>
                </div>

                <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-md p-8">
                    <form className="grid grid-cols-1 md:grid-cols-2 gap-6">

                        <div>
                            <label className="block text-sm font-medium text-gray-700">Nome completo</label>
                            <input type="text" placeholder="Seu nome completo" className="mt-1 w-full border rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-800" />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700">Email</label>
                            <input type="email" placeholder="seu.email@exemplo.com" className="mt-1 w-full border rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-800" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Telefone</label>
                            <input type="tel" placeholder="(00) 00000-0000" className="mt-1 w-full border rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-800" />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700">Número de pessoas</label>
                            <select className="mt-1 w-full border rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-800">
                            <option>1 pessoa</option>
                            <option>2 pessoas</option>
                            <option>3 pessoas</option>
                            <option>4 pessoas</option>
                            <option>6 pessoas</option>
                            <option>7 pessoas</option>
                            <option>8 pessoas</option>
                            <option>9 pessoas</option>
                            <option>10 pessoas</option>
                            <option>+Mais de 10 pessoas</option>
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700">Data</label>
                            <input type="date" className="mt-1 w-full border rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-800" />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700">Hora</label>
                            <select className="mt-1 w-full border rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-800">
                                <option>11:30</option>
                                <option>12:00</option>
                                <option>13:00</option>
                                <option>14:00</option>
                                <option>15:00</option>
                            </select>
                        </div>

                        <div className="md:col-span-2">
                            <label className="block text-sm font-medium text-gray-700">
                                Solicitações especiais
                            </label>
                            <textarea rows="4" placeholder="Informe se há alguma necessidade especial ou preferência." 
                            className="mt-1 w-full border rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-800"/>
                        </div>

                        <div className="md:col-span-2 flex justify-center">
                            <button type="submit" className="bg-blue-800 text-white px-6 py-3 rounded-md hover:bg-blue-900 transition">
                                Confirmar Reserva
                            </button>
                        </div>
                    </form>
                </div>
            </section>
    );
}