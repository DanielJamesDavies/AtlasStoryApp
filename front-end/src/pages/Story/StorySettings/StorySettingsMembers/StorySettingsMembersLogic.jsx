// Packages
import { useContext, useState } from "react";

// Components

// Logic

// Context
import { StoryContext } from "../../StoryContext";
import { APIContext } from "../../../../context/APIContext";
import { useEffect } from "react";

// Services

// Styles

// Assets

export const StorySettingsMembersLogic = () => {
	const { isAuthorizedToEdit, story, setStory } = useContext(StoryContext);
	const { APIRequest } = useContext(APIContext);

	const [members, setMembers] = useState([]);

	const types = [
		{ id: "owner", name: "Owner" },
		{ id: "viewer", name: "Viewer" },
	];

	const [oldMembers, setOldMembers] = useState([]);
	useEffect(() => {
		async function getMembers() {
			if (JSON.stringify(story?.data?.members) !== JSON.stringify(oldMembers)) {
				setOldMembers(JSON.parse(JSON.stringify(story?.data?.members)));
				let newMembers = await Promise.all(
					story?.data?.members?.map(async (member) => {
						const response = await APIRequest("/user/" + member.user_id, "GET");
						if (!response || response?.errors || response?.data?.user === undefined) return false;
						const image_response = await APIRequest("/image/" + response?.data?.user?.data?.profilePicture, "GET");
						return {
							_id: response?.data?.user?._id,
							username: response?.data?.user?.username,
							nickname: response?.data?.user?.data?.nickname,
							profilePicture: image_response?.data?.image,
						};
					})
				);
				newMembers = newMembers.filter((e) => e !== false);
				setMembers(newMembers);
			}
		}
		getMembers();
	}, [setMembers, story, oldMembers, setOldMembers, APIRequest]);

	function changeMemberType(e, index) {
		let newStory = JSON.parse(JSON.stringify(story));
		newStory.data.members[index].type = e;
		setStory(newStory);
	}

	const [errors, setErrors] = useState([]);

	async function revertMembers() {
		const response = await APIRequest("/story/get-value/" + story._id, "POST", {
			story_id: story._id,
			path: ["data", "members"],
		});
		if (!response || response?.errors || response?.data?.value === undefined) return false;

		let newStory = JSON.parse(JSON.stringify(story));
		newStory.data.members = response.data.value;
		setStory(newStory);

		return true;
	}

	async function saveMembers() {
		setErrors([]);
		if (!story?._id) return;
		const response = await APIRequest("/story/" + story._id, "PATCH", {
			story_id: story._id,
			path: ["data", "members"],
			newValue: story?.data?.members,
		});
		if (!response || response?.errors || !response?.data?.story?.uid) {
			if (response?.errors) setErrors(response.errors);
			return false;
		}
		return true;
	}

	return { isAuthorizedToEdit, story, members, types, changeMemberType, revertMembers, saveMembers, errors };
};
