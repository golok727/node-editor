import { Gfx } from "./graphics";
import type { FillStyles, StrokeStyles } from "./styles";

export interface FillInstruction {
	type: "fill";
	props: {
		fillStyles: FillStyles;
		path: Path2D;
	};
}

export interface StrokeInstruction {
	type: "stroke";
	props: {
		strokeStyles: StrokeStyles;
		path: Path2D;
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

	private _stateStack: GfxState[] = [];

	private _state: GfxState = {
		fillStyle: GfxContext.defaultFillStyles,
		strokeStyle: GfxContext.defaultStrokeStyles,
	};

	private _instructions: GfxInstruction[] = [];

	private _currentPath = new Path2D();

	constructor() {}

	public clone() {
		const context = new GfxContext();
		context._state = structuredClone(this._state);
		context._instructions = structuredClone(this._instructions);
		context._currentPath = new Path2D(this._currentPath);
	}

	public createGfx() {
		return new Gfx(this);
	}

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

	save() {
		this._stateStack.push({
			fillStyle: { ...this._state.fillStyle },
			strokeStyle: { ...this._state.strokeStyle },
		});
		return this;
	}

	restore() {
		const state = this._stateStack.pop();
		if (state) {
			this._state.fillStyle = state.fillStyle;
			this._state.strokeStyle = state.strokeStyle;
		}
		return this;
	}

	beginPath() {
		this._currentPath = new Path2D();
		return this;
	}

	closePath() {
		this._currentPath.closePath();
		return this;
	}

	rect(x: number, y: number, width: number, height: number) {
		this._currentPath.rect(x, y, width, height);
		return this;
	}

	circle(x: number, y: number, radius: number) {
		this._currentPath.arc(x, y, radius, 0, Math.PI * 2);
		return this;
	}

	clear() {
		this._instructions.length = 0;
		return this;
	}

	fill(styles?: Partial<FillStyles>) {
		this._instructions.push({
			type: "fill",
			props: {
				fillStyles: { ...this._state.fillStyle, ...styles },
				path: new Path2D(this._currentPath),
			},
		});

		return this;
	}

	stroke(styles?: Partial<StrokeStyles>) {
		this._instructions.push({
			type: "stroke",
			props: {
				strokeStyles: { ...this._state.strokeStyle, ...styles },
				path: new Path2D(this._currentPath),
			},
		});

		return this;
	}
}
