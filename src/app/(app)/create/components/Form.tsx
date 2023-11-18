"use client";

import SelectInput from "@/components/Create/SelectInput";
import Tags from "./Tags";

const Form = () => {
  return (
    <div className="flex flex-wrap flex-col">
      <input
        type="text"
        placeholder="Topic"
        className="w-full rounded-xl px-4 py-2 outline-none font-bold text-lg bg-gray-100 text-black mt-5"
      />
      <textarea
        placeholder="Description"
        className="w-full rounded-xl px-4 py-2 outline-none font-bold text-lg bg-gray-100 text-black mt-5"
        rows={5}
      />
      <SelectInput
        title="Collection"
        options={["Sports", "Science", "History", "Geography", "Art", "Music", "Literature", "Movies", "TV Shows", "Video Games", "Animals", "Food", "General Knowledge"]}
      />
      <SelectInput
        title="Visibility"
        options={["Public", "Code only"]}
        defaultValue="Public"
      />
      <SelectInput
        title="Points"
        options={["Based on answer time", "Constant", "Disabled"]}
        defaultValue="Based on answer time"
      />
      <Tags />
      <button
        className="mx-auto rounded-full px-8 py-3 outline-none font-bold text-lg bg-black text-white mt-16 box-shadow shadow-small shadow-blue hover:scale-105 duration-300"
      >
        ADD QUESTIONS
      </button>
    </div>
  );
};

export default Form;
