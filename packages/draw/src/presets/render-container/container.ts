import { Container, type View } from "../../layout";
import { Bounds, type PointLike } from "../../math";
import { intoRenderable } from "../../renderable";
import type { Renderer } from "../../renderer";
import { CustomRenderContainerPipe } from "./pipe";

// todo complete this
// a custom render container to have custom rendering logic
// you should add CustomRenderPipe to the render to use this
export class CustomRenderContainer extends Container implements View {
	readonly renderPipe: string = CustomRenderContainerPipe.PIPE_NAME;

	bounds: Bounds = new Bounds();

	pointInBounds<P extends PointLike>(_p: P): boolean {
		throw new Error("Method not implemented.");
	}

	render(_renderer: Renderer): void {}
}

intoRenderable(CustomRenderContainer);
