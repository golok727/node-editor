export interface FillStyles {
	color: string;
}

export interface StrokeStyles {
	lineDash: number[];
	lineWidth: number;
	color: string;
}

export class GraphicsStyles {
	static defaultFillStyles: FillStyles = {
		color: "#000",
	};

	static defaultStrokeStyles: StrokeStyles = {
		lineDash: [],
		lineWidth: 2,
		color: "#fff",
	};

	fill: FillStyles = GraphicsStyles.defaultFillStyles;

	stroke: StrokeStyles = GraphicsStyles.defaultStrokeStyles;

	clone() {
		const clone = new GraphicsStyles();
		clone.fill = structuredClone(this.fill);
		clone.stroke = structuredClone(this.stroke);
		return clone;
	}
}
