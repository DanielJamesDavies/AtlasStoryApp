// Packages
import { useContext, useEffect, useState } from "react";

// Components

// Logic

// Context
import { UnitPageContext } from "../UnitPageContext";

// Services

// Styles

// Assets

export const JournalViewLogic = ({ journalViewContainerRef }) => {
	const { unit, unit_type, unitVersion, isOnJournalView, setIsOnJournalView } = useContext(UnitPageContext);

	const [bodySections, setBodySections] = useState([]);
	const [bodySectionRefs, setBodySectionRefs] = useState({});

	useEffect(() => {
		if (isOnJournalView && journalViewContainerRef?.current?.scrollTop) {
			journalViewContainerRef.current.scrollTop = 0;
		}
	}, [journalViewContainerRef, isOnJournalView]);

	useEffect(() => {
		let newBodySections = [];
		if (["character"].includes(unit_type)) {
			if (unitVersion) {
				// Description
				if (unitVersion?.description?.join("\n")?.trim()?.length !== 0) {
					newBodySections.push({
						index: newBodySections?.length,
						title: "Description",
						titleStyle: "h1",
						text: unitVersion?.description?.join("\n"),
					});
				}

				// Psychology
				const psychologyDescription = unitVersion?.psychology?.items?.find((e) => e?.title?.toLowerCase()?.includes("description"));
				const psychologyItemsExceptDescription = unitVersion?.psychology?.items?.filter((e) => e?._id !== psychologyDescription?._id);
				if (psychologyDescription || psychologyItemsExceptDescription?.length !== 0) {
					newBodySections.push({ index: newBodySections?.length, title: "Psychology", titleStyle: "h1" });
				}
				if (psychologyDescription) {
					newBodySections.push({
						index: newBodySections?.length,
						text: Array.isArray(psychologyDescription?.text) ? psychologyDescription?.text?.join("\n") : psychologyDescription?.text,
					});
				}
				if (psychologyItemsExceptDescription?.length !== 0) {
					newBodySections.push({
						index: newBodySections?.length,
						text:
							"Psychological attributes:\n- " +
							psychologyItemsExceptDescription
								?.map((e) => {
									const newText = e?.text?.map((e2) => (e2?.startsWith("-") ? "\t" + e2 : e2))?.join("\n");
									if (newText?.trim()?.startsWith("-")) {
										return e?.title + "\n" + newText;
									}
									return e?.title + ": " + newText;
								})
								?.filter((e) => e && e?.length !== 0)
								?.map((e) => e?.trimEnd())
								?.join("\n- "),
					});
				}

				// Appearance
				if (unitVersion?.physical?.attributes?.length !== 0 || unitVersion?.physical?.outfits?.length !== 0) {
					newBodySections.push({ index: newBodySections?.length, title: "Appearance", titleStyle: "h1" });
				}
				if (unitVersion?.physical?.attributes?.length !== 0) {
					newBodySections.push({
						index: newBodySections?.length,
						text:
							"Physical attributes:\n- " +
							unitVersion?.physical?.attributes
								?.map((e) => {
									const newText = e?.text?.map((e2) => (e2?.startsWith("-") ? "\t" + e2 : e2))?.join("\n");
									if (newText?.trim()?.startsWith("-")) {
										return e?.title + "\n" + newText;
									}
									return e?.title + ": " + newText;
								})
								?.filter((e) => e && e?.length !== 0)
								?.join("\n- "),
					});
				}
				if (unitVersion?.physical?.outfits?.length !== 0) {
					newBodySections.push({
						index: newBodySections?.length,
						text:
							"Outfits:\n- " +
							unitVersion?.physical?.outfits
								?.map((e) => {
									const newText = e?.text?.map((e2) => (e2?.startsWith("-") ? "\t" + e2 : e2))?.join("\n");
									if (newText?.trim()?.startsWith("-")) {
										return e?.title + "\n" + newText;
									}
									return e?.title + ": " + newText;
								})
								?.filter((e) => e && e?.length !== 0)
								?.join("\n- "),
					});
				}

				// Abilities
				if (unitVersion?.abilities?.length !== 0) {
					newBodySections.push({ index: newBodySections?.length, title: "Abilities", titleStyle: "h1" });
					unitVersion?.abilities?.map((ability) => {
						newBodySections.push({ index: newBodySections?.length, title: ability?.name, titleStyle: "h2" });
						ability?.items?.map((abilityItem) => {
							newBodySections.push({
								index: newBodySections?.length,
								title: abilityItem?.title,
								titleStyle: "h3",
								text: abilityItem?.text?.join("\n"),
							});
							return true;
						});
						return true;
					});
				}

				// Biography
				if (unitVersion?.biography?.length !== 0) {
					let biographySectionsToPush = [];

					unitVersion?.biography?.map((biographyItem) => {
						const numBiographyItemsPushed = biographyItem?.items
							?.map((biographyItem2) => {
								if (biographyItem2?.title) {
									if (biographyItem2?.text && biographyItem2?.text?.join("\n")?.trim()?.length !== 0) {
										biographySectionsToPush.push({
											title: biographyItem2?.title,
											titleStyle: "h3",
											text: biographyItem2?.text?.join("\n"),
										});
										return true;
									} else {
										biographySectionsToPush.push({
											text: biographyItem2?.title,
										});
										return true;
									}
								} else {
									if (biographyItem2?.text && biographyItem2?.text?.join("\n")?.trim()?.length !== 0) {
										biographySectionsToPush.push({
											text: biographyItem2?.text?.join("\n"),
										});
										return true;
									}
								}
								return false;
							})
							?.filter((e) => e !== false)?.length;

						if (numBiographyItemsPushed !== 0) {
							biographySectionsToPush.push({
								title: biographyItem?.name,
								titleStyle: "h2",
							});
						}
						return true;
					});

					if (biographySectionsToPush.length !== 0) {
						newBodySections.push({ index: newBodySections?.length, title: "Background", titleStyle: "h1" });

						biographySectionsToPush?.map((biographySectionToPush) => {
							biographySectionToPush.index = newBodySections?.length;
							newBodySections.push(biographySectionToPush);
							return true;
						});
					}
				}
			}
		}
		setBodySections(newBodySections);
	}, [unit, unit_type, unitVersion]);

	return { unit, unitVersion, bodySections, bodySectionRefs, setBodySectionRefs, setIsOnJournalView };
};
