export interface Validator {
  min?: number;
  max?: number;
  isPositive?: boolean;
}
export enum Unit {
  VELOCITY = "px/ms",
  ANGLE = "deg",
  DISTANCE = "px",
}
export interface Status {
  x_position: number;
  y_position: number;
  direction: number;
  velocity: number;
}
export interface MotionFormData {
  velocity?: number;
  distance?: number;
  direction?: number;
}
