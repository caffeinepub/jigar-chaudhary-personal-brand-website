import { useState, useEffect } from 'react';

interface CountdownResult {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isLive: boolean;
}

export function useCountdown(targetDate: Date): CountdownResult {
  const calculate = (): CountdownResult => {
    const now = new Date().getTime();
    const target = targetDate.getTime();
    const diff = target - now;

    if (diff <= 0) {
      return { days: 0, hours: 0, minutes: 0, seconds: 0, isLive: true };
    }

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);

    return { days, hours, minutes, seconds, isLive: false };
  };

  const [countdown, setCountdown] = useState<CountdownResult>(calculate);

  useEffect(() => {
    const interval = setInterval(() => {
      setCountdown(calculate());
    }, 1000);
    return () => clearInterval(interval);
  }, [targetDate.getTime()]);

  return countdown;
}
