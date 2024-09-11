export interface BoundData {
	x: number;
	y: number;
	w: number;
	h: number;
	rotate?: number;
}

export class Bounds implements BoundData {
	// [x, y, w, h, ?rotate]

	x: number;
	y: number;
	w: number;
	h: number;
	rotate?: number;

	constructor(
		x: number = 0,
		y: number = 0,
		w: number = 0,
		h: number = 0,
		rotate?: number
	) {
		this.x = x;
		this.y = y;
		this.w = w;
		this.h = h;
		this.rotate = rotate;
	}

	set(
		x: number = this.x,
		y: number = this.y,
		w: number = this.w,
		h: number = this.h
	) {
		this.x = x;
		this.y = y;
		this.w = w;
		this.h = h;
	}
	get bl() {
		return [this.x, this.y + this.h];
	}

	get br() {
		return [this.x + this.w, this.y + this.h];
	}

	get center(): [number, number] {
		return [this.x + this.w / 2, this.y + this.h / 2];
	}

	set center([cx, cy]: [number, number]) {
		const [px, py] = this.center;
		this.x += cx - px;
		this.y += cy - py;
	}

	public serialize() {
		return JSON.stringify([this.x, this.y, this.w, this.h, this.rotate]);
	}

	static deserialize(data: string) {
		const [x, y, w, h, r] = JSON.parse(data);
		return new Bounds(x, y, w, h, r);
	}
}
