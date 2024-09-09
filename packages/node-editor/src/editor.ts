import { Application, Container, Graphics, type PointData } from "pixi.js";
import type { NodeSpecification } from "./node";
import { PresetNodes } from "./presets";
import { SimpleNodeView } from "./render";

const defaultSpecification: NodeSpecification[] = [
	PresetNodes.LogNode.specification,
];

export class NodeEditor {
	private _app = new Application();
	private _specification: NodeSpecification[] = [];

	private _draggingNode?: SimpleNodeView;
	private _dragStartPos?: PointData;

	constructor(loadDefaultSpecification = false) {
		if (loadDefaultSpecification) {
			defaultSpecification.forEach((spec) => this._specification.push(spec));
		}
	}

	addSpecs(...specs: NodeSpecification[]) {
		this._specification.push(...specs);
	}

	get view() {
		return this._app.canvas;
	}

	async init() {
		await this._app.init({
			backgroundColor: "#1a1a1a",
			resizeTo: window,
			resolution: 2,
			autoDensity: true,
		});
		// this._specification
		// 	.map((s) => s.createNode())
		// 	.forEach((n) => n.process({ message: "Hello thing hello" }));

		const node = new SimpleNodeView(100, 100);
		const node2 = new SimpleNodeView(500, 300, "#f00");

		const frame = new Container();
		frame.interactive = true;

		const bgGraphics = new Graphics();
		bgGraphics.rect(0, 0, this._app.screen.width, this._app.screen.height);
		bgGraphics.fill({ color: "transparent" });

		frame.addChild(bgGraphics);

		frame.addChild(node);
		frame.addChild(node2);

		frame.addEventListener("mousedown", (ev) => {
			const x = ev.globalX;
			const y = ev.globalY;
			if (
				ev.target instanceof SimpleNodeView &&
				ev.target.canDragStart({ x, y })
			) {
				this._draggingNode = ev.target;
				this._draggingNode.draw(true);
				this._dragStartPos = { x, y };
			}
		});

		frame.addEventListener("mousemove", (ev) => {
			if (this._draggingNode && this._dragStartPos) {
				const x = ev.globalX;
				const y = ev.globalY;
				const { x: dragStartX, y: dragStartY } = this._dragStartPos;
				const newX = x - dragStartX;
				const newY = y - dragStartY;

				this._draggingNode.x += newX;
				this._draggingNode.y += newY;

				this._dragStartPos = { x, y };
			}
		});

		document.addEventListener("mouseup", () => {
			this._draggingNode?.draw(false);
			this._draggingNode = undefined;
		});

		this._app.stage.addChild(frame);
	}
}
