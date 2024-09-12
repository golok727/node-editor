import type { Bounds, PointLike } from "../math";

export interface View {
	readonly renderPipe: string;
	bounds: Bounds;

	pointInBounds<P extends PointLike>(p: P): boolean;
}
