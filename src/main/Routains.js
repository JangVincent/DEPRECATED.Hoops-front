import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { createApi } from "unsplash-js";

export default function Routains() {
  const [routains, setRoutains] = useState([]);

  const unsplash = createApi({
    accessKey: process.env.REACT_APP_UNSPLASH_ACCESS_KEY,
  });

  useEffect(() => {
    async function fetchCoverImg(count) {
      if (count == 0) return [];

      const res = await unsplash.photos.getRandom({
        count: count,
      });

      if (!res.errors) {
        const response = res.response;

        return Array.isArray(response)
          ? response.map((v) => {
              return v.urls.raw;
            })
          : [response.urls.raw];
      }
    }

    async function fetchRoutains() {
      const res = await axios.get(
        process.env.REACT_APP_API_SERVER_DOMAIN + "/routain/get_routain_list",
        {
          headers: {
            Authorization: `Bearer ${window.sessionStorage.getItem(
              "hoops-token"
            )}`,
          },
        }
      );

      return res.data.data.routainList;
    }

    async function makePhotoRoutainList() {
      const routainList = await fetchRoutains();
      const photoList = await fetchCoverImg(routainList.length);

      for (let i in routainList) {
        routainList[i]["coverImg"] = photoList[i];
        routainList[i]["numberOfAtoms"] =
          routainList[i]["atomOrderString"].split(",").length;
      }

      console.log(routainList);

      setRoutains(routainList);
    }

    makePhotoRoutainList();
  }, []);

  return (
    <div className="relative grid overflow-hidden h-full bg-zinc-600 mx-6 rounded grid-cols-5 mt-10 pb-10 pt-10">
      {routains.map((v) => {
        return (
          <Link
            to="/"
            key={v.id}
            className="rounded overflow-hidden shadow-lg bg-zinc-900 mr-10 ml-10 h-fit hover:bg-zinc-800 focus:outline-none hover:cursor-pointer"
          >
            <img className="w-full" src={v.coverImg} />
            <div className="px-10 py-4">
              <div className="font-bold text-xl mb-2 text-zinc-300">
                {v.name}
              </div>
              <p className="text-gray-500 text-base text-left">{v.name}</p>
              <p className="text-gray-300 text-base mt-3">
                {v.numberOfAtoms}{" "}
                <span className="text-gray-600">of Atoms included</span>
              </p>
            </div>
            <div className="px-6 pt-4 pb-2">
              {/* <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
              #photography
            </span>
            <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
              #travel
            </span>
            <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
              #winter
            </span> */}
            </div>
          </Link>
        );
      })}
    </div>
  );
}
