import type { RenderPipe } from "../../render-pipe";
import type { Renderer } from "../../renderer";
import type { CustomRenderContainer } from "./container";

export class RenderContainerPipe implements RenderPipe<CustomRenderContainer> {
	init(): void {
		throw new Error("Method not implemented.");
	}

	paint(_renderer: Renderer, _renderable: CustomRenderContainer): void {
		throw new Error("Method not implemented.");
	}
}
