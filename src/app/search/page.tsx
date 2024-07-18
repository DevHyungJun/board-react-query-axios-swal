'use client';
import Link from "next/link";
import { useEffect } from "react";
import handleFetchFn from "../api/posts";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";

interface Post {
  _id: string;
  title: string;
  content: string;
}

const Search = () => {
  const { data, isError, error, isFetching, isSuccess } = useQuery({
    queryKey: ['posts'],
    queryFn: handleFetchFn,
  });
  
  useEffect(()=>{
    if(isSuccess) return Swal.close(); 
    if(isError) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: error.message,
      });
    }
    if(isFetching) {
      Swal.fire({
        title: 'Loading...',
        showConfirmButton: false,
        willOpen: () => {
          Swal.showLoading();
        },
      });
    }
  }, [isError, isFetching, isSuccess]);

  return (
    <div>
      <div className="flex flex-col gap-1 mt-3 mb-3">
        {data?.data.map((post: Post) => (
          <Link href={`/post/${post._id}`} key={post._id}>
            <div key={post._id} className="border p-3 hover:opacity-30 bg-gray-100 cursor-pointer min-h-[100px] flex items-center">
              <h1 className="text-lg font-semibold">제목: {post.title}</h1>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}

export default Search;