import type { NodeSpecification } from "./node";
import { PresetNodes } from "./presets";
import {
	Container,
	Renderer,
	Gfx,
	CustomRenderContainer,
	GfxPath,
} from "@node-editor/draw";

const defaultSpecification: NodeSpecification[] = [
	PresetNodes.LogNode.specification,
];

class Thing extends CustomRenderContainer {
	override render(_renderer: Renderer): void {
		const cx = _renderer.cx;
		// test some bounding box
		const path = new GfxPath();
		path.rect(800, 300, 200, 300);

		path.closePath();
		path.circle(700, 300, 200);

		path.closePath();
		path.circle(300, 300, 50);

		path.closePath();
		path.ellipse(120, 200, 100, 50);

		cx.save();
		cx.fillStyle = "hotpink";
		cx.fill(path.path2D);

		cx.beginPath();
		cx.strokeStyle = "white";
		cx.lineWidth = 5;
		const { x, y, width, height } = path.bounds.rect;
		cx.rect(x, y, width, height);
		cx.stroke();

		cx.restore();
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
		const stage = new Container();

		const gfx = new Gfx();

		gfx.beginPath().rect(300, 300, 200, 200).fill({ color: "yellow" });
		gfx.beginPath().circle(400, 400, 30).fill({ color: "red" });

		const g2 = new Gfx();

		g2.circle(600, 200, 40).fill({ color: "hotpink" });

		const custom = new Thing();

		stage.append(gfx);
		stage.append(g2);
		stage.append(custom);

		this.renderer.render(stage);

		requestAnimationFrame(this._loop);
	}

	private _loop = () => {};

	dispose() {}
}
