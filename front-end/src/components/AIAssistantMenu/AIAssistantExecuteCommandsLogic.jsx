// Packages
import { useCallback, useContext } from "react";

// Components

// Logic

// Context
import { StoryContext } from "../../context/StoryContext";
import { AIContext } from "../../context/AIContext";
import { RoutesContext } from "../../context/RoutesContext";

// Services

// Styles

// Assets

export const AIAssistantExecuteCommandsLogic = ({ isRunningAssistantRef }) => {
	const { GPT_Request } = useContext(AIContext);
	const { setUnitValueToChange, getUnitValue, setCreateUnitForm } = useContext(StoryContext);
	const { changeLocation, setRoutesUnitSubpageID, setRoutesIsOnOverviewSection } = useContext(RoutesContext);

	const generateText = useCallback(
		async (generateTextCommand, input_text) => {
			let old_value = getUnitValue.current(generateTextCommand?.arguments[0], generateTextCommand?.arguments[1]);
			if (JSON.stringify(typeof old_value) === JSON.stringify("array")) old_value = old_value.join("\n");

			const generated_text_res = (
				await GPT_Request([
					{
						role: "system",
						content:
							"Never describe the question, just answer. Please fulfil the commands of the user message using the content of the text provided. Please ensure all your responses are well written and concise. Never write text such as, 'Here's the revised text:'.",
					},
					{ role: "user", content: "TEXT: " + old_value },
					{
						role: "user",
						content:
							"Please use the same formatting as the TEXT. For example, if there are bullet points in the TEXT, please use bullet points in the revised version.",
					},
					{
						role: "user",
						content:
							"Never write the given text with the revised version unless asked to, just write the revised version. Please make sure to use \n line breaks in your response to split paragraphs if there are multiple paragraphs!",
					},
					{
						role: "user",
						content:
							"If asked to add content, always make sure to include the rest of the given text in the revised version. Do not add any more than what the user message asks, if the user asks for one more paragraph, only add one more paragraph.",
					},
					{
						role: "user",
						content: "USER MESSAGE: " + input_text + ".",
					},
					{
						role: "user",
						content:
							"Please never apologise, you're doing a great job. Please write the revised version now with the user message as your guide. Remember, this is your task: " +
							input_text +
							". Thank you",
					},
				])
			)?.content;

			if (!isRunningAssistantRef.current) return false;

			setUnitValueToChange({
				unit_id: generateTextCommand?.arguments[0],
				path: generateTextCommand?.arguments[1],
				newValue: generateTextCommand?.splitValueIntoArray ? generated_text_res?.split("\n") : generated_text_res,
				isList: generateTextCommand?.isList,
			});
		},
		[GPT_Request, setUnitValueToChange, getUnitValue, isRunningAssistantRef]
	);

	const getNameOfNewUnit = useCallback(
		async (input_text) => {
			const name = (
				await GPT_Request([
					{
						role: "system",
						content: `Respond with NAME IN USER MESSAGE: and then the name. If there is no name in the user message, respond with NO_NAME_1. Never come up with a name unless in the user message`,
					},
					{ role: "user", content: "USER MESSAGE: " + input_text },
				])
			)?.content;
			if (name.includes("NO_NAME_1")) return undefined;
			return name.split("NAME IN USER MESSAGE: ")[1];
		},
		[GPT_Request]
	);

	const executeCommands = useCallback(
		async (commands, input_text) => {
			const changeLocationCommand = commands.find((e) => e?.function === "changeLocation");
			if (changeLocationCommand) {
				await changeLocation(...changeLocationCommand?.arguments);
			}
			await new Promise((resolve) => setTimeout(resolve, 1000));

			const changeUnitSubpageCommand = commands.find((e) => e?.function === "changeUnitSubpage");
			if (changeUnitSubpageCommand) {
				setRoutesUnitSubpageID(...changeUnitSubpageCommand?.arguments);
				setRoutesIsOnOverviewSection(false);
			}

			const goToUnitOverviewCommand = commands.find((e) => e?.function === "goToUnitOverview");
			if (goToUnitOverviewCommand) {
				setRoutesIsOnOverviewSection(true);
			}

			const dictateTextCommand = commands.find((e) => e?.function === "dictateText");
			if (dictateTextCommand) {
				setUnitValueToChange({
					unit_id: dictateTextCommand?.arguments[0],
					path: dictateTextCommand?.arguments[1],
					newValue: dictateTextCommand?.arguments[2],
					label: dictateTextCommand?.label,
					text: dictateTextCommand?.text,
					isList: dictateTextCommand?.isList,
					addValue: dictateTextCommand?.addValue,
				});
			}

			const generateTextCommand = commands.find((e) => e?.function === "generateText");
			if (generateTextCommand) {
				await generateText(generateTextCommand, input_text);
			}

			const createUnitCommand = commands.find((e) => e?.function === "createUnit");
			if (createUnitCommand) {
				// Open Create Menu
				await changeLocation("/s/" + createUnitCommand?.story_uid + "/" + createUnitCommand?.unit_type_path);
				await new Promise((resolve) => setTimeout(resolve, 500));

				// Fill Create Menu
				const name = await getNameOfNewUnit(input_text);
				if (name) {
					const uid = name.toLowerCase().replaceAll(" ", "-");
					setCreateUnitForm({ unit_type: createUnitCommand?.unit_type_id, name, uid });
				} else {
					setCreateUnitForm({ unit_type: createUnitCommand?.unit_type_id });
				}
			}
		},
		[
			generateText,
			changeLocation,
			setCreateUnitForm,
			setRoutesIsOnOverviewSection,
			setRoutesUnitSubpageID,
			setUnitValueToChange,
			getNameOfNewUnit,
		]
	);

	return { executeCommands };
};
