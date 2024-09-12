type KeyType = "graphics" | "context";

const keyMap: Record<KeyType, number> = Object.create(null);

export function createUKey(thing: KeyType): number {
	let k = keyMap[thing];

	if (k === undefined) {
		keyMap[thing] = 0;
	}

	return ++keyMap[thing];
}
