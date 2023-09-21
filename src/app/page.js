"use client";

import { useState } from "react";
import Item from "src/components/Item.js";
import FrequencySelect from "src/components/FrequencySelect.js";
import Input from "src/components/Input.js";
import { useEffect } from "react";
import { v4 as uuidv4 } from "uuid";

export default function SkeletonPage() {
  const [habitName, setHabitName] = useState("");
  const [frequency, setFrequency] = useState("day");

  const [howManyTimes, setHowManyTimes] = useState(1);

  const storedHabits = JSON.parse(localStorage.getItem("habitList")) ?? [];

  const [habitList, setHabitList] = useState(storedHabits);

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

  //   useEffect(() => {
  //     const doneList = habitList.every(checkIsDone);

  //     function checkIsDone(habit) {
  //       return habit.isDone === true;
  //     }

  //     if (doneList === true) {
  //       alert("You've done all your habits");
  //     }
  //   }, [habitList]);

  return (
    <div className="bg-[#CA9D99] h-screen flex flex-col ">
      <div className="flex flex-col items-center">
        <h1 className="py-10 text-7xl tracking-widest text-[#503e3d]">
          Habit tracker
        </h1>
        <div className="flex items-center gap-4">
          <Input
            value={habitName}
            onChange={(newHabitName) => {
              setHabitName(newHabitName);
            }}
            type={"text"}
            placeholder={"write here..."}
            className={"p-2"}
          />

          <div className="flex items-center gap-4">
            <span>Repeat every</span>
            <Input
              value={howManyTimes}
              onChange={(updatedHowManyTimes) => {
                setHowManyTimes(updatedHowManyTimes);
              }}
              type={"number"}
              min={"1"}
              className={"p-2"}
            />

            <FrequencySelect
              selectedValue={frequency}
              onSelectValue={(newValue) => {
                setFrequency(newValue);
              }}
            />
            <button
              className="bg-[#795e5b] text-[#dfc4c1] py-4 px-20 rounded  my-4"
              onClick={handleClick}
            >
              Add
            </button>
          </div>
        </div>
      </div>
      <div className="flex justify-between ">
        <div className="flex flex-col w-full flex-1 gap-4 items-center">
          <h1 className=" text-2xl tracking-widest text-[#503e3d]">To do</h1>
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
        </div>

        <div className="flex flex-col w-full flex-1 gap-4 items-center">
          <h1 className=" text-2xl tracking-widest text-[#503e3d]">Done</h1>
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
        </div>
      </div>
    </div>
  );
}
