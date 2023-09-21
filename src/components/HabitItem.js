"use client";
import Image from "next/image";
export default function HabitItem({ title, onDelete }) {
  return (
    <div className=" flex justify-between border-2 rounded bg-slate-50 bg-opacity-60 border-[#867658]">
      <div className="px-2 py-4 "> {title}</div>
      <div className="flex ">
        <div className="flex ">
          <button>
            <Image
              src="https://static.vecteezy.com/system/resources/previews/010/152/358/original/tick-icon-sign-symbol-design-free-png.png"
              width={20}
              height={20}
              alt="green tick"
            />
          </button>

          <button className="px-2">
            <Image
              src="https://www.clipartmax.com/png/small/89-891075_red-wrong-cross-clip-art-at-red-cross-icon-png.png"
              width={20}
              height={20}
              alt="red cross"
            />
          </button>
        </div>

        <button>
          <Image
            className="w-full"
            src="https://spng.pngfind.com/pngs/s/70-704605_edit-icon-red-edit-icon-hd-png-download.png"
            width={20}
            height={20}
            alt="pencil icon"
          />
        </button>
        <button
          onClick={() => {
            onDelete();
          }}
          className="bg-[#fde5b8] text-[#644c1f] px-2 "
        >
          <Image
            className="w-full"
            src="https://cdn.vectorstock.com/i/1000x1000/85/07/trash-can-flat-brown-color-icon-vector-6078507.webp"
            width={10}
            height={10}
            alt="trash icon"
          />
        </button>
      </div>
    </div>
  );
}
