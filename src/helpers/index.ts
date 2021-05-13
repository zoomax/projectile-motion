import { Status, Unit } from "../types";
export function getXDistance(distance: number, angle: number): number {
  if (angle == 0) return distance;
  if (angle == 90) return 0;
  const slop = Math.cos(getAngleInRadiant(angle));
  return distance * slop;
}

export function getYDistance(distance: number, angle: number): number {
  if (angle == 90) return distance;
  if (angle == 0) return 0;
  const slop = Math.sin(getAngleInRadiant(angle));
  return distance * slop;
}

export function positionLogger(
  element: HTMLElement,
  value: string | number
): void {
  element.innerHTML = `${value}`;
}

export function getAngleInRadiant(angle: number): number {
  return (Math.PI / 180) * angle;
}

export function getUnit(unitType: string): string {
  switch (unitType) {
    case "velocity":
      return Unit.VELOCITY;
    case "distance":
      return Unit.DISTANCE;
    case "direction":
      return Unit.ANGLE;
    default:
      return unitType;
  }
}

export function showStatus(status: Status): void {
  const x_pos: HTMLElement = document.getElementById("show-x-pos");
  const y_pos: HTMLElement = document.getElementById("show-y-pos");
  const direction: HTMLElement = document.getElementById("show-direction");
  const velocity: HTMLElement = document.getElementById("show-velocity");
  positionLogger(x_pos, status.x_position);
  positionLogger(y_pos, status.y_position);
  positionLogger(direction, status.direction);
  positionLogger(velocity, status.velocity);
}

export function showError(error: string) {
  const errorElement: HTMLElement = document.querySelector(".show-error");
  errorElement.style.display = "block";
  errorElement.innerHTML = `<p>${error}</p>`;
  setTimeout(() => {
    errorElement.style.display = "none";
  }, 3000);
}
