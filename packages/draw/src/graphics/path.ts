import { Bounds } from "../math";

export type GfxCommandType =
	| "moveTo"
	| "lineTo"
	| "quadraticCurveTo"
	| "bezierCurveTo"
	| "closePath"
	| "circle"
	| "arc"
	| "arcTo"
	| "rect"
	| "ellipse"
	| "poly"
	| "roundRect";

export type GfxCommand = { type: GfxCommandType; data: any[] };

export class GfxPath {
	private _commands: GfxCommand[];

	private _bounds = new Bounds();

	private _path = new Path2D();

	private _dirty = true;

	constructor(path?: GfxPath) {
		this._commands = path?._commands.slice() ?? [];
		this._bounds = path?._bounds.clone() ?? this._bounds;
	}

	get bounds() {
		return this._bounds;
	}

	get path2D() {
		return this._buildPath();
	}

	private _buildPath() {
		if (!this._dirty) return this._path;

		for (const command of this._commands) {
			switch (command.type) {
				case "circle": {
					const [x, y, radius] = command.data as number[];
					this._path.arc(x, y, radius, 0, Math.PI * 2);
					break;
				}

				case "poly": {
					break;
				}

				case "roundRect": {
					break;
				}

				default: {
					this._callPathMethod(command);
				}
			}
		}

		return this._path;
	}

	private _callPathMethod(cmd: GfxCommand) {
		const type = cmd.type as keyof Path2D;
		const data = cmd.data;
		if (this._path[type] && typeof this._path[type] === "function") {
			// @ts-ignore
			this._path[type](...data);
		}
	}

	clear() {
		this._path = new Path2D();
		this._bounds.clear();
		this._dirty = true;
		return this;
	}

	lineTo(x: number, y: number) {
		this._commands.push({ type: "lineTo", data: [x, y] });

		this._dirty = true;
		return this;
	}

	moveTo(x: number, y: number) {
		this._commands.push({ type: "moveTo", data: [x, y] });

		this._dirty = true;
		return this;
	}

	quadraticCurveTo(cpx: number, cpy: number, x: number, y: number) {
		this._commands.push({ type: "quadraticCurveTo", data: [cpx, cpy, x, y] });

		this._dirty = true;
		return this;
	}

	rect(x: number, y: number, width: number, height: number) {
		this._commands.push({ type: "rect", data: [x, y, width, height] });
		this._bounds.addRect({ x, y, width, height });

		this._dirty = true;
		return this;
	}

	circle(cx: number, cy: number, radius: number) {
		this._commands.push({ type: "circle", data: [cx, cy, radius] });
		const d = 2 * radius;
		this._bounds.addRect({
			x: cx - radius,
			y: cy - radius,
			width: d,
			height: d,
		});

		this._dirty = true;
		return this;
	}

	roundRect(
		x: number,
		y: number,
		width: number,
		height: number,
		radius: number | number[] = 0
	) {
		this._commands.push({
			type: "roundRect",
			data: [x, y, width, height, radius],
		});
	}

	poly(points: number[], _close?: boolean) {
		this._commands.push({
			type: "poly",
			data: [points],
		});
	}

	ellipse(cx: number, cy: number, radiusX: number, radiusY: number) {
		this._commands.push({
			type: "ellipse",
			data: [cx, cy, radiusX, radiusY, 0, 0, Math.PI * 2],
		});
		this._bounds.addRect({
			x: cx - radiusX,
			y: cy - radiusY,
			width: 2 * radiusX,
			height: 2 * radiusY,
		});

		this._dirty = true;
		return this;
	}

	bezierCurveTo(
		cp1x: number,
		cp1y: number,
		cp2x: number,
		cp2y: number,
		x: number,
		y: number
	) {
		this._commands.push({
			type: "bezierCurveTo",
			data: [cp1x, cp1y, cp2x, cp2y, x, y],
		});

		this._dirty = true;
		return this;
	}

	closePath() {
		this._commands.push({ type: "closePath", data: [] });
	}
}
