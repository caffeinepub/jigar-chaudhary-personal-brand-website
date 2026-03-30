import { useEffect, useRef, useState } from "react";
import { useInView } from "../hooks/useInView";

interface CounterAnimationProps {
  target: number;
  duration?: number;
  suffix?: string;
  prefix?: string;
  className?: string;
}

export default function CounterAnimation({
  target,
  duration = 2000,
  suffix = "",
  prefix = "",
  className = "",
}: CounterAnimationProps) {
  const [count, setCount] = useState(0);
  const [ref, isInView] = useInView<HTMLSpanElement>({
    once: true,
    rootMargin: "-50px",
  });
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (!isInView || hasAnimated.current) return;
    hasAnimated.current = true;

    const startTime = performance.now();

    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out cubic
      const eased = 1 - (1 - progress) ** 3;
      const current = Math.round(target * eased);
      setCount(current);

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [isInView, target, duration]);

  return (
    <span ref={ref} className={className}>
      {prefix}
      {count.toLocaleString()}
      {suffix}
    </span>
  );
}
