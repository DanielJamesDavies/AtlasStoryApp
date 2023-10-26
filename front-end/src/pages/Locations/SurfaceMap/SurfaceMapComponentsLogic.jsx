// Packages
import { useContext, useEffect, useState, useCallback } from "react";

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
		isSelectingSurfaceMapComponents,
		regionSelectingSurfaceMapComponentsFor,
		selectedSurfaceMapComponents,
		surfaceMapComponentsList,
		addComponentToSelectedSurfaceMapComponents,
		removeComponentToSelectedSurfaceMapComponents,
	} = useContext(LocationsContext);

	const onClickMapComponent = useCallback(
		(index) => {
			if (!isSelectingSurfaceMapComponents) return false;

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
		},
		[
			isSelectingSurfaceMapComponents,
			surfaceMapImageComponentsContainerRef,
			addComponentToSelectedSurfaceMapComponents,
			removeComponentToSelectedSurfaceMapComponents,
		]
	);

	const onMouseOverMapComponent = useCallback(
		(index) => {
			locations
				?.find((e) => e?._id === currentMapLocationId)
				?.data?.regions?.find((e) => e?._id === surfaceMapComponentsList[index])
				?.components?.map((component_index) => {
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
		[surfaceMapImageComponentsContainerRef, surfaceMapComponentsList, locations, currentMapLocationId]
	);

	const onMouseOutMapComponent = useCallback(
		(index) => {
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
		[surfaceMapImageComponentsContainerRef, surfaceMapComponentsList, locations, currentMapLocationId]
	);

	useEffect(() => {
		function setDefaultPosition() {
			setTimeout(() => {
				if (!surfaceMapImageComponentsContainerRef.current?.children) return false;

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
