import { useContext, useCallback, useEffect, useRef } from "react";

import { APIContext } from "../../context/APIContext";
import { StoryContext } from "../../context/StoryContext";
import { RecentDataContext } from "../../context/RecentDataContext";
import { SpotifyContext } from "../../context/SpotifyContext";

import getColourWithTint from "../../services/GetColourWithTint";
import firebaseUrlToLocalUrl from "../../services/FirebaseUrlToLocalUrl";

export const GetUnitServices = ({
	story_uid,
	unit_uid,
	unit_type,
	isAuthorizedToEdit,
	isGettingUnit,
	currUnitUid,
	unit,
	setUnit,
	setUnitPageStyle,
	setUnitPagePaddingTop,
	setUnitPrimaryImages,
	setUnitOverviewBackground,
	setUnitOverviewForegrounds,
	setUnitImages,
	unitSoundtrack,
	setUnitSoundtrack,
	setUnitListImage,
	unitPagePrimaryRef,
	allSubpages,
	setSubpages,
	setOpenSubpageID,
	setCharacterCardBackground,
	setCharacterFaceImage,
	storyCharacters,
	characterRelationships,
	setCharacterRelationships,
	setCharacterRelationshipsCharacters,
	storyCharacterRelationships,
	storyGroups,
	setLocationMapImages,
	setLocationMapComponents,
	setPlotPosterBackground,
}) => {
	const { recentImages, addImagesToRecentImages } = useContext(RecentDataContext);
	const { isInEditorModeState } = useContext(StoryContext);
	const { APIRequest } = useContext(APIContext);
	const { spotify_access_token, spotify_refresh_token, SpotifyRequest } = useContext(SpotifyContext);

	// Get Unit
	const getUnit = useCallback(async () => {
		isGettingUnit.current = true;
		const unit_response = await APIRequest("/" + unit_type + "?uid=" + unit_uid + "&story_uid=" + story_uid, "GET");
		if (
			!unit_response?.data[unit_type] ||
			unit_response?.error ||
			JSON.stringify(unit_response?.data[unit_type]?.uid) !== JSON.stringify(unit_uid)
		)
			return false;
		setUnit((oldUnit) => {
			if (oldUnit._id === unit_response.data[unit_type]._id) return oldUnit;
			return unit_response.data[unit_type];
		});
		currUnitUid.current = unit_response.data[unit_type].uid;
		isGettingUnit.current = false;
		return unit_response.data[unit_type];
	}, [story_uid, unit_uid, unit_type, APIRequest, currUnitUid, isGettingUnit, setUnit]);

	// Get Unit Styles
	const getUnitStyles = useCallback(() => {
		if (!unit) return false;

		let newUnitPageStyle = {};

		newUnitPageStyle["--unitColour"] = unit?.data?.colour ? unit.data.colour : "#0044ff";

		const primaryHeight = unitPagePrimaryRef?.current?.clientHeight;
		if (!primaryHeight) {
			setTimeout(() => getUnitStyles(), 2);
		} else {
			let unitPagePaddingTop = primaryHeight + 10;
			if (window?.innerWidth !== undefined && window?.innerWidth <= 700) unitPagePaddingTop = 6 + primaryHeight + 12;
			newUnitPageStyle["--unitPagePaddingTop"] = unitPagePaddingTop + "px";
			setUnitPagePaddingTop(unitPagePaddingTop);
		}

		if (unit?.data?.colour) {
			try {
				const colours = getColourWithTint(unit?.data?.colour);
				newUnitPageStyle["--unitColour"] = colours[0];
				newUnitPageStyle["--unitColourTint"] = colours[1];
			} catch {
				newUnitPageStyle["--unitColour"] = unit?.data?.colour;
				newUnitPageStyle["--unitColourTint"] = unit?.data?.colour;
			}
		} else {
			newUnitPageStyle["--unitColourTint"] = "#0044ff";
		}

		setUnitPageStyle(newUnitPageStyle);
	}, [setUnitPageStyle, setUnitPagePaddingTop, unit, unitPagePrimaryRef]);

	useEffect(() => {
		setTimeout(() => getUnitStyles(), 2);
		window.addEventListener("resize", getUnitStyles);
		return () => {
			window.removeEventListener("resize", getUnitStyles);
		};
	}, [getUnitStyles, unit, isInEditorModeState]);

	// Get Primary Images
	const getUnitPrimaryImages = useCallback(
		async (versions) => {
			if (!versions) return false;

			const primaryImages = await Promise.all(
				versions.map(async (version) => {
					const recentImage = recentImages.current.find((e) => e?._id === version?.primaryImage);
					if (recentImage?.image) {
						return { _id: version._id, image: recentImage };
					} else {
						const primary_image_response = await APIRequest("/image/" + version?.primaryImage, "GET");
						if (primary_image_response?.errors || !primary_image_response?.data?.image?.image) {
							return { _id: version._id, image: { _id: version?.primaryImage, image: "NO_IMAGE" } };
						}
						addImagesToRecentImages([primary_image_response?.data?.image]);
						return { _id: version._id, image: primary_image_response?.data?.image };
					}
				})
			);

			setUnitPrimaryImages(primaryImages);

			return primaryImages;
		},
		[setUnitPrimaryImages, APIRequest, recentImages, addImagesToRecentImages]
	);

	// Get Overview Background
	const getUnitOverviewBackground = useCallback(
		async (overviewBackgroundID) => {
			let currOverviewBackground = false;
			setUnitOverviewBackground((oldUnitOverviewBackground) => {
				currOverviewBackground = JSON.parse(JSON.stringify(oldUnitOverviewBackground));
				return oldUnitOverviewBackground;
			});
			if (!overviewBackgroundID || currOverviewBackground) return;

			let overviewBackground = false;

			const recentImage = recentImages.current.find((e) => e?._id === overviewBackgroundID);
			if (recentImage?.image) {
				overviewBackground = recentImage;
			} else {
				const overview_background_image_response = await APIRequest("/image/" + overviewBackgroundID, "GET");
				if (overview_background_image_response?.errors || !overview_background_image_response?.data?.image?.image) {
					setUnitOverviewBackground("NO_IMAGE");
					return false;
				}
				overviewBackground = overview_background_image_response?.data?.image;
			}

			addImagesToRecentImages([overviewBackground]);

			setUnitOverviewBackground(overviewBackground.image);

			return overviewBackground.image;
		},
		[setUnitOverviewBackground, APIRequest, recentImages, addImagesToRecentImages]
	);

	// Get Overview Foregrounds
	const getUnitOverviewForegrounds = useCallback(
		async (versions) => {
			if (!versions) return setUnitOverviewForegrounds([]);

			const overviewForegrounds = await Promise.all(
				versions.map(async (version) => {
					const recentImage = recentImages.current.find((e) => e?._id === version?.overviewForeground?.image);
					if (recentImage?.image) {
						return { _id: version._id, image: recentImage };
					} else {
						const primary_image_response = await APIRequest("/image/" + version?.overviewForeground?.image, "GET");
						if (primary_image_response?.errors || !primary_image_response?.data?.image?.image) {
							return { _id: version._id, image: { _id: version?.overviewForeground?.image, image: "NO_IMAGE" } };
						}
						addImagesToRecentImages([primary_image_response?.data?.image]);
						return { _id: version._id, image: primary_image_response?.data?.image };
					}
				})
			);

			setUnitOverviewForegrounds(overviewForegrounds);

			return overviewForegrounds;
		},
		[setUnitOverviewForegrounds, APIRequest, recentImages, addImagesToRecentImages]
	);

	// Get Unit Images
	const getUnitImages = useCallback(
		async (imageIDs) => {
			if (!imageIDs) return;

			let newUnitImages = await Promise.all(
				imageIDs.map(async (imageID) => {
					if (!imageID) return false;

					const recentImage = recentImages.current.find((e) => e?._id === imageID);
					if (recentImage) return recentImage;

					const image_response = await APIRequest("/image/" + imageID, "GET");
					if (image_response?.errors || !image_response?.data?.image?.image) return false;
					return image_response.data.image;
				})
			);
			newUnitImages = newUnitImages.filter((e) => e !== false);

			addImagesToRecentImages(newUnitImages);

			setUnitImages(newUnitImages);
		},
		[setUnitImages, APIRequest, recentImages, addImagesToRecentImages]
	);

	// Get Unit List Image
	const getUnitListImage = useCallback(
		async (unitListImageID) => {
			let currUnitListImage = false;
			setUnitListImage((oldUnitListImage) => {
				currUnitListImage = JSON.parse(JSON.stringify(oldUnitListImage));
				return oldUnitListImage;
			});
			if (!unitListImageID || currUnitListImage) return;

			let unitListImage = false;

			const recentImage = recentImages.current.find((e) => e?._id === unitListImageID);
			if (recentImage?.image) {
				unitListImage = recentImage;
			} else {
				const overview_background_image_response = await APIRequest("/image/" + unitListImageID, "GET");
				if (overview_background_image_response?.errors || !overview_background_image_response?.data?.image?.image) {
					setUnitListImage("NO_IMAGE");
					return false;
				}
				unitListImage = overview_background_image_response?.data?.image;
			}

			addImagesToRecentImages([unitListImage]);

			setUnitListImage(unitListImage.image);

			return unitListImage.image;
		},
		[setUnitListImage, APIRequest, recentImages, addImagesToRecentImages]
	);

	// Get Character Card Background
	const getCharacterCardBackground = useCallback(
		async (cardBackgroundID) => {
			if (!cardBackgroundID) return;

			let cardBackground = false;

			const recentImage = recentImages.current.find((e) => e?._id === cardBackgroundID);
			if (recentImage?.image) {
				cardBackground = recentImage;
			} else {
				const card_background_image_response = await APIRequest("/image/" + cardBackgroundID, "GET");
				if (card_background_image_response?.errors || !card_background_image_response?.data?.image?.image) return false;

				if (card_background_image_response?.data?.is_download_url) {
					const image_url = await firebaseUrlToLocalUrl(card_background_image_response?.data?.image?.image);
					cardBackground = { _id: card_background_image_response.data.image?._id, image: image_url };
				} else {
					cardBackground = card_background_image_response.data.image;
				}
			}

			addImagesToRecentImages([cardBackground]);

			setCharacterCardBackground(cardBackground.image);
			return cardBackground.image;
		},
		[APIRequest, recentImages, addImagesToRecentImages, setCharacterCardBackground]
	);

	// Get Character Face Image
	const getCharacterFaceImage = useCallback(
		async (faceImageID) => {
			if (!faceImageID) return;

			let faceImage = false;

			const recentImage = recentImages.current.find((e) => e?._id === faceImageID);
			if (recentImage?.image) {
				faceImage = recentImage;
			} else {
				const face_image_response = await APIRequest("/image/" + faceImageID, "GET");
				if (face_image_response?.errors || !face_image_response?.data?.image?.image) return false;
				faceImage = face_image_response?.data?.image;
			}

			addImagesToRecentImages([faceImage]);

			setCharacterFaceImage(faceImage.image);
			return faceImage.image;
		},
		[APIRequest, recentImages, addImagesToRecentImages, setCharacterFaceImage]
	);

	// Get Plot Poster Background
	const getPlotPosterBackground = useCallback(
		async (posterBackgroundID) => {
			if (!posterBackgroundID) return;

			let posterBackground = false;

			const recentImage = recentImages.current.find((e) => e?._id === posterBackgroundID);
			if (recentImage?.image) {
				posterBackground = recentImage;
			} else {
				const poster_background_image_response = await APIRequest("/image/" + posterBackgroundID, "GET");
				if (poster_background_image_response?.errors || !poster_background_image_response?.data?.image?.image) return false;

				if (poster_background_image_response?.data?.is_download_url) {
					const image_url = await firebaseUrlToLocalUrl(poster_background_image_response?.data?.image?.image);
					posterBackground = { _id: poster_background_image_response.data.image?._id, image: image_url };
				} else {
					posterBackground = poster_background_image_response.data.image;
				}
			}

			addImagesToRecentImages([posterBackground]);

			setPlotPosterBackground(posterBackground.image);
			return posterBackground.image;
		},
		[APIRequest, recentImages, addImagesToRecentImages, setPlotPosterBackground]
	);

	// Get Location Map Images
	const getLocationMapImages = useCallback(
		async (mapVersions) => {
			const newLocationMapImages = await Promise.all(
				mapVersions?.map(async (mapVersion) => {
					if (!mapVersion?.mapImage) return;

					let mapImage = false;

					const recentImage = recentImages.current.find((e) => e?._id === mapVersion?.mapImage);
					if (recentImage?.image) {
						mapImage = recentImage;
					} else {
						const map_image_response = await APIRequest("/image/" + mapVersion?.mapImage, "GET");
						if (map_image_response?.errors || !map_image_response?.data?.image?.image)
							return { _id: mapVersion?.mapImage, image: false };
						mapImage = map_image_response?.data?.image;
					}

					addImagesToRecentImages([mapImage]);

					if (!mapImage) return { _id: mapVersion?.mapImage, image: false };
					return mapImage;
				})
			);

			setLocationMapImages(newLocationMapImages);
			return newLocationMapImages;
		},
		[APIRequest, recentImages, addImagesToRecentImages, setLocationMapImages]
	);

	// Get Location Map Components
	const getLocationMapComponents = useCallback(
		async (mapVersions) => {
			const newLocationMapComponents = await Promise.all(
				mapVersions?.map(async (mapVersion) => {
					if (!mapVersion?.mapImageComponents) return;
					const mapImageComponents = JSON.parse(JSON.stringify(mapVersion?.mapImageComponents));

					let mapImageComponentsImage = false;

					const map_image_response = await APIRequest("/image/" + mapImageComponents, "GET");

					if (map_image_response?.errors || !map_image_response?.data?.image?.image)
						return { _id: mapImageComponents, version_id: mapVersion?._id, image: false };

					mapImageComponentsImage = map_image_response?.data?.image;

					if (!mapImageComponentsImage) return { _id: mapImageComponents, version_id: mapVersion?._id, image: false };

					return { _id: mapImageComponents, version_id: mapVersion?._id, image: mapImageComponentsImage?.image };
				})
			);

			setLocationMapComponents(newLocationMapComponents);
			return newLocationMapComponents;
		},
		[APIRequest, setLocationMapComponents]
	);

	// Get Unit Subpages
	const getUnitSubpages = useCallback(
		async (unitSubpages) => {
			let newSubpages = [];

			for (let i = 0; i < unitSubpages.length; i++) {
				let newSubpage = allSubpages.find((e) => e.id === unitSubpages[i].id);
				if (newSubpage) {
					newSubpage.isEnabled = unitSubpages[i]?.isEnabled;
					newSubpages.push(newSubpage);
				} else {
					newSubpages.push(unitSubpages[i]);
				}
			}
			newSubpages = newSubpages.concat(
				allSubpages.filter((e) => newSubpages.findIndex((e2) => e2.id === e.id) === -1 && e.unit_types.includes(unit_type))
			);

			setSubpages(newSubpages);
			setOpenSubpageID((oldOpenSubpageID) => {
				if (oldOpenSubpageID !== false) return oldOpenSubpageID;
				return newSubpages.filter((e) => (isAuthorizedToEdit ? e?.isEnabled : e?.isEnabled && !["profile", "settings"].includes(e?.id)))[0]
					?.id;
			});
		},
		[allSubpages, setSubpages, setOpenSubpageID, unit_type, isAuthorizedToEdit]
	);

	// Get Character Relationships
	const curr_character_relationships_character_uid = useRef(false);
	const getCharacterRelationships = useCallback(async () => {
		if (!unit?._id) return false;
		if (curr_character_relationships_character_uid.current === unit.uid) return false;
		curr_character_relationships_character_uid.current = unit.uid;

		const newCharacterRelationships = storyCharacterRelationships.filter((e) => e.character_ids.includes(unit._id));
		if (newCharacterRelationships.length === 0) curr_character_relationships_character_uid.current = false;
		setCharacterRelationships(newCharacterRelationships);
		return newCharacterRelationships;
	}, [setCharacterRelationships, storyCharacterRelationships, unit]);

	const curr_character_relationships_characters_character_uid = useRef(false);
	const getCharacterRelationshipsCharacters = useCallback(async () => {
		if (storyCharacters.length === 0) return false;
		if (!unit?._id) return false;
		if (curr_character_relationships_characters_character_uid.current === unit.uid) return false;

		if (!storyCharacters || storyCharacters.length === 0 || !characterRelationships) return false;
		curr_character_relationships_characters_character_uid.current = unit.uid;

		let newRelationshipsCharacters = storyGroups
			.map((group) =>
				group?.data?.characters.map((character) => {
					let newCharacter = storyCharacters.find((e) => e?._id === character?.character_id);
					if (!newCharacter) return false;
					if (
						characterRelationships.filter((r) => newCharacter?.uid === unit_uid || r.character_ids.includes(newCharacter?._id))
							.length === 0
					)
						return false;
					return newCharacter;
				})
			)
			.flat(1)
			.filter((e) => e !== false);

		const characterIndex = newRelationshipsCharacters.findIndex((e) => e.uid === unit_uid);
		const firstNewRelationshipsCharacters = JSON.parse(JSON.stringify(newRelationshipsCharacters)).slice(characterIndex);
		const lastNewRelationshipsCharacters = JSON.parse(JSON.stringify(newRelationshipsCharacters)).slice(0, characterIndex);
		newRelationshipsCharacters = firstNewRelationshipsCharacters.concat(lastNewRelationshipsCharacters);

		setCharacterRelationshipsCharacters(newRelationshipsCharacters);
	}, [setCharacterRelationshipsCharacters, unit, storyCharacters, characterRelationships, storyGroups, unit_uid]);

	useEffect(() => {
		async function runGetCharacterRelationshipsAndCharacters() {
			if (["character"].includes(unit_type) && storyCharacterRelationships !== false) {
				await getCharacterRelationships();
				getCharacterRelationshipsCharacters();
			}
		}
		runGetCharacterRelationshipsAndCharacters();
	}, [unit_type, unit, storyCharacters, storyCharacterRelationships, getCharacterRelationships, getCharacterRelationshipsCharacters]);

	// Get Unit Soundtrack
	const getUnitSoundtrack = useCallback(
		async (playlist_id, old_tracks) => {
			if (!playlist_id) {
				playlist_id = JSON.parse(JSON.stringify(unit))?.data?.soundtrack?.playlist_id;
				if (!playlist_id) return false;
			}

			if (!old_tracks) {
				old_tracks = JSON.parse(JSON.stringify(unit))?.data?.soundtrack?.tracks;
				if (unitSoundtrack) old_tracks = JSON.parse(JSON.stringify(unitSoundtrack))?.tracks;
				if (!old_tracks) return false;
			}

			const response = await SpotifyRequest("/playlists/" + playlist_id, "GET");
			if (!response || response?.errors) return false;

			let tracks = await Promise.all(
				!response?.tracks?.items
					? null
					: response.tracks.items.map(async (item) => {
							let artwork = undefined;
							if (!item?.is_local) {
								try {
									artwork = await new Promise(async (resolve) => {
										const artwork_response = await fetch(item?.track?.album?.images[0]?.url);
										const reader = new FileReader();
										reader.onloadend = () => resolve(reader.result);
										reader.readAsDataURL(await artwork_response.blob());
									});
								} catch (e) {}
							}

							return {
								id: item?.track?.id,
								uri: item?.track?.uri,
								is_local: item?.is_local,
								name: item?.track?.name,
								album: item?.track?.album?.name,
								artists: item?.track?.artists?.map((artist) => artist?.name).join(","),
								artwork,
								artwork_url: item?.track?.album?.images[0]?.url,
								text:
									old_tracks?.findIndex((e) => e?.uri === item?.track?.uri) === -1
										? [""]
										: old_tracks?.find((e) => e?.uri === item?.track?.uri)?.text,
							};
					  })
			);

			setUnitSoundtrack({ playlist_id, tracks });
		},
		[setUnitSoundtrack, unitSoundtrack, SpotifyRequest, unit]
	);

	const old_spotify_tokens = useRef({});

	useEffect(() => {
		if (
			old_spotify_tokens.current?.access_token !== spotify_access_token &&
			old_spotify_tokens.current?.refresh_token !== spotify_refresh_token
		) {
			old_spotify_tokens.current = { access_token: spotify_access_token, refresh_token: spotify_refresh_token };
			getUnitSoundtrack();
		}
	}, [spotify_access_token, spotify_refresh_token, old_spotify_tokens, getUnitSoundtrack]);

	return {
		getUnit,
		getUnitPrimaryImages,
		getUnitOverviewBackground,
		getUnitOverviewForegrounds,
		getUnitImages,
		getUnitSubpages,
		getCharacterRelationships,
		getUnitListImage,
		getUnitSoundtrack,
		getCharacterCardBackground,
		getCharacterFaceImage,
		getPlotPosterBackground,
		getLocationMapImages,
		getLocationMapComponents,
	};
};
