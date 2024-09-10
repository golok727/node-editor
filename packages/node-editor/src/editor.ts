import type { NodeSpecification } from "./node";
import { PresetNodes } from "./presets";
import { Renderer } from "./render/renderer";

const defaultSpecification: NodeSpecification[] = [
	PresetNodes.LogNode.specification,
];

export class NodeEditor {
	private _specification: NodeSpecification[] = [];
	private renderer: Renderer;

	constructor(loadDefaultSpecification = false) {
		this.renderer = new Renderer();

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

	async init() {}
}
