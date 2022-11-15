// Packages
import { FaBook, FaPlus, FaStar, FaTimes } from "react-icons/fa";

// Components
import { ContentItem } from "../../../components/ContentItem/ContentItem";
import { EditableContainer } from "../../../components/EditableContainer/EditableContainer";
import { LabelContainer } from "../../../components/LabelContainer/LabelContainer";
import { IconBtn } from "../../../components/IconBtn/IconBtn";

// Logic
import { StoryGenresLogic } from "./StoryGenresLogic";

// Context

// Services

// Styles
import "./StoryGenres.css";

// Assets

export const StoryGenres = () => {
	const { isAuthorizedToEdit, story, storyGenres, allGenres, revertStoryGenres, saveStoryGenres, addGenre, removeGenre } = StoryGenresLogic();

	if (!story?.data?.genres)
		return (
			<ContentItem size='s' hasBg={true}>
				<LabelContainer label='Genres'></LabelContainer>
			</ContentItem>
		);
	return (
		<ContentItem size='s' hasBg={true}>
			<LabelContainer label='Genres'>
				<EditableContainer
					className='story-genres-container'
					absolutePositionEditBtns={true}
					isAuthorizedToEdit={isAuthorizedToEdit}
					onRevert={revertStoryGenres}
					onSave={saveStoryGenres}
					higherEditBtns={true}
				>
					<div className='story-genres'>
						<div className='story-genres-list'>
							{storyGenres.map((genre, index) => (
								<div key={index} className='story-genres-item story-genres-item-active'>
									<div className='story-genres-item-title'>{genre?.name}</div>
									<div className='story-genres-item-info'>
										<div className='story-genres-item-stat'>
											<FaStar />
											<div className='story-genres-item-stat-value'>{genre?.usersFavourited}</div>
										</div>
										<div className='story-genres-item-stat'>
											<FaBook />
											<div className='story-genres-item-stat-value'>{genre?.storiesUsing}</div>
										</div>
									</div>
								</div>
							))}
						</div>
					</div>
					<div className='story-genres'>
						<div className='story-genres-list'>
							{storyGenres.map((genre, index) => (
								<div key={index} className='story-genres-item story-genres-item-active'>
									<div>
										<div className='story-genres-item-title'>{genre?.name}</div>
										<div className='story-genres-item-info'>
											<div className='story-genres-item-stat'>
												<FaStar />
												<div className='story-genres-item-stat-value'>{genre?.usersFavourited}</div>
											</div>
											<div className='story-genres-item-stat'>
												<FaBook />
												<div className='story-genres-item-stat-value'>{genre?.storiesUsing}</div>
											</div>
										</div>
									</div>
									<div className='story-genres-item-add-btn-container'>
										<IconBtn
											icon={<FaTimes />}
											iconName='times'
											seamless={true}
											size='s'
											onClick={() => removeGenre(genre._id)}
										/>
									</div>
								</div>
							))}
						</div>
						<div className='story-genres-list'>
							{allGenres
								.filter((e) => storyGenres.findIndex((e2) => e._id === e2._id) === -1)
								.map((genre, index) => (
									<div key={index} className='story-genres-item'>
										<div>
											<div className='story-genres-item-title'>{genre?.name}</div>
											<div className='story-genres-item-info'>
												<div className='story-genres-item-stat'>
													<FaStar />
													<div className='story-genres-item-stat-value'>{genre?.usersFavourited}</div>
												</div>
												<div className='story-genres-item-stat'>
													<FaBook />
													<div className='story-genres-item-stat-value'>{genre?.storiesUsing}</div>
												</div>
											</div>
										</div>
										<div className='story-genres-item-add-btn-container'>
											<IconBtn
												icon={<FaPlus />}
												iconName='plus'
												seamless={true}
												size='s'
												onClick={() => addGenre(genre._id)}
											/>
										</div>
									</div>
								))}
						</div>
					</div>
				</EditableContainer>
			</LabelContainer>
		</ContentItem>
	);
};
