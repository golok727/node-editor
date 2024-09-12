import { Container, type View } from "../../layout";
import { Bounds, type PointLike } from "../../math";
import type { Renderer } from "../../renderer";

// todo complete this
// a custom render container to have custom rendering logic
// you should add CustomRenderPipe to the render to use this
export class CustomRenderContainer extends Container implements View {
	static PIPE_NAME = "CUSTOM_RENDER_CONTAINER";

	readonly renderPipe: string = CustomRenderContainer.PIPE_NAME;

	bounds: Bounds = new Bounds();

	pointInBounds<P extends PointLike>(_p: P): boolean {
		throw new Error("Method not implemented.");
	}

	render(_renderer: Renderer): void {}
}
