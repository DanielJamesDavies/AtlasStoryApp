// Packages
import { FaBars, FaTimes } from "react-icons/fa";

// Components
import { RelationshipChart } from "./Chart/RelationshipChart";
import { RelationshipsInfo } from "./Info/RelationshipsInfo";
import { Relationship } from "./Relationship/Relationship";
import { IconBtn } from "../../../../../components/IconBtn/IconBtn";
import { LoadingCircle } from "../../../../../components/LoadingCircle/LoadingCircle";

// Logic
import { RelationshipsLogic } from "./RelationshipsLogic";

// Context

// Services

// Styles
import "./Relationship.css";

// Assets

export const Relationships = () => {
	const {
		unit,
		storyGroups,
		storyCharacters,
		characterRelationships,
		characterRelationshipsCharacters,
		characterRelationshipsChartRef,
		characterRelationshipsChartWidth,
		characterRelationshipsChartItemWidth,
		isDisplayingInfo,
		toggleIsDisplayingInfo,
		characterSubpageRelationshipsRef,
		selectedCharacterRelationshipsCharacterId,
	} = RelationshipsLogic();

	return (
		<div
			ref={characterSubpageRelationshipsRef}
			className='unit-page-subpage unit-page-subpage-relationships'
			style={{
				"--characterRelationshipsChartWidth": characterRelationshipsChartWidth + "px",
				"--characterRelationshipsChartItemWidth": characterRelationshipsChartItemWidth + "px",
			}}
		>
			{!storyGroups || !storyCharacters ? null : (
				<div className='unit-page-subpage-relationships-primary-buttons-container'>
					<IconBtn
						className='unit-page-subpage-relationships-primary-btn-toggle-is-displaying-info'
						icon={<FaBars />}
						iconName='bars'
						iconSmall={!isDisplayingInfo ? undefined : <FaTimes />}
						onClick={toggleIsDisplayingInfo}
						seamless={true}
					/>
				</div>
			)}
			{!storyGroups || !storyCharacters || !characterRelationships || !characterRelationshipsCharacters ? (
				<div className='unit-page-subpage-relationships-content'>
					<LoadingCircle center={true} />
				</div>
			) : (
				<div className='unit-page-subpage-relationships-content'>
					<RelationshipChart
						characterRelationshipsChartRef={characterRelationshipsChartRef}
						characterRelationshipsChartWidth={characterRelationshipsChartWidth}
						characterRelationshipsChartItemWidth={characterRelationshipsChartItemWidth}
					/>
					{!selectedCharacterRelationshipsCharacterId ||
					characterRelationships.findIndex(
						(e) => e.character_ids.includes(unit._id) && e.character_ids.includes(selectedCharacterRelationshipsCharacterId)
					) === -1 ? (
						<RelationshipsInfo isDisplayingInfo={isDisplayingInfo} />
					) : (
						<Relationship isDisplayingInfo={isDisplayingInfo} />
					)}
				</div>
			)}
		</div>
	);
};
