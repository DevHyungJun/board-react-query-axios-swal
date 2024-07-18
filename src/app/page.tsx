'use client';

import Link from "next/link";

export default function Home() {
  const btnStyle = 'text-xl font-bold p-3 rounded-md text-white hover:bg-opacity-70';

  return (
    <div className="flex justify-center items-center h-screen gap-3">
      <Link href={'/createForm'}>
        <button className={`${btnStyle} bg-orange-500`}>생성</button>
      </Link>

      <Link href={'/search'}>
        <button className={`${btnStyle} bg-blue-500`}>게시물 조회</button>
      </Link>
    </div>
  );
}
