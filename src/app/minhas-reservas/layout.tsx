import { Footer } from "../components/Footer";
import { Navbar } from "../components/Navbar";

interface Props {
  children: React.ReactNode;
}

export default function ReservaLayout({ children }: Props) {
  return (
    <>
      <Navbar />
      <main>{children}</main>
      <Footer />
    </>
  );
}
