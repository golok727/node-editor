import type { Serialize } from "./store";
import { TypeSystem, type Type } from "./typesystem";
export interface NodeSpecification<
	T extends BaseNode<any, any> = BaseNode<any, any>
> {
	label: string;

	inputs: Record<string, unknown> | null;
	outputs: Record<string, unknown> | null;

	createNode: () => T;
}

export class SpecBuilder<T extends BaseNode<any, any> = BaseNode<any, any>> {
	private _label: string = "";
	private _inputs: Record<string, Type<any>> | null = null;
	private _outputs: Record<string, Type<any>> | null = null;

	label(label: string) {
		this._label = label;
		return this;
	}

	addInput(label: string, getSpec: (ts: TypeSystem) => Type<any>) {
		if (!this._inputs) this._inputs = Object.create(null);
		this._inputs![label] = getSpec(new TypeSystem());
		return this;
	}

	addOutput(label: string, getSpec: (ts: TypeSystem) => Type<any>) {
		if (!this._inputs) this._inputs = Object.create(null);
		this._inputs![label] = getSpec(new TypeSystem());
		return this;
	}

	build(createNode: () => T): NodeSpecification {
		const inputs = this._inputs;
		const outputs = this._outputs;
		this._inputs = Object.create(null);
		this._outputs = Object.create(null);

		return {
			label: this._label,
			inputs,
			outputs,
			createNode,
		};
	}
}

type NodeKey = string;
export abstract class BaseNode<In = any, Out = any> implements Serialize {
	/// FIXME
	private _key: NodeKey = Math.random()
		.toString()
		.replace(".", "")
		.substring(0);

	private _prev: NodeKey | null = null;
	private _next: NodeKey | null = null;

	public connect(_node: NodeKey) {
		this._prev;
		this._next;
	}

	abstract process(input: In): Out;
	abstract toJSON(): Record<string, unknown>;
}

export function getNodeKey<T extends BaseNode<any, any>>(node: T) {
	return node["_key"] as NodeKey;
}
