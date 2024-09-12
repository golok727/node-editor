export * from "./renderer";
export * from "./layout";
export * from "./math";
export * from "./graphics";
export * from "./presets";

// import { DropShadowFilter } from "pixi-filters";
// import { Container, Graphics, Text, type PointData } from "pixi.js";

// export class SimpleNodeView extends Container {
// 	public radius = 10;
// 	public ribbonHeight = 30;
// 	public w = 300;
// 	public h = 400;
// 	public ribbonColor = "#2b652b";
// 	public __label: string = "Thing";
// 	private _graphics: Graphics;

// 	constructor(x: number, y: number, ribbonColor?: string, label?: string) {
// 		super();
// 		this.x = x;
// 		this.y = y;
// 		this.ribbonColor = ribbonColor ?? this.ribbonColor;
// 		this.__label = label ?? this.__label;

// 		this.interactive = true;

// 		this._graphics = new Graphics();

// 		this.addChild(this._graphics);

// 		this._addFilters();

// 		this.draw();

// 		const text = new Text({
// 			text: this.__label ?? "Thing",
// 			style: {
// 				fontSize: 16,
// 				fill: 0xffffff,
// 				align: "center",
// 			},
// 		});

// 		text.x = 10;
// 		text.y = 5;
// 		text.resolution = 1;
// 		this.addChild(text);
// 	}

// 	private _addFilters() {
// 		const filter = new DropShadowFilter();
// 		filter.color = 0x00002a;
// 		filter.offsetX = 0;
// 		filter.offsetX = 0;
// 		filter.alpha = 0.9;
// 		this.filters = [new DropShadowFilter()];
// 	}

// 	canDragStart(pos: PointData) {
// 		// console.log(this.x, this.y);
// 		// console.log(pos);
// 		const ribbonTop = this.y;
// 		const ribbonBottom = this.y + this.ribbonHeight;

// 		return pos.x >= ribbonTop && pos.y <= ribbonBottom;
// 	}

// 	draw(stroked = false) {
// 		const graphics = this._graphics;
// 		graphics.clear();

// 		graphics.roundRect(0, 0, this.w, this.h, this.radius);
// 		graphics.fill({ color: "#303030" });

// 		this._drawRibbon(graphics);

// 		if (stroked) {
// 			graphics.roundRect(0, 0, this.w, this.h, this.radius);
// 			graphics.stroke({ width: 2, color: "#999" });
// 		}
// 	}

// 	private _drawRibbon(graphics: Graphics) {
// 		let ribbonH = this.ribbonHeight;
// 		graphics.beginPath();
// 		graphics.moveTo(0, ribbonH);
// 		graphics.lineTo(this.w, ribbonH);
// 		graphics.lineTo(this.w, this.radius);

// 		graphics.quadraticCurveTo(this.w, 0, this.w - this.radius, 0);
// 		graphics.lineTo(this.radius, 0);

// 		graphics.quadraticCurveTo(0, 0, 0, this.radius);

// 		graphics.closePath();
// 		graphics.fill(this.ribbonColor);
// 	}
// }
