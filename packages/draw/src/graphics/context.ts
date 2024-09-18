import { createUKey } from "../utils";
import { Gfx, GfxPath } from "./index";
import type { FillStyles, StrokeStyles } from "./index";

export interface FillInstruction {
	type: "fill";
	props: {
		fillStyles: FillStyles;
		path: GfxPath;
	};
}

export interface StrokeInstruction {
	type: "stroke";
	props: {
		strokeStyles: StrokeStyles;
		path: GfxPath;
	};
}

export type GfxInstruction = FillInstruction | StrokeInstruction;

export interface GfxState {
	fillStyle: FillStyles;
	strokeStyle: StrokeStyles;
}

export class GfxContext {
	static defaultFillStyles: FillStyles = {
		color: "#000",
		alpha: 1,
	};

	static defaultStrokeStyles: StrokeStyles = {
		lineDash: [],
		lineWidth: 2,
		color: "#fff",
		join: "miter",
		cap: "butt",
	};

	public readonly key = createUKey("context");

	public instructions: GfxInstruction[] = [];

	private _stateStack: GfxState[] = [];

	private _state: GfxState = {
		fillStyle: GfxContext.defaultFillStyles,
		strokeStyle: GfxContext.defaultStrokeStyles,
	};

	private _currentPath = new GfxPath();

	constructor() {}

	set fillStyle(style: Partial<FillStyles>) {
		this._state.fillStyle = { ...this._state.fillStyle, ...style };
	}

	set strokeStyle(style: Partial<StrokeStyles>) {
		this._state.strokeStyle = { ...this._state.strokeStyle, ...style };
	}

	get fillStyle() {
		return this._state.fillStyle;
	}

	get strokeStyle() {
		return this._state.strokeStyle;
	}

	public clone() {
		const context = new GfxContext();
		context._state = structuredClone(this._state);
		context.instructions = structuredClone(this.instructions);
		context._currentPath = this._currentPath.clone();
	}

	public createGfx() {
		return new Gfx(this);
	}

	public save() {
		this._stateStack.push({
			fillStyle: { ...this._state.fillStyle },
			strokeStyle: { ...this._state.strokeStyle },
		});
		return this;
	}

	public restore() {
		const state = this._stateStack.pop();
		if (state) {
			this._state.fillStyle = state.fillStyle;
			this._state.strokeStyle = state.strokeStyle;
		}
		return this;
	}

	public beginPath() {
		this._currentPath = new GfxPath();
		return this;
	}

	public closePath() {
		this._currentPath.closePath();
		return this;
	}

	public arc(
		x: number,
		y: number,
		radius: number,
		start: number,
		end: number,
		counterClockwise = false
	) {
		this._currentPath.arc(x, y, radius, start, end, counterClockwise);
		return this;
	}

	public rect(x: number, y: number, width: number, height: number) {
		this._currentPath.rect(x, y, width, height);
		return this;
	}

	public circle(x: number, y: number, radius: number) {
		this._currentPath.arc(x, y, radius, 0, Math.PI * 2);
		return this;
	}

	public clear() {
		this.instructions.length = 0;
		return this;
	}

	public fill(styles?: Partial<FillStyles>) {
		this.instructions.push({
			type: "fill",
			props: {
				fillStyles: { ...this._state.fillStyle, ...styles },
				path: this._currentPath.clone(),
			},
		});

		return this;
	}

	public stroke(styles?: Partial<StrokeStyles>) {
		this.instructions.push({
			type: "stroke",
			props: {
				strokeStyles: { ...this._state.strokeStyle, ...styles },
				path: this._currentPath.clone(),
			},
		});

		return this;
	}
}
