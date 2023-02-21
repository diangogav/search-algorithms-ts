import { useEffect, useRef } from "react";

import wallImage from "../assets/images/wall.png";
import yellowDotImage from "../assets/images/yellowDot.png";
import { BFS } from "./algorithms/BFS";
import { DFS } from "./algorithms/DFS";
import { Node } from "./algorithms/Node";
import { UninformedSearch } from "./algorithms/UninformedSearch";
import { maze01 } from "./mazes/maze01";

const draw = (canvas: HTMLCanvasElement | null, map: number[][], tileSize: number) => {
	const yellowDot = new Image();
	const wall = new Image();

	yellowDot.src = yellowDotImage;
	wall.src = wallImage;
	if (!canvas) {
		return;
	}

	canvas.width = map[0].length * tileSize;
	canvas.height = map.length * tileSize;

	const ctx = canvas.getContext("2d");
	if (!ctx) {
		return;
	}
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

const clear = (canvas: HTMLCanvasElement | null, map: number[][], tileSize: number) => {
	if (!canvas) {
		return;
	}
	const context = canvas.getContext("2d");
	if (!context) {
		return;
	}
	context.clearRect(0, 0, canvas.width, canvas.height);

	draw(canvas, map, tileSize);
};

const solve = (
	algorithm: UninformedSearch,
	canvas: HTMLCanvasElement | null,
	map: number[][],
	tileSize: number
) => {
	if (!canvas) {
		return;
	}
	const ctx = canvas.getContext("2d");

	if (!ctx) {
		return;
	}

	clear(canvas, map, tileSize);

	const solution = algorithm.solve();
	showExplored(solution.explored, ctx, tileSize);
	showPath(solution.cells, ctx, tileSize);
};

const Canvas = () => {
	const map = maze01;
	const canvasRef = useRef<HTMLCanvasElement | null>(null);
	const tileSize = 32;

	useEffect(() => {
		const canvas = canvasRef.current;

		if (!canvas) {
			return;
		}

		draw(canvas, map, tileSize);
	}, [map]);

	return (
		<>
			<canvas ref={canvasRef} />
			<button onClick={() => solve(new DFS(map), canvasRef.current, map, tileSize)}>DFS</button>
			<button onClick={() => solve(new BFS(map), canvasRef.current, map, tileSize)}>BSF</button>
		</>
	);
};

export default Canvas;
