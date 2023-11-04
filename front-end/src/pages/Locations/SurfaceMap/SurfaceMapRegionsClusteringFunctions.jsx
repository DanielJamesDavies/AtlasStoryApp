// Packages
import { useCallback } from "react";

// Components

// Logic

// Context

// Services

// Styles

// Assets

export const SurfaceMapRegionsClusteringFunctions = ({ surfaceMapImageComponentsContainerRef, zoom }) => {
	const getCoordsOfPath = useCallback((component) => {
		const offset = 8;
		let min_x = -1;
		let max_x = -1;
		let min_y = -1;
		let max_y = -1;

		let path = component?.getAttribute("d");
		["M", "L", "H", "V", "C", "S", "Q", "T", "A", "Z"]?.map((char) => {
			path = path.replaceAll(char, "<>");
			return true;
		});
		path.split("<>")
			.filter((e) => e.length !== 0)
			.map((data) => {
				data = data.trim().replaceAll(",", " ");

				if (data?.split(" ").length >= 2) {
					if (min_x === -1) min_x = parseFloat(data?.split(" ")[0]);
					if (max_x === -1) max_x = parseFloat(data?.split(" ")[0]);
					if (min_y === -1) min_y = parseFloat(data?.split(" ")[1]);
					if (max_y === -1) max_y = parseFloat(data?.split(" ")[1]);
				}

				if (data?.split(" ").length === 2) {
					if (min_x > parseFloat(data?.split(" ")[0])) min_x = parseFloat(data?.split(" ")[0]);
					if (min_y > parseFloat(data?.split(" ")[1])) min_y = parseFloat(data?.split(" ")[1]);

					if (max_x < parseFloat(data?.split(" ")[0])) max_x = parseFloat(data?.split(" ")[0]);
					if (max_y < parseFloat(data?.split(" ")[1])) max_y = parseFloat(data?.split(" ")[1]);
				} else if (data?.split(" ").length === 4) {
					if (min_x > parseFloat(data?.split(" ")[0])) min_x = parseFloat(data?.split(" ")[0]);
					if (min_y > parseFloat(data?.split(" ")[1])) min_y = parseFloat(data?.split(" ")[1]);
					if (min_x > parseFloat(data?.split(" ")[2])) min_x = parseFloat(data?.split(" ")[2]);
					if (min_y > parseFloat(data?.split(" ")[3])) min_y = parseFloat(data?.split(" ")[3]);

					if (max_x < parseFloat(data?.split(" ")[0])) max_x = parseFloat(data?.split(" ")[0]);
					if (max_y < parseFloat(data?.split(" ")[1])) max_y = parseFloat(data?.split(" ")[1]);
					if (max_x < parseFloat(data?.split(" ")[2])) max_x = parseFloat(data?.split(" ")[2]);
					if (max_y < parseFloat(data?.split(" ")[3])) max_y = parseFloat(data?.split(" ")[3]);
				}

				return true;
			});

		min_x -= offset;
		max_x += offset;
		min_y -= offset;
		max_y += offset;

		return [
			[min_x, min_y],
			[max_x, min_y],
			[min_x, max_y],
			[max_x, max_y],
		];
	}, []);

	const getDistanceBetweenTwoComponents = useCallback(
		(component1, component2) => {
			let distance = -1;

			const box_1_coords = getCoordsOfPath(component1);
			const box_2_coords = getCoordsOfPath(component2);

			const isOverlapping =
				box_1_coords
					?.map((coord) => {
						const isInA = coord[0] >= box_2_coords[0][0] && coord[1] >= box_2_coords[0][1];
						const isInB = coord[0] <= box_2_coords[1][0] && coord[1] >= box_2_coords[1][1];
						const isInC = coord[0] >= box_2_coords[2][0] && coord[1] <= box_2_coords[2][1];
						const isInD = coord[0] <= box_2_coords[3][0] && coord[1] <= box_2_coords[3][1];
						return isInA && isInB && isInC && isInD;
					})
					.concat(
						box_2_coords?.map((coord) => {
							const isInA = coord[0] >= box_1_coords[0][0] && coord[1] >= box_1_coords[0][1];
							const isInB = coord[0] <= box_1_coords[1][0] && coord[1] >= box_1_coords[1][1];
							const isInC = coord[0] >= box_1_coords[2][0] && coord[1] <= box_1_coords[2][1];
							const isInD = coord[0] <= box_1_coords[3][0] && coord[1] <= box_1_coords[3][1];
							return isInA && isInB && isInC && isInD;
						})
					)
					.filter((e) => e === true).length !== 0;

			if (isOverlapping) return 1;

			const horizontal_line_possible =
				box_1_coords
					?.map((coord) => {
						return coord[1] >= box_2_coords[0][1] && coord[1] <= box_2_coords[2][1];
					})
					.concat(
						box_2_coords?.map((coord) => {
							return coord[1] >= box_1_coords[0][1] && coord[1] <= box_1_coords[2][1];
						})
					)
					.filter((e) => e === true).length !== 0;

			const vertical_line_possible =
				box_1_coords
					?.map((coord) => {
						return coord[0] >= box_2_coords[0][0] && coord[0] <= box_2_coords[1][0];
					})
					.concat(
						box_2_coords?.map((coord) => {
							return coord[0] >= box_1_coords[0][0] && coord[0] <= box_1_coords[1][0];
						})
					)
					.filter((e) => e === true).length !== 0;

			let dist_x = -1;
			let dist_y = -1;

			if (horizontal_line_possible)
				dist_x = Math.min(Math.abs(box_1_coords[0][0] - box_2_coords[1][0]), Math.abs(box_2_coords[0][0] - box_1_coords[1][0]));
			if (vertical_line_possible)
				dist_y = Math.min(Math.abs(box_1_coords[0][1] - box_2_coords[2][1]), Math.abs(box_2_coords[0][1] - box_1_coords[2][1]));

			distance = dist_x === -1 && dist_y === -1 ? -1 : Math.min(...[dist_x, dist_y].filter((e) => e !== -1));

			if (!horizontal_line_possible && !vertical_line_possible) {
				// Get closest corners
				const corner_distances = box_1_coords?.map((coords1) => {
					return box_2_coords?.map((coords2) => {
						return Math.hypot(Math.abs(coords1[0] - coords2[0]), Math.abs(coords1[1] - coords2[1]));
					});
				});
				distance = Math.min(...corner_distances?.map((arr) => Math.min(...arr)));
			}

			return distance / zoom.current;
		},
		[zoom, getCoordsOfPath]
	);

	const getDistancesBetweenComponents = useCallback(() => {
		try {
			let distances = [];

			Array.from(surfaceMapImageComponentsContainerRef?.current?.children[0]?.children)?.map((_, index) => {
				distances.push([]);
				Array.from(surfaceMapImageComponentsContainerRef?.current?.children[0]?.children)?.map((_, index) => {
					distances[distances.length - 1].push(0);
					return true;
				});
				return true;
			});

			distances = distances.map((array, i) => {
				return array.map((_, j) => {
					if (i === j) return 0;
					return getDistanceBetweenTwoComponents(
						surfaceMapImageComponentsContainerRef?.current?.children[0]?.children[i],
						surfaceMapImageComponentsContainerRef?.current?.children[0]?.children[j]
					);
				});
			});

			return distances;
		} catch {
			return false;
		}
	}, [surfaceMapImageComponentsContainerRef, getDistanceBetweenTwoComponents]);

	const getClosestCluster = useCallback((cluster, clusters, distances) => {
		return clusters
			?.map((e, cluster_index) => {
				if (e === false) return false;
				if (JSON.stringify(cluster) === JSON.stringify(e)) return false;
				return {
					cluster_index,
					min_dist: Math.min(...e?.map((node) => Math.min(...cluster?.map((cluster_node) => distances[cluster_node][node])))),
				};
			})
			.filter((e) => e !== false && e.min_dist !== -1)
			.sort((a, b) => a.min_dist - b.min_dist)?.[0];
	}, []);

	const getClusterBoxes = useCallback(
		(regions_clusters) => {
			return regions_clusters?.map((region_clusters) => {
				region_clusters.clusters = region_clusters?.clusters?.map((cluster) => {
					let min_x = -1;
					let max_x = -1;
					let min_y = -1;
					let max_y = -1;

					cluster?.map((component_index, index) => {
						const coords = getCoordsOfPath(surfaceMapImageComponentsContainerRef.current.children[0].children[component_index]);
						if (index === 0) {
							min_x = coords[0][0];
							max_x = coords[3][0];
							min_y = coords[0][1];
							max_y = coords[3][1];
						} else {
							if (min_x > coords[0][0]) min_x = coords[0][0];
							if (max_x < coords[3][0]) max_x = coords[3][0];
							if (min_y > coords[0][1]) min_y = coords[0][1];
							if (max_y < coords[3][1]) max_y = coords[3][1];
						}
						return true;
					});

					return {
						nodes: cluster,
						box: [
							[min_x, min_y],
							[max_x, min_y],
							[min_x, max_y],
							[max_x, max_y],
						],
					};
				});
				return region_clusters;
			});
		},
		[surfaceMapImageComponentsContainerRef, getCoordsOfPath]
	);

	return { getDistancesBetweenComponents, getClosestCluster, getClusterBoxes };
};
