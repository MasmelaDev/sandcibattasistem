import { SeatingsContainer } from "@/components/seatings-container";
import { type tables } from "@prisma/client";
import { SeatingsProvider } from "@/context/seatings-context";
const getTables = async (): Promise<tables[]> => {
  const res = await fetch(`http://localhost:3000/api/tables`, {
    cache: "no-cache",
  });
  const data = await res.json();
  return data;
};

const MesasPage = async () => {
  const tables = await getTables();
  return (
    <SeatingsProvider tables={tables}>
      <section className="pageBackground flex overflow-hidden">
        <SeatingsContainer />
      </section>
    </SeatingsProvider>
  );
};

export default MesasPage;
