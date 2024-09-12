import type { Renderable } from "./renderable";
import type { Renderer } from "./renderer";

export class PipeSystem {
	private _pipelines = new Map<string, RenderPipe>();

	constructor(private _renderer: Renderer) {}

	public add(descriptor: RenderPipeDescriptor) {
		this._pipelines.set(descriptor.label, new descriptor.impl(this._renderer));
	}

	public remove() {}

	public execute() {}
}

export interface RenderPipe<R extends Renderable = Renderable> {
	init(): void;

	paint(renderer: Renderer, renderable: R): void;
}

export interface RenderPipeConstructor {
	new (renderer: Renderer): RenderPipe;
}

export interface RenderPipeDescriptor {
	// should be unique for each renderer
	label: string;
	impl: RenderPipeConstructor;
}
