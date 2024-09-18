import type { RenderPipe } from "../render-pipe";
import type { Renderer } from "../renderer";
import type { Gfx } from "./graphics";

export class GraphicsPipeline implements RenderPipe<Gfx> {
	static PIPE_NAME = "$$_GRAPHICS_$$";

	constructor(protected renderer: Renderer) {}

	begin(): void {
		throw new Error("Method not implemented.");
	}

	end(): void {
		throw new Error("Method not implemented.");
	}

	paint(_renderer: Renderer, _renderable: Gfx): void {
		const cx = _renderer.cx;
		_renderable.context.instructions.forEach((i) => {
			if (i.type === "fill") {
				cx.fillStyle = i.props.fillStyles.color;
				cx.fill(i.props.path.path2D);
			} else {
				cx.strokeStyle = i.props.strokeStyles.color;
				cx.stroke(i.props.path.path2D);
			}
		});
	}

	init(): void {}
}
