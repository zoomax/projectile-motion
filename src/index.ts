import { showStatus } from "./helpers";
import {
  getFormData,
  resetFormData,
  validateFormValues,
} from "./helpers/forms";
import { render } from "./services";

//elemets
const boxElement: HTMLElement = document.getElementById("box");
const resetElement: HTMLElement = document.getElementById("reset");
const lunchElement: HTMLElement = document.getElementById("lunch");
const motionDataForm: HTMLFormElement = <HTMLFormElement>(
  document.getElementById("form")
);

// lunching app
motionDataForm.addEventListener("submit", handleLunch);
// reset values
resetElement.addEventListener("click", handleReset);
//event handlers
function handleReset(e: Event): void {
  e.preventDefault();
  boxElement.style.left = "0px";
  boxElement.style.top = "0px";
  resetFormData(motionDataForm);
  showStatus({
    velocity: 0,
    x_position: 0,
    y_position: 0,
    direction: 0,
  });
}

function handleLunch(e: Event) {
  e.preventDefault();
  const formData = validateFormValues(getFormData(motionDataForm), {
    velocity: {
      min: 100,
      max: 1000,
    },
    direction: {
      min: 0,
      max: 90,
    },
    distance: {
      min: 0,
      max: 800,
    },
  });
  if (formData) {
    lunchElement.setAttribute("disabled", "true");
    const id = setInterval(() => {
      const isRendering: boolean = !render(boxElement, formData, +id);
      if (!isRendering) {
        lunchElement.removeAttribute("disabled");
      }
    }, 5);
  }
}
