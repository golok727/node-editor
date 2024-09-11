import { DEG_TO_RAD, RAD_TO_DEG } from "./constants";

export function clamp(v: number, min: number, max: number): number {
	if (v <= min) return min;
	else if (v >= max) return max;
	return v;
}

export function lerp(a: number, b: number, t: number) {
	return a + (b - a) * t;
}

export function radToDeg(rad: number) {
	return rad * RAD_TO_DEG;
}

export function degToRad(deg: number) {
	return deg * DEG_TO_RAD;
}
