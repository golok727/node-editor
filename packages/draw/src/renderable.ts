import type { Container } from "./layout";
import type { View } from "./layout/view";

// an item which can be rendered
export interface Renderable extends Container, View {}

const RenderableItem = Symbol("RenderableItem");

interface ContainerLikeConstructor<C extends Container = Container> {
	new (...args: any): C;
}

export function intoRenderable<C extends ContainerLikeConstructor>(c: C): C {
	c.prototype[RenderableItem] = true;
	return c;
}

// lolwe don't have eslint yet
// eslint-disable-next-line no-explicit-any
export function isRenderable(c: any): c is Renderable {
	return c[RenderableItem] === true;
}
