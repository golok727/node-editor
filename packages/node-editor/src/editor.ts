import type { NodeSpecification } from "./node";
import { PresetNodes } from "./presets";
import { Bounds, Container, type View } from "./render";
import { Renderer } from "./render/renderer";

const defaultSpecification: NodeSpecification[] = [
	PresetNodes.LogNode.specification,
];

class Rectangle implements View {
	bounds = new Bounds(0, 0, 100, 100);
	centered = false;

	paint(cx: CanvasRenderingContext2D): void {
		const { x, y, width, height } = this.bounds;

		cx.beginPath();
		cx.fillStyle = "orange";
		cx.rect(
			this.centered ? x - width / 2 : x,
			this.centered ? y - height / 2 : y,
			width,
			height
		);
		cx.fill();
	}
}

class Circle implements View {
	bounds = new Bounds(0, 0, 100, 100);
	centered = false;

	paint(cx: CanvasRenderingContext2D): void {
		const { x, y } = this.bounds;

		cx.beginPath();
		cx.fillStyle = "yellow";
		cx.arc(x, y, 100, 0, Math.PI * 2);
		cx.fill();
	}
}

export class NodeEditor {
	private _specification: NodeSpecification[] = [];

	private renderer: Renderer;

	constructor(loadDefaultSpecification = false) {
		this.renderer = new Renderer({ resolution: 2 });
		if (loadDefaultSpecification) {
			defaultSpecification.forEach((spec) => this._specification.push(spec));
		}
	}

	addSpecs(...specs: NodeSpecification[]) {
		this._specification.push(...specs);
	}

	get canvas(): HTMLCanvasElement {
		return this.renderer.cx.canvas;
	}

	resize(width?: number, height?: number, resolution?: number) {
		return this.renderer.resize(width, height, resolution);
	}

	init() {
		requestAnimationFrame(this._loop);
	}

	private _loop = () => {
		const rectangle = new Rectangle();
		rectangle.centered = true;
		rectangle.bounds.set(
			this.renderer.width / 2,
			this.renderer.height / 2,
			300,
			300
		);

		const circle = new Circle();
		circle.bounds.set(250, 200);

		const container = new Container();
		container.append(rectangle, circle);

		this.renderer.render(container);
	};

	dispose() {}
}
