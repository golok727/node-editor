import { z } from "zod";

export abstract class Type<T> {
	abstract readonly type: "string" | "number" | "boolean";
	abstract schema: Zod.ZodType;

	default(d: T) {
		this.schema.default(d);
		return this;
	}
}

export class StringType extends Type<string> {
	readonly type = "string";
	readonly schema = z.string();

	static is(ty: any): ty is StringType {
		return ty instanceof StringType;
	}
}

export class NumberType extends Type<number> {
	readonly type = "number";
	readonly schema = z.number();

	static is(ty: any): ty is NumberType {
		return ty instanceof NumberType;
	}
}

export class BooleanType extends Type<boolean> {
	readonly type = "boolean";
	readonly schema = z.boolean();

	static is(ty: any): ty is BooleanType {
		return ty instanceof BooleanType;
	}
}

export class TypeSystem {
	string() {
		return new StringType();
	}

	number() {
		return new NumberType();
	}

	boolean() {
		return new BooleanType();
	}
}
