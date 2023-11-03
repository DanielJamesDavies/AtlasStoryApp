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
}) => {
	const {
		locations,
		setLocations,
		currentMapLocationId,
		isPositioningSurfaceMapPlace,
		setIsPositioningSurfaceMapPlace,
		positioningPlaceID,
		setPositioningPlaceID,
	} = useContext(LocationsContext);

	const timeOfLastUpdateRegionNamesOnMap = useRef(false);

	const updateSurfaceMapPlaces = useCallback(
		(newLocations) => {
			if (timeOfLastUpdateRegionNamesOnMap.current !== false && Date.now() - timeOfLastUpdateRegionNamesOnMap.current <= 1000) return false;

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

			let newSurfaceMapPlaces = location?.data?.places?.map((place, index) => (
				<div
					key={index}
					className={
						"locations-surface-map-place-container locations-surface-map-place-container-" +
						place?.symbol +
						(place?.isMajor ? " locations-surface-map-place-container-is-major" : "")
					}
					style={{ top: place?.position[1] + "px", left: place?.position[0] + "px" }}
				>
					<div className='locations-surface-map-place'>
						<div className='locations-surface-map-place-symbol'>{getPlaceSymbol(place?.symbol)}</div>
						<div className='locations-surface-map-place-name'>{place?.name}</div>
					</div>
				</div>
			));

			setSurfaceMapPlaces(newSurfaceMapPlaces);
		},
		[setSurfaceMapPlaces, currentMapLocationId]
	);

	const surfaceMapPositioningPlaceDot = useRef(false);
	const onMouseMove = useCallback(
		(e) => {
			if (!isPositioningSurfaceMapPlace) return false;

			const posX = e?.clientX / zoom.current - pointX.current / zoom.current;
			const posY = e?.clientY / zoom.current - pointY.current / zoom.current;

			if (surfaceMapPositioningPlaceDot.current === false) {
				surfaceMapPositioningPlaceDot.current = document.createElement("div");
				surfaceMapPositioningPlaceDot.current.classList.add("locations-surface-map-positioning-place-dot");
				surfaceMapPositioningPlaceRef.current.appendChild(surfaceMapPositioningPlaceDot.current);
			}

			surfaceMapPositioningPlaceDot.current.style = `top: ${posY}px; left: ${posX}px`;
		},
		[surfaceMapPositioningPlaceRef, isPositioningSurfaceMapPlace, zoom, pointX, pointY]
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
				const placeIndex = newLocations[locationIndex]?.data?.places.findIndex((e) => e?._id === positioningPlaceID);
				if (placeIndex === -1) return newLocations;
				newLocations[locationIndex].data.places[placeIndex].position = [posX, posY];
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
	}, [locations, updateSurfaceMapPlaces]);

	return {};
};
