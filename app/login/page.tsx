"use client"

import Link from "next/link"
import LoginForm from "../components/LoginForm"

export default function Page () {
    return (
        <div className="flex flex-col items-center justify-center space-y-3">
            <Link href="/" className="p-5 border-b-2 border-slate-200">Logo / Home </Link>
            <LoginForm />
        </div>
    )
}