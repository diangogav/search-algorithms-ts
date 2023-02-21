export class Node {
	public readonly id: string;
	constructor(
		public readonly point: [number, number],
		public readonly parent: Node | null,
		public readonly action: number | null
	) {
		this.id = `${this.point[0]}${this.point[1]}`;
	}
}
