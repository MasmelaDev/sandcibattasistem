import { SeatingsContainer } from "@/components/seatings-container";
import { type ExtendedTables } from "@/types/prisma";
import { SeatingsProvider } from "@/context/seatings-context";
const getTables = async (): Promise<ExtendedTables[]> => {
  const res = await fetch(`${process.env.API_URL}/tables`, {
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
