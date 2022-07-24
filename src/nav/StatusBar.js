import axios from "axios";
import { useEffect, useState, useRef } from "react";
import RoutainController from "./RoutainController";
import RoutainVisualizer from "./RoutainVisualizer";
import Modal from "../commons/Modal";

export default function StatusBar() {
  const initialRunningAtom = {
    text: "-",
    duration: 0,
  };

  // 로드된 루틴정보
  const [routain, setRoutain] = useState({});
  const [atomList, setAtomList] = useState(null);

  // 현재 실행중인 아톰의 배열 인덱스
  const [runningAtomIndex, setRunningAtomIndex] = useState(0);
  const runningAtomIndexRef = useRef(0);

  // 현재 실행중인 아톰
  const [runningAtom, setRunningAtom] = useState(initialRunningAtom);
  const [timerFlag, setTimerFlag] = useState(false);

  // Modal 관련 state
  const [modalOn, setModalOn] = useState(false);
  const [modalHeader, setModalHeader] = useState("");
  const [modalBody, setModalBody] = useState("");
  const [accept, setAccept] = useState(null);
  const acceptRef = useRef(() => {});

  useEffect(() => {
    async function getRoutain() {
      let res = null;
      // 루틴 불러오기
      try {
        res = await axios.get(
          process.env.REACT_APP_API_SERVER_DOMAIN +
            "/routain/get_is_use_routain",
          {
            headers: {
              Authorization: `Bearer ${window.sessionStorage.getItem(
                "hoops-token"
              )}`,
            },
          }
        );

        setRoutain(res.data.data.routain);
        setAtomList(res.data.data.routain_atom_list);
      } catch (e) {
        console.log(res);
        setModalHeader("Error Occured!");
        setModalBody("Routain load Failed. Try again few moments later.");
        setModalOn(true);
      }
    }

    getRoutain();
  }, []);

  // 아톰 실행.
  const atomStart = (atomIndex) => {
    if (atomIndex < atomList.length) {
      setRunningAtomIndex(atomIndex);
      setRunningAtom(atomList[atomIndex]);
    }
  };

  // 다음 아톰있는지 검사 후 실행
  const atomNext = () => {
    runningAtomIndexRef.current += 1;

    if (runningAtomIndexRef.current < atomList.length) {
      atomStart(runningAtomIndexRef.current);
    } else {
      // 아톰 모두 실행 시
      routainStop();
      setModalHeader("Routain Finished");
      setModalBody("Routain is Finished!");
      setModalOn(true);
    }
  };

  // 루틴 시직 : 0번 아톰부터 시작. 아톰이 0 개일 경우 모달
  const routainStart = () => {
    // 아톰배열이 정싱적일 때 팝업 띄우고 시작
    if (atomList.length > 0) {
      setModalHeader("Start Routain");
      setModalBody(
        "Once you start a Routain, you can't pause it. Do you want start routain?"
      );
      acceptRef.current = () => {
        atomStart(0);
        setTimerFlag(true);
      };
      setAccept(accept);

      setModalOn(true);
    } else {
      // 루틴의 아톰 갯수가 0개면 에러
      setModalHeader("Error Occured!");
      setModalBody("Routain has 0 of atoms. Please add atoms to Routain");
      setModalOn(true);
    }
  };

  // 루틴 중지 : 모든 state 초기화, 모달로 알림
  const routainStop = () => {
    setTimerFlag(false);
    setRunningAtomIndex(0);
    setRunningAtom(initialRunningAtom);

    setModalHeader("Routain Stopped");
    setModalBody("Routain is Stopped!");
    setModalOn(true);
  };

  return (
    <div className="px-6">
      <div className="text-sm font-bold leading-relaxed text-zinc-400 flex justify-center">
        <div className="mt-[4px]">
          <span className="text-zinc-400">Routain : </span>
          {routain ? <span>{routain.name}</span> : <span>No use Routain.</span>}
        </div>
      </div>

      <div className="flex justify-center">
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

      <div className="flex justify-center">
        {routain ? (
          <RoutainController start={routainStart} stop={routainStop} />
        ) : (
          ""
        )}
      </div>

      <Modal
        isOpen={modalOn}
        header={modalHeader}
        body={modalBody}
        accept={acceptRef.current}
        close={() => {
          setModalOn(false);
        }}
      />
    </div>
  );
}
