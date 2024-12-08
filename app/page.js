import Link from "next/link";
import React from "react";

export default function Home() {
  return (
    <main className="flex w-full h-screen justify-center items-center align-middle">
      <div className="bg-green-300 p-3">
        <p className="text-4xl"><Link href="./easyTodo" >My Todo list</Link></p>
      </div>
    </main>
  );
};

