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

	private _instructions: Instruction[] = [];

	private _currentPath = new Path2D();

	constructor() {}

	save() {}

	restore() {}

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
