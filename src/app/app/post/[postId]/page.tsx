"use client"
import Post from "@/components/Post";
import api from "@/lib/axios";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useParams } from "next/navigation"
import { useState } from "react";

export default function PostPage () {

  const { data: session } = useSession();
  const queryClient = useQueryClient();

  const params = useParams();

  const [replyData, setReplyData] = useState("");

  const post = useQuery({
    queryKey: ['post', params.postId],
    queryFn: () => api.getPost(params.postId as string)
  });

  const replyToPost = useMutation({
    mutationFn: () => api.replyToPost(params.postId as string, { content: replyData } ),
    onSuccess: () => {
      queryClient.invalidateQueries();
      setReplyData("");
    }
  })

  return (
    <>
      {post.isSuccess ? (
        <>
          <Post post={post.data} />
          <div className="flex justify-between gap-2 p-4 items-center border-b-2 border-gray-300">
            <div>
              <img src={session?.user?.image ?? ""} className="w-16 rounded-full" />
            </div>
              <input value={replyData} onChange={(e) => setReplyData(e.target.value)} placeholder="What's your reply?" className="outline-none p-2 w-full" />
            <div>
              <button onClick={() => replyToPost.mutate()} className="bg-blue-400 text-center py-2 px-4 text-white rounded-xl hover:bg-blue-500 transition duration-300 ">Reply</button>
            </div>
          </div>
          {post.data.replies.map((reply, index) => (
            <div key={index} className="flex flex-col p-4 gap-2 border-b-2 border-gray-300">
              <div className="flex gap-2">
                <img src={reply.user.image} className="w-14 h-14 rounded-full" />
                <div className="flex flex-col">
                  <Link href={"/app/profile/" + reply.userId} className="font-semibold text-lg hover:underline decoration-2 underline-offset-4">{reply.user.name}</Link>
                  <h4 className="text-sm text-gray-600">{reply.user.email}</h4>
                </div>
              </div>
              <p>
                {reply.content}
              </p>
            </div>
          ))}
        </>
      ) : null}
    </>
  )
}