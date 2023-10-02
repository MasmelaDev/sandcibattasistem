import { AuthOptions } from "@/libs/auth";

import { getServerSession } from "next-auth";
import { RoutesList } from "@/components/routes-list";
export default async function Home() {
  return (
    <>
      <section className="flex flex-wrap justify-center max-w-7xl gap-16 mx-auto">
        <RoutesList />
      </section>
    </>
  );
}
