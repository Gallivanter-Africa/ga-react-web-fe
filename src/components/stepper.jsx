/* eslint-disable react/prop-types */
import React, { useState } from "react";
import { FaFlagCheckered } from "react-icons/fa";

export default function Stepper({ currentStep, numberOfSteps }) {
  const activeColor = (index) =>
    currentStep >= index ? "bg-blue-500" : "bg-gray-300";

  const activeTextColor = (index) =>
    currentStep >= index ? "text-blue-500" : "text-gray-300";

  const activeborderColor = (index) =>
    currentStep >= index ? "border-blue-500" : "border-gray-300";

  const isFinalStep = (index) => index === numberOfSteps - 1;

  return (
    <div className="flex items-center">
      {Array.from({ length: numberOfSteps }).map((_, index) => (
        <React.Fragment key={index}>
          <div
            className={`w-8 h-8 flex items-center justify-center rounded-full border ${activeborderColor(
              index
            )}`}
          >
            <FaFlagCheckered className={`${activeTextColor(index)}`} />
          </div>
          {isFinalStep(index) ? null : (
            <div className={`w-12 h-1 ${activeColor(index)}`}></div>
          )}
        </React.Fragment>
      ))}
    </div>
  );
}
