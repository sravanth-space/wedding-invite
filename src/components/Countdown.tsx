import { useEffect, useState } from "react";

type CountdownProps = {
  targetDateTime: string;
};

type CountdownTime = {
  day: number;
  hour: string;
  minute: string;
  second: string;
};

export default function Countdown({ targetDateTime }: CountdownProps) {
  const calculate = (): CountdownTime => {
    const target = new Date(targetDateTime).getTime();
    const now = Date.now();
    const distance = target - now;

    if (distance <= 0) {
      return { day: 0, hour: "00", minute: "00", second: "00" };
    }

    const day = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hour = String(
      Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
    ).padStart(2, "0");
    const minute = String(
      Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
    ).padStart(2, "0");
    const second = String(Math.floor((distance % (1000 * 60)) / 1000)).padStart(
      2,
      "0",
    );

    return { day, hour, minute, second };
  };

  const [time, setTime] = useState<CountdownTime>(calculate);

  useEffect(() => {
    const id = window.setInterval(() => {
      setTime(calculate());
    }, 1000);

    return () => {
      window.clearInterval(id);
    };
  }, [targetDateTime]);

  return (
    <div className="border rounded-pill shadow py-2 px-4 mt-2 mb-4 countdown-shell">
      <div className="row justify-content-center" id="count-down">
        <div className="col-3 p-1">
          <h2 className="d-inline m-0 p-0">{time.day}</h2>
          <small>Day</small>
        </div>
        <div className="col-3 p-1">
          <h2 className="d-inline m-0 p-0">{time.hour}</h2>
          <small>Hours</small>
        </div>
        <div className="col-3 p-1">
          <h2 className="d-inline m-0 p-0">{time.minute}</h2>
          <small>Minutes</small>
        </div>
        <div className="col-3 p-1">
          <h2 className="d-inline m-0 p-0">{time.second}</h2>
          <small>Seconds</small>
        </div>
      </div>
    </div>
  );
}