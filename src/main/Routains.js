import React from "react";
import { Link } from "react-router-dom";

class Routains extends React.Component {
  routains = [
    {
      name: "Breakfast Routain",
      numberOfAtoms: 6,
      description:
        "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout",
      coverImg:
        "https://images.unsplash.com/photo-1658093180204-fd48aa384ebc?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=764&q=80",
    },
    {
      name: "Work Routain",
      numberOfAtoms: 3,
      description:
        "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout",
      coverImg:
        "https://images.unsplash.com/photo-1657299170207-d6df52b27811?ixlib=rb-1.2.1&ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
    },
    {
      name: "Study Routain",
      numberOfAtoms: 5,
      description:
        "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout",
      coverImg:
        "https://images.unsplash.com/photo-1658128776272-f7ca7a98f8d5?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
    },
    {
      name: "Weekend Routain",
      numberOfAtoms: 11,
      description:
        "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout",
      coverImg:
        "https://images.unsplash.com/photo-1658064273537-84ae941402b1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=688&q=80",
    },
    {
      name: "Before Date Routain",
      numberOfAtoms: 11,
      description:
        "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout",
      coverImg:
        "https://images.unsplash.com/photo-1426543881949-cbd9a76740a4?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
    },
  ];
  render() {
    return (
      <div className="relative grid overflow-hidden h-full bg-zinc-600 mx-6 rounded grid-cols-5 mt-10 pb-10 pt-10">
        {this.routains.map((v, index) => {
          return (
            <Link
              to="/"
              key={index}
              className="rounded overflow-hidden shadow-lg bg-zinc-900 mr-10 ml-10 h-fit hover:bg-zinc-800 focus:outline-none hover:cursor-pointer"
            >
              <img className="w-full" src={v.coverImg} />
              <div className="px-10 py-4">
                <div className="font-bold text-xl mb-2 text-zinc-300">
                  {v.name}
                </div>
                <p className="text-gray-500 text-base text-left">
                  {v.description}
                </p>
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
}

export default Routains;
