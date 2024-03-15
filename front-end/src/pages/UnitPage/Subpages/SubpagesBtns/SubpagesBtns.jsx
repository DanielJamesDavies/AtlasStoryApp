// Packages
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

// Components
import { IconBtn } from "../../../../components/IconBtn/IconBtn";
import { BtnListItem } from "../../../../components/BtnListItem/BtnListItem";

// Logic
import { SubpagesBtnsLogic } from "./SubpagesBtnsLogic";

// Context

// Services

// Styles
import "./SubpagesBtns.css";

// Assets

export const SubpagesBtns = () => {
	const { isAuthorizedToEdit, subpages, openSubpageID, setOpenSubpageID, subpagesBtnsRef, scrollSubpageBtns } = SubpagesBtnsLogic();

	return (
		<div className='unit-page-subpages-btns-container'>
			<div className='unit-page-subpages-btn-scroll-btn'>
				<IconBtn icon={<FaChevronLeft />} seamless={true} onClick={() => scrollSubpageBtns(-1)} />
			</div>
			<div
				ref={subpagesBtnsRef}
				className={isAuthorizedToEdit ? "unit-page-subpages-btns unit-page-subpages-btns-is-authorized" : "unit-page-subpages-btns"}
			>
				{subpages
					.filter((e) =>
						isAuthorizedToEdit
							? e.isEnabled && e?.isSaved !== false
							: !["settings"].includes(e?.id) && e.isEnabled && e?.isSaved !== false
					)
					.map((subpage, index) => (
						<div
							key={index}
							className={
								"unit-page-subpages-btn unit-page-subpages-btn-" +
								subpage?.id +
								(subpage.id === openSubpageID ? " unit-page-subpages-btn-active" : "")
							}
							onClick={() => setOpenSubpageID(subpage.id)}
						>
							<div className='unit-page-subpages-btn-icon'>{subpage?.icon}</div>
							<div className='unit-page-subpages-btn-name'>{subpage?.name}</div>
						</div>
					))}
				{/* {subpages
					.filter((e) =>
						isAuthorizedToEdit
							? e.isEnabled && e?.isSaved !== false
							: !["settings"].includes(e?.id) && e.isEnabled && e?.isSaved !== false
					)
					.map((subpage, index) => (
						<BtnListItem
							key={index}
							className='unit-page-subpages-btn'
							size='s'
							value={subpage.name}
							isActive={subpage.id === openSubpageID}
							onClick={() => setOpenSubpageID(subpage.id)}
						/> 
				))} */}
			</div>
			<div className='unit-page-subpages-btn-scroll-btn'>
				<IconBtn icon={<FaChevronRight />} seamless={true} onClick={() => scrollSubpageBtns(1)} />
			</div>
		</div>
	);
};
