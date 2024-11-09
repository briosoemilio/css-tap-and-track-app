import { useCallback, useEffect, useState } from "react";
import AsyncStorage from "src/lib/storage/storage";

type UseCountdownTimerReturn = {
  secondsLeft: string;
  isRunning: boolean;
  startTimer: (_startTime?: string) => void;
  stopTimer: () => void;
};

const useTimeLog = (): UseCountdownTimerReturn => {
  const INITIAL_DURATION = 60 * 60 * 3;
  const [secondsLeft, setSecondsLeft] = useState<number>(10800);
  const [isRunning, setIsRunning] = useState<boolean>(false);

  const formatTime = (seconds: number): string => {
    const hrs = String(Math.floor(seconds / 3600)).padStart(2, "0");
    const mins = String(Math.floor((seconds % 3600) / 60)).padStart(2, "0");
    const secs = String(seconds % 60).padStart(2, "0");
    return `${hrs}:${mins}:${secs}`;
  };

  useEffect(() => {
    const loadTimer = async () => {
      const savedStartTime = (await AsyncStorage.getItem(
        "time-in-log"
      )) as string;
      if (savedStartTime) {
        const startTime = new Date(savedStartTime).getTime();
        const currentTime = Date.now();
        const elapsedTime = Math.floor((currentTime - startTime) / 1000);
        const timeLeft = INITIAL_DURATION - elapsedTime;

        setSecondsLeft(timeLeft > 0 ? timeLeft : 0);
        setIsRunning(timeLeft > 0);
      }
    };
    loadTimer();
  }, []);

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (isRunning && secondsLeft > 0) {
      interval = setInterval(() => {
        setSecondsLeft((prev) => {
          if (prev <= 1) {
            clearInterval(interval);
            setIsRunning(false);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else if (secondsLeft <= 0) {
      setIsRunning(false);
    }

    return () => clearInterval(interval);
  }, [isRunning, secondsLeft]);

  const startTimer = useCallback(async (_startTime?: string) => {
    setIsRunning(true);
    const startTime = _startTime || new Date().toISOString();
    await AsyncStorage.setItem("time-in-log", startTime);
  }, []);

  const stopTimer = useCallback(async () => {
    setIsRunning(false);
    await AsyncStorage.removeItem("time-in-log");
  }, []);

  return {
    secondsLeft: formatTime(secondsLeft),
    isRunning,
    startTimer,
    stopTimer,
  };
};

export default useTimeLog;
