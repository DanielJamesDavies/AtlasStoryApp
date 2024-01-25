// Packages
import { useContext, useEffect, useCallback, useRef } from "react";

// Components

// Logic

// Context
import { LocationsContext } from "../LocationsContext";
import { FaCircle, FaCrosshairs, FaMapMarkerAlt, FaStar } from "react-icons/fa";

// Services

// Styles

// Assets

export const SurfaceMapPlacesLogic = ({
	surfaceMapContainerRef,
	surfaceMapImageRef,
	surfaceMapImageContainerRef,
	surfaceMapPositioningPlaceRef,
	setSurfaceMapPlaces,
	zoom,
	pointX,
	pointY,
	mapVersionID,
}) => {
	const {
		locations,
		setLocations,
		currentMapLocationId,
		isPositioningSurfaceMapPlace,
		setIsPositioningSurfaceMapPlace,
		positioningPlaceID,
		setPositioningPlaceID,
		isDeletingSurfaceMapComponents,
		isSelectingSurfaceMapComponents,
		setSurfaceMapHoveringRegion,
		setCurrentMapLocationId,
	} = useContext(LocationsContext);

	const clicks = useRef([]);
	const clickTimeout = useRef(false);
	const timeOfLastUpdateRegionNamesOnMap = useRef(false);

	const onClickPlace = useCallback(
		(e) => {
			e.stopPropagation();

			const place_location = e.target.getAttribute("data-location");
			if (!place_location || place_location.length === 0) return false;

			if (isPositioningSurfaceMapPlace || isDeletingSurfaceMapComponents || isSelectingSurfaceMapComponents) return false;

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

			const maxDelta = 400;

			clicks.current.push(Date.now());
			clicks.current = getNewClicks(clicks.current, maxDelta);
			switch (clicks.current.length) {
				case 1:
					clickTimeout.current = setTimeout(() => {
						// Single Click
					}, maxDelta);
					break;
				case 2:
					clearTimeout(clickTimeout.current);
					if (place_location) setCurrentMapLocationId(place_location);
					setSurfaceMapHoveringRegion(false);
					break;
				default:
					break;
			}
		},
		[
			isSelectingSurfaceMapComponents,
			setSurfaceMapHoveringRegion,
			isDeletingSurfaceMapComponents,
			isPositioningSurfaceMapPlace,
			setCurrentMapLocationId,
		]
	);

	const updateSurfaceMapPlaces = useCallback(
		(newLocations) => {
			if (timeOfLastUpdateRegionNamesOnMap.current !== false && Date.now() - timeOfLastUpdateRegionNamesOnMap.current <= 250) return false;

			function getPlaceSymbol(type) {
				switch (type) {
					case "circle":
						return <FaCircle />;
					case "crosshairs":
						return <FaCrosshairs />;
					case "marker":
						return <FaMapMarkerAlt />;
					default:
						return <FaStar />;
				}
			}

			const location = newLocations.find((e) => e?._id === currentMapLocationId);
			if (!location) return false;

			const mapVersion = location?.data?.mapVersions?.find((e) => e?._id === mapVersionID);
			if (!mapVersion) return false;

			let newSurfaceMapPlaces = mapVersion?.places?.map((place, index) => (
				<div
					key={index}
					className={
						"locations-surface-map-place-container locations-surface-map-place-container-" +
						place?.symbol +
						(place?.isMajor ? " locations-surface-map-place-container-is-major" : "")
					}
					style={{ top: place?.position[1] + "px", left: place?.position[0] + "px" }}
					data-location={place?.location}
				>
					<div
						className={"locations-surface-map-place" + (place?.location ? " locations-surface-map-place-with-location" : "")}
						data-location={place?.location}
						onClick={onClickPlace}
					>
						<div className='locations-surface-map-place-symbol' data-location={place?.location} onClick={onClickPlace}>
							{getPlaceSymbol(place?.symbol)}
						</div>
						<div className='locations-surface-map-place-name' data-location={place?.location} onClick={onClickPlace}>
							{place?.name}
						</div>
					</div>
				</div>
			));

			setSurfaceMapPlaces(newSurfaceMapPlaces);
		},
		[setSurfaceMapPlaces, currentMapLocationId, mapVersionID, onClickPlace]
	);

	const surfaceMapPositioningPlaceDot = useRef(false);
	const onMouseMove = useCallback(
		(e) => {
			if (!isPositioningSurfaceMapPlace) return false;

			const imageContainerHeightDelta =
				((surfaceMapImageContainerRef?.current?.clientHeight - surfaceMapImageRef?.current?.clientHeight) * zoom.current) / 2;
			const min_y = -imageContainerHeightDelta - 1 * zoom.current;

			let posX = e?.clientX / zoom.current - pointX.current / zoom.current;
			let posY = e?.clientY / zoom.current - pointY.current / zoom.current;
			if (min_y < 0) {
				posY = e?.clientY / zoom.current + Math.abs(pointY.current - min_y) / zoom.current;
			}
			posX = Math.floor(posX);
			posY = Math.floor(posY);

			if (surfaceMapPositioningPlaceDot.current === false) {
				surfaceMapPositioningPlaceDot.current = document.createElement("div");
				surfaceMapPositioningPlaceDot.current.classList.add("locations-surface-map-positioning-place-dot");
				surfaceMapPositioningPlaceRef.current.appendChild(surfaceMapPositioningPlaceDot.current);
			}

			surfaceMapPositioningPlaceDot.current.style = `top: ${posY}px; left: ${posX}px`;
		},
		[surfaceMapPositioningPlaceRef, isPositioningSurfaceMapPlace, zoom, pointX, pointY, surfaceMapImageContainerRef, surfaceMapImageRef]
	);

	const onMouseClick = useCallback(
		(e) => {
			setIsPositioningSurfaceMapPlace(false);
			setPositioningPlaceID(false);

			if (surfaceMapPositioningPlaceDot?.current && surfaceMapPositioningPlaceDot.current !== false) {
				surfaceMapPositioningPlaceDot.current.remove();
				surfaceMapPositioningPlaceDot.current = false;
			}

			const imageContainerHeightDelta =
				((surfaceMapImageContainerRef?.current?.clientHeight - surfaceMapImageRef?.current?.clientHeight) * zoom.current) / 2;

			const posX = e?.clientX / zoom.current - pointX.current / zoom.current;
			const posY = e?.clientY / zoom.current - pointY.current / zoom.current + imageContainerHeightDelta * -1 * (1 / zoom.current) - 31;

			let newLocations = false;
			setLocations((oldLocations) => {
				newLocations = JSON.parse(JSON.stringify(oldLocations));
				const locationIndex = newLocations.findIndex((e) => e?._id === currentMapLocationId);
				if (locationIndex === -1) return newLocations;
				const versionIndex = newLocations[locationIndex]?.data?.mapVersions.findIndex((e) => e?._id === mapVersionID);
				if (versionIndex === -1) return newLocations;
				const placeIndex = newLocations[locationIndex]?.data?.mapVersions[versionIndex]?.places.findIndex(
					(e) => e?._id === positioningPlaceID
				);
				if (placeIndex === -1) return newLocations;
				newLocations[locationIndex].data.mapVersions[versionIndex].places[placeIndex].position = [posX, posY];
				return newLocations;
			});

			updateSurfaceMapPlaces(newLocations);
		},
		[
			zoom,
			pointX,
			pointY,
			setLocations,
			currentMapLocationId,
			setIsPositioningSurfaceMapPlace,
			positioningPlaceID,
			setPositioningPlaceID,
			updateSurfaceMapPlaces,
			surfaceMapImageRef,
			surfaceMapImageContainerRef,
			mapVersionID,
		]
	);

	useEffect(() => {
		const surfaceMapContainerRefCurrent = surfaceMapContainerRef?.current;
		if (surfaceMapContainerRef?.current) surfaceMapContainerRefCurrent.addEventListener("mousemove", onMouseMove);
		if (surfaceMapContainerRef?.current) surfaceMapContainerRefCurrent.addEventListener("click", onMouseClick);
		return () => {
			surfaceMapContainerRefCurrent?.removeEventListener("mousemove", onMouseMove);
			surfaceMapContainerRefCurrent?.removeEventListener("click", onMouseClick);
		};
	}, [onMouseMove, onMouseClick, surfaceMapContainerRef]);

	useEffect(() => {
		if (!isPositioningSurfaceMapPlace && surfaceMapPositioningPlaceDot?.current && surfaceMapPositioningPlaceDot?.current !== false) {
			surfaceMapPositioningPlaceDot.current.remove();
			surfaceMapPositioningPlaceDot.current = false;
		}
	}, [isPositioningSurfaceMapPlace, surfaceMapPositioningPlaceDot]);

	useEffect(() => {
		updateSurfaceMapPlaces(locations);
	}, [locations, updateSurfaceMapPlaces, mapVersionID]);

	return {};
};
