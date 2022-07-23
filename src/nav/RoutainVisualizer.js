export default function RoutainVisualizer({ atom, flag }) {
  // 타이머를 비주얼라이저가 담당하도록 개발할 것
  console.log(atom, flag);

  const convertTimeString = (duration) => {
    let front = parseInt(duration / 1).toString();
    let remainSec = (duration % 1) * 60;
    return front + ":" + (remainSec < 10 ? "0" + remainSec : remainSec);
  };

  return (
    <div className="flex inline-block lg:flex-grow">
      <div
        id="progress-outer"
        className="flex inline-block bg-zinc-400 h-1 w-72 mt-2.5 ml-2"
      >
        <div id="progress-inner" className="bg-red-900 w-[{}] h-1"></div>
      </div>
      <div id="time-wrapper" className="inline-block text-bold ml-5">
        <span className="text-white">{atom.text}</span>
        <span id="play-time" className="text-white ml-3">
          {convertTimeString(second)}
        </span>
        <span id="time-divider" className="text-white mx-2">
          /
        </span>
        <span id="duration-time" className="text-white">
          {convertTimeString(atom.duration)}
        </span>
      </div>
    </div>
  );
}
