import { Node } from "./Node";
import { UninformedSearch } from "./UninformedSearch";

export class BFS extends UninformedSearch {
	remove(): Node | null {
		return this.frontier.shift() ?? null;
	}
}
