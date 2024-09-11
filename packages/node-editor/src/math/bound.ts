import { z } from "zod";

export interface BoundData {
	x: number;
	y: number;
	width: number;
	height: number;
	rotate?: number;
}

export class Bounds implements BoundData {
	// [x, y, w, h, ?rotate]
	static schema = z.tuple([
		z.number(),
		z.number(),
		z.number(),
		z.number(),
		z.number().optional(),
	]);

	x: number;
	y: number;
	width: number;
	height: number;
	rotate?: number;

	constructor(
		x: number = 0,
		y: number = 0,
		w: number = 0,
		h: number = 0,
		rotate?: number
	) {
		this.x = x;
		this.y = y;
		this.width = w;
		this.height = h;
		this.rotate = rotate;
	}

	set(
		x: number = this.x,
		y: number = this.y,
		w: number = this.width,
		h: number = this.height
	) {
		this.x = x;
		this.y = y;
		this.width = w;
		this.height = h;
	}

	public serialize() {
		return JSON.stringify([this.x, this.y, this.width, this.height]);
	}

	static deserialize(data: string) {
		return new Bounds(...Bounds.schema.parse(JSON.parse(data)));
	}
}
