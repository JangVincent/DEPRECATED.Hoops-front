import React, { useEffect, useState } from "react";
import { SearchIcon } from "@heroicons/react/outline";

export default function Atoms() {
  const [atoms, setAtoms] = useState([
    { name: "Drink water", duration: 5 },
    { name: "Take shower", duration: 15 },
    { name: "Listen Jazz Music", duration: 60 },
    { name: "Study React", duration: 240 },
  ]);

  const [viewAtoms, setViewAtoms] = useState(atoms);

  const atomItemClassList =
    "px-5 py-2 mt-5 mb-5 mr-10 ml-10 rounded overflow-hidden shadow-lg bg-zinc-900 text-zinc-400 hover:bg-zinc-800 hover:cursor-pointer hover:text-zinc-200";

  const filterAtomList = (e) => {
    const search = e.target.value;
    const reg = new RegExp(search, "gi");
    setViewAtoms(atoms.filter((v) => reg.test(v.name)));
  };

  useEffect(() => {
    setViewAtoms(atoms);
  }, [atoms]);

  return (
    <div className="Atoms relative overflow-hidden bg-zinc-600 mx-6 rounded mt-10 pb-10 pt-10">
      <div className="flex ml-10 w-80 border-b border-zinc-800 py-2 pr-1">
        <input
          className="appearance-none bg-transparent border-none w-full text-white mr-3 py-1 pl-1 leading-tight focus:outline-none text-base"
          placeholder="Search Atom Name"
          onChange={(e) => {
            filterAtomList(e);
          }}
        ></input>
        <SearchIcon className="h-6 w-6 text-zinc-300"></SearchIcon>
      </div>

      <p className="mt-10 text-zinc-300 font-bold text-xl text-left ml-10">
        MUST TO DO :
      </p>
      <div className="grid grid-cols-4">
        {viewAtoms.map((v, i) => (
          <div key={i} className={atomItemClassList}>
            <p className="text-left text-base mb-3">{v.name}</p>
            <p className="text-gray-500 text-sm text-left">
              Duration :
              {v.duration >= 60
                ? v.duration / 60 + " hour"
                : v.duration + " min"}
            </p>
          </div>
        ))}
      </div>

      <p className="mt-5 text-zinc-300 font-bold text-xl text-left ml-10">
        WANT TO DO :
      </p>
      <div className="grid grid-cols-4">
        {viewAtoms.map((v, i) => (
          <div key={i} className={atomItemClassList}>
            <p className="text-left text-base mb-3">{v.name}</p>
            <p className="text-gray-500 text-sm text-left">
              Duration :
              {v.duration >= 60
                ? v.duration / 60 + " hour"
                : v.duration + " min"}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
