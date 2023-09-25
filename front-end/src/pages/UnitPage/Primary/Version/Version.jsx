// Packages
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

// Components
import { IconBtn } from "../../../../components/IconBtn/IconBtn";

// Logic
import { VersionLogic } from "./VersionLogic";

// Context

// Services

// Styles
import "./Version.css";

// Assets

export const Version = ({ unitPrimaryVersionRef }) => {
	const { unit, unitVersion, decrementUnitVersion, incrementUnitVersion, primaryVersionStyle, primaryVersionWidthRef } = VersionLogic();

	return (
		<div ref={unitPrimaryVersionRef} className='unit-page-primary-version-container'>
			<IconBtn icon={<FaChevronLeft />} onClick={decrementUnitVersion} seamless={true} size='s' />
			<div className='unit-page-primary-version' style={primaryVersionStyle}>
				<div className='unit-page-primary-version-label'>Version</div>
				<div className='unit-page-primary-version-title'>{unitVersion.title}</div>
			</div>
			<div ref={primaryVersionWidthRef} className='unit-page-primary-version-width-element'>
				{unit?.data?.versions?.map((version, index) => (
					<div key={index} className='unit-page-primary-version-width-element-title'>
						{version?.title}
					</div>
				))}
			</div>
			<IconBtn icon={<FaChevronRight />} onClick={incrementUnitVersion} seamless={true} size='s' />
		</div>
	);
};
