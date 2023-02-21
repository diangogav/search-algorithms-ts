/* eslint-disable @typescript-eslint/no-unnecessary-condition */
/* eslint-disable no-constant-condition */
import { Map } from "../Map";
import { Node } from "./Node";

export class UninformedSearch {
	protected frontier: Node[] = [];
	private readonly explored: Node[] = [];
	private exploredCount = 0;

	constructor(public readonly map: Map) {}

	solve(): { cells: [number, number][]; explored: Node[] } {
		const start = this.map.getStartPoint();
		const goal = this.map.getGoalPoint();

		if (!start) {
			throw new Error("Start Point not defined");
		}
		this.add(start);

		while (true) {
			if (this.isEmpty()) {
				throw new Error("Solution Not Found.");
			}

			const node = this.remove();
			if (node?.point[0] === goal?.point[0] && node?.point[1] === goal?.point[1]) {
				let currentNode = node;
				const cells: [number, number][] = [];
				while (currentNode?.parent !== null && currentNode?.parent !== undefined) {
					cells.push(currentNode.point);
					currentNode = currentNode.parent;
				}
				cells.shift();

				return {
					cells,
					explored: this.explored,
				};
			}
			this.exploredCount++;

			if (this.exploredCount > 150) {
				throw new Error("STP");
			}

			if (!node) {
				throw new Error("Node not found...");
			}

			this.explored.push(node);

			const neighbors = this.getNeighbors(node);

			for (const neighbor of neighbors) {
				const isVisited = this.explored.find(
					(node) => node.point[0] === neighbor.point[0] && node.point[1] === neighbor.point[1]
				);
				if (!isVisited) {
					this.add(neighbor);
				}
			}
		}
	}

	add(node: Node): void {
		this.frontier.push(node);
	}

	remove(): Node | null {
		return this.frontier.pop() ?? null;
	}

	isEmpty(): boolean {
		return this.frontier.length === 0;
	}

	getNeighbors(node: Node): Node[] {
		const neighbors: Node[] = [];
		const candidates = [
			{ x: node.point[0] - 1, y: node.point[1] },
			{ x: node.point[0] + 1, y: node.point[1] },
			{ x: node.point[0], y: node.point[1] - 1 },
			{ x: node.point[0], y: node.point[1] + 1 },
		];

		for (const candidate of candidates) {
			if (
				!(candidate.x >= this.map.value.length) &&
				!(candidate.x < 0) &&
				!(candidate.y >= this.map.value[0].length) &&
				!(candidate.y < 0)
			) {
				const neighborNode = this.map.value[candidate?.x][candidate?.y];
				const isVisited = this.explored.find((node) => node.id === `${candidate.x}${candidate.y}`);
				if (node && neighborNode !== undefined && neighborNode !== 1 && !isVisited) {
					neighbors.push(new Node([candidate.x, candidate.y], node, null));
				}
			}
		}

		return neighbors;
	}
}
