export interface Serialize {
	toJSON(): Record<string, unknown>;
}
