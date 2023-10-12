// Packages

// Components
import { BtnListContainer } from "../../../components/BtnListContainer/BtnListContainer";
import { BtnListItem } from "../../../components/BtnListItem/BtnListItem";

// Logic
import { SubpageButtonsLogic } from "./SubpageButtonsLogic";

// Context

// Services

// Styles
import "./SubpageButtons.css";

// Assets

export const SubpageButtons = () => {
	const { openSubpageID, subpages, changeSubpage } = SubpageButtonsLogic();

	return (
		<div className='settings-subpage-buttons'>
			<BtnListContainer>
				{subpages?.map((subpage, index) => (
					<BtnListItem
						key={index}
						value={subpage?.name}
						index={index}
						isActive={subpage?.id === openSubpageID}
						hasFoundActive={openSubpageID !== undefined}
						onClick={(e) => (e?.button === 2 ? null : changeSubpage(subpage?.id))}
					/>
				))}
			</BtnListContainer>
		</div>
	);
};
