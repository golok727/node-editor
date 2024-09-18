import { Box2D, type Box2DData } from "./box2d";

export interface BoundData {
	minX: number;
	maxX: number;
	minY: number;
	maxY: number;
}

export class Bounds implements BoundData {
	minX: number;
	minY: number;
	maxX: number;
	maxY: number;

	constructor(
		minX = Infinity,
		minY = Infinity,
		maxX = -Infinity,
		maxY = -Infinity
	) {
		this.minX = minX;
		this.minY = minY;
		this.maxX = maxX;
		this.maxY = maxY;
	}

	private _rect = new Box2D();

	isEmpty(): boolean {
		return this.minX > this.maxX || this.minY > this.maxY;
	}

	extend(x0: number, y0: number, x1: number, y1: number) {
		if (x0 < this.minX) this.minX = x0;
		if (x1 < this.minX) this.minX = x1;

		if (y0 < this.minY) this.minY = y0;
		if (y1 < this.minY) this.minY = y1;

		if (x0 > this.maxX) this.maxX = x0;
		if (x1 > this.maxX) this.maxX = x1;

		if (y0 > this.maxY) this.maxY = y0;
		if (y1 > this.maxY) this.maxY = y1;

		return this;
	}

	addRect(rect: Box2DData) {
		this.extend(rect.x, rect.y, rect.x + rect.width, rect.y + rect.height);
		return this;
	}

	addBounds(bound: BoundData) {
		this.extend(bound.minX, bound.minY, bound.maxX, bound.maxY);
	}

	scale(x: number, y: number = x): this {
		this.minX *= x;
		this.minY *= y;
		this.maxX *= x;
		this.maxY *= y;

		return this;
	}

	clear(): this {
		this.minX = Infinity;
		this.minY = Infinity;
		this.maxX = -Infinity;
		this.maxY = -Infinity;

		return this;
	}

	get rect(): Box2D {
		const rect = this._rect;
		if (this.minX > this.maxX || this.minY > this.maxY) {
			rect.x = 0;
			rect.y = 0;
			rect.width = 0;
			rect.height = 0;
		} else {
			rect.x = this.minX;
			rect.y = this.minY;
			rect.width = this.maxX - this.minX;
			rect.height = this.maxY - this.minY;
		}

		return rect;
	}

	fit(rect: Box2D): this {
		if (this.minX < rect.left) this.minX = rect.left;
		if (this.maxX > rect.right) this.maxX = rect.right;

		if (this.minY < rect.top) this.minY = rect.top;
		if (this.maxY > rect.bottom) this.maxY = rect.bottom;

		return this;
	}

	fitBounds(left: number, right: number, top: number, bottom: number): this {
		if (this.minX < left) this.minX = left;
		if (this.maxX > right) this.maxX = right;

		if (this.minY < top) this.minY = top;
		if (this.maxY > bottom) this.maxY = bottom;

		return this;
	}

	pad(paddingX: number, paddingY: number = paddingX): this {
		this.minX -= paddingX;
		this.maxX += paddingX;

		this.minY -= paddingY;
		this.maxY += paddingY;

		return this;
	}

	ceil(): this {
		this.minX = Math.floor(this.minX);
		this.minY = Math.floor(this.minY);
		this.maxX = Math.ceil(this.maxX);
		this.maxY = Math.ceil(this.maxY);

		return this;
	}

	containsPoint(x: number, y: number): boolean {
		if (this.minX <= x && this.minY <= y && this.maxX >= x && this.maxY >= y) {
			return true;
		}

		return false;
	}

	/** Clones the bounds. */
	public clone(): Bounds {
		return new Bounds(this.minX, this.minY, this.maxX, this.maxY);
	}
}
