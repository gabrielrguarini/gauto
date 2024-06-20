import Navbar from "@/components/navbar";

export default function PrivateLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="flex">
      <Navbar />

      {children}
    </main>
  );
}
