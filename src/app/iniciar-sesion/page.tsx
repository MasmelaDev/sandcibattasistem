import { AuthOptions } from "@/libs/auth";
import { getServerSession } from "next-auth";
import { SignInForm } from "@/components/sign-in-form";
import { redirect } from "next/navigation";
const SignInPage = async () => {
  const session = await getServerSession(AuthOptions);
  if (session) {
    redirect("/");
  }
  return (
    <div className="h-screen w-screen absolute flex flex-col items-center justify-center bg-grayBackground top-0 lef-0">
      <section className=" flex flex-col items-center justify-center   w-full">
        <SignInForm />
      </section>
    </div>
  );
};

export default SignInPage;
