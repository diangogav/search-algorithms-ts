import { Node } from "./Node";
import { UninformedSearch } from "./UninformedSearch";

export class BFS extends UninformedSearch {
	// eslint-disable-next-line @typescript-eslint/no-useless-constructor
	constructor(map: number[][]) {
		super(map);
	}

	remove(): Node | null {
		return this.frontier.shift() ?? null;
	}
}
