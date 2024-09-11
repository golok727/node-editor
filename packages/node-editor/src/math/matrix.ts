import { TAU } from "./constants";
import { Point, type PointLike } from "./point";

export interface Transformable {
	position: PointLike;
	scale: PointLike;
	pivot: PointLike;
	skew: PointLike;
	rotation: number;
}
/**
 * ```ts
 * | a | c | tx|
 * | b | d | ty|
 * | 0 | 0 | 1 |
 * ```
 */
export class Matrix {
	/**
	 * x scale
	 */
	public a: number;

	/**
	 * y skew
	 */
	public b: number;

	/**
	 * x skew
	 */
	public c: number;

	/**
	 * y scale
	 */
	public d: number;

	/**
	 * x translation
	 */
	public tx: number;

	/**
	 * y translation
	 */
	public ty: number;

	/**
	 * @param a - x scale
	 * @param b - y skew
	 * @param c - x skew
	 * @param d - y scale
	 * @param tx - x translation
	 * @param ty - y translation
	 */
	constructor(a = 1, b = 0, c = 0, d = 1, tx = 0, ty = 0) {
		this.a = a;
		this.b = b;
		this.c = c;
		this.d = d;
		this.tx = tx;
		this.ty = ty;
	}

	public append(matrix: Matrix): this {
		const a1 = this.a;
		const b1 = this.b;
		const c1 = this.c;
		const d1 = this.d;

		this.a = matrix.a * a1 + matrix.b * c1;
		this.b = matrix.a * b1 + matrix.b * d1;
		this.c = matrix.c * a1 + matrix.d * c1;
		this.d = matrix.c * b1 + matrix.d * d1;

		this.tx = matrix.tx * a1 + matrix.ty * c1 + this.tx;
		this.ty = matrix.tx * b1 + matrix.ty * d1 + this.ty;

		return this;
	}

	public appendFrom(a: Matrix, b: Matrix): this {
		const a1 = a.a;
		const b1 = a.b;
		const c1 = a.c;
		const d1 = a.d;
		const tx = a.tx;
		const ty = a.ty;

		const a2 = b.a;
		const b2 = b.b;
		const c2 = b.c;
		const d2 = b.d;

		this.a = a1 * a2 + b1 * c2;
		this.b = a1 * b2 + b1 * d2;
		this.c = c1 * a2 + d1 * c2;
		this.d = c1 * b2 + d1 * d2;
		this.tx = tx * a2 + ty * c2 + b.tx;
		this.ty = tx * b2 + ty * d2 + b.ty;

		return this;
	}

	public apply<TPoint extends PointLike = Point>(
		pos: PointLike,
		out?: TPoint
	): TPoint {
		out = (out || new Point()) as TPoint;
		const x = pos.x;
		const y = pos.y;

		out.x = this.a * x + this.c * y + this.tx;
		out.y = this.b * x + this.d * y + this.ty;

		return out;
	}

	public applyInverse<TPoint extends PointLike = Point>(
		pos: PointLike,
		out?: TPoint
	): TPoint {
		out = (out || new Point()) as TPoint;

		const a = this.a;
		const b = this.b;
		const c = this.c;
		const d = this.d;
		const tx = this.tx;
		const ty = this.ty;

		const id = 1 / (a * d + c * -b);

		const x = pos.x;
		const y = pos.y;

		out.x = d * id * x + -c * id * y + (ty * c - tx * d) * id;
		out.y = a * id * y + -b * id * x + (-ty * a + tx * b) * id;

		return out;
	}

	public clone(): Matrix {
		const matrix = new Matrix();

		matrix.a = this.a;
		matrix.b = this.b;
		matrix.c = this.c;
		matrix.d = this.d;
		matrix.tx = this.tx;
		matrix.ty = this.ty;

		return matrix;
	}

	public copyFrom(m: Matrix): this {
		this.a = m.a;
		this.b = m.b;
		this.c = m.c;
		this.d = m.d;
		this.tx = m.tx;
		this.ty = m.ty;

		return this;
	}

	public copyTo(m: Matrix): Matrix {
		m.a = this.a;
		m.b = this.b;
		m.c = this.c;
		m.d = this.d;
		m.tx = this.tx;
		m.ty = this.ty;

		return m;
	}

	public decompose(transform: Transformable): Transformable {
		const a = this.a;
		const b = this.b;
		const c = this.c;
		const d = this.d;
		const pivot = transform.pivot;

		const skewX = -Math.atan2(-c, d);
		const skewY = Math.atan2(b, a);

		const delta = Math.abs(skewX + skewY);

		if (delta < 0.00001 || Math.abs(TAU - delta) < 0.00001) {
			transform.rotation = skewY;
			transform.skew.x = transform.skew.y = 0;
		} else {
			transform.rotation = 0;
			transform.skew.x = skewX;
			transform.skew.y = skewY;
		}

		transform.scale.x = Math.sqrt(a * a + b * b);
		transform.scale.y = Math.sqrt(c * c + d * d);

		transform.position.x = this.tx + (pivot.x * a + pivot.y * c);
		transform.position.y = this.ty + (pivot.x * b + pivot.y * d);

		return transform;
	}

