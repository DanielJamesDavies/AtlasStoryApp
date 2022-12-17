// Packages
import { useContext, useState, useEffect } from "react";

// Components

// Logic

// Context
import { StoryContext } from "../../../../context/StoryContext";
import { APIContext } from "../../../../context/APIContext";
import { RoutesContext } from "../../../../context/RoutesContext";

// Services

// Styles

// Assets

export const MembersLogic = () => {
	const { isAuthorizedToEdit, story, setStory } = useContext(StoryContext);
	const { APIRequest } = useContext(APIContext);
	const { location, changeLocation } = useContext(RoutesContext);

	const [members, setMembers] = useState(false);
	const [users, setUsers] = useState(false);

	const memberTypes = [
		{ id: "owner", name: "Owner" },
		{ id: "viewer", name: "Viewer" },
	];

	const [oldMembers, setOldMembers] = useState(false);
	useEffect(() => {
		async function getMembers() {
			if (!story) return false;
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
							profilePicture: image_response?.data?.image?.image,
						};
					})
				);
				newMembers = newMembers.filter((e) => e !== false);
				setMembers(newMembers);
			}
		}
		getMembers();
	}, [setMembers, story, oldMembers, setOldMembers, APIRequest]);

	useEffect(() => {
		async function getUsers() {
			const response = await APIRequest("/user?profilePicture=true", "GET");
			if (!response || response?.errors || !response?.data?.users) return false;
			setUsers(response.data.users);
		}
		getUsers();
	}, [setUsers, APIRequest]);

	function changeMemberType(e, index) {
		let newStory = JSON.parse(JSON.stringify(story));
		if (newStory.data.members.filter((e) => e.type === "owner").length >= 2) return;
		newStory.data.members[index].type = memberTypes[e]?.id;
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
		if (response?.data?.story?.owner !== story?.owner) changeLocation(location, false, true);
		return true;
	}

	const [searchUsersValue, setSearchUsersValue] = useState("");

	function changeSearchUsersValue(e) {
		setSearchUsersValue(e.target.value);
	}

	function addMember(user_id) {
		let newStory = JSON.parse(JSON.stringify(story));
		if (newStory.data.members.findIndex((e) => e.user_id === user_id) === -1) newStory.data.members.push({ user_id, type: "viewer" });
		setStory(newStory);
	}

	function removeMember(user_id) {
		let newStory = JSON.parse(JSON.stringify(story));
		const memberIndex = newStory.data.members.findIndex((e) => e.user_id === user_id);
		if (memberIndex !== -1) newStory.data.members.splice(memberIndex, 1);
		setStory(newStory);
	}

	return {
		isAuthorizedToEdit,
		story,
		members,
		users,
		memberTypes,
		changeMemberType,
		revertMembers,
		saveMembers,
		errors,
		searchUsersValue,
		changeSearchUsersValue,
		addMember,
		removeMember,
	};
};
