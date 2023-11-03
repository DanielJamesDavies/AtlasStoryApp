// Packages
import { useContext, useEffect, useCallback, useRef } from "react";

// Components

// Logic

// Context
import { LocationsContext } from "../LocationsContext";

// Services
import getColourTint from "../../../services/GetColourTint";

// Styles

// Assets

export const SurfaceMapRegionsLogic = ({
	locationMapImage,
	surfaceMapImageRef,
	surfaceMapImageComponentsContainerRef,
	surfaceMapImageContainerRef,
	surfaceMapImageRegionsNamesRef,
	surfaceMapImageRegionsNamesTextsRef,
	zoom,
	regionClusters,
	currentLocationId,
	setRegionNamesTexts,
	setRegionNamesHTML,
}) => {
	const { locations, currentMapLocationId, isSelectingSurfaceMapComponents, surfaceMapComponentsList } = useContext(LocationsContext);

	const max_mobile_width = 750;

	const getDimensionsZoom = useCallback(() => {
		let width_zoom = window?.innerWidth / surfaceMapImageRef?.current?.clientWidth;
		let height_zoom = window?.innerHeight / surfaceMapImageRef?.current?.clientHeight;
		if (window.innerWidth <= max_mobile_width) height_zoom = (window?.innerHeight - 58) / surfaceMapImageRef?.current?.clientHeight;
		return { width_zoom, height_zoom };
	}, [surfaceMapImageRef]);

	const updateRegionsNamesInterval = useRef();

	useEffect(() => {
		setRegionNamesHTML(null);
		setRegionNamesTexts(null);
		if (updateRegionsNamesInterval.current !== false) {
			clearInterval(updateRegionsNamesInterval.current);
			updateRegionsNamesInterval.current = false;
		}
	}, [currentMapLocationId, setRegionNamesHTML, setRegionNamesTexts, updateRegionsNamesInterval]);

	useEffect(() => {
		const location = locations.find((e) => e?._id === currentMapLocationId);
		if (location && surfaceMapComponentsList.length !== 0 && locationMapImage) {
			const interval = setInterval(() => {
				try {
					if (!surfaceMapImageComponentsContainerRef?.current) return false;
					Array.from(surfaceMapImageComponentsContainerRef?.current?.children[0]?.children)?.map((path, index) => {
						const region = location?.data?.regions?.find((e) => e?._id === surfaceMapComponentsList[index]);
						if (!region || surfaceMapComponentsList[index] === false || surfaceMapComponentsList[index] === undefined) {
							path.style = ``;
							path.classList.remove("locations-surface-map-image-component-in-region");
							path.removeAttribute("data-region-id");
							return true;
						}
						path.style = `--regionColour: ${region?.colour}; --regionColourTint: ${getColourTint(region?.colour, 10)}`;
						path.setAttribute("data-region-id", region?._id);
						path.classList.add("locations-surface-map-image-component-in-region");
						return true;
					});
				} catch {}
			}, 25);
			setTimeout(() => {
				clearInterval(interval);
			}, 300);
		}
	}, [
		isSelectingSurfaceMapComponents,
		surfaceMapComponentsList,
		surfaceMapImageComponentsContainerRef,
		locations,
		currentMapLocationId,
		locationMapImage,
	]);

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
				data = data.trim();

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

	const updateRegionsNamesPosition = useCallback(() => {
		const max_mobile_width = 750;
		let height_zoom = window?.innerHeight / surfaceMapImageRef?.current?.clientHeight;
		if (window.innerWidth <= max_mobile_width) height_zoom = (window?.innerHeight + 58) / surfaceMapImageRef?.current?.clientHeight;
		const imageContainerHeightDelta =
			((surfaceMapImageContainerRef?.current?.clientHeight - surfaceMapImageRef?.current?.clientHeight) * zoom.current) / 2;
		const min_pointY = (imageContainerHeightDelta / zoom.current) * height_zoom;
		if (Math.sign(min_pointY) === -1) {
			surfaceMapImageRegionsNamesRef.current.style = `transform: translateY(${min_pointY * (1 / height_zoom)}px)`;
		} else {
			surfaceMapImageRegionsNamesRef.current.style = `transform: translateY(0px)`;
		}
	}, [surfaceMapImageContainerRef, surfaceMapImageRef, surfaceMapImageRegionsNamesRef, zoom]);

	const createRegionsNames = useCallback(async () => {
		const location = locations.find((e) => e?._id === currentLocationId?.current);

		const newRegionsNamesTexts = regionClusters.current
			?.map((region_clusters) => {
				const region = location?.data?.regions?.find((e) => e?._id === region_clusters?.region);
				return `<div>${region?.name}</div>`;
			})
			.join("");

		setRegionNamesTexts(newRegionsNamesTexts);

		updateRegionsNamesPosition();

		await new Promise((resolve) => setTimeout(resolve, 5));

		const regionsNamesTexts = Array.from(surfaceMapImageRegionsNamesTextsRef.current.children);

		let new_region_names_html = ``;

		regionClusters.current?.map((region_clusters, region_index) => {
			const region = location?.data?.regions?.find((e) => e?._id === region_clusters?.region);
			region_clusters?.clusters?.map((cluster) => {
				let [a, b, c] = cluster.box;
				a = a.map((e) => e);
				b = b.map((e) => e);
				c = c.map((e) => e);

				const regionNamesTextBox = regionsNamesTexts[region_index]?.getBoundingClientRect();

				const { width_zoom, height_zoom } = getDimensionsZoom();
				const regionNamesTextBoxWidth = (regionNamesTextBox?.width / zoom.current) * (1 / Math.max(width_zoom, height_zoom));
				const regionNamesTextBoxHeight = (regionNamesTextBox?.height / zoom.current) * (1 / Math.max(width_zoom, height_zoom));

				if (regionNamesTextBoxWidth === 0 || regionNamesTextBox?.height === 0) return false;

				const full_width = Math.ceil(b[0] - a[0]);
				const full_height = Math.ceil(c[1] - a[1]);

				let text_svg_width = 0;
				let text_svg_height = 0;
				if (full_width >= full_height) {
					text_svg_width = full_width;
					text_svg_height = full_width * (regionNamesTextBoxHeight / regionNamesTextBoxWidth);
				} else {
					text_svg_width = full_height * (regionNamesTextBoxWidth / regionNamesTextBoxHeight);
					text_svg_height = full_height;
				}

				new_region_names_html += `
					<div 
						class='locations-surface-map-image-region-name'
						style="top: ${a[1]}px; left: ${Math.ceil(a[0])}px;width: ${full_width}px; height: ${full_height}px;"
						data-box-a="${cluster.box[0]}"
						data-box-b="${cluster.box[1]}"
						data-box-c="${cluster.box[2]}"
						data-region-index="${region_index}"
					>
						<svg
							viewBox='0 0 ${text_svg_width} ${text_svg_height}'
							style='overflow: visible; width: 100%; font-size: ${Math.max(
								2,
								Math.min(26 / zoom.current, 5.5 * zoom.current * (text_svg_height / regionNamesTextBoxHeight))
							)}px'
							dominant-baseline="middle" text-anchor="middle"
						>
							<text x='50%' y='50%' style='fill: #fff; letter-spacing: ${Math.min(
								60 / zoom.current,
								5 * zoom.current * (text_svg_height / regionNamesTextBoxHeight)
							)}px'>
								${region?.name}
							</text>
						</svg>
					</div>`;

				return true;
			});
			return true;
		});

		setRegionNamesHTML(new_region_names_html);
	}, [
		locations,
		currentLocationId,
		regionClusters,
		setRegionNamesHTML,
		setRegionNamesTexts,
		surfaceMapImageRegionsNamesTextsRef,
		updateRegionsNamesPosition,
		zoom,
		getDimensionsZoom,
	]);

	const updateRegionsNames = useCallback(async () => {
		if (!surfaceMapImageRegionsNamesTextsRef?.current) return false;

		const regionsNamesTexts = Array.from(surfaceMapImageRegionsNamesTextsRef?.current?.children);

		Array.from(surfaceMapImageRegionsNamesRef?.current?.children)?.map((name_div) => {
			const a = name_div
				?.getAttribute("data-box-a")
				.split(",")
				?.map((e) => parseFloat(e));
			const b = name_div
				?.getAttribute("data-box-b")
				.split(",")
				?.map((e) => parseFloat(e));
			const c = name_div
				?.getAttribute("data-box-c")
				.split(",")
				?.map((e) => parseFloat(e));
			const region_index = parseFloat(name_div?.getAttribute("data-region-index"));

			const regionNamesTextBox = regionsNamesTexts[region_index]?.getBoundingClientRect();

			if (regionNamesTextBox?.width === 0 || regionNamesTextBox?.height === 0) return false;

			const full_width = Math.ceil(b[0] - a[0]);
			const full_height = Math.ceil(c[1] - a[1]);

			let text_svg_width = 0;
			let text_svg_height = 0;
			if (full_width >= full_height) {
				text_svg_width = full_width;
				text_svg_height = full_width * (regionNamesTextBox?.height / regionNamesTextBox?.width);
			} else {
				text_svg_width = full_height * (regionNamesTextBox?.width / regionNamesTextBox?.height);
				text_svg_height = full_height;
			}

			name_div.style = `top: ${a[1]}px; left: ${Math.ceil(a[0])}px;width: ${full_width}px; height: ${full_height}px;`;
			name_div.children[0].style = `overflow: visible; width: 100%; max-height: 100%; font-size: ${Math.max(
				4,
				4.5 * zoom.current * (text_svg_width / regionNamesTextBox?.width)
			)}px`;
			name_div.children[0].setAttribute("viewBox", `0 0 ${text_svg_width} ${text_svg_height}`);
			name_div.children[0].children[0].style = `fill: #fff; letter-spacing: ${Math.min(
				60 / zoom.current,
				5 * zoom.current * (text_svg_height / regionNamesTextBox?.height)
			)}px`;

			return true;
		});
	}, [surfaceMapImageRegionsNamesRef, surfaceMapImageRegionsNamesTextsRef, zoom]);

	const onResize = useCallback(() => {
		updateRegionsNames();
		setTimeout(() => updateRegionsNames(), 10);

		updateRegionsNamesPosition();
	}, [updateRegionsNames, updateRegionsNamesPosition]);

	useEffect(() => {
		window.addEventListener("resize", onResize);
		return () => {
			window.removeEventListener("resize", onResize);
		};
	}, [onResize]);

	useEffect(() => {
		updateRegionsNames();
	}, [locations, updateRegionsNames]);

	const timeOfLastUpdateRegionNamesOnMap = useRef(false);

	useEffect(() => {
		function getClosestCluster(cluster, clusters, distances) {
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
		}

		function updateRegionNamesOnMap() {
			if (!locationMapImage) return false;

			const { width_zoom, height_zoom } = getDimensionsZoom();
			if (zoom.current > Math.max(width_zoom, height_zoom)) return false;

			if (timeOfLastUpdateRegionNamesOnMap.current !== false && Date.now() - timeOfLastUpdateRegionNamesOnMap.current <= 4000) return false;

			timeOfLastUpdateRegionNamesOnMap.current = Date.now();

			const location = locations.find((e) => e?._id === currentLocationId?.current);

			// Get Distances Between Components
			const distances = getDistancesBetweenComponents();
			if (!distances) return false;

			// Create Clusters of Components for Each Region
			let regions_clusters = [];
			location?.data?.regions?.map((region, region_index) => {
				regions_clusters.push({ region: region?._id, clusters: [[region?.components[0]]] });
				regions_clusters[region_index].clusters = region?.components.map((e) => [e]);

				const max_distance = 25;
				let noChangesCount = 0;
				while (noChangesCount < 2) {
					noChangesCount += 1;

					for (let i = 0; i < regions_clusters[region_index].clusters.length; i++) {
						const closest_cluster = getClosestCluster(
							regions_clusters[region_index].clusters[i],
							regions_clusters[region_index].clusters,
							distances
						);

						if (closest_cluster && closest_cluster.min_dist <= max_distance) {
							noChangesCount = 0;

							// Fuse clusters
							regions_clusters[region_index].clusters[closest_cluster?.cluster_index] = regions_clusters[region_index].clusters[
								closest_cluster?.cluster_index
							].concat(regions_clusters[region_index].clusters[i]);

							regions_clusters[region_index].clusters[i] = false;
							regions_clusters[region_index].clusters = regions_clusters[region_index].clusters.filter((e) => e !== false);
							break;
						}
					}
				}
				return true;
			});

			regions_clusters = regions_clusters?.map((region_clusters) => {
				region_clusters.clusters = region_clusters?.clusters?.map((cluster) => {
					let min_x = -1;
					let max_x = -1;
					let min_y = -1;
					let max_y = -1;

					cluster?.map((cluster_index, index) => {
						const coords = getCoordsOfPath(surfaceMapImageComponentsContainerRef.current.children[0].children[cluster_index]);
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

			regionClusters.current = regions_clusters;

			setTimeout(() => {
				createRegionsNames();
			}, 100);

			updateRegionsNamesInterval.current = setInterval(() => {
				updateRegionsNames();
			}, 750);
		}

		setTimeout(() => updateRegionNamesOnMap(), 300);
	}, [
		getDistancesBetweenComponents,
		locations,
		currentLocationId,
		getCoordsOfPath,
		createRegionsNames,
		updateRegionsNames,
		regionClusters,
		surfaceMapImageComponentsContainerRef,
		locationMapImage,
		zoom,
		getDimensionsZoom,
	]);

	return { updateRegionsNames };
};
