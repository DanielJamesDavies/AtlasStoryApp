// Packages
import { useCallback, useContext, useMemo } from "react";

// Components

// Logic

// Context
import { StoryContext } from "../../context/StoryContext";
import { AIContext } from "../../context/AIContext";

// Services

// Styles

// Assets

export const AIAssistantGetCommandsLogic = () => {
	const { story } = useContext(StoryContext);
	const { GPT_Request } = useContext(AIContext);

	const unit_value_objects = useMemo(
		() => [
			{ name: "name", keywords: ["name"], path: ["data", "name"] },
			{ name: "title", keywords: ["title"], path: ["data", "title"] },
			{
				name: "description",
				keywords: ["description"],
				path: ["data", "versions", "VERSION_ID", "description"],
				isOnOverview: true,
				splitIntoArray: true,
			},
			{
				name: "Physical Attributes",
				keywords: ["physical attribute"],
				path: ["data", "versions", "VERSION_ID", "physical", "attributes"],
				subpage: "physical",
				isList: true
			},
			{
				name: "Outfits",
				keywords: ["outfit", "clothes"],
				path: ["data", "versions", "VERSION_ID", "physical", "outfits"],
				subpage: "physical",
				isList: true
			}
		],
		[]
	);

	const getPossibleCommands = useCallback((input_text) => {
		let possible_commands = { goToPage: false, goToUnitSubpage: [], editValue: false };

		// Go to Page
		["open", "go to", "navigate", "take me to", "visit"].map((e) => {
			if (input_text.toLowerCase().includes(e)) {
				possible_commands.goToPage = true;
			}
			return true;
		});

		// Go to Unit Subpage
		const subpagesInText = [
			{ id: "physical", name: "appearance", keywords: ["appearance", "physical", "attributes", "outfits"] },
			{ id: "psychology", name: "personality", keywords: ["psychology", "personality"] },
			{ id: "abilities", name: "abilities and equipment", keywords: ["abilities", "equipment"] },
			{ id: "relationships", name: "relationships", keywords: ["relationships"] },
			{ id: "biography", name: "background", keywords: ["biography", "background"] },
			{ id: "plot", name: "plot", keywords: ["plot"] },
			{ id: "soundtrack", name: "soundtrack", keywords: ["soundtrack", "songs", "album", "playlist"] },
			{ id: "details", name: "details", keywords: ["details"] },
			{ id: "events", name: "events", keywords: ["events"] },
			{ id: "gallery", name: "gallery", keywords: ["gallery", "images"] },
			{ id: "miscellaneous", name: "miscellaneous", keywords: ["miscellaneous"] },
			{ id: "development", name: "development", keywords: ["development"] },
			{ id: "settings", name: "settings", keywords: ["settings"] },
		].filter((e) => {
			return e?.keywords.map((e2) => input_text.toLowerCase().includes(e2)).filter((e) => e !== false).length !== 0;
		});
		possible_commands.goToUnitSubpage = subpagesInText.length === 0 ? false : subpagesInText[0];

		// Go to Unit Overview Section
		possible_commands.goToUnitOverview =
			["overview", "description", "summary"].filter((e) => input_text.toLowerCase().includes(e)).length !== 0;

		// Edit Value
		[
			"edit",
			"modify",
			"change",
			"update",
			"adjust",
			"replace",
			"revise",
			"alter",
			"generate",
			"rewrite",
			"write",
			"add",
			"remove",
			"append",
			"reword",
			"make",
		].map((e) => {
			if (input_text.toLowerCase().includes(e)) {
				possible_commands.editValue = true;
			}
			return true;
		});

		// Add Value
		[
			"generate",
			"write",
			"add",
			"append",
			"make",
		].map((e) => {
			if (input_text.toLowerCase().includes(e)) {
				possible_commands.addValue = true;
			}
			return true;
		});

		return possible_commands;
	}, []);

	const getUnitListItems = useCallback((unit_id) => {
		const unit = false; // Get Unit
		const unitVersion = false; // Get Unit Version

		const physical_attributes = unitVersion?.physical?.attributes?.map((item) => {
			return { label: item?.title, text: item?.text };
		});

		const physical_outfits = unitVersion?.physical?.attributes?.map((item) => {
			return { label: item?.title, text: item?.text };
		});

		const psychological_items = unitVersion?.psychology?.items?.map((item) => {
			return { label: item?.title, text: item?.text };
		});

		const biography_items = unitVersion?.biography?.items?.map((item) => {
			return { _id: item?._id, label: item?.title, text: item?.text };
		});

		const abilities = unitVersion?.abilities?.map((item) => {
			return { _id: item?._id, label: item?.name };
		});

		const misc_items = unit?.data?.miscellaneous?.items?.map((item) => {
			return { label: item?.title };
		});
		
		const dev_items = unit?.data?.development?.items?.map((item) => {
			return { label: item?.title };
		});

		const all_items = physical_attributes.concat(physical_outfits).concat(psychological_items).concat(biography_items).concat(abilities).concat(misc_items).concat(dev_items);

		return { all_items };
	}, []);

	const getProbableCommands = useCallback(
		async (input_text, possible_commands, unit) => {
			let probable_commands = [];

			// Go To Subpage
			if (possible_commands.goToUnitSubpage !== false) {
				probable_commands.push({ command: "goToPage" });
				probable_commands.push({
					command: "goToUnitSubpage",
					subpage: possible_commands.goToUnitSubpage,
				});
			}

			// Go To Overview Section
			if (possible_commands.goToUnitOverview !== false) {
				probable_commands.push({ command: "goToPage" });
				probable_commands.push({ command: "goToUnitOverview" });
			}

			//  Dictate or Generate Text
			if (possible_commands.editValue !== false) {
				const unit_value_object = unit_value_objects.filter((e) => {
					return e?.keywords.map((e2) => input_text.toLowerCase().includes(e2)).filter((e) => e !== false).length !== 0;
				})?.[0];
				console.log(unit_value_object);

				const { all_items } = getUnitListItems(unit?._id);

				if (unit_value_object) {
					const dictate_or_generate_text_res = await GPT_Request([
						{
							role: "system",
							content:
								"Please always answer just 'dictate' or 'generate'. If the user states what a value should be, word-for-word, write 'dictate'. If the user states to generate, rewrite, or add to text, write 'generate'.",
						},
						{ role: "user", content: "USER MESSAGE: " + input_text },
					]);

					if (dictate_or_generate_text_res?.content?.toLowerCase() === "dictate") {
						if (!unit_value_object?.isList) {
							const dictated_text_res = await GPT_Request([
								{
									role: "system",
									content:
										"Please always answer with the dictated text the user requested for a value to be changed to. Never describe the question. Never say what you are doing. Just write the answer of the dictation.",
								},
								{ role: "user", content: "USER MESSAGE: " + input_text },
							]);
							if (dictated_text_res?.content) {
								probable_commands.push({ command: "goToPage" });
	
								if (unit_value_object?.subpage) {
									probable_commands.push({
										command: "goToUnitSubpage",
										subpage: unit_value_object.subpage,
									});
								}
	
								probable_commands.push({
									command: "dictateText",
									text: unit_value_object?.splitIntoArray ? dictated_text_res?.content?.split("\n") : dictated_text_res?.content,
									path: unit_value_object?.path,
									isList: unit_value_object?.isList,
									addValue: possible_commands.addValue
								});
							}
						} else {
							const dictated_label_res = await GPT_Request([
								{
									role: "system",
									content:
										"Please always answer with the label of an item the user mentioned. Do not respond with the value or content of an item but respond with what the item is called. Never describe the question. Never say what you are doing. Just write the answer from the user message.",
								},
								{ role: "user", content: "USER MESSAGE: " + input_text },
							]);
							const dictated_content_res = await GPT_Request([
								{
									role: "system",
									content:
										"Please always answer with the content/value of an item the user mentioned that corresponds to the label. Never describe the question. Never say what you are doing. Just write the answer from the user message.",
								},
								{ role: "user", content: "USER MESSAGE: " + input_text },
								{ role: "user", content: "LABEL: " + dictated_label_res?.content }
							]);
							console.log("Label: ", dictated_label_res?.content, "Text: ", dictated_content_res?.content);
							if (dictated_label_res?.content && dictated_content_res?.content) {
								probable_commands.push({ command: "goToPage" });
	
								if (unit_value_object?.subpage) {
									probable_commands.push({
										command: "goToUnitSubpage",
										subpage: unit_value_object.subpage,
									});
								}
	
								probable_commands.push({
									command: "dictateText",
									label: dictated_label_res?.content,
									text: dictated_content_res?.content?.split("\n"),
									path: unit_value_object?.path,
									isList: unit_value_object?.isList,
									addValue: possible_commands.addValue
								});
							}
						}
					} else if (dictate_or_generate_text_res?.content?.toLowerCase() === "generate") {
						probable_commands.push({ command: "goToPage" });
						
						if (unit_value_object?.subpage) {
							probable_commands.push({
								command: "goToUnitSubpage",
								subpage: unit_value_object.subpage,
							});
						}

						probable_commands.push({
							command: "generateText",
							path: unit_value_object?.path,
							splitIntoArray: unit_value_object?.splitIntoArray,
							isList: unit_value_object?.isList,
							addValue: possible_commands.addValue
						});
					}
				}
			}

			// Go To Page
			if (probable_commands.length === 0 && possible_commands.goToPage) {
				const go_to_page_res = await GPT_Request([
					{ role: "system", content: "Please always answer just 'Yes' or 'No'. Never respond to the user message." },
					{ role: "user", content: "Does the user want to go to " + unit?.name },
					{ role: "user", content: "USER MESSAGE: " + input_text },
				]);
				if (go_to_page_res?.content && go_to_page_res?.content?.toLowerCase().trim()[0] === "y") {
					probable_commands.push({ command: "goToPage" });
				}
			}

			return probable_commands;
		},
		[GPT_Request, unit_value_objects, getUnitListItems]
	);

	const getCommands = useCallback(
		async (input_text, units) => {
			const possible_commands = getPossibleCommands(input_text);
			console.log("possible_commands", possible_commands);

			let unit = units?.filter((e) => input_text.toLowerCase().includes(e?.name?.toLowerCase()))?.[0];
			if (unit === undefined) {
				let locationSplit = window?.location?.pathname.split("/").filter((e) => e.length !== 0);
				if (locationSplit.length >= 4 && locationSplit[0] === "s" && ["c", "g", "p", "l", "e", "w", "o"].includes(locationSplit[2])) {
					unit = units.find((e) => e?.uid === locationSplit[3]);
				}
			}

			const probable_commands = await getProbableCommands(input_text, possible_commands, unit);
			console.log("probable_commands", probable_commands);

			let commands = [];

			// Go to Page
			const goToPageCommand = probable_commands.find((e) => e?.command === "goToPage");
			if (unit && goToPageCommand) {
				if (unit?.page_letter) {
					if (
						JSON.stringify(window?.location?.pathname) !==
						JSON.stringify("/s/" + story?.uid + "/" + unit?.page_letter + "/" + unit?.uid)
					) {
						commands.push({
							desc: "I'm going to " + unit?.name + " now",
							function: "changeLocation",
							arguments: ["/s/" + story?.uid + "/" + unit?.page_letter + "/" + unit?.uid],
						});
					}
				} else if (unit?.page) {
					if (JSON.stringify(window?.location?.pathname) !== JSON.stringify("/s/" + story?.uid + "/" + unit?.page)) {
						commands.push({
							desc: "I'm going to " + unit?.name + " now",
							function: "changeLocation",
							arguments: ["/s/" + story?.uid + "/" + unit?.page],
						});
					}
				}
			}

			// Go to Subpage
			const goToUnitSubpageCommand = probable_commands.find((e) => e?.command === "goToUnitSubpage");
			if (unit && goToUnitSubpageCommand) {
				commands.push({
					desc:
						Math.floor(Math.random() * 3) >= 1
							? ""
							: "I'm going to " + unit?.name + "'s " + goToUnitSubpageCommand?.subpage.name + " now",
					function: "changeUnitSubpage",
					arguments: [goToUnitSubpageCommand?.subpage.id],
				});
			}

			// Go to Overview Section
			const goToUnitOverviewCommand = probable_commands.find((e) => e?.command === "goToUnitOverview");
			if (unit && goToUnitOverviewCommand) {
				commands.push({
					desc: "",
					function: "goToUnitOverview",
				});
			}

			// Generate Text
			const generateTextCommand = probable_commands.find((e) => e?.command === "generateText");
			if (unit && generateTextCommand) {
				commands.push({
					desc: "",
					function: "setEditableContainerToEditing",
					authorization_required: true,
				});
				commands.push({
					desc: Math.floor(Math.random() * 2) >= 1 ? "" : "I'll begin doing that for you now",
					function: "generateText",
					authorization_required: true,
					arguments: [unit?._id, generateTextCommand?.path],
					splitValueIntoArray: generateTextCommand?.splitIntoArray,
					isList: generateTextCommand?.isList,
					addValue: generateTextCommand?.addValue
				});
			}

			// Dictate Text
			const dictateTextCommand = probable_commands.find((e) => e?.command === "dictateText");
			if (unit && dictateTextCommand) {
				commands.push({
					desc: "",
					function: "setEditableContainerToEditing",
					authorization_required: true,
				});
				commands.push({
					desc: "",
					function: "dictateText",
					authorization_required: true,
					arguments: [unit?._id, dictateTextCommand?.path, dictateTextCommand?.text],
					isList: dictateTextCommand?.isList,
					addValue: dictateTextCommand?.addValue
				});
			}

			console.log("commands", commands);

			return commands;
		},
		[story, getPossibleCommands, getProbableCommands]
	);

	return { getCommands };
};
