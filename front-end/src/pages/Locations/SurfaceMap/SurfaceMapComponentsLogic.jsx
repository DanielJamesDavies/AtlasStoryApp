// Packages
import { useContext, useEffect, useState, useCallback, useRef } from "react";

// Components

// Logic

// Context
import { LocationsContext } from "../LocationsContext";

// Services

// Styles

// Assets

export const SurfaceMapComponentsLogic = ({ surfaceMapImageComponentsContainerRef, surfaceMapImageRef, zoom, locationMapImage }) => {
	const {
		locations,
		currentMapLocationId,
		setCurrentMapLocationId,
		isSelectingSurfaceMapComponents,
		regionSelectingSurfaceMapComponentsFor,
		selectedSurfaceMapComponents,
		surfaceMapComponentsList,
		setSurfaceMapHoveringRegion,
		addComponentToSelectedSurfaceMapComponents,
		removeComponentToSelectedSurfaceMapComponents,
	} = useContext(LocationsContext);

	const clicks = useRef([]);
	const clickTimeout = useRef(false);
	const onClickMapComponent = useCallback(
		(index) => {
			function getNewClicks(oldClicks, maxDelta) {
				let newClicks = JSON.parse(JSON.stringify(oldClicks));

				let startIndex = 0;
				newClicks.map((curr_click, index) => {
					if (index === newClicks.length - 1) return false;
					const next_click = newClicks[index + 1];
					if (next_click - curr_click > maxDelta) startIndex = index + 1;
					return true;
				});

				return newClicks.filter((_, index) => index >= startIndex);
			}

			if (isSelectingSurfaceMapComponents) {
				if (
					Array.from(surfaceMapImageComponentsContainerRef?.current?.children[0]?.children[index].classList).includes(
						"locations-surface-map-image-component-in-region"
					)
				) {
					surfaceMapImageComponentsContainerRef?.current?.children[0]?.children[index].classList.remove(
						"locations-surface-map-image-component-in-region"
					);
					surfaceMapImageComponentsContainerRef?.current?.children[0]?.children[index].classList.remove(
						"locations-surface-map-image-component-selected"
					);
					removeComponentToSelectedSurfaceMapComponents(index);
					return true;
				}

				if (
					!Array.from(surfaceMapImageComponentsContainerRef?.current?.children[0]?.children[index].classList).includes(
						"locations-surface-map-image-component-selected"
					)
				) {
					surfaceMapImageComponentsContainerRef?.current?.children[0]?.children[index].classList.add(
						"locations-surface-map-image-component-selected"
					);
					addComponentToSelectedSurfaceMapComponents(index);
				} else {
					surfaceMapImageComponentsContainerRef?.current?.children[0]?.children[index].classList.remove(
						"locations-surface-map-image-component-selected"
					);
					removeComponentToSelectedSurfaceMapComponents(index);
				}
				return false;
			}

			const maxDelta = 400;

			clicks.current.push(Date.now());
			clicks.current = getNewClicks(clicks.current, maxDelta);
			switch (clicks.current.length / 2) {
				case 1:
					clickTimeout.current = setTimeout(() => {
						// Single Click
					}, maxDelta);
					break;
				case 2:
					clearTimeout(clickTimeout.current);
					const location = locations.find((e) => e?._id === currentMapLocationId);
					const region_id = surfaceMapImageComponentsContainerRef?.current?.children[0]?.children[index].getAttribute("data-region-id");
					const region = location?.data?.regions?.find((e) => e?._id === region_id);
					if (region?.location) setCurrentMapLocationId(region?.location);
					break;
				default:
					break;
			}
		},
		[
			isSelectingSurfaceMapComponents,
			surfaceMapImageComponentsContainerRef,
			addComponentToSelectedSurfaceMapComponents,
			removeComponentToSelectedSurfaceMapComponents,
			locations,
			currentMapLocationId,
			setCurrentMapLocationId,
		]
	);

	const onMouseOverMapComponent = useCallback(
		(index) => {
			const region = locations
				?.find((e) => e?._id === currentMapLocationId)
				?.data?.regions?.find((e) => e?._id === surfaceMapComponentsList[index]);
			setSurfaceMapHoveringRegion(region?._id);
			region?.components?.map((component_index) => {
				if (
					!Array.from(surfaceMapImageComponentsContainerRef?.current?.children[0]?.children[component_index].classList).includes(
						"locations-surface-map-image-component-hovering-over"
					)
				) {
					surfaceMapImageComponentsContainerRef?.current?.children[0]?.children[component_index].classList.add(
						"locations-surface-map-image-component-hovering-over"
					);
				}
				return true;
			});
		},
		[surfaceMapImageComponentsContainerRef, surfaceMapComponentsList, locations, currentMapLocationId, setSurfaceMapHoveringRegion]
	);

	const onMouseOutMapComponent = useCallback(
		(index) => {
			setSurfaceMapHoveringRegion(false);
			locations
				?.find((e) => e?._id === currentMapLocationId)
				?.data?.regions?.find((e) => e?._id === surfaceMapComponentsList[index])
				?.components?.map((component_index) => {
					if (
						Array.from(surfaceMapImageComponentsContainerRef?.current?.children[0]?.children[component_index].classList).includes(
							"locations-surface-map-image-component-hovering-over"
						)
					) {
						surfaceMapImageComponentsContainerRef?.current?.children[0]?.children[component_index].classList.remove(
							"locations-surface-map-image-component-hovering-over"
						);
					}
					return true;
				});
		},
		[surfaceMapImageComponentsContainerRef, surfaceMapComponentsList, locations, currentMapLocationId, setSurfaceMapHoveringRegion]
	);

	useEffect(() => {
		function setDefaultPosition() {
			setTimeout(() => {
				if (!surfaceMapImageComponentsContainerRef.current?.children) return false;

				try {
					const svg_width = surfaceMapImageComponentsContainerRef.current?.children[0].getAttribute("width");
					const image_width = surfaceMapImageRef?.current?.clientWidth;
					const image_height = surfaceMapImageRef?.current?.clientHeight;

					const max_component_width = Math.floor(image_width * (zoom.current / 1)) - 2;
					const max_component_height = Math.floor(image_height * (zoom.current / 1)) - 2;

					Array.from(surfaceMapImageComponentsContainerRef?.current?.children[0]?.children)?.map((path) => {
						let { width, height } = path.getClientRects()[0];
						width *= image_width / svg_width;
						height *= image_width / svg_width;

						path.classList.add("locations-surface-map-image-component");

						if (width > max_component_width && height > max_component_height) {
							path.classList.add("locations-surface-map-image-component-delete");
						} else if (JSON.stringify(path.getAttribute("fill")) !== JSON.stringify("rgb(255,255,255)")) {
							path.classList.add("locations-surface-map-image-component-delete");
						}

						return true;
					});
					Array.from(document.getElementsByClassName("locations-surface-map-image-component-delete")).map((path) => path.remove());

					Array.from(surfaceMapImageComponentsContainerRef?.current?.children[0]?.children)?.map((path, index) => {
						path.addEventListener("click", () => onClickMapComponent(index));
						path.addEventListener("mouseover", () => onMouseOverMapComponent(index));
						path.addEventListener("mouseout", () => onMouseOutMapComponent(index));
						return true;
					});
				} catch {}
			}, 50);
		}
		setDefaultPosition();
	}, [
		locationMapImage,
		onClickMapComponent,
		onMouseOutMapComponent,
		onMouseOverMapComponent,
		surfaceMapImageComponentsContainerRef,
		surfaceMapImageRef,
		zoom,
	]);

	useEffect(() => {
		try {
			Array.from(surfaceMapImageComponentsContainerRef?.current?.children[0]?.children)?.map((path, index) => {
				let new_path = path.cloneNode(true);
				path.parentNode.replaceChild(new_path, path);
				if (isSelectingSurfaceMapComponents) new_path.addEventListener("click", () => onClickMapComponent(index));
				new_path.addEventListener("mouseover", () => onMouseOverMapComponent(index));
				new_path.addEventListener("mouseout", () => onMouseOutMapComponent(index));
				return true;
			});
		} catch {}
	}, [
		isSelectingSurfaceMapComponents,
		surfaceMapImageComponentsContainerRef,
		onClickMapComponent,
		onMouseOverMapComponent,
		onMouseOutMapComponent,
	]);

	useEffect(() => {
		try {
			Array.from(surfaceMapImageComponentsContainerRef?.current?.children[0]?.children)?.map((path, index) => {
				if (selectedSurfaceMapComponents.includes(index)) path.classList.add("locations-surface-map-image-component-selected");
				return true;
			});
		} catch {}
	}, [selectedSurfaceMapComponents, surfaceMapImageComponentsContainerRef]);

	const [surfaceMapImageComponentsStyles, setSurfaceMapImageComponentsStyles] = useState({});
	useEffect(() => {
		let newSurfaceMapImageComponentsStyles = {};
		const region = locations
			?.find((e) => e?._id === currentMapLocationId)
			?.data?.regions?.find((e) => e?._id === regionSelectingSurfaceMapComponentsFor);
		if (region?.colour) newSurfaceMapImageComponentsStyles["--regionSelectingForColour"] = region?.colour;
		setSurfaceMapImageComponentsStyles(newSurfaceMapImageComponentsStyles);
	}, [setSurfaceMapImageComponentsStyles, regionSelectingSurfaceMapComponentsFor, locations, currentMapLocationId]);

	return { surfaceMapImageComponentsStyles };
};
