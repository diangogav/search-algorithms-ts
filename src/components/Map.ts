import { Node } from "./algorithms/Node";
import { maze01 } from "./mazes/maze01";

export class Map {
	public readonly value: number[][];

	constructor() {
		this.value = maze01;
	}

	get width(): number {
		return this.value[0].length;
	}

	get height(): number {
		return this.value.length;
	}

	getStartPoint(): Node | null {
		for (let row = 0; row < this.value.length; row++) {
			for (let column = 0; column < this.value[row].length; column++) {
				const tile = this.value[row][column];
				if (tile === 4) {
					return new Node([row, column], null, null);
				}
			}
		}

		return null;
	}

	getGoalPoint(): Node | null {
		for (let row = 0; row < this.value.length; row++) {
			for (let column = 0; column < this.value[row].length; column++) {
				const tile = this.value[row][column];
				if (tile === 0) {
					return new Node([row, column], null, null);
				}
			}
		}

		return null;
	}
}
