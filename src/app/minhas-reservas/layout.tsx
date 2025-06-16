import { Footer } from "../components/Footer";
import { Navbar } from "../components/Navbar";

interface Props {
  children: React.ReactNode;
}

export default function ReservaLayout({ children }: Props) {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">{children}</main>
      <Footer />
    </div>
  );
}
