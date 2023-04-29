// Packages
import { FaChevronRight } from "react-icons/fa";

// Components

// Logic
import { CreditsLogic } from "./CreditsLogic";

// Context

// Services

// Styles
import "./Credits.css";

// Assets

export const Credits = () => {
	const { credits, isDisplayingCredits, toggleIsDisplayingCredits, toURL } = CreditsLogic();

	return (
		<div
			className={
				isDisplayingCredits
					? "locations-credits-container locations-credits-container-is-displaying-credits"
					: "locations-credits-container"
			}
		>
			<div className='locations-credits-title' onClick={toggleIsDisplayingCredits}>
				<FaChevronRight />
				<div className='locations-credits-title-text'>Credits</div>
			</div>
			<div className='locations-credits'>
				{credits.map((credit, index) => (
					<div key={index} className='locations-credit'>
						<div
							className='locations-credit-link'
							onClick={(e) => toURL(e, credit.sourceLink)}
							onAuxClick={(e) => toURL(e, credit.sourceLink)}
						>
							{credit?.title} by {credit?.creator}
						</div>
						&nbsp;/&nbsp;
						<div
							className='locations-credit-link'
							onClick={(e) => toURL(e, credit.licenseLink)}
							onAuxClick={(e) => toURL(e, credit.licenseLink)}
						>
							{credit?.license}
						</div>
					</div>
				))}
			</div>
		</div>
	);
};
