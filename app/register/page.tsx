"use client"

import RegistrationForm from '@/app/components/RegistrationForm'
import Link from "next/link";

const register = () => {
  return (
    <>
      <main>
        <div className="flex flex-col items-center justify-center space-y-3">
          <Link href="/" className="p-5 border-b-2 border-slate-200">
            Logo / Home{" "}
          </Link>
          <RegistrationForm />
        </div>
      </main>
    </>
  );
};

export default register;
