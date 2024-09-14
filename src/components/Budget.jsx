import React from "react";
import ProgressBar from "./ProgressBar";
import { calculateProgress } from "@/utility/utils";

export default function Budget({ budget }) {
  const progressPercentage = calculateProgress(budget[1],budget.slice(3))
  // console.log(budget);
  console.log(progressPercentage);
  return (
    <div className="bg-white h-fit p-10">
      {
        <div className="relative flex items-center">
          <span
            style={{ backgroundColor: budget[2] }}
            className={`left-0 h-4 w-4 rounded-full mr-2`}
          ></span>{" "}
          <b>{budget[0][0].toUpperCase() + budget[0].slice(1)}</b>
        </div>
      }
      <div className="my-5 text-sm text-LabelColor">
        Minimum of ${budget[1]}{" "}
      </div>
      {
        budget.length > 3
        ?
        <div>
        <ProgressBar bgColor={budget[2]} progress={progressPercentage} />
      </div>
        :
        <></>
      }
     
    </div>
  );
}
