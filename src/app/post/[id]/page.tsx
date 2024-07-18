'use client';

import { useEffect } from "react";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import fetchPostData from "@/app/api/post";

type Params = {
  id: string;
};
interface Post {
  _id: string;
  title: string;
  content: string;
}

const Post = ({ params }: { params: Params }) => {
  const { id } = params;
  const router = useRouter();

  const { data, isError, error, isFetching, isSuccess } = useQuery({
    queryKey: ['post', id],
    queryFn: ()=> fetchPostData(id),
  })

  useEffect(()=>{
    if(isSuccess) return Swal.close(); 
    if(isError) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: error.message,
      });
      router.push('/search');
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
    <div className="flex flex-col justify-center items-center h-screen gap-3">
      <div className="flex flex-col items-center gap-1 text-2xl font-semibold">
        <h1>title: {data?.data.title}</h1>
        <h2>content: {data?.data.content}</h2>
      </div>
    </div>
  );
}

export default Post;