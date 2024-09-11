import { Container } from "../layout";
import { GraphicsStyles } from "./styles";
export class GraphicsState {
	style: GraphicsStyles = new GraphicsStyles();

	clone(): GraphicsState {
		const clone = new GraphicsState();
		clone.style = this.style.clone();
		return clone;
	}
}

export interface Instruction {
	type: "fill" | "stroke";
	props: {
		state: GraphicsState;
		path: Path2D;
	};
}

export class GraphicsContext {
	private _stateStack: GraphicsState[] = [new GraphicsState()];
	private _stateIdx = 0;

	private _instructions: Instruction[] = [];

	private _currentPath = new Path2D();

	private get state() {
		return this._stateStack[this._stateIdx];
	}

	constructor() {}

	save() {
		const curClone = this.state.clone();
		this._stateStack.push(curClone);
		this._stateIdx++;
	}

	restore() {
		if (this._stateIdx === 0) return console.warn("Not enough state to pop");
		this._stateStack.pop();
		this._stateIdx--;
	}

	beginPath() {}

	closePath() {}

	rect() {}

	circle() {}

	fill() {}

	stroke() {}
}

export class Graphics extends Container {
	private _context: GraphicsContext;

	get context() {
		return this._context;
	}

	constructor(context = new GraphicsContext()) {
		super();
		this._context = context;
	}

	beginPath() {}

	rect() {}

	circle() {}

	fill() {}

	stroke() {}

	closePath() {}
}
