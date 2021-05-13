import { Validator } from "../types";
import { getUnit } from "../helpers";
export function getValue(
  property: string,
  element: HTMLInputElement,
  validator: Validator
): number {
  return validate(property, +element.value, validator);
}
//validatores

export function validate(
  property: string,
  value: number,
  validator: Validator
): number  {
  const unit = getUnit(property);
  const { min, max } = validator;
  if (min > value || value > max) {
    throw new Error(
      `${property} must be in between ${min}${unit} and ${max}${unit}`
    );
  }
  return value;
}
