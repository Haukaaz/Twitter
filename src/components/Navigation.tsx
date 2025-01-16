"use client"
import { signOut } from "next-auth/react";
import Link from "next/link";
import api from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";

export default function Navigation () {

  const user = useQuery({
    queryKey: ['user'],
    queryFn: api.getCurrentUser
  })

  return (
    <nav className="p-8 flex flex-col gap-6">
      <img src="https://static.vecteezy.com/system/resources/previews/023/986/731/non_2x/twitter-logo-twitter-logo-transparent-twitter-icon-transparent-free-free-png.png" className="w-12 h-12" />
      <Link href="/app" className="text-xl font-semibold hover:underline">Home</Link>
      <Link href={user.isSuccess ? "/app/profile/" + user.data.id : "/app"} className="text-xl font-semibold hover:underline">Profile</Link>
      <Link href="#" className="text-xl font-semibold hover:underline">Notifications</Link>
      <button onClick={() => signOut()} className="text-xl font-semibold text-left hover:underline">Sign Out</button>
      <Link href="/app" className="bg-blue-400 text-center p-2 text-white rounded-xl hover:bg-blue-500 transition duration-300 rounded-full">New Tweet</Link>
    </nav>
  )
}