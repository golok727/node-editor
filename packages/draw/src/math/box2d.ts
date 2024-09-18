import type { Matrix } from "./matrix";
import { Point } from "./point";

export interface Box2DData {
	x: number;
	y: number;
	width: number;
	height: number;
}
export class Box2D implements Box2DData {
	constructor(
		public x: number = 0,
		public y: number = 0,
		public width: number = 0,
		public height: number = 0
	) {}

	get left() {
		return this.x;
	}

	get right() {
		return this.x + this.width;
	}

	get top() {
		return this.y;
	}

	get bottom() {
		return this.y + this.height;
	}

	get isCollapsed() {
		return this.left === this.right || this.top === this.bottom;
	}

	clone(): Box2D {
		return new Box2D(this.x, this.y, this.width, this.height);
	}

	contains(x: number, y: number): boolean {
		return (
			this.width > 0 &&
			this.height > 0 &&
			x >= this.x &&
			x < this.x + this.width &&
			y >= this.y &&
			y < this.y + this.height
		);
	}

	copyFrom(src: Box2D): void {
		this.x = src.x;
		this.y = src.y;
		this.width = src.width;
		this.height = src.height;
	}

	copyTo(dest: Box2D): void {
		dest.x = this.x;
		dest.y = this.y;
		dest.width = this.width;
		dest.height = this.height;
	}

	getBounds() {
		return new Box2D(0, 0, 0, 0);
	}

	addPadding(paddingX = 0, paddingY = paddingX): this {
		this.x -= paddingX;
		this.y -= paddingY;

		this.width += paddingX * 2;
		this.height += paddingY * 2;

		return this;
	}

	fit(box: Box2D): Box2D {
		const x1 = Math.max(this.x, box.x);
		const x2 = Math.min(this.x + this.width, box.x + box.width);
		const y1 = Math.max(this.y, box.y);
		const y2 = Math.min(this.y + this.height, box.y + box.height);

		this.x = x1;
		this.width = Math.max(x2 - x1, 0);
		this.y = y1;
		this.height = Math.max(y2 - y1, 0);

		return this;
	}

	ceil(resolution = 1, eps = 0.001): Box2D {
		const x2 = Math.ceil((this.x + this.width - eps) * resolution) / resolution;
		const y2 =
			Math.ceil((this.y + this.height - eps) * resolution) / resolution;

		this.x = Math.floor((this.x + eps) * resolution) / resolution;
		this.y = Math.floor((this.y + eps) * resolution) / resolution;

		this.width = x2 - this.x;
		this.height = y2 - this.y;

		return this;
	}

	public enlarge(rectangle: Box2D): Box2D {
		const x1 = Math.min(this.x, rectangle.x);
		const x2 = Math.max(this.x + this.width, rectangle.x + rectangle.width);
		const y1 = Math.min(this.y, rectangle.y);
		const y2 = Math.max(this.y + this.height, rectangle.y + rectangle.height);

		this.x = x1;
		this.width = x2 - x1;
		this.y = y1;
		this.height = y2 - y1;

		return this;
	}

	strokeContains(x: number, y: number, strokeWidth: number): boolean {
		const { width, height } = this;

		if (width <= 0 || height <= 0) return false;

		const _x = this.x;
		const _y = this.y;

		const outerLeft = _x - strokeWidth / 2;
		const outerRight = _x + width + strokeWidth / 2;
		const outerTop = _y - strokeWidth / 2;
		const outerBottom = _y + height + strokeWidth / 2;
		const innerLeft = _x + strokeWidth / 2;
		const innerRight = _x + width - strokeWidth / 2;
		const innerTop = _y + strokeWidth / 2;
		const innerBottom = _y + height - strokeWidth / 2;

		return (
			x >= outerLeft &&
			x <= outerRight &&
			y >= outerTop &&
			y <= outerBottom &&
			!(x > innerLeft && x < innerRight && y > innerTop && y < innerBottom)
		);
	}

	private static _tempPoints = [
		new Point(),
		new Point(),
		new Point(),
		new Point(),
	] as const;
	intersects(other: Box2D, transform?: Matrix): boolean {
		if (!transform) {
			const x0 = this.x < other.x ? other.x : this.x;
			const x1 = this.right > other.right ? other.right : this.right;

			if (x1 <= x0) {
				return false;
			}

			const y0 = this.y < other.y ? other.y : this.y;
			const y1 = this.bottom > other.bottom ? other.bottom : this.bottom;

			return y1 > y0;
		}

		const x0 = this.left;
		const x1 = this.right;
		const y0 = this.top;
		const y1 = this.bottom;

		if (x1 <= x0 || y1 <= y0) {
			return false;
		}
		const tempPoints = Box2D._tempPoints;
		const lt = tempPoints[0].set(other.left, other.top);
		const lb = tempPoints[1].set(other.left, other.bottom);
		const rt = tempPoints[2].set(other.right, other.top);
		const rb = tempPoints[3].set(other.right, other.bottom);

		if (rt.x <= lt.x || lb.y <= lt.y) {
			return false;
		}

		const s = Math.sign(transform.a * transform.d - transform.b * transform.c);

		if (s === 0) {
			return false;
		}

		transform.apply(lt, lt);
		transform.apply(lb, lb);
		transform.apply(rt, rt);
		transform.apply(rb, rb);

		if (
			Math.max(lt.x, lb.x, rt.x, rb.x) <= x0 ||
			Math.min(lt.x, lb.x, rt.x, rb.x) >= x1 ||
			Math.max(lt.y, lb.y, rt.y, rb.y) <= y0 ||
			Math.min(lt.y, lb.y, rt.y, rb.y) >= y1
		) {
			return false;
		}

		const nx = s * (lb.y - lt.y);
		const ny = s * (lt.x - lb.x);
		const n00 = nx * x0 + ny * y0;
		const n10 = nx * x1 + ny * y0;
		const n01 = nx * x0 + ny * y1;
		const n11 = nx * x1 + ny * y1;

		if (
			Math.max(n00, n10, n01, n11) <= nx * lt.x + ny * lt.y ||
			Math.min(n00, n10, n01, n11) >= nx * rb.x + ny * rb.y
		) {
			return false;
		}

		const mx = s * (lt.y - rt.y);
		const my = s * (rt.x - lt.x);
		const m00 = mx * x0 + my * y0;
		const m10 = mx * x1 + my * y0;
		const m01 = mx * x0 + my * y1;
		const m11 = mx * x1 + my * y1;

		if (
			Math.max(m00, m10, m01, m11) <= mx * lt.x + my * lt.y ||
			Math.min(m00, m10, m01, m11) >= mx * rb.x + my * rb.y
		) {
			return false;
		}

		return true;
	}

	toJSON() {
		const { x, y, width, height } = this;
		return { x, y, width, height };
	}

	toString() {
		return `[ Box2D ${JSON.stringify(this.toJSON)} ]`;
	}
}
