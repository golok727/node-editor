import type { NodeSpecification } from "./node";
import { PresetNodes } from "./presets";
import { Container, Renderer, Gfx } from "@node-editor/draw";

const defaultSpecification: NodeSpecification[] = [
	PresetNodes.LogNode.specification,
];

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
		const stage = new Container();

		const gfx = new Gfx();

		gfx.beginPath().rect(300, 300, 200, 200).fill({ color: "yellow" });
		gfx.beginPath().circle(400, 400, 30).fill({ color: "red" });

		stage.append(gfx);

		this.renderer.render(stage);

		requestAnimationFrame(this._loop);
	}

	private _loop = () => {};

	dispose() {}
}