	public equals(matrix: Matrix) {
		return (
			matrix.a === this.a &&
			matrix.b === this.b &&
			matrix.c === this.c &&
			matrix.d === this.d &&
			matrix.tx === this.tx &&
			matrix.ty === this.ty
		);
	}

	public fromArray(array: number[]): void {
		this.a = array[0];
		this.b = array[1];
		this.c = array[3];
		this.d = array[4];
		this.tx = array[2];
		this.ty = array[5];
	}

	public identity(): this {
		this.a = 1;
		this.b = 0;
		this.c = 0;
		this.d = 1;
		this.tx = 0;
		this.ty = 0;

		return this;
	}

	public invert(): this {
		const a1 = this.a;
		const b1 = this.b;
		const c1 = this.c;
		const d1 = this.d;
		const tx1 = this.tx;
		const n = a1 * d1 - b1 * c1;

		this.a = d1 / n;
		this.b = -b1 / n;
		this.c = -c1 / n;
		this.d = a1 / n;
		this.tx = (c1 * this.ty - d1 * tx1) / n;
		this.ty = -(a1 * this.ty - b1 * tx1) / n;

		return this;
	}

	public isIdentity(): boolean {
		return (
			this.a === 1 &&
			this.b === 0 &&
			this.c === 0 &&
			this.d === 1 &&
			this.tx === 0 &&
			this.ty === 0
		);
	}

	public prepend(matrix: Matrix): this {
		const tx1 = this.tx;

		if (matrix.a !== 1 || matrix.b !== 0 || matrix.c !== 0 || matrix.d !== 1) {
			const a1 = this.a;
			const c1 = this.c;

			this.a = a1 * matrix.a + this.b * matrix.c;
			this.b = a1 * matrix.b + this.b * matrix.d;
			this.c = c1 * matrix.a + this.d * matrix.c;
			this.d = c1 * matrix.b + this.d * matrix.d;
		}

		this.tx = tx1 * matrix.a + this.ty * matrix.c + matrix.tx;
		this.ty = tx1 * matrix.b + this.ty * matrix.d + matrix.ty;

		return this;
	}

	public rotate(angle: number): this {
		const cos = Math.cos(angle);
		const sin = Math.sin(angle);

		const a1 = this.a;
		const c1 = this.c;
		const tx1 = this.tx;

		this.a = a1 * cos - this.b * sin;
		this.b = a1 * sin + this.b * cos;
		this.c = c1 * cos - this.d * sin;
		this.d = c1 * sin + this.d * cos;
		this.tx = tx1 * cos - this.ty * sin;
		this.ty = tx1 * sin + this.ty * cos;

		return this;
	}

	public scale(x: number, y: number): this {
		this.a *= x;
		this.d *= y;
		this.c *= x;
		this.b *= y;
		this.tx *= x;
		this.ty *= y;

		return this;
	}

	public set(
		a: number,
		b: number,
		c: number,
		d: number,
		tx: number,
		ty: number
	): this {
		this.a = a;
		this.b = b;
		this.c = c;
		this.d = d;
		this.tx = tx;
		this.ty = ty;

		return this;
	}

	public setTransform(
		x: number,
		y: number,
		pivotX: number,
		pivotY: number,
		scaleX: number,
		scaleY: number,
		rotation: number,
		skewX: number,
		skewY: number
	): this {
		this.a = Math.cos(rotation + skewY) * scaleX;
		this.b = Math.sin(rotation + skewY) * scaleX;
		this.c = -Math.sin(rotation - skewX) * scaleY;
		this.d = Math.cos(rotation - skewX) * scaleY;

		this.tx = x - (pivotX * this.a + pivotY * this.c);
		this.ty = y - (pivotX * this.b + pivotY * this.d);

		return this;
	}

	public toArray(
		transpose?: boolean,
		array = new Float32Array(9)
	): Float32Array {
		if (transpose) {
			array[0] = this.a;
			array[1] = this.b;
			array[2] = 0;
			array[3] = this.c;
			array[4] = this.d;
			array[5] = 0;
			array[6] = this.tx;
			array[7] = this.ty;
			array[8] = 1;
		} else {
			array[0] = this.a;
			array[1] = this.c;
			array[2] = this.tx;
			array[3] = this.b;
			array[4] = this.d;
			array[5] = this.ty;
			array[6] = 0;
			array[7] = 0;
			array[8] = 1;
		}

		return array;
	}

	public translate(x: number, y: number): this {
		this.tx += x;
		this.ty += y;

		return this;
	}

	public toString(): string {
		return `[[ @rei/akari/math::Matrix a=${this.a} b=${this.b} c=${this.c} d=${this.d} tx=${this.tx} ty=${this.ty} ]]`;
	}

	static ortho(
		left: number,
		right: number,
		bottom: number,
		top: number
	): Matrix {
		const a = 2 / (right - left); // x scale
		const b = 0; // y skew
		const c = 0; // x skew
		const d = 2 / (top - bottom); // y scale
		const tx = -(right + left) / (right - left); // x translation
		const ty = -(top + bottom) / (top - bottom); // y translation

		return new Matrix(a, b, c, d, tx, ty);
	}
}
