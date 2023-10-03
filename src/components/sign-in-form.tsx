"use client";
import svg from "@/assets/layered-waves-haikei.svg";
import logo from "@/assets/logo.png";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { signIn } from "next-auth/react";
import { FormEvent } from "react";
import { useRouter } from "next/navigation";
import { useState } from "react";
export const SignInForm = () => {
  const router = useRouter();
  const [error, setError] = useState("");
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const user = formData.get("user");
    const password = formData.get("password");
    if (!user || !password) {
      setError("Completa todos los campos para ingresar");
      setTimeout(() => {
        setError("");
      }, 2000);
      return;
    }
    const signInData = await signIn("credentials", {
      user: user,
      password: password,
      redirect: false,
    });
    if (signInData?.error) {
      setError(signInData.error);
      setTimeout(() => {
        setError("");
      }, 2000);
    } else {
      router.push("/");
    }
  };

  return (
    <motion.div
      initial={{ scale: 0, opacity: 0 }}
      transition={{ duration: 0.3 }}
      animate={{ scale: 1, opacity: 1 }}
      className="flex flex-col lg:gap-12 min-h-[650px] w-full max-w-[960px] overflow-hidden px-10  rounded-lg shadow-[0_7px_29px_0_rgba(0,0,0,0.2)]  bg-[#eee] relative text-[#222]"
    >
      <motion.div
        initial={{ opacity: 0 }}
        transition={{ duration: 0.8, delay: 0.5 }}
        animate={{ opacity: 1 }}
        className="flex justify-center"
      >
        <Image priority={true} src={logo} alt="logo" width={200} height={200} />
      </motion.div>
      <motion.form
        onSubmit={handleSubmit}
        initial={{ opacity: 0 }}
        transition={{ duration: 0.8, delay: 0.5 }}
        animate={{ opacity: 1 }}
        className="flex flex-col lg:text-white w-full gap-7 items-center p-2 mb-4 z-10 relative  mt-5"
      >
        <label
          className="flex flex-col gap-2 max-w-sm w-full font-medium "
          htmlFor="user"
        >
          <span className="pl-2">User</span>
          <input
            placeholder="Email or Username"
            name="user"
            id="user"
            type="text"
            className="bg-[#333] lg:bg-[#ddd] lg:placeholder:text-black/70 lg:text-black text-white placeholder:text-white/70 rounded-md pl-3 py-4 w-full max-full font-semibold focus:outline-none focus:ring-transparent"
          />
        </label>
        <label
          className="flex flex-col gap-2 max-w-sm w-full font-medium  "
          htmlFor="password"
        >
          <span className="pl-2">Password</span>
          <input
            placeholder="Password"
            type="password"
            name="password"
            id="password"
            className="bg-[#333] lg:bg-[#ddd] lg:placeholder:text-black/70 lg:text-black text-white placeholder:text-white/70 rounded-md pl-3 py-4 w-full max-w-sm font-semibold focus:outline-none focus:ring-transparent"
          />
        </label>

        <input
          value="Sign in"
          type="submit"
          className="rounded-full w-full max-w-sm text-white font-medium bg-amber-600 py-3 cursor-pointer active:scale-95 transition-all duration-75 mt-5"
        />
        <AnimatePresence>
          {error && (
            <motion.p
              exit={{ opacity: 0 }}
              initial={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              animate={{ opacity: 1 }}
              className="text-red-500 "
            >
              {error}
            </motion.p>
          )}
        </AnimatePresence>
      </motion.form>
      <Image
        width={960}
        height={640}
        className="absolute hidden lg:block left-0 bottom-0"
        src={svg}
        alt="svg"
      />
    </motion.div>
  );
};
