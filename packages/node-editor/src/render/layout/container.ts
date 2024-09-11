import { Bounds } from "../../math";

export type ContainerChildren = Container;
export class Container<Children extends Container = ContainerChildren> {
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

	parent: Container | null = null;

	children: Children[] = [];

	append(...children: Children[]) {
		for (const child of children) {
			child.parent = this;
			this.children.push(child);
		}
	}
}
