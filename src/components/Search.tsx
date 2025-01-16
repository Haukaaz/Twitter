"use client"
import Link from "next/link";
import api from "@/lib/axios";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";

export default function Search () {

  const [searchData, setSearchData] = useState("")

  const searchUsers = useMutation({
    mutationFn: () => api.searchUsers({ content: searchData })
  })

  return (
    <div className="flex flex-col p-4 gap-4">
      <div className="flex gap-2">
        <input value={searchData} onChange={(e) => setSearchData(e.target.value)} className="bg-gray-200 w-full py-2 px-4 rounded-full outline-none" type="text" placeholder="Search for users" />
        <button onClick={() => searchUsers.mutate()} className="bg-blue-400 text-center py-2 px-4 text-white rounded-full hover:bg-blue-500 transition duration-300">Search</button>
      </div>
      <div>
        {!searchUsers.isSuccess ? (
          <p>No results yet.</p>
        ) : (
          <div className="flex flex-col gap-4">
            <p className="font-semibold">Results:</p>
            {searchUsers.data.map((user: any, index: any) => (
              <Link href={"/app/profile/" + user.id} className="flex gap-2 items-center" key={index}>
                <img src={user.image} className="w-8 h-8 rounded-full" />
                <p className="text-lg">{user.name}</p>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}