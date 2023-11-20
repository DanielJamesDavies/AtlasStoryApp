// Packages
import { useCallback, useContext, useMemo } from "react";
import Fuse from "fuse.js";

// Components

// Logic

// Context
import { StoryContext } from "../../context/StoryContext";
import { AIContext } from "../../context/AIContext";

// Services

// Styles

// Assets

export const AIAssistantGetCommandsLogic = () => {
	const { story, getUnitAndCurrUnitVersion } = useContext(StoryContext);
	const { GPT_Request } = useContext(AIContext);

	const subpages_list = useMemo(
		() => [
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
		],
		[]
	);

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
				isList: true,
			},
			{
				name: "Outfits",
				keywords: ["outfit", "clothes"],
				path: ["data", "versions", "VERSION_ID", "physical", "outfits"],
				subpage: "physical",
				isList: true,
			},
		],
		[]
	);

	const getPossibleCommands = useCallback(
		(input_text, message_keys) => {
			let possible_commands = { goToPage: false, goToUnitSubpage: [], editValue: false };

			// Go to Page
			["open", "go to", "navigate", "take me to", "visit"].map((e) => {
				if (input_text.toLowerCase().includes(e)) {
					possible_commands.goToPage = true;
				}
				return true;
			});

			// Go to Unit Subpage
			const subpagesInText = subpages_list.filter((e) => {
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
			if (message_keys?.includes("edit_text") || message_keys?.includes("write_text")) {
				possible_commands.editValue = true;
			}

			// Add Value
			["generate", "write", "add", "append", "make"].map((e) => {
				if (input_text.toLowerCase().includes(e)) {
					possible_commands.addValue = true;
				}
				return true;
			});

			return possible_commands;
		},
		[subpages_list]
	);

	const getUnitListItems = useCallback(
		(unit_id) => {
			const { unit, unitVersion } = getUnitAndCurrUnitVersion.current();
			if (!unit || !unitVersion || unit?._id !== unit_id) return { all_items: [] };

			const summary_items =
				unit?.data?.summaryItems?.map((item, index) => {
					return {
						index,
						label: item?.label,
						label_key: "label",
						path: ["data", "summaryItems", index],
						isOnOverview: true,
					};
				}) || [];

			const physical_attributes =
				unitVersion?.physical?.attributes?.map((item, index) => {
					return {
						index,
						label: item?.title,
						text: item?.text,
						path: ["data", "versions", unitVersion?._id, "physical", "attributes", index],
						subpage: "physical",
					};
				}) || [];

			const physical_outfits =
				unitVersion?.physical?.outfits?.map((item, index) => {
					return {
						index,
						label: item?.title,
						text: item?.text,
						path: ["data", "versions", unitVersion?._id, "physical", "outfits", index],
						subpage: "physical",
					};
				}) || [];

			const psychological_items =
				unitVersion?.psychology?.items?.map((item, index) => {
					return {
						index,
						label: item?.title,
						text: item?.text,
						path: ["data", "versions", unitVersion?._id, "psychology", "items", index],
						subpage: "psychology",
					};
				}) || [];

			const biography_items =
				unitVersion?.biography?.items?.map((item, index) => {
					return {
						_id: item?._id,
						label: item?.title,
						text: item?.text,
						path: ["data", "versions", unitVersion?._id, "biography", "items", index],
						subpage: "biography",
					};
				}) || [];

			const misc_items =
				unit?.data?.miscellaneous?.items?.map((item, index) => {
					return {
						index,
						label: item?.title,
						path: ["data", "miscellaneous", "items", index],
						subpage: "miscellaneous",
					};
				}) || [];

			const dev_items =
				unit?.data?.development?.items?.map((item, index) => {
					return {
						index,
						label: item?.title,
						path: ["data", "development", "items", index],
						subpage: "development",
					};
				}) || [];

			const all_items = []
				.concat(summary_items)
				.concat(physical_attributes)
				.concat(physical_outfits)
				.concat(psychological_items)
				.concat(biography_items)
				.concat(misc_items)
				.concat(dev_items);

			return { all_items };
		},
		[getUnitAndCurrUnitVersion]
	);

	const getDictateOrGenerate = useCallback(
		async (input_text) => {
			return await GPT_Request([
				{
					role: "system",
					content:
						"Please always answer just 'dictate' or 'generate'. If the user states what a value should be, word-for-word, write 'dictate'. If the user states to generate, rewrite, or add to text, write 'generate'.",
				},
				{ role: "user", content: "USER MESSAGE: " + input_text },
				{ role: "user", content: "Please never write the generated text, just write 'dictate' or 'generate'. Thank you" },
			]);
		},
		[GPT_Request]
	);

	const getDictatedValue = useCallback(
		async (input_text, isList, label) => {
			if (isList) {
				if (label) {
					const dictated_content_res = await GPT_Request([
						{
							role: "system",
							content:
								"Please always answer with the content/value of an item the user mentioned that corresponds to the label. Never describe the question. Never say what you are doing. Just write the answer from the user message.",
						},
						{ role: "user", content: "USER MESSAGE: " + input_text },
						{ role: "user", content: "LABEL: " + label },
						{ role: "user", content: " Please properly format in sentence case the dictated value in your response." },
					]);
					return { label: label, text: dictated_content_res?.content };
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
						{ role: "user", content: "LABEL: " + dictated_label_res?.content },
						{ role: "user", content: " Please properly format in sentence case the dictated value in your response." },
					]);
					return { label: dictated_label_res?.content, text: dictated_content_res?.content };
				}
			} else {
				return (
					await GPT_Request([
						{
							role: "system",
							content:
								"Please always answer with the dictated text the user requested for a value to be changed to. Never describe the question. Never say what you are doing. Just write the answer of the dictation.",
						},
						{ role: "user", content: "USER MESSAGE: " + input_text },
					])
				)?.content;
			}
		},
		[GPT_Request]
	);

	const getProbableCommands = useCallback(
		async (input_text, possible_commands, unit, message_keys) => {
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

				const { all_items } = getUnitListItems(unit?._id);

				const fuse = new Fuse(all_items, { keys: ["label"], threshold: 1 });
				const first_input_words = input_text.split(" ").slice(0, 10).join(" ").toLowerCase();
				const relevant_items = fuse.search(first_input_words);
				const relevant_item = relevant_items.filter((e) => {
					return first_input_words.includes(e?.item?.label.toLowerCase());
				})?.[0]?.item;

				if (relevant_item) {
					const dictate_or_generate_text_res = await getDictateOrGenerate(input_text);

					if (dictate_or_generate_text_res?.content?.toLowerCase() === "dictate") {
						const dictated_text = await getDictatedValue(input_text, true, relevant_item?.label);

						if (dictated_text?.label && dictated_text?.text) {
							if (relevant_item?.subpage) {
								probable_commands.push({
									command: "goToUnitSubpage",
									subpage: subpages_list?.find((e) => e?.id === relevant_item.subpage),
								});
							} else if (relevant_item?.isOnOverview) {
								probable_commands.push({ command: "goToUnitOverview" });
							}

							probable_commands.push({
								command: "dictateText",
								label: dictated_text?.label,
								text: dictated_text?.text?.split("\n"),
								path: relevant_item?.path,
								isList: true,
							});
						}
					} else if (dictate_or_generate_text_res?.content?.toLowerCase() === "generate") {
						probable_commands.push({ command: "goToPage" });

						if (relevant_item?.subpage) {
							probable_commands.push({
								command: "goToUnitSubpage",
								subpage: subpages_list?.find((e) => e?.id === relevant_item.subpage),
							});
						}

						probable_commands.push({
							command: "generateText",
							path: relevant_item?.path.concat("text"),
							splitIntoArray: true,
							isList: relevant_item?.isList,
							addValue: possible_commands.addValue,
						});
					}
				} else if (unit_value_object) {
					const dictate_or_generate_text_res = await getDictateOrGenerate(input_text);

					if (dictate_or_generate_text_res?.content?.toLowerCase() === "dictate") {
						const dictated_text = await getDictatedValue(input_text, unit_value_object?.isList);

						if (!unit_value_object?.isList) {
							if (dictated_text) {
								probable_commands.push({ command: "goToPage" });

								if (unit_value_object?.subpage) {
									probable_commands.push({
										command: "goToUnitSubpage",
										subpage: subpages_list?.find((e) => e?.id === unit_value_object.subpage),
									});
								}

								probable_commands.push({
									command: "dictateText",
									text: unit_value_object?.splitIntoArray ? dictated_text?.split("\n") : dictated_text,
									path: unit_value_object?.path,
									isList: unit_value_object?.isList,
									addValue: possible_commands.addValue,
								});
							}
						} else {
							if (dictated_text?.label && dictated_text?.text) {
								probable_commands.push({ command: "goToPage" });

								if (unit_value_object?.subpage) {
									probable_commands.push({
										command: "goToUnitSubpage",
										subpage: subpages_list?.find((e) => e?.id === unit_value_object.subpage),
									});
								}

								probable_commands.push({
									command: "dictateText",
									label: dictated_text?.label,
									text: dictated_text?.text?.split("\n"),
									path: unit_value_object?.path,
									isList: unit_value_object?.isList,
									addValue: possible_commands.addValue,
								});
							}
						}
					} else if (dictate_or_generate_text_res?.content?.toLowerCase() === "generate") {
						probable_commands.push({ command: "goToPage" });

						if (unit_value_object?.subpage) {
							probable_commands.push({
								command: "goToUnitSubpage",
								subpage: subpages_list?.find((e) => e?.id === unit_value_object.subpage),
							});
						}

						probable_commands.push({
							command: "generateText",
							path: unit_value_object?.path,
							splitIntoArray: unit_value_object?.splitIntoArray,
							isList: unit_value_object?.isList,
							addValue: possible_commands.addValue,
						});
					}
				}
			}

			// Go To Page
			if (probable_commands.length === 0 && (possible_commands.goToPage || message_keys.includes("navigate"))) {
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
		[GPT_Request, subpages_list, unit_value_objects, getUnitListItems, getDictateOrGenerate, getDictatedValue]
	);

	const getUnit = useCallback((input_text, units) => {
		let unit = undefined;

		let locationSplit = window?.location?.pathname.split("/").filter((e) => e.length !== 0);
		if (locationSplit.length >= 4 && locationSplit[0] === "s" && ["c", "g", "p", "l", "e", "w", "o"].includes(locationSplit[2])) {
			unit = units.find((e) => e?.uid === locationSplit[3]);
		}

		const first_input_words = input_text.split(" ").slice(0, 5).join(" ").toLowerCase();
		if (["go to", "navigate to", "open"].map((e) => first_input_words.includes(e)).filter((e) => e !== false).length !== 0) {
			const new_unit = units?.filter((e) => input_text.toLowerCase().includes(e?.name?.toLowerCase()))?.[0];
			if (new_unit) unit = new_unit;
		}

		return unit;
	}, []);

	const getMessageKeys = useCallback(
		async (input_text) => {
			let keys = (
				await GPT_Request([
					{
						role: "system",
						content:
							"I will provide you a user request message. Please respond with the following keys that best corresponds to the message: none, edit_text, write_text, navigate, create_character, create_character_type, create_group, create_plot, create_location, create_event, create_object, create_world_item. Start with Keys: and then seperate them by commas.",
					},
					{
						role: "user",
						content: "USER REQUEST MESSAGE: " + input_text,
					},
				])
			)?.content;
			if (!keys) return [];

			keys = keys.substring(6).split(", ");
			if (keys.includes("edit_text") || keys.includes("write_text") || keys.includes("navigate")) {
				keys = keys.filter((e) => ["write_text", "edit_text", "navigate"].includes(e));
			}

			return keys;
		},
		[GPT_Request]
	);

	const getCommands = useCallback(
		async (input_text, units) => {
			let commands = [];

			const message_keys = await getMessageKeys(input_text);

			const create_unit_message_keys = [
				"create_character",
				"create_group",
				"create_plot",
				"create_location",
				"create_object",
				"create_world_item",
			].filter((e) => message_keys.includes(e));

			if (create_unit_message_keys.length === 0) {
				const possible_commands = getPossibleCommands(input_text, message_keys);

				let unit = getUnit(input_text, units);

				let probable_commands = await getProbableCommands(input_text, possible_commands, unit, message_keys);

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
						addValue: generateTextCommand?.addValue,
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
						label: dictateTextCommand?.label,
						text: dictateTextCommand?.text,
						isList: dictateTextCommand?.isList,
						addValue: dictateTextCommand?.addValue,
					});
				}
			} else {
				let unit_type_path = "";
				let unit_type_name = "";
				switch (create_unit_message_keys[0]) {
					case "create_character":
						unit_type_path = "characters";
						unit_type_name = "character";
						break;
					case "create_character_type":
						unit_type_path = "characters";
						unit_type_name = "character type";
						break;
					case "create_group":
						unit_type_path = "characters";
						unit_type_name = "group";
						break;
					case "create_plot":
						unit_type_path = "plots";
						unit_type_name = "plot";
						break;
					case "create_location":
						unit_type_path = "locations";
						unit_type_name = "location";
						break;
					case "create_event":
						unit_type_path = "events";
						unit_type_name = "event";
						break;
					case "create_object":
						unit_type_path = "objects";
						unit_type_name = "object";
						break;
					case "create_world_item":
						unit_type_path = "world-building";
						unit_type_name = "world item";
						break;
					default:
						break;
				}
				commands.push({
					desc: "I'll begin creating a new " + unit_type_name + " now",
					function: "changeLocation",
					arguments: ["/s/" + story?.uid + "/" + unit_type_path],
				});
				commands.push({
					desc: "",
					function: "createUnit",
					authorization_required: true,
					arguments: [unit_type_path],
				});
			}

			return commands;
		},
		[story, getPossibleCommands, getProbableCommands, getUnit, getMessageKeys]
	);

	return { getCommands };
};
