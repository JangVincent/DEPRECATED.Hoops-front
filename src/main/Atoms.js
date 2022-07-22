import axios from "axios";
import React, { useEffect, useState } from "react";
import { SearchIcon } from "@heroicons/react/outline";
import packageJson from "../../package.json";

export default function Atoms() {
  const [atoms, setAtoms] = useState([]);

  useEffect(() => {
    async function getAtomList() {
      const res = await axios.get(
        packageJson.apiServer + "/atom/get_atom_list",
        {
          headers: {
            Authorization: `Bearer ${window.sessionStorage.getItem(
              "hoops-token"
            )}`,
          },
        }
      );

      const atomList = res.data.data.totalAtomList;

      setAtoms(atomList ? atomList : []);
    }

    getAtomList();
  }, []);

  const [viewMustAtoms, setViewMustAtoms] = useState([]);
  const [viewWantAtoms, setViewWantAtoms] = useState([]);

  const atomItemClassList =
    "px-5 py-2 mt-5 mb-5 mr-10 ml-10 rounded overflow-hidden shadow-lg bg-zinc-900 text-zinc-400 hover:bg-zinc-800 hover:cursor-pointer hover:text-zinc-200";

  const filterAtomList = (e) => {
    const search = e.target.value;
    const reg = new RegExp(search, "gi");

    setViewMustAtoms(
      atoms.filter((v) => reg.test(v.text) && v.type === "MUST")
    );

    setViewWantAtoms(
      atoms.filter((v) => reg.test(v.text) && v.type === "WANT")
    );
  };

  useEffect(() => {
    setViewMustAtoms(atoms.filter((v) => v.type === "MUST"));
    setViewWantAtoms(atoms.filter((v) => v.type === "WANT"));
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
        {viewMustAtoms.length > 0 ? (
          viewMustAtoms.map((v, i) => (
            <div key={v.id} className={atomItemClassList}>
              <p className="text-left text-base mb-3">{v.text}</p>
              <p className="text-gray-500 text-sm text-left">
                Duration :
                {v.duration >= 60
                  ? v.duration / 60 + " hour"
                  : v.duration + " min"}
              </p>
            </div>
          ))
        ) : (
          <p className="mt-3 text-zinc-800 font-bold text-sm text-left ml-10 pl-5">
            Routain is not exist.
          </p>
        )}
      </div>

      <p className="mt-5 text-zinc-300 font-bold text-xl text-left ml-10">
        WANT TO DO :
      </p>
      <div className="grid grid-cols-4">
        {viewWantAtoms.length > 0 ? (
          viewWantAtoms.map((v, i) => (
            <div key={v.id} className={atomItemClassList}>
              <p className="text-left text-base mb-3">{v.text}</p>
              <p className="text-gray-500 text-sm text-left">
                Duration :
                {v.duration >= 60
                  ? v.duration / 60 + " hour"
                  : v.duration + " min"}
              </p>
            </div>
          ))
        ) : (
          <p className="mt-3 text-zinc-800 font-bold text-sm text-left ml-10 pl-5">
            Routain is not exist.
          </p>
        )}
      </div>
    </div>
  );
}
