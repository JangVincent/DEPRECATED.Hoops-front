import axios from "axios";
import { useEffect, useState, useRef } from "react";
import RoutainController from "./RoutainController";
import RoutainVisualizer from "./RoutainVisualizer";

export default function StatusBar() {
  const initialRunningAtom = {
    text: "-",
    duration: 0,
  };

  const [routain, setRoutain] = useState({});
  const [atomList, setAtomList] = useState(null);

  const [runningAtomIndex, setRunningAtomIndex] = useState(0);
  const [runningAtom, setRunningAtom] = useState(initialRunningAtom);
  const [timerFlag, setTimerFlag] = useState(false);

  const runningAtomIndexRef = useRef(0);

  useEffect(() => {
    async function getRoutain() {
      const res = await axios.get(
        process.env.REACT_APP_API_SERVER_DOMAIN + "/routain/get_is_use_routain",
        {
          headers: {
            Authorization: `Bearer ${window.sessionStorage.getItem(
              "hoops-token"
            )}`,
          },
        }
      );

      if (res) {
        setRoutain(res.data.data.routain);
        setAtomList(res.data.data.routain_atom_list);
      }
    }

    getRoutain();
  }, []);

  const atomStart = (atomIndex) => {
    // 실행 중 아톰 갱신
    if (atomIndex < atomList.length) {
      setRunningAtomIndex(atomIndex);
      setRunningAtom(atomList[atomIndex]);
    }
  };

  const atomNext = () => {
    console.log("AtomNext excuted");

    runningAtomIndexRef.current += 1;

    if (runningAtomIndexRef.current < atomList.length) {
      atomStart(runningAtomIndexRef.current);
    } else {
      routainStop();
    }
  };

  const routainStart = () => {
    console.log("Routain start");
    if (atomList.length > 0) {
      atomStart(0);
      setTimerFlag(true);
    }
  };

  const routainStop = () => {
    console.log("Routain stopped");
    setTimerFlag(false);
    setRunningAtomIndex(0);
    setRunningAtom(initialRunningAtom);
  };

  return (
    <div className="flex flex-wrap mb-2 px-6">
      <div className="text-sm font-bold leading-relaxed inline-block text-zinc-400">
        <span className="text-zinc-400">Routain : </span>
        {routain ? <span>{routain.name}</span> : <span>No use Routain.</span>}
      </div>
      {/* controller */}
      {routain ? (
        <RoutainController start={routainStart} stop={routainStop} />
      ) : (
        ""
      )}

      {routain ? (
        <RoutainVisualizer
          atom={runningAtom}
          flag={timerFlag}
          atomNext={atomNext}
        />
      ) : (
        ""
      )}
    </div>
  );
}
