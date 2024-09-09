import { BaseNode, SpecBuilder } from "../../node";

export interface LogInput {
	message: string;
}

export class LogNode extends BaseNode<LogInput, void> {
	static specification = new SpecBuilder()
		.label("Log")
		.addInput("message", (ts) => {
			return ts.string();
		})
		.build(() => new LogNode());

	override process(input: LogInput): void {
		console.log(input.message);
	}

	override toJSON(): Record<string, unknown> {
		return {
			type: "log",
		};
	}
}
