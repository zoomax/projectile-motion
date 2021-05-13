import { getXDistance, getYDistance, showStatus } from "../helpers";
import { MotionFormData } from "../types";

export function render(
  element: HTMLElement,
  data: MotionFormData,
  timer: number
): boolean {
  const xDistance = getXDistance(data.distance, data.direction);
  const yDistance = getYDistance(data.distance, data.direction);
  const elementTop: number = +element.style.top.replace("px", "");
  const elementLeft: number = +element.style.left.replace("px", "");
  if (elementTop <= yDistance && elementLeft <= xDistance) {
    const newElementTop = elementTop + yDistance * (data.velocity / 10000);
    const newElementLeft = elementLeft + xDistance * (data.velocity / 10000);
    element.style.top = `${newElementTop}px`;
    element.style.left = `${newElementLeft}px`;
    showStatus({
      velocity: data.velocity,
      direction: data.direction,
      x_position: +newElementLeft.toFixed(2),
      y_position: +newElementTop.toFixed(2),
    });

    return false;
  }
  clearInterval(timer);
  return true;
}

