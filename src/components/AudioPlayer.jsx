import { useRef } from "react";

export default function AudioTest() {
  const audioRef = useRef(null); // <-- just null, no type

  return (
    <div className="p-4">
      <audio ref={audioRef} src="/songs/song1.mp3" preload="none" />
      <button
        onClick={() => audioRef.current?.play()}
        className="px-4 py-2 bg-blue-500 text-white rounded"
      >
        Play Song 1
      </button>
    </div>
  );
}
