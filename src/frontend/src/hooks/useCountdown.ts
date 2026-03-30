import { useEffect, useState } from "react";

interface CountdownResult {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isLive: boolean;
}

function calculateCountdown(targetTime: number): CountdownResult {
  const diff = targetTime - new Date().getTime();
  if (diff <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0, isLive: true };
  }
  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
    minutes: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
    seconds: Math.floor((diff % (1000 * 60)) / 1000),
    isLive: false,
  };
}

export function useCountdown(targetDate: Date): CountdownResult {
  const targetTime = targetDate.getTime();
  const [countdown, setCountdown] = useState<CountdownResult>(() =>
    calculateCountdown(targetTime),
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setCountdown(calculateCountdown(targetTime));
    }, 1000);
    return () => clearInterval(interval);
  }, [targetTime]);

  return countdown;
}
