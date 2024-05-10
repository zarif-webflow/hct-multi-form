"use strict";

const formSteps = Array.from(
  document.querySelectorAll(".contact-form-wrapper .form-step")
);
const nextButton = document.querySelector(".contact-form-wrapper .next-button");
const submitButton = document.querySelector(
  ".contact-form-wrapper .submit-button"
);
const previousButton = document.querySelector(
  ".contact-form-wrapper .prev-button"
);

const defaultNextButtonText = nextButton.textContent;

const setNextButton = (activate, isSubmit) => {
  if (isSubmit) {
    nextButton.style.display = "none";
    submitButton.style.display = "block";
    return;
  }

  nextButton.style.display = "block";
  submitButton.style.display = "none";

  if (activate && !nextButton.classList.contains("active")) {
    nextButton.classList.add("active");
    return;
  }
  if (!activate && nextButton.classList.contains("active")) {
    nextButton.classList.remove("active");
    return;
  }
};
const setPrevButton = (activate) => {
  if (activate && !previousButton.classList.contains("active")) {
    previousButton.classList.add("active");
  }
  if (!activate && previousButton.classList.contains("active")) {
    previousButton.classList.remove("active");
  }
};

const setFormStep = (stepIndex) => {
  for (let step of formSteps) {
    console.log(step.dataset.stepIndex);
    if (Number.parseInt(step.dataset.stepIndex) === stepIndex) {
      step.classList.remove("is-hidden");
    } else if (!step.classList.contains("is-hidden")) {
      step.classList.add("is-hidden");
    }
  }
  if (stepIndex === 1) {
    setPrevButton(false);
  } else {
    setPrevButton(true);
  }
  if (stepIndex < formSteps.length) {
    setNextButton(true);
  } else if (stepIndex === formSteps.length) {
    setNextButton(true, true);
  }
};

const getCurrentStep = () => {
  const currentStepEl = formSteps.find(
    (step) => !step.classList.contains("is-hidden")
  );
  const currentStepIndex = Number.parseInt(currentStepEl.dataset.stepIndex);

  return { index: currentStepIndex, element: currentStepEl };
};

const showStepMessage = (element, message) => {
  const textEl = element.querySelector(".text-alert");
  if (textEl.style.display !== "block") {
    textEl.style.display = "block";
  }
  if (message) {
    textEl.textContent = message;
  }
};

const removeStepMessage = (element) => {
  const textEl = element.querySelector(".text-alert");
  if (textEl.style.display !== "none") {
    textEl.style.display = "none";
  }
};

const goToNextStep = () => {
  const { index, element } = getCurrentStep();

  if (element.dataset.step === "email") {
    const inputEl = element.querySelector("input");
    const value = inputEl.value;
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    console.log(inputEl);

    if (!re.test(value)) {
      showStepMessage(element);
      setNextButton(false);
      inputEl.addEventListener("input", (e) => {
        if (re.test(e.target.value)) {
          removeStepMessage(element);
          setNextButton(true);
        } else {
          showStepMessage(element);
          setNextButton(false);
        }
      });
      return;
    }
  }

  if (element.dataset.step === "name") {
    const inputEl = element.querySelector("input");
    const value = inputEl.value;

    console.log(value, "NAME VALUE", value === "");

    if (value === "") {
      showStepMessage(element);
      setNextButton(false);
      inputEl.addEventListener("input", (e) => {
        if (e.target.value !== "") {
          removeStepMessage(element);
          setNextButton(true);
        } else {
          showStepMessage(element);
          setNextButton(false);
        }
      });
      return;
    }
  }
  setFormStep(index + 1);
};

const goToPreviousStep = () => {
  const { index } = getCurrentStep();
  setFormStep(index - 1);
};

console.log(formSteps);

nextButton.addEventListener("click", (e) => {
  if (!e.target.classList.contains("active")) return;
  goToNextStep();
});
previousButton.addEventListener("click", (e) => {
  if (!e.target.classList.contains("active")) return;
  goToPreviousStep();
});

setFormStep(1);
