"use client";

import { useState } from "react";
import Item from "src/components/Item.js";
import { useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import Form from "@/components/Form";

export default function Page() {
  const [animationParent] = useAutoAnimate();

  const [habitName, setHabitName] = useState("");
  const [frequency, setFrequency] = useState("day");

  const [howManyTimes, setHowManyTimes] = useState(1);

  const [habitList, setHabitList] = useState([]);

  useEffect(() => {
    const storedHabits = JSON.parse(localStorage.getItem("habitList"));

    if (storedHabits !== null) {
      setHabitList(storedHabits);
    }
  }, [setHabitList]);

  useEffect(() => {
    localStorage.setItem("habitList", JSON.stringify(habitList));
  }, [habitList]);

  function handleClick() {
    const newHabit = {
      id: uuidv4(),
      title: habitName,
      isDone: false,
      howMany: howManyTimes,
      repeat: frequency,
    };
    console.log("here");
    if (newHabit.title === "") {
      alert("You cannot add empty note");
      return;
    }
    const found = habitList.some((el) => el.title === newHabit.title);
    if (found) {
      alert("You already have the same habit on your list");
      return;
    }
    if (howManyTimes <= 0) {
      alert("You cannot set negative number");
      return;
    }
    setHabitList([...habitList, newHabit]);
    setHabitName("");
  }

  function handleOnDelete(habitId) {
    const newList = habitList.filter((habit, index) => {
      return habitId !== habit.id;
    });

    setHabitList(newList);
  }

  function handleOnCheck(habitId) {
    const sameList = habitList.map((habit, index) => {
      if (habitId === habit.id) {
        return {
          ...habit,
          title: habit.title,
          isDone: !habit.isDone,
        };
      }
      return habit;
    });
    setHabitList(sameList);
  }

  function handleOnConfirm(updatedTitle, updatedNumber, updatedFreq, habitId) {
    const updateList = habitList.map((habit, index) => {
      if (habitId === habit.id) {
        return {
          ...habit,
          title: updatedTitle,
          howMany: updatedNumber,
          repeat: updatedFreq,
        };
      }
      return habit;
    });
    setHabitList(updateList);
  }

  useEffect(() => {
    if (habitList.length === 5) {
      alert("Congratulations! You already have 5 habits 👏");
    }
  }, [habitList.length]);

  return (
    <div className="bg-[#CA9D99] h-full w-full py-4 flex  flex-col ">
      <div className="flex flex-col items-center">
        <h1 className="py-10  text-5xl md:text-7xl tracking-widest text-[#503e3d]">
          Habit tracker
        </h1>

        <Form
          value={habitName}
          onChange={(newHabitName) => {
            setHabitName(newHabitName);
          }}
          FreqValue={howManyTimes}
          FreqOnChange={(updatedHowManyTimes) => {
            setHowManyTimes(updatedHowManyTimes);
          }}
          selectedValue={frequency}
          onSelectValue={(newValue) => {
            setFrequency(newValue);
          }}
          onClick={handleClick}
        />
      </div>
      <div className="flex flex-col md:flex-row  gap-4 ">
        <div className="flex  flex-col  flex-1 gap-4 items-center ">
          <h1 className=" text-2xl tracking-widest text-[#503e3d]">To do</h1>
          <ul className="flex flex-col gap-2" ref={animationParent}>
            {habitList
              .filter((habit) => habit.isDone === false)
              .map((habit) => {
                return (
                  <Item
                    key={habit.id}
                    title={habit.title}
                    isDone={habit.isDone}
                    howMany={habit.howMany}
                    repeat={habit.repeat}
                    onDelete={() => handleOnDelete(habit.id)}
                    onCheck={() => handleOnCheck(habit.id)}
                    onConfirm={(updatedTitle, updatedNumber, updatedFreq) =>
                      handleOnConfirm(
                        updatedTitle,
                        updatedNumber,
                        updatedFreq,
                        habit.id
                      )
                    }
                  />
                );
              })}
          </ul>
        </div>

        <div className="flex flex-col  flex-1 gap-4 items-center ">
          <h1 className=" text-2xl tracking-widest text-[#503e3d]">Done</h1>
          <ul className="flex flex-col gap-2" ref={animationParent}>
            {habitList
              .filter((habit) => habit.isDone === true)
              .map((habit) => {
                return (
                  <Item
                    key={habit.id}
                    title={habit.title}
                    isDone={habit.isDone}
                    howMany={habit.howMany}
                    repeat={habit.repeat}
                    onDelete={() => handleOnDelete(habit.id)}
                    onCheck={() => handleOnCheck(habit.id)}
                    onConfirm={(updatedTitle, updatedNumber, updatedFreq) =>
                      handleOnConfirm(
                        updatedTitle,
                        updatedNumber,
                        updatedFreq,
                        habit.id
                      )
                    }
                  />
                );
              })}
          </ul>
        </div>
      </div>
    </div>
  );
}
