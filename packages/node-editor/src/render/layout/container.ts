import { Bounds } from "../../math";

export class Container {
	bounds: Bounds = new Bounds();

	get x() {
		return this.bounds.x;
	}

	get y() {
		return this.bounds.y;
	}

	get width() {
		return this.bounds.w;
	}

	get height() {
		return this.bounds.h;
	}

	set x(x: number) {
		this.bounds.x = x;
	}

	set y(y: number) {
		this.bounds.y = y;
	}

	set width(w: number) {
		this.bounds.w = w;
	}

	set height(h: number) {
		this.bounds.h = h;
	}

	children: Container[] = [];

	append(...child: Container[]) {
		this.children.push(...child);
	}
}
