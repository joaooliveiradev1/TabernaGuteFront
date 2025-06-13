import { Footer } from "./components/Footer";
import { Galeria } from "./components/Galeria";
import { HomeCard } from "./components/HomeCard";
import { Navbar } from "./components/Navbar";
import { Reserva } from "./components/Reserva";
import { Sobre } from "./components/Sobre";

export default function Home() {
  return (
    <>
      <Navbar />
      <HomeCard />
      <Sobre />
      <Galeria />
      <Reserva />
      <Footer />
    </>
  );
}
