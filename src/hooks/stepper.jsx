import { useState } from "react";

export function useStepper({ dataArray }) {
  const [currentStepperIndex, setCurrentStepperIndex] = useState(0);

  const goToNextStep = () =>
    setCurrentStepperIndex((prev) =>
      prev === dataArray.length - 1 ? prev : prev + 1
    );
  const goToPreviousStep = () =>
    setCurrentStepperIndex((prev) => (prev <= 0 ? prev : prev - 1));
  const goToStep = (index) => setCurrentStepperIndex(index);

  return {
    currentStepperIndex,
    goToStep,
    goToNextStep,
    goToPreviousStep,
  };
}
