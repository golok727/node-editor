import type { PointTuple, PointLike } from "./point";
import { Point } from "./point";

export type VecLike = PointLike;
export type VecTuple = PointTuple;

export class Vec2 extends Point {
	setLength(length: number) {
		this.normalize();

		this.x *= length;
		this.y *= length;

		return this;
	}

	add(other: VecLike) {
		this.x += other.x;
		this.y += other.y;
		return this;
	}

	add2(s: number) {
		this.x += s;
		this.y += s;
		return this;
	}

	sub(other: VecLike) {
		this.x -= other.x;
		this.y -= other.y;
		return this;
	}

	sub2(s: number) {
		this.x -= s;
		this.y -= s;
		return this;
	}

	mul(other: VecLike) {
		this.x *= other.x;
		this.y *= other.y;
		return this;
	}

	scale(s: number) {
		this.x *= s;
		this.y *= s;
		return this;
	}

	div(other: VecLike) {
		this.x /= other.x;
		this.y /= other.y;
		return this;
	}

	div2(s: number) {
		// todo may we add a warning in dev mode
		this.x /= s;
		this.y /= s;
		return this;
	}

	min(other: VecLike) {
		this.x = Math.min(this.x, other.x);
		this.y = Math.min(this.y, other.y);

		return this;
	}

	max(other: VecLike) {
		this.x = Math.max(this.x, other.x);
		this.y = Math.max(this.y, other.y);

		return this;
	}

	clamp(min: VecLike, max: VecLike) {
		this.x = Math.max(min.x, Math.min(max.x, this.x));
		this.y = Math.max(min.y, Math.min(max.y, this.y));

		return this;
	}

	clamp2(min: number, max: number) {
		this.x = Math.max(min, Math.min(max, this.x));
		this.y = Math.max(min, Math.min(max, this.y));

		return this;
	}

	floor() {
		this.x = Math.floor(this.x);
		this.y = Math.floor(this.y);
		return this;
	}

	round() {
		this.x = Math.round(this.x);
		this.y = Math.round(this.y);
		return this;
	}

	roundToZero() {
		this.x = Math.trunc(this.x);
		this.y = Math.trunc(this.y);

		return this;
	}

	ceil() {
		this.x = Math.ceil(this.x);
		this.y = Math.ceil(this.y);
		return this;
	}

	manhattanLength() {
		return Math.abs(this.x) + Math.abs(this.y);
	}

	mag() {
		return Math.hypot(this.x, this.y);
	}

	magSq() {
		return this.x * this.x + this.y * this.y;
	}

	heading(): number {
		return Math.atan2(this.y, this.x);
	}

	normalize() {
		const mag = Math.hypot(this.x, this.y);
		this.x /= mag;
		this.y /= mag;
		return this;
	}

	dot(other: VecLike): number {
		return this.x * other.x + this.y * other.y;
	}

	cross(other: VecLike): number {
		return this.x * other.y - this.y * other.x;
	}

	negate() {
		this.x = -this.x;
		this.y = -this.y;

		return this;
	}

	lerp(v: VecLike, t: number) {
		this.x += (v.x - this.x) * t;
		this.y += (v.y - this.y) * t;

		return this;
	}

	rotateAround(center: VecLike, angle: number) {
		const c = Math.cos(angle),
			s = Math.sin(angle);

		const x = this.x - center.x;
		const y = this.y - center.y;

		this.x = x * c - y * s + center.x;
		this.y = x * s + y * c + center.y;

		return this;
	}

	override clone() {
		return new Vec2(this.x, this.y);
	}

	static lerp(v1: VecLike, v2: VecLike, t: number) {
		const x = v1.x + (v2.x - v1.x) * t;
		const y = v1.y + (v2.y - v1.y) * t;
		return new Vec2(x, y);
	}

	*[Symbol.iterator]() {
		yield this.x;
		yield this.y;
	}

	static from(x: number, y: number): Vec2;
	static from(xy: number): Vec2;

	static from(v: VecTuple): Vec2;
	static from(v: Vec2): Vec2;
	static from(
		...args: [x: number, y: number] | [xy: number] | [v: VecTuple] | [v: Vec2]
	): Vec2 {
		if (Array.isArray(args[0])) {
			return new Vec2(args[0][0], args[0][0]);
		} else if (args[0] instanceof Vec2) {
			return args[0].clone();
		}

		const [x, y] = args;
		if (y === undefined) {
			return new Vec2(x, x);
		}

		return new Vec2(x, y);
	}

	static angle(a: Vec2, b: Vec2) {
		return Math.acos(a.dot(b) / (a.mag() * b.mag()));
	}

	static one(): Vec2 {
		return new Vec2(1, 1);
	}

	static zero(): Vec2 {
		return new Vec2();
	}

	static random() {
		return new Vec2(Math.random(), Math.random());
	}

	static randomInRange(minX: number, maxX: number, minY: number, maxY: number) {
		const x = Math.random() * (maxX - minX) + minX;
		const y = Math.random() * (maxY - minY) + minY;
		return new Vec2(x, y);
	}

	static like(x: number = 0, y: number = 0): VecLike {
		const v = Object.create(null) as VecLike;
		v.x = x;
		v.y = y;
		return v;
	}
}
