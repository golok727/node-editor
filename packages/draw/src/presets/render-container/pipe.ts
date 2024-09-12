import type { RenderPipe } from "../../render-pipe";
import type { Renderer } from "../../renderer";
import type { CustomRenderContainer } from "./container";

export class CustomRenderContainerPipe
	implements RenderPipe<CustomRenderContainer>
{
	static PIPE_NAME = "$_custom_rc_$";

	init(): void {
		throw new Error("Method not implemented.");
	}

	paint(_renderer: Renderer, _renderable: CustomRenderContainer): void {
		_renderable.render(_renderer);
	}
}
