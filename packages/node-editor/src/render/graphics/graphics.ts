import { Container } from "../layout";
import { GfxContext } from "./context";
import type { FillStyles, StrokeStyles } from "./styles";

export class Gfx extends Container {
	private _context: GfxContext;

	get context() {
		return this._context;
	}

	set fillStyle(style: Partial<FillStyles>) {
		this._context.fillStyle = style;
	}

	set strokeStyle(style: Partial<StrokeStyles>) {
		this._context.strokeStyle = style;
	}

	get fillStyle() {
		return this._context.fillStyle;
	}

	get strokeStyle() {
		return this._context.strokeStyle;
	}

	constructor(context = new GfxContext()) {
		super();
		this._context = context;
	}

	beginPath() {
		this._context.beginPath();
		return this;
	}

	closePath() {
		this._context.closePath();
		return this;
	}

	rect(x: number, y: number, width: number, height: number) {
		this._context.rect(x, y, width, height);
		return this;
	}

	circle(x: number, y: number, radius: number) {
		this._context.circle(x, y, radius);
		return this;
	}

	fill(styles?: Partial<FillStyles>) {
		this._context.fill(styles);
		return this;
	}

	stroke(styles?: Partial<StrokeStyles>) {
		this._context.stroke(styles);

		return this;
	}
}
