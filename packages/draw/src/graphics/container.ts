import { Container } from "../layout/container";
import { Bounds, type PointLike } from "../math";
import { intoRenderable } from "../renderable";
import type { View } from "./../layout/view";
import { GraphicsPipeline } from "./pipe";

export class GraphicsContainer extends Container implements View {
	renderPipe: string = GraphicsPipeline.PIPE_NAME;

	protected _bounds: Bounds = new Bounds();

	get bounds() {
		return this._bounds;
	}

	pointInBounds<P extends PointLike>(_p: P): boolean {
		return false;
	}
}
// this is necessary
intoRenderable(GraphicsContainer);
