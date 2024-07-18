'use client';
import { useForm, SubmitHandler } from "react-hook-form";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";
import fetchCreatePost from "../api/create";
import { useMutation } from "@tanstack/react-query";
import { useEffect } from "react";

interface IFormInput {
  title: string;
  content: string;
}

const CreatePost = () => {
  const { register, handleSubmit, formState: { errors }, reset } = useForm<IFormInput>();
  const router = useRouter();

  const createMutation = useMutation({
    mutationFn: (data:IFormInput)=> fetchCreatePost(data),
  });

  const onSubmit: SubmitHandler<IFormInput> = data => createMutation.mutate(data);

  useEffect(()=>{
    if(createMutation.isSuccess) {
      Swal.fire({
        position: "top",
        icon: "success",
        title: createMutation.data.message,
        showConfirmButton: false,
        timer: 1500
      });
      reset();
      setTimeout(()=>router.push('/search'), 1500);
    }
    if(createMutation.isError) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: createMutation.error.message,
      });
      reset();
    }
    if(createMutation.isPending) {
      Swal.fire({
        title: 'Loading...',
        showConfirmButton: false,
        willOpen: () => {
          Swal.showLoading();
        },
      });
    }
  }, [createMutation.status, createMutation.data, createMutation.error]);

  const inputStyle = 'p-3 rounded-md border';
  return (
    <div className="flex justify-center items-center h-screen">
      <form onSubmit={handleSubmit(onSubmit)} 
      className="flex flex-col gap-2 border p-5 rounded-lg bg-slate-200">
        <input 
          type="text" 
          className={inputStyle} 
          placeholder='Title'
          {...register('title', {required: true})} 
        />
        <input 
          type="text" 
          className={inputStyle} 
          placeholder='Content'
          {...register('content', {required: true})} 
        />
        <button type="submit" className="text-xl font-bold p-3 rounded-md text-white hover:bg-opacity-70 bg-green-500">생성</button>
      </form>
    </div>
  )
}

export default CreatePost;