import type { RenderPipe } from "../render-pipe";
import type { Renderer } from "../renderer";
import type { Gfx } from "./graphics";

export class GraphicsPipeline implements RenderPipe<Gfx> {
	static PIPE_NAME = "$$_GRAPHICS_$$";

	constructor(protected renderer: Renderer) {}

	paint(_cx: CanvasRenderingContext2D, _renderable: Gfx): void {
		throw new Error("Method not implemented.");
	}

	init(): void {}
}
