export interface View {
	paint(cx: CanvasRenderingContext2D): void;
}

export abstract class Container implements View {
	children: Container[] = [];

	abstract paint(cx: CanvasRenderingContext2D): void;

	append() {}
}
