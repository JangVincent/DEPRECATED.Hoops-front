import { useEffect, useRef, useState } from "react";

export default function RoutainVisualizer({ atom, flag, atomNext }) {
  // 타이머를 비주얼라이저가 담당하도록 개발할 것
  const [time, setTime] = useState(0);
  const [timeWidth, setTimeWidth] = useState(0);
  let timeRef = useRef(0);
  let timeWidthTemp = 0;

  // 초를 분:초 스트링으로 만들어줌
  const convertTimeString = (duration, unit) => {
    let front = null;
    let remainSec = null;
    let returnString = "00:00";
    // 단위가 분
    if (unit == "m") {
      front = parseInt(duration / 1).toString();
      remainSec = (duration % 1) * 60;
      returnString =
        (front < 10 ? "0" + front : front) +
        ":" +
        (remainSec < 10 ? "0" + remainSec : remainSec);
    } else {
      // 단위가 초
      front = duration > 59 ? parseInt(duration / 60).toString() : 0;
      remainSec = duration - front * 60;
      returnString =
        (front < 10 ? "0" + front : front) +
        ":" +
        (remainSec < 10 ? "0" + remainSec : remainSec);
    }

    return returnString;
  };

  // 아톰의 duration 만큼 시간이 지났는지 판별
  const timeJudge = () => {
    if (timeRef.current === atom.duration * 60) atomNext();
  };

  // 초+1 및 Progress bar 업데이트
  const updateTime = () => {
    timeRef.current++;
    setTime(timeRef.current);

    timeWidthTemp = ((timeRef.current / (atom.duration * 60)) * 288).toFixed();
    setTimeWidth(timeWidthTemp);
  };

  useEffect(() => {
    console.log("Timer Init");

    let T = null;
    if (flag) {
      console.log("Timer Started");
      T = setInterval(() => {
        updateTime();
        timeJudge();
      }, 1000);
    } else {
      console.log("Timer Stopped");
      clearInterval(T);
      setTime(0);
      setTimeWidth(0);
    }

    return () => {
      console.log("Timer Distroyed");
      clearInterval(T);
      timeRef.current = 0;
      setTimeWidth(0);
    };
  }, [flag, atom]);

  return (
    <div className="flex inline-block lg:flex-grow">
      <div
        id="progress-outer"
        className="flex inline-block bg-zinc-400 h-1 w-72 mt-2.5 ml-2"
      >
        <div
          id="progress-inner"
          className="h-1 bg-red-700"
          style={{ width: timeWidth + "px" }}
        ></div>
      </div>
      <div id="time-wrapper" className="inline-block text-bold ml-5">
        <span className="text-white">{atom.text}</span>
        <span id="play-time" className="text-white ml-3">
          {convertTimeString(time, "s")}
        </span>
        <span id="time-divider" className="text-white mx-2">
          /
        </span>
        <span id="duration-time" className="text-white">
          {convertTimeString(atom.duration, "m")}
        </span>
      </div>
    </div>
  );
}
