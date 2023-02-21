import { useEffect, useMemo, useRef } from "react";

import wallImage from "../assets/images/wall.png";
import yellowDotImage from "../assets/images/yellowDot.png";
import { A, WeightedNode } from "./algorithms/A";
import { BFS } from "./algorithms/BFS";
import { DFS } from "./algorithms/DFS";
import { Node } from "./algorithms/Node";
import { UninformedSearch } from "./algorithms/UninformedSearch";
import { Map } from "./Map";

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

const showPath = (nodes: Node[], ctx: CanvasRenderingContext2D, tileSize: number) => {
	nodes.forEach((node) => {
		// eslint-disable-next-line no-console
		ctx.fillStyle = "purple";
		ctx.fillRect(node.point[1] * tileSize, node.point[0] * tileSize, tileSize, tileSize);
		if ((node as WeightedNode).weight) {
			ctx.fillStyle = "white";
			ctx.font = "15pt Calibri";
			ctx.fillText(
				(node as WeightedNode).weight.toString(),
				node.point[1] * tileSize,
				node.point[0] * tileSize
			);
		}
	});
};

const showExplored = (nodes: Node[], ctx: CanvasRenderingContext2D, tileSize: number) => {
	nodes.forEach((node) => {
		ctx.fillStyle = "gray";
		ctx.fillRect(node.point[1] * tileSize, node.point[0] * tileSize, tileSize, tileSize);
		if ((node as WeightedNode).weight) {
			ctx.fillStyle = "white";
			ctx.font = "15pt Calibri";
			ctx.fillText(
				(node as WeightedNode).weight.toString(),
				node.point[1] * tileSize,
				node.point[0] * tileSize
			);
		}
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
	showPath(solution.nodes, ctx, tileSize);
};

const Canvas = () => {
	const map = useMemo(() => new Map(), []);
	const canvasRef = useRef<HTMLCanvasElement | null>(null);
	const tileSize = 32;

	useEffect(() => {
		const canvas = canvasRef.current;

		if (!canvas) {
			return;
		}

		draw(canvas, map.value, tileSize);
	}, [map]);

	return (
		<>
			<canvas ref={canvasRef} />
			<button onClick={() => solve(new DFS(map), canvasRef.current, map.value, tileSize)}>
				DFS
			</button>
			<button onClick={() => solve(new BFS(map), canvasRef.current, map.value, tileSize)}>
				BSF
			</button>
			<button onClick={() => solve(new A(map), canvasRef.current, map.value, tileSize)}>A*</button>
		</>
	);
};

export default Canvas;
