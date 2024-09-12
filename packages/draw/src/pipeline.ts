import type { Renderable } from "./renderable";
import type { Renderer } from "./renderer";

export class PipelineSystem {
	private _pipelines = new Map<string, PipeLine>();

	constructor(private _renderer: Renderer) {}

	public add(_pipeName: string, _pipeCstr: PipelineConstructor) {
		this._pipelines.set(_pipeName, new _pipeCstr(this._renderer));
	}

	public remove() {}

	public execute() {}
}

export interface PipeLine<R extends Renderable = Renderable> {
	init(): void;

	paint(cx: CanvasRenderingContext2D, renderable: R): void;
}

export interface PipelineConstructor {
	new (renderer: Renderer): PipeLine;
}
