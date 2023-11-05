// Packages
import { useContext, useEffect, useCallback, useRef } from "react";

// Components

// Logic

// Context
import { LocationsContext } from "../LocationsContext";

// Services
import getColourTint from "../../../services/GetColourTint";
import { SurfaceMapRegionsClusteringFunctions } from "./SurfaceMapRegionsClusteringFunctions";

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
	getDimensionsZoom,
	max_mobile_width,
	mapVersionID,
}) => {
	const { locations, currentMapLocationId, isSelectingSurfaceMapComponents, surfaceMapComponentsList } = useContext(LocationsContext);
	const { getDistancesBetweenComponents, getClosestCluster, getClusterBoxes } = SurfaceMapRegionsClusteringFunctions({
		surfaceMapImageComponentsContainerRef,
		zoom,
	});

	const prevLocationId = useRef(false);
	const prevRegionNames = useRef(false);
	const prevRegionComponents = useRef(false);
	const updateRegionsNamesTimeout = useRef(false);
	const hasRunIntitialCreateRegionNamesClusters = useRef(false);

	useEffect(() => {
		setRegionNamesHTML(null);
		setRegionNamesTexts(null);
		prevRegionNames.current = false;
		prevRegionComponents.current = false;
		hasRunIntitialCreateRegionNamesClusters.current = false;
	}, [currentMapLocationId, setRegionNamesHTML, setRegionNamesTexts, mapVersionID]);

	const setComponentsRegionIDs = useCallback(
		(isInitial) => {
			const location = locations.find((e) => e?._id === currentMapLocationId);
			const mapVersion = location?.data?.mapVersions.find((e) => e?._id === mapVersionID);
			if (location && surfaceMapComponentsList.length !== 0 && locationMapImage) {
				const interval = setInterval(() => {
					try {
						if (!surfaceMapImageComponentsContainerRef?.current) return false;
						Array.from(surfaceMapImageComponentsContainerRef?.current?.children[0]?.children)?.map((path, index) => {
							const region = mapVersion?.regions?.find((e) => e?._id === surfaceMapComponentsList[index]);
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
			} else {
				setTimeout(() => {
					if (surfaceMapImageComponentsContainerRef?.current?.children[0]?.children) {
						Array.from(surfaceMapImageComponentsContainerRef?.current?.children[0]?.children)?.map((path) => {
							path.style = ``;
							path.classList.remove("locations-surface-map-image-component-in-region");
							path.removeAttribute("data-region-id");
							return true;
						});
					}
				}, 20);

				if (isInitial) {
					setTimeout(() => {
						setComponentsRegionIDs();
					}, 200);
				}
			}
		},
		[surfaceMapComponentsList, surfaceMapImageComponentsContainerRef, locations, currentMapLocationId, locationMapImage, mapVersionID]
	);

	useEffect(() => {
		setComponentsRegionIDs(true);
	}, [
		setComponentsRegionIDs,
		isSelectingSurfaceMapComponents,
		surfaceMapComponentsList,
		surfaceMapImageComponentsContainerRef,
		locations,
		currentMapLocationId,
		locationMapImage,
		mapVersionID,
	]);

	const updateRegionsNamesPosition = useCallback(() => {
		let height_zoom = window?.innerHeight / surfaceMapImageRef?.current?.clientHeight;
		if (window.innerWidth <= max_mobile_width) height_zoom = (window?.innerHeight + 58) / surfaceMapImageRef?.current?.clientHeight;
		const imageContainerHeightDelta =
			((surfaceMapImageContainerRef?.current?.clientHeight - surfaceMapImageRef?.current?.clientHeight) * zoom.current) / 2;
		const min_pointY = (imageContainerHeightDelta / zoom.current) * height_zoom;
		if (Math.sign(min_pointY) === -1) {
			surfaceMapImageRegionsNamesRef.current.style = `transform: translateY(${min_pointY * (1 / height_zoom)}px);`;
		} else {
			surfaceMapImageRegionsNamesRef.current.style = `transform: translateY(0px);`;
		}
	}, [surfaceMapImageContainerRef, surfaceMapImageRef, surfaceMapImageRegionsNamesRef, zoom, max_mobile_width]);

	const getRegionNameSVGStyleValues = useCallback(
		(props) => {
			const { text_svg_height, regionNamesTextBoxHeight } = props;
			return {
				svg_font_size: 4.5,
				svg_letter_spacing: 5.5,
				svg_text_scale: (text_svg_height / regionNamesTextBoxHeight) * zoom.current,
			};
		},
		[zoom]
	);

	const updateRegionNamesTexts = useCallback(
		(location) => {
			const mapVersion = location?.data?.mapVersions.find((e) => e?._id === mapVersionID);
			const newRegionsNamesTexts = regionClusters.current
				?.map((region_clusters) => {
					const region = mapVersion?.regions?.find((e) => e?._id === region_clusters?.region);
					return `<div>${region?.name}</div>`;
				})
				.join("");

			setRegionNamesTexts(newRegionsNamesTexts);
		},
		[setRegionNamesTexts, regionClusters, mapVersionID]
	);

	const updateRegionsNames = useCallback(
		async (regions_to_update) => {
			if (!surfaceMapImageRegionsNamesTextsRef?.current) return false;

			const location = locations.find((e) => e?._id === currentLocationId?.current);
			const mapVersion = location?.data?.mapVersions.find((e) => e?._id === mapVersionID);

			updateRegionNamesTexts(location);

			const regionsNamesTexts = Array.from(surfaceMapImageRegionsNamesTextsRef?.current?.children);

			Array.from(surfaceMapImageRegionsNamesRef?.current?.children)?.map((name_div) => {
				const region_id = name_div?.getAttribute("data-region-id");

				if (regions_to_update && !regions_to_update.includes(region_id)) return false;

				const region = mapVersion?.regions?.find((e) => e?._id === region_id);

				const region_index = parseFloat(name_div?.getAttribute("data-region-index"));
				const regionNamesTextBox = regionsNamesTexts[region_index]?.getBoundingClientRect();
				if (regionNamesTextBox?.width === 0 || regionNamesTextBox?.height === 0) return false;

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

				const { svg_font_size, svg_letter_spacing, svg_text_scale } = getRegionNameSVGStyleValues({
					text_svg_height,
					regionNamesTextBoxHeight: regionNamesTextBox?.height,
				});

				name_div.style = `top: ${a[1]}px; left: ${Math.ceil(a[0])}px;width: ${full_width}px; height: ${full_height}px;`;
				name_div.children[0].style = `overflow: visible; width: 100%; max-height: 100%; font-size: ${svg_font_size}px; margin-left: ${
					full_height / 15
				}px`;
				name_div.children[0].setAttribute("viewBox", `0 0 ${text_svg_width} ${text_svg_height}`);
				name_div.children[0].children[0].style = `fill: #fff; letter-spacing: ${svg_letter_spacing}px; scale: ${svg_text_scale}; transform-origin: center`;
				name_div.children[0].children[0].innerHTML = region?.name || "";

				return true;
			});
		},
		[
			surfaceMapImageRegionsNamesRef,
			surfaceMapImageRegionsNamesTextsRef,
			getRegionNameSVGStyleValues,
			locations,
			currentLocationId,
			updateRegionNamesTexts,
			mapVersionID,
		]
	);

	useEffect(() => {
		function runUpdateRegionNames() {
			if (updateRegionsNamesTimeout.current !== false) return false;

			const location = locations?.find((e) => e?._id === currentLocationId.current);
			const mapVersion = location?.data?.mapVersions.find((e) => e?._id === mapVersionID);
			if (!location || !mapVersion) return setTimeout(() => runUpdateRegionNames(), 100);

			if (prevRegionNames?.current === false) {
				prevRegionNames.current = mapVersion?.regions?.map(() => 0);
			}

			const region_differences = mapVersion?.regions
				?.map((region, index) => {
					if (JSON.stringify(region) !== JSON.stringify(prevRegionNames.current?.[index])) {
						return region?._id;
					}
					return false;
				})
				?.filter((e) => e !== false);

			setTimeout(() => updateRegionsNames(region_differences), 5);

			updateRegionsNamesTimeout.current = setTimeout(() => {
				updateRegionsNames(region_differences);
				updateRegionsNamesTimeout.current = false;
			}, 50);

			prevRegionNames.current = JSON.parse(JSON.stringify(mapVersion?.regions));
		}
		runUpdateRegionNames();
	}, [locations, currentLocationId, updateRegionsNames, mapVersionID]);

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

	const createRegionsNames = useCallback(async () => {
		const location = locations.find((e) => e?._id === currentLocationId?.current);
		const mapVersion = location?.data?.mapVersions.find((e) => e?._id === mapVersionID);

		updateRegionNamesTexts(location);

		updateRegionsNamesPosition();

		await new Promise((resolve) => setTimeout(resolve, 5));

		const regionsNamesTexts = Array.from(surfaceMapImageRegionsNamesTextsRef.current.children);

		let new_region_names_html = ``;

		regionClusters.current?.map((region_clusters, region_index) => {
			const region = mapVersion?.regions?.find((e) => e?._id === region_clusters?.region);
			region_clusters?.clusters?.map((cluster) => {
				let [a, b, c] = cluster.box;
				a = a.map((e) => e);
				b = b.map((e) => e);
				c = c.map((e) => e);

				const regionNamesTextBox = regionsNamesTexts[region_index]?.getBoundingClientRect();

				const { width_zoom, height_zoom } = getDimensionsZoom();
				const regionNamesTextBoxWidth = (regionNamesTextBox?.width / zoom.current) * (1 / Math.max(width_zoom, height_zoom));
				const regionNamesTextBoxHeight = (regionNamesTextBox?.height / zoom.current) * (1 / Math.max(width_zoom, height_zoom));

				if (regionNamesTextBoxWidth === 0 || regionNamesTextBox?.height === 0) {
					new_region_names_html += `
					<div 
						class='locations-surface-map-image-region-name'
						style="top: 0px; left: 0px; width: 0px; height: 0px;"
						data-box-a="${cluster.box[0]}"
						data-box-b="${cluster.box[1]}"
						data-box-c="${cluster.box[2]}"
						data-region-index="${region_index}"
						data-region-id="${region_clusters?.region}"
					>
						<svg
							viewBox='0 0 0 0'
							style='overflow: visible; width: 100%; font-size: 0px; margin-left: 0px'
							dominant-baseline="middle" text-anchor="middle"
						>
							<text text-anchor="middle" x='50%' y='50%' style='fill: #fff; letter-spacing:0px; scale: 0; transform-origin: center'></text>
						</svg>
					</div>`;
					return false;
				}

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

				const { svg_font_size, svg_letter_spacing, svg_text_scale } = getRegionNameSVGStyleValues({
					text_svg_height,
					regionNamesTextBoxHeight,
				});

				new_region_names_html += `
					<div 
						class='locations-surface-map-image-region-name'
						style="top: ${a[1]}px; left: ${Math.ceil(a[0])}px;width: ${full_width}px; height: ${full_height}px;"
						data-box-a="${cluster.box[0]}"
						data-box-b="${cluster.box[1]}"
						data-box-c="${cluster.box[2]}"
						data-region-index="${region_index}"
						data-region-id="${region_clusters?.region}"
					>
						<svg
							viewBox='0 0 ${text_svg_width} ${text_svg_height}'
							style='overflow: visible; width: 100%; font-size: ${svg_font_size}px; margin-left: ${full_height / 15}px'
							dominant-baseline="middle" text-anchor="middle"
						>
							<text text-anchor="middle" x='50%' y='50%' style='fill: #fff; letter-spacing: ${svg_letter_spacing}px; scale: ${svg_text_scale}; transform-origin: center'>
								${region?.name}
							</text>
						</svg>
					</div>`;

				return true;
			});
			return true;
		});

		setRegionNamesHTML(new_region_names_html);

		setTimeout(() => updateRegionsNames(), 10);
	}, [
		locations,
		currentLocationId,
		regionClusters,
		setRegionNamesHTML,
		surfaceMapImageRegionsNamesTextsRef,
		updateRegionsNamesPosition,
		zoom,
		getDimensionsZoom,
		getRegionNameSVGStyleValues,
		updateRegionsNames,
		updateRegionNamesTexts,
		mapVersionID,
	]);

	const createRegionNamesClusters = useCallback(() => {
		if (!locationMapImage) return false;

		const { width_zoom, height_zoom } = getDimensionsZoom();
		if (zoom.current > Math.max(width_zoom, height_zoom)) return false;

		const location = locations.find((e) => e?._id === currentLocationId?.current);
		const mapVersion = location?.data?.mapVersions.find((e) => e?._id === mapVersionID);

		// Get Distances Between Components
		const distances = getDistancesBetweenComponents();
		if (!distances) return false;

		// Create Clusters of Components for Each Region
		let regions_clusters = [];
		mapVersion?.regions?.map((region, region_index) => {
			regions_clusters.push({ region: region?._id, clusters: [[region?.components[0]]] });
			regions_clusters[region_index].clusters = region?.components.map((e) => [e]);

			const max_distance = 18;
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

		regions_clusters = getClusterBoxes(regions_clusters);

		regionClusters.current = regions_clusters;

		setTimeout(() => {
			createRegionsNames();
		}, 100);
	}, [
		getDistancesBetweenComponents,
		locations,
		currentLocationId,
		createRegionsNames,
		regionClusters,
		locationMapImage,
		zoom,
		getDimensionsZoom,
		getClosestCluster,
		getClusterBoxes,
		mapVersionID,
	]);

	useEffect(() => {
		function runCreateRegionNamesClusters() {
			if (!locationMapImage) return false;

			const location = locations?.find((e) => e?._id === currentLocationId.current);
			const mapVersion = location?.data?.mapVersions.find((e) => e?._id === mapVersionID);
			if (!location || !mapVersion) return false;

			const regionComponents = mapVersion?.regions?.map((e) => {
				return { _id: e?._id, components: e?.components };
			});

			if (prevRegionComponents?.current === false || prevLocationId.current !== currentLocationId.current) {
				prevRegionComponents.current = regionComponents?.map(() => 0);
			}

			const region_differences = regionComponents
				?.map((region, index) => {
					if (JSON.stringify(region) !== JSON.stringify(prevRegionComponents.current?.[index])) {
						return region?._id;
					}
					return false;
				})
				?.filter((e) => e !== false);

			if (region_differences.length === 0) return false;

			if (hasRunIntitialCreateRegionNamesClusters.current === false) {
				hasRunIntitialCreateRegionNamesClusters.current = true;
				setTimeout(() => createRegionNamesClusters(), 300);
			} else {
				setTimeout(() => createRegionNamesClusters(), 5);
			}

			prevRegionComponents.current = regionComponents;
			prevLocationId.current = currentLocationId.current;
		}

		runCreateRegionNamesClusters();
	}, [
		getDistancesBetweenComponents,
		locations,
		currentLocationId,
		createRegionsNames,
		regionClusters,
		surfaceMapImageComponentsContainerRef,
		locationMapImage,
		zoom,
		getDimensionsZoom,
		hasRunIntitialCreateRegionNamesClusters,
		getClosestCluster,
		createRegionNamesClusters,
		mapVersionID,
	]);
};
