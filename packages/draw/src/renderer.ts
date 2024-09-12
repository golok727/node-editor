import { GraphicsPipeline } from "./graphics";
import type { Container } from "./layout";
import { CustomRenderContainerPipe } from "./presets";
import {
	RenderPipeSystem,
	type RenderPipeDescriptor,
	type RenderPipeDescriptor as RenderPipelineDescriptor,
} from "./render-pipe";
import { isRenderable } from "./renderable";

export const DefaultRenderPipes: RenderPipeDescriptor[] = [
	{ impl: GraphicsPipeline, label: GraphicsPipeline.PIPE_NAME },
	{
		impl: CustomRenderContainerPipe,
		label: CustomRenderContainerPipe.PIPE_NAME,
	},
];

export interface RendererSpecification {
	canvas?: HTMLCanvasElement;

	width: number;

	height: number;

	resolution: number;

	autoDensity: boolean;

	pipelines: RenderPipelineDescriptor[];

	includeDefaultPipes: boolean;
}

export class Renderer {
	public cx: CanvasRenderingContext2D;

	private _resolution: number = 1;

	private _width: number = 0;

	private _height: number = 0;

	private _pixelWidth: number = 0;

	private _pixelHeight: number = 0;

	private _autoDensity: boolean;

	private _pipes: RenderPipeSystem;

	static defaultSpecification: RendererSpecification = {
		width: 800,
		height: 600,
		resolution: window.devicePixelRatio || 1,
		autoDensity: false,
		includeDefaultPipes: true,
		pipelines: [],
	};

	get width() {
		return this._width;
	}

	get height() {
		return this._height;
	}

	get pixelWidth() {
		return this._pixelWidth;
	}

	get pixelHeight() {
		return this._pixelHeight;
	}

	get resolution() {
		return this._resolution;
	}

	constructor(specification?: Partial<RendererSpecification>) {
		const specs: RendererSpecification = {
			...Renderer.defaultSpecification,
			...specification,
		};

		this._pipes = new RenderPipeSystem(this);

		this._autoDensity = specs.autoDensity;

		const canvas = specs.canvas ?? document.createElement("canvas");

		const cx = canvas.getContext("2d");
		if (!cx)
			throw new Error(
				"This browser does not support CanvasRenderingContext2D :(("
			);

		this.cx = cx;

		this.resize(specs.width, specs.height, specs.resolution);

		if (specs.includeDefaultPipes)
			specs.pipelines = [...specs.pipelines, ...DefaultRenderPipes];

		specs.pipelines.forEach((pD) => this._pipes.add(pD));
	}

	addPipe(descriptor: RenderPipelineDescriptor) {
		this._pipes.add(descriptor);
	}

	resize(
		width = this.width,
		height = this.height,
		resolution = this.resolution
	) {
		if (
			this.width === width &&
			this.height === height &&
			this.resolution === resolution
		) {
			return false;
		}

		this._width = width;
		this._height = height;
		this._resolution = resolution;

		this._pixelWidth = width * resolution;
		this._pixelHeight = height * resolution;

		const canvas = this.cx.canvas;

		canvas.width = this._pixelWidth;
		canvas.height = this._pixelHeight;

		if (this._autoDensity) {
			canvas.style.width = `${this._width}px`;
			canvas.style.height = `${this._height}px`;
		}

		return true; // resized
	}

	render(view: Container) {
		const cx = this.cx;
		cx.save();
		cx.scale(this.resolution, this.resolution);
		cx.clearRect(0, 0, this.width, this.height);
		cx.fillStyle = "black";
		cx.fillRect(0, 0, this.width, this.height);

		cx.save();

		view.children
			.filter((c) => isRenderable(c))
			.forEach((thing) => {
				this._pipes.execute(thing);
			});

		cx.restore();

		cx.restore();
	}
}
