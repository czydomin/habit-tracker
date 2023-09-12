"use client";
import { useState } from "react";
import Image from "next/image";
export default function Home() {
  const [habitName, setHabitName] = useState("");
  const [habitList, setHabitList] = useState(["reading", "running"]);

  return (
    <main className="bg-[url('/background_image.avif')] flex flex-col flex-1  items-center bg-cover bg-center h-screen ">
      <h1 className="  py-10 text-[#644c1f] text-7xl tracking-widest">
        Habit tracker
      </h1>

      <div className="flex flex-col   items-center  gap-20 w-1/3">
        <div className="flex justify-between w-full ">
          <input
            value={habitName}
            onChange={(event) => setHabitName(event.target.value)}
            type="text"
            placeholder="Your habit"
            className=" rounded bg-white w-96 px-2 py-4 "
          ></input>
          <button
            onClick={() => {
              setHabitList([...habitList, habitName]);
            }}
            className="bg-[#fde5b8] text-[#644c1f] px-2 py-4 rounded "
          >
            + Add Habit
          </button>
        </div>

        <div className="flex flex-col w-full gap-4">
          {habitList.map((habit, selectedIndex) => {
            return (
              <div
                className=" flex justify-between border-2 rounded bg-slate-50 bg-opacity-60 border-[#867658]"
                key={habit}
              >
                <button className="px-2 py-4 ">{habit}</button>
                <button
                  onClick={() => {
                    const newList = habitList.filter((value, index) => {
                      return selectedIndex !== index;
                    });
                    setHabitList(newList);
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
            );
          })}
        </div>
      </div>
    </main>
  );
}
