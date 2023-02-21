import { Map } from "../Map";
import { Node } from "./Node";
import { UninformedSearch } from "./UninformedSearch";

export class WeightedNode extends Node {
	public readonly weight: number;
	constructor(node: Node, weight: number) {
		super(node.point, node.parent, node.action);
		this.weight = weight;
	}
}

export class A extends UninformedSearch {
	public frontier: WeightedNode[] = [];
	private readonly goal: Node;
	constructor(map: Map) {
		super(map);
		const goal = this.map.getGoalPoint();
		if (!goal) {
			throw new Error("Goal not found...");
		}
		this.goal = goal;
	}

	add(node: Node): void {
		const weightedNode = this.heuristic(node);
		this.frontier.push(weightedNode);
		this.frontier.sort((a, b) => a.weight - b.weight);
	}

	remove(): WeightedNode | null {
		return this.frontier.shift() ?? null;
	}

	heuristic(node: Node): WeightedNode {
		const manhattan =
			Math.abs(node.point[0] - this.goal.point[0]) + Math.abs(node.point[1] - this.goal.point[1]);
		let steps = 0;
		let currentNode = node;

		while (currentNode.parent !== null) {
			steps++;
			currentNode = currentNode.parent;
		}

		return new WeightedNode(node, manhattan + steps);
	}
}
