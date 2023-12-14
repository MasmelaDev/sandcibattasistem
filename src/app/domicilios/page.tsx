import { SalesInDeliveryTables } from "@/components/sales-in-delivery-tables";
import { ExtendedSales } from "@/types/prisma";
import { Input } from "@/components/input";
const getData = async () => {
  const salesTodayFetch = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/sales/today`, {
    cache: "no-cache",
  });
  const salesToday: ExtendedSales[] = await salesTodayFetch.json();

  const deliverysFetch = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/sales/today`, {
    cache: "no-cache",
  });
  const deliverys = await deliverysFetch.json();

  const neightborhoodsFetch = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/sales/today`, {
    cache: "no-cache",
  });
  const neightborhoods = await neightborhoodsFetch.json();

  return {salesToday,deliverys,neightborhoods};
};

const domiciliosPage = async () => {
  const {salesToday} = await getData();
  return (
    <section className="flex ">
      <div className="w-1/2 flex flex-col h-full relative overflow-y-auto p-5 pt-16">
        <SalesInDeliveryTables sales={salesToday} />
      </div>
      <div className="w-1/2 flex flex-col bg-[#f6f6f6]  h-[calc(100vh-56px)]">
        <form className="pt-10 px-5" action="">
          <label htmlFor="telefono" className="flex flex-col w-[500px]">
            Telefono
            <Input type="text" id="telefono" name="telefono" />
          </label>
          <label htmlFor="nombre" className="flex flex-col w-[500px]">
            Nombre
            <Input type="text" id="nombre" name="nombre" />
          </label>
          <label htmlFor="direccion" className="flex flex-col w-[500px]">
            Direccion
            <Input list="d dd dd" type="text" id="direccion" name="direccion" />
          </label>
          <label htmlFor="barrio" className="flex flex-col w-[500px]">
            Barrio
            <select
              className="bg-[#fff] text-black  rounded-md px-2 py-1 border focus:outline-none"
              name=""
              id=""
            >
              <option value="">Barrio 1</option>
              <option value="">Barrio 2</option>
              <option value="">Barrio 3</option>
            </select>
          </label>
          <label htmlFor="observaciones" className="flex flex-col w-[500px]">
            Observaciones
            <Input type="text" id="observaciones" name="observaciones" />
          </label>
          <label htmlFor="domiciliario" className="flex flex-col w-[500px]">
            Domiciliario
            <select
              className="bg-[#fff] text-black  rounded-md px-2 py-1 border focus:outline-none"
              name=""
              id=""
            >
              <option value="">Domiciliario 1</option>
              <option value="">Domiciliario 2</option>
              <option value="">Domiciliario 3</option>
            </select>
          </label>
          <label htmlFor="domicilio" className="flex flex-col w-[200px]">
            Domicilio
            <Input type="number" id="domicilio" name="domicilio" />
          </label>
          <div></div>
          <div className="w-full p-5">
            <table className="w-full text-[#555] font-medium rounded-md overflow-hidden">
              <thead>
                <tr className="bg-green-400 font-semibold text-white">
                  <th>Cant</th>
                  <th>Producto</th>
                  <th>Total</th>
                  <th className="w-1/12"></th>
                </tr>
              </thead>
              <tbody></tbody>
            </table>
          </div>
        </form>
      </div>
    </section>
  );
};

export default domiciliosPage;
