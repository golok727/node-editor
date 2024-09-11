import { Bounds } from "../../math";

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
