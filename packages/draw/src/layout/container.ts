export class Container<Children extends Container = ContainerChildren> {
	parent: Container | null = null;

	children: Children[] = [];

	append<T extends Children[]>(...children: T) {
		for (const child of children) {
			child.parent = this;
			this.children.push(child);
		}
	}
}

export type ContainerChildren = Container;
