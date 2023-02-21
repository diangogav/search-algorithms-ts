import { useEffect, useRef } from "react";

import wallImage from "../assets/images/wall.png";
import yellowDotImage from "../assets/images/yellowDot.png";
import { BFS } from "./algorithms/BFS";
import { DFS } from "./algorithms/DFS";
import { Node } from "./algorithms/Node";
import { UninformedSearch } from "./algorithms/UninformedSearch";
import { maze01 } from "./mazes/maze01";

const draw = (
	ctx: CanvasRenderingContext2D,
	map: number[][],
	tileSize: number,
	wall: HTMLImageElement,
	yellowDot: HTMLImageElement
) => {
	for (let row = 0; row < map.length; row++) {
		for (let column = 0; column < map[row].length; column++) {
			const tile = map[row][column];
			if (tile === 1) {
				ctx.drawImage(wall, column * tileSize, row * tileSize, tileSize, tileSize);
			} else if (tile === 0) {
				ctx.drawImage(yellowDot, column * tileSize, row * tileSize, tileSize, tileSize);
			} else {
				ctx.fillStyle = "black";
				ctx.fillRect(column * tileSize, row * tileSize, tileSize, tileSize);
			}

			ctx.strokeStyle = "yellow";
			ctx.strokeRect(column * tileSize, row * tileSize, tileSize, tileSize);
		}
	}
};

const showPath = (cells: [number, number][], ctx: CanvasRenderingContext2D, tileSize: number) => {
	cells.forEach((cell) => {
		ctx.fillStyle = "purple";
		ctx.fillRect(cell[1] * tileSize, cell[0] * tileSize, tileSize, tileSize);
	});
};

const showExplored = (nodes: Node[], ctx: CanvasRenderingContext2D, tileSize: number) => {
	nodes.forEach((node) => {
		ctx.fillStyle = "white";
		ctx.fillRect(node.point[1] * tileSize, node.point[0] * tileSize, tileSize, tileSize);
	});
};

const solve = (
	algorithm: UninformedSearch,
	ctx: CanvasRenderingContext2D | null,
	tileSize: number
) => {
	if (!ctx) {
		return;
	}
	const solution = algorithm.solve();
	showExplored(solution.explored, ctx, tileSize);
	showPath(solution.cells, ctx, tileSize);
};

const Canvas = () => {
	const canvasRef = useRef<HTMLCanvasElement | null>(null);
	const map = maze01;
	const tileSize = 32;
	const yellowDot = new Image();
	const wall = new Image();
	let context: null | CanvasRenderingContext2D;

	yellowDot.src = yellowDotImage;
	wall.src = wallImage;

	useEffect(() => {
		const canvas = canvasRef.current;

		if (!canvas) {
			return;
		}

		canvas.width = map[0].length * tileSize;
		canvas.height = map.length * tileSize;

		context = canvas.getContext("2d");

		if (!context) {
			return;
		}

		draw(context, map, 32, wall, yellowDot);
	}, [map, wall, yellowDot]);

	return (
		<>
			<canvas ref={canvasRef} />
			<button onClick={() => solve(new DFS(map), context, tileSize)}>DFS</button>
			<button onClick={() => solve(new BFS(map), context, tileSize)}>BSF</button>
			<button>A*</button>
		</>
	);
};

export default Canvas;
