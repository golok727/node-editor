import type { View } from "pixi.js";

export interface RendererSpecification {
	canvas?: HTMLCanvasElement;
	width: number;
	height: number;
	resolution: number;
	autoDensity: boolean;
}
export class Renderer {
	public cx: CanvasRenderingContext2D;

	private _resolution: number;
	private _width: number;
	private _height: number;

	static defaultSpecification: RendererSpecification = {
		width: 800,
		height: 600,
		resolution: window.devicePixelRatio || 1,
		autoDensity: false,
	};

	get width() {
		return this._width;
	}

	get height() {
		return this._height;
	}

	get resolution() {
		return this._resolution;
	}

	constructor(specification?: RendererSpecification) {
		const specs: RendererSpecification = {
			...Renderer.defaultSpecification,
			...specification,
		};

		this._width = specs?.width;
		this._height = specs.height;
		this._resolution = specs.resolution;
		const canvas = specs.canvas ?? document.createElement("canvas");

		const cx = canvas.getContext("2d");
		if (!cx)
			throw new Error("This browser does not support CanvasRenderingContext2D");
		this.cx = cx;
	}

	resize(
		_width: number,
		_height: number,
		_resolution: number = this.resolution
	) {}

	render(_view: View) {}
}
