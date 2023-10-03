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
    <section className=" flex flex-col items-center justify-center   w-full">
      <SignInForm />
    </section>
  );
};

export default SignInPage;
