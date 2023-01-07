// Packages

// Components
import { Icon } from "./Icon/Icon";
import { Title } from "./Title/Title";
import { Members } from "./Members/Members";
import { Buttons } from "./Buttons/Buttons";

// Logic
import { HeaderLogic } from "./HeaderLogic";

// Context

// Services

// Styles
import "./Header.css";

// Assets

export const Header = () => {
	const { isAuthorizedToEdit, user_id, story } = HeaderLogic();

	return (
		<div className={isAuthorizedToEdit ? "story-header story-header-is-authorized" : "story-header"}>
			<Icon />
			<div
				className={
					story?.data?.members.findIndex((e) => e.user_id === user_id) !== -1
						? "story-header-title-members-container story-header-title-members-container-is-member"
						: "story-header-title-members-container"
				}
			>
				<Title />
				<Members />
			</div>
			<Buttons />
			<div className='story-header-background' />
		</div>
	);
};
