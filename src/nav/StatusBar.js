import axios from "axios";
import { useEffect, useState } from "react";
import packageJson from "../../package.json";
import RoutainController from "./RoutainController";
import RoutainVisualizer from "./RoutainVisualizer";

export default function StatusBar() {
  const [routain, setRoutain] = useState({ name: "Routain1" });
  const [atomList, setAtomList] = useState(null);
  useEffect(() => {
    async function getRoutain() {
      const res = await axios.get(
        "localhost:3000" + "/routain/get_is_use_routain",
        {
          headers: {
            Authorization: `Bearer ${window.sessionStorage.getItem(
              "hoops-token"
            )}`,
          },
        }
      );

      if (res) {
        console.log(res);
        setRoutain(res.data.data.routain);
        setAtomList(res.data.data.routain_atom_list);
      }
    }

    getRoutain();
  }, []);

  return (
    <div className="flex flex-wrap sticky bg-zinc-900">
      <div className="text-sm font-bold leading-relaxed inline-block text-white">
        {routain ? `Routain : ${routain.name}` : "No use Routain."}
      </div>
      {/* controller */}
      {routain ? (
        <div className="inline-block">
          <RoutainController />
          <RoutainVisualizer />
        </div>
      ) : (
        ""
      )}
    </div>
  );
}
