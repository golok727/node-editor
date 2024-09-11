import { z } from "zod";

export class Bounds {
	// [x, y, w, h]
	static schema = z.tuple([z.number(), z.number(), z.number(), z.number()]);

	x: number;
	y: number;
	width: number;
	height: number;

	constructor(x: number = 0, y: number = 0, w: number = 0, h: number = 0) {
		this.x = x;
		this.y = y;
		this.width = w;
		this.height = h;
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

export interface View {
	bounds: Bounds;
	paint(cx: CanvasRenderingContext2D): void;
}

export class Container {
	bounds: Bounds = new Bounds();

	children: View[] = [];

	append(...child: View[]) {
		this.children.push(...child);
	}
}
