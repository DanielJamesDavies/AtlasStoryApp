// Packages
import { useContext, useEffect, useState, useRef } from "react";
import { Vector3 } from "three";

// Components
import { StarCluster } from "./StarCluster/StarCluster";
import { StarSystem } from "./StarSystem/StarSystem";
import { Star } from "./Star/Star";
import { Planet } from "./Planet/Planet";
import { Moon } from "./Moon/Moon";

// Logic

// Context
import { UnitPageContext } from "../../../../UnitPageContext";
import { StoryContext } from "../../../../../../context/StoryContext";

// Services
import { HierarchyFunctions } from "../HierarchyFunctions";

// Styles

// Assets

export const Scene = ({ camera }) => {
	const { unit } = useContext(UnitPageContext);
	const { story, locations } = useContext(StoryContext);
	const { getItemFromIdInHierarchy } = HierarchyFunctions();
	const [scene, setScene] = useState(null);
	const [hasInitializedScenes, setHasInitializedScenes] = useState(false);

	const currSceneLocationId = useRef(false);

	const scenes = useRef([
		{ type: "starCluster", scene: StarCluster },
		{ type: "starSystem", scene: StarSystem },
		{ type: "star", scene: Star },
		{ type: "planet", scene: Planet },
		{ type: "moon", scene: Moon },
	]);

	const scenesChangePlayerInitial = useRef([
		{
			type: "starCluster",
			position: [-22, -2, 17],
			rotation: [8 * (Math.PI / 180), 300 * (Math.PI / 180), Math.PI / 2],
		},
		{
			type: "starSystem",
			position: [-6.5, -3.5, 22],
			rotation: [8 * (Math.PI / 180), 330 * (Math.PI / 180), Math.PI / 2],
		},
		{
			type: "star",
			position: [-10.5, -2.5, 20],
			rotation: [7 * (Math.PI / 180), 330 * (Math.PI / 180), Math.PI / 2],
		},
		{
			type: "planet",
			position_old: [-10.5, -2.5, 10],
			position: [0.5, -0.1, 0.9],
			rotation: [7 * (Math.PI / 180), 330 * (Math.PI / 180), Math.PI / 2],
		},
		{
			type: "moon",
			position: [-10.5, -2.5, 20],
			rotation: [7 * (Math.PI / 180), 330 * (Math.PI / 180), Math.PI / 2],
		},
	]);

	useEffect(() => {
		async function initializeScenes() {
			const placeholderLocationsHierarchy = [
				{
					_id: "reality",
					children: [
						{
							_id: "starCluster",
							children: [
								{
									_id: "starSystem",
									children: [
										{ _id: "star", children: [] },
										{ _id: "planet", children: [{ _id: "moon", children: [] }] },
									],
								},
							],
						},
					],
				},
			];

			const placeholderLocations = [
				{ _id: "reality", type: "reality", position: [0, 0, 0], rotation: [0, 0, 0], scale: 1, paths: [] },
				{ _id: "starCluster", type: "starCluster", position: [0, 0, 0], rotation: [0, 0, 0], scale: 1, paths: [] },
				{ _id: "starSystem", type: "starSystem", position: [0, 0, 0], rotation: [0, 0, 0], scale: 1, paths: [] },
				{ _id: "star", type: "star", position: [0, 0, 0], rotation: [0, 0, 0], scale: 1, paths: [] },
				{ _id: "planet", type: "planet", position: [0, 0, 0], rotation: [0, 0, 0], scale: 1, paths: [] },
				{ _id: "moon", type: "moon", position: [0, 0, 0], rotation: [0, 0, 0], scale: 1, paths: [] },
			];

			setScene(
				<group>
					{scenes.current.map((scenesItem, index) => {
						const hierarchyItem = getItemFromIdInHierarchy(
							JSON.parse(JSON.stringify(scenesItem?.type)),
							JSON.parse(JSON.stringify(placeholderLocationsHierarchy))
						);
						return (
							<scenesItem.scene
								key={index}
								location={placeholderLocations.find((e) => e?._id === scenesItem?.type)}
								locations={placeholderLocations}
								hierarchyItem={hierarchyItem}
							/>
						);
					})}
				</group>
			);

			setTimeout(() => setHasInitializedScenes(true), 1000);
		}
		initializeScenes();
	}, [scenes, getItemFromIdInHierarchy]);

	useEffect(() => {
		function getScene() {
			if (!hasInitializedScenes) return false;
			if (unit?._id === false) return setScene(null);

			const location = locations.find((e) => JSON.stringify(e?._id) === JSON.stringify(unit?._id));

			const hierarchyItem = getItemFromIdInHierarchy(
				JSON.parse(JSON.stringify(unit?._id)),
				JSON.parse(JSON.stringify(story?.data?.locationsHierarchy))
			);

			if (currSceneLocationId.current !== location?._id) {
				currSceneLocationId.current = location?._id;
				const scenesChangePlayerInitialItem = JSON.parse(
					JSON.stringify(scenesChangePlayerInitial?.current?.find((e) => e?.type === location?.type) || {})
				);
				if (scenesChangePlayerInitialItem?.position && scenesChangePlayerInitialItem?.rotation) {
					camera.rotation.set(...scenesChangePlayerInitialItem?.rotation);
					camera.position.copy(new Vector3(...scenesChangePlayerInitialItem?.position));
				}
			}

			const newScene = scenes.current.find((e) => e?.type === location?.type);
			if (!newScene?.scene) return setScene(null);

			setScene(<newScene.scene location={location} locations={locations} hierarchyItem={hierarchyItem} />);
		}
		getScene();
	}, [
		setScene,
		unit,
		story,
		locations,
		getItemFromIdInHierarchy,
		scenes,
		hasInitializedScenes,
		currSceneLocationId,
		camera,
		scenesChangePlayerInitial,
	]);

	return scene;
};
