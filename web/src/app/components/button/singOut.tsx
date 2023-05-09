"use client";
import { signOut } from "next-auth/react";
import { HiArrowLeftOnRectangle } from "react-icons/hi2";

function SingOut() {
  return (
    <button
      className="p-4 bg-white flex justify-center items-center text-black text-3xl rounded-2xl hover:bg-blue-100"
      onClick={() => signOut({
        redirect: true
      })}
    >
      <HiArrowLeftOnRectangle />
    </button>
  );
}

export default SingOut;
