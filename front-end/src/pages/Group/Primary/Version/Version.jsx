// Packages
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

// Components
import { IconBtn } from "../../../../components/IconBtn/IconBtn";

// Logic
import { GroupPrimaryVersionLogic } from "./VersionLogic";

// Context

// Services

// Styles
import "./Version.css";

// Assets

export const GroupPrimaryVersion = ({ groupPrimaryVersionRef }) => {
	const { group, groupVersion, decrementGroupVersion, incrementGroupVersion, primaryVersionStyle, primaryVersionWidthRef } =
		GroupPrimaryVersionLogic();

	return (
		<div ref={groupPrimaryVersionRef} className='group-primary-version-container'>
			<IconBtn icon={<FaChevronLeft />} onClick={decrementGroupVersion} seamless={true} size='s' />
			<div className='group-primary-version' style={primaryVersionStyle}>
				<div className='group-primary-version-label'>Version</div>
				<div className='group-primary-version-title'>{groupVersion.title}</div>
			</div>
			<div ref={primaryVersionWidthRef} className='group-primary-version-width-element'>
				{group?.data?.versions?.map((version, index) => (
					<div key={index} className='group-primary-version-width-element-title'>
						{version?.title}
					</div>
				))}
			</div>
			<IconBtn icon={<FaChevronRight />} onClick={incrementGroupVersion} seamless={true} size='s' />
		</div>
	);
};
