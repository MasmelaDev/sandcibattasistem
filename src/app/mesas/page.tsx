import {type tables} from "@prisma/client"
const getTables = async ():Promise<tables[]> => {
  const res = await fetch("http://localhost:3000/api/tables");
  const data = await res.json();
  return data.tables;
};

const MesasPage = async () => {
  const tables = await getTables();
  const array = Array(9).fill(0);
  return (
    <section className="pageBackground flex overflow-hidden">
      <div className="tablesGrid grid w-2/5 h-full">
        {array.map((_, index) => (
          <article className="border flex justify-center items-center border-[#444]" key={index}>
            {tables.map((table) => {
              const tableStyleStatus = table.currentSale ? "bg-green-500 table-shadow--active":"bg-[#999] border border-[#222] table-shadow"
              return (
                <>
                  {index === table.position && (
                    <div
                      className={` ${tableStyleStatus} font-bold w-[150px] h-[150px] text-xl  flex justify-center items-center  rounded-full  `}
                    >
                      {table.numberTable}
                    </div>
                  )}
                </>
              );
            })}
          </article>
        ))}
      </div>
      <div className="h-full w-3/5 bg-[#ddd]">

      </div>
    </section>
  );
};

export default MesasPage;
