import type { PipeLine } from "../pipeline";
import type { Renderer } from "../renderer";
import type { Gfx } from "./graphics";

export class GraphicsPipeline implements PipeLine<Gfx> {
	static PIPE_NAME = "$$_GRAPHICS_$$";

	constructor(protected renderer: Renderer) {}

	paint(_cx: CanvasRenderingContext2D, _renderable: Gfx): void {
		throw new Error("Method not implemented.");
	}

	init(): void {}
}
