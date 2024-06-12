import { useState, useEffect } from "preact/hooks";

const calculateTimeLeft = () => {
  const difference = +new Date("2024-12-08T16:00:00") - +new Date();

  let timeLeft: {
    days?: number;
    hours?: number;
    minutes?: number;
    seconds?: number;
  } = {};

  if (difference > 0) {
    timeLeft = {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / 1000 / 60) % 60),
      seconds: Math.floor((difference / 1000) % 60),
    };
  }

  return timeLeft;
};

export default function Countdown() {
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div>
      <div className="grid gap-2 grid-cols-4 sm:gap-4 sm:grid-cols-4">
        <div className="flex flex-col items-center justify-center space-y-1">
          <strong className="text-2xl font-semibold leading-none md:text-4xl">
            {timeLeft.days || "0"}
          </strong>
          <span className="text-xs font-medium tracking-wide uppercase sm:text-sm/95">
            Days
          </span>
        </div>
        <div className="flex flex-col items-center justify-center space-y-1">
          <strong className="text-2xl font-semibold leading-none md:text-4xl">
            {timeLeft.hours || "0"}
          </strong>
          <span className="text-xs font-medium tracking-wide uppercase sm:text-sm/95">
            Hours
          </span>
        </div>
        <div className="flex flex-col items-center justify-center space-y-1">
          <strong className="text-2xl font-semibold leading-none md:text-4xl">
            {timeLeft.minutes || "0"}
          </strong>
          <span className="text-xs font-medium tracking-wide uppercase sm:text-sm/95">
            Minutes
          </span>
        </div>
        <div className="flex flex-col items-center justify-center space-y-1">
          <strong className="text-2xl font-semibold leading-none md:text-4xl">
            {timeLeft.seconds || "0"}
          </strong>
          <span className="text-xs font-medium tracking-wide uppercase sm:text-sm/95">
            Seconds
          </span>
        </div>
      </div>
    </div>
  );
}
