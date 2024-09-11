export interface PointLike {
	x: number;
	y: number;
}

export type PointTuple = [x: number, y: number];

export interface IPoint extends PointLike {
	clone(): IPoint;
	copyFrom(src: IPoint): IPoint;
	copyTo(dest: IPoint): IPoint;
	equals(other: IPoint): boolean;
	set(x?: number, y?: number): IPoint;
	setX(x: number): IPoint;
	setY(y: number): IPoint;
	toArray(): PointTuple;
}

export class Point implements IPoint {
	constructor(public x: number = 0, public y: number = 0) {}

	clone() {
		return new Point(this.x, this.y);
	}

	copyFrom(src: IPoint) {
		this.x = src.x;
		this.y = src.y;
		return this;
	}

	copyTo(dest: IPoint) {
		dest.x = this.x;
		dest.y = this.y;
		return this;
	}

	equals(other: IPoint): boolean {
		return this.x === other.x && this.y === other.y;
	}

	set(x?: number, y?: number) {
		if (x !== undefined) this.x = x;
		if (y !== undefined) this.y = y;
		return this;
	}

	setX(x: number) {
		this.x = x;
		return this;
	}

	setY(y: number) {
		this.y = y;
		return this;
	}

	toArray(): PointTuple {
		return [this.x, this.y];
	}

	toString() {
		return `[ [math]: ${this.constructor.name} = { x: ${this.x}, y: ${this.y} } ]`;
	}
}
