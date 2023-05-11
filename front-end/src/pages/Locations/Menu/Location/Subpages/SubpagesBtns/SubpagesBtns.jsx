// Packages
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

// Components
import { IconBtn } from "../../../../../../components/IconBtn/IconBtn";
import { BtnListItem } from "../../../../../../components/BtnListItem/BtnListItem";

// Logic
import { LocationSubpagesBtnsLogic } from "./SubpagesBtnsLogic";

// Context

// Services

// Styles
import "./SubpagesBtns.css";

// Assets

export const LocationSubpagesBtns = () => {
	const { isAuthorizedToEdit, subpages, openSubpageID, setOpenSubpageID, subpagesBtnsRef, scrollSubpageBtns } = LocationSubpagesBtnsLogic();

	return (
		<div className='locations-location-subpages-btns-container'>
			<IconBtn icon={<FaChevronLeft />} seamless={true} onClick={() => scrollSubpageBtns(-1)} size='xs' />
			<div
				ref={subpagesBtnsRef}
				className={
					isAuthorizedToEdit
						? "locations-location-subpages-btns locations-location-subpages-btns-is-authorized"
						: "locations-location-subpages-btns"
				}
			>
				{subpages.map((subpage, index) => (
					<BtnListItem
						key={index}
						className='locations-location-subpages-btn'
						size='xs'
						value={subpage.name}
						isActive={subpage.id === openSubpageID}
						onClick={() => setOpenSubpageID(subpage.id)}
					/>
				))}
			</div>
			<IconBtn icon={<FaChevronRight />} seamless={true} onClick={() => scrollSubpageBtns(1)} size='xs' />
		</div>
	);
};
