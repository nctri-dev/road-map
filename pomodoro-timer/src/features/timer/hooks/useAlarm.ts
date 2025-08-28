import { useEffect, useRef } from "react";
import alarmSound from "@/assets/alarm.mp3";

const useAlarm = () => {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  if (audioRef.current === null) audioRef.current = new Audio(alarmSound);

  const play = () => {
    if (audioRef.current)
      audioRef.current.play().catch((error) => {
        console.error("Failed to play sound: ", error);
      });
  };

  useEffect(() => {
    const stopAlarm = () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
      }
    };

    document.body.addEventListener("click", stopAlarm);

    return () => document.body.removeEventListener("click", stopAlarm);
  }, []);

  return { play };
};

export default useAlarm;
