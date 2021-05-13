import { showError } from ".";
import { MotionFormData, Validator } from "../types";
import { validate } from "../validators";

export function getFormData(form: HTMLFormElement): { [pro: string]: number } {
  const values: { [prop: string]: number } = {};
  const inputs = form.querySelectorAll("input");
  inputs.forEach((input) => (values[input.name] = +input.value));
  return values;
}

export function validateFormValues(
  data: { [prop: string]: number },
  validators: { [prop: string]: Validator }
): MotionFormData {
  try {
    for (let key in data) {
      console.log(key);
      validate(key, data[key], validators[key]);
    }
    return data;
  } catch (err) {
    showError(err.message) ; 
  }
}
export function resetFormData(form: HTMLFormElement) {
  const inputs = form.querySelectorAll("input");
  inputs.forEach((input) => (input.value = "0"));
}
