// Packages
import { FaBook, FaPlus, FaSearch, FaStar, FaTimes } from "react-icons/fa";

// Components
import { ContentItem } from "../../../components/ContentItem/ContentItem";
import { EditableContainer } from "../../../components/EditableContainer/EditableContainer";
import { LabelContainer } from "../../../components/LabelContainer/LabelContainer";
import { DragDropContainer } from "../../../components/DragDropContainer/DragDropContainer";
import { DragDropItem } from "../../../components/DragDropItem/DragDropItem";
import { IconBtn } from "../../../components/IconBtn/IconBtn";
import { TextInput } from "../../../components/TextInput/TextInput";

// Logic
import { GenresLogic } from "./GenresLogic";

// Context

// Services

// Styles
import "./Genres.css";

// Assets

export const Genres = () => {
	const {
		isAuthorizedToEdit,
		story,
		storyGenres,
		allGenres,
		isReorderingStoryGenres,
		toggleIsReorderingStoryGenres,
		reorderStoryGenres,
		revertStoryGenres,
		saveStoryGenres,
		addGenre,
		removeGenre,
		genresSearchValue,
		changeGenresSearchValue,
		genresNewGenreName,
		changeGenresNewGenreName,
		createNewGenre,
	} = GenresLogic();

	if (!isAuthorizedToEdit && (!story?.data?.genres || !storyGenres || story?.data?.genres.length === 0)) return null;

	if (!story?.data?.genres)
		return (
			<ContentItem size='s' hasBg={true}>
				<LabelContainer className='story-genres-container' label='Genres'>
					<div className='story-genres'>
						<div className='story-genres-list'>
							<div className='story-genres-item-placeholder loading-background'></div>
							<div className='story-genres-item-placeholder loading-background'></div>
							<div className='story-genres-item-placeholder loading-background'></div>
						</div>
					</div>
				</LabelContainer>
			</ContentItem>
		);

	if (story?.data?.genres && !storyGenres)
		return (
			<ContentItem size='s' hasBg={true}>
				<LabelContainer className='story-genres-container' label='Genres'>
					<div className='story-genres'>
						<div className='story-genres-list'>
							{story?.data?.genres.map((genre, index) => (
								<div key={index} className='story-genres-item-placeholder loading-background'></div>
							))}
						</div>
					</div>
				</LabelContainer>
			</ContentItem>
		);

	return (
		<ContentItem size='s' hasBg={true}>
			<LabelContainer className='story-genres-container' label='Genres'>
				<EditableContainer
					absolutePositionEditBtns={true}
					isAuthorizedToEdit={isAuthorizedToEdit}
					onReorder={toggleIsReorderingStoryGenres}
					onRevert={revertStoryGenres}
					onSave={saveStoryGenres}
					higherEditBtns={true}
				>
					<div className='story-genres'>
						<div className='story-genres-list'>
							{storyGenres.map((genre, index) => (
								<div key={index} className='story-genres-item story-genres-item-active'>
									<div className='story-genres-item-title'>{genre?.name}</div>
								</div>
							))}
						</div>
					</div>
					<div className='story-genres'>
						<DragDropContainer className='story-genres-list' enableDragDrop={isReorderingStoryGenres} onDropItem={reorderStoryGenres}>
							{storyGenres.map((genre, index) => (
								<DragDropItem key={index} index={index} className='story-genres-item story-genres-item-active'>
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
									<div className='story-genres-item-remove-btn-container'>
										<IconBtn
											icon={<FaTimes />}
											iconName='times'
											seamless={true}
											size='s'
											onClick={() => removeGenre(genre._id)}
										/>
									</div>
								</DragDropItem>
							))}
						</DragDropContainer>
						<div className='story-genres-search-container'>
							<TextInput
								icon={FaSearch}
								label='Search Genres'
								value={genresSearchValue}
								onChange={changeGenresSearchValue}
								size='s'
							/>
						</div>
						<div className='story-genres-list'>
							{allGenres
								.filter(
									(e) =>
										storyGenres.findIndex((e2) => e._id === e2._id) === -1 &&
										new RegExp("^" + genresSearchValue, "i").test(e.name)
								)
								.sort((a, b) => {
									const regex = new RegExp("^" + genresSearchValue, "i");
									return regex.test(a.name) ? (regex.test(b.name) ? (a.storiesUsing <= b.storiesUsing ? 1 : -1) : -1) : 1;
								})
								.map((genre, index) =>
									index + 1 > 8 ? null : (
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
									)
								)}
						</div>
						<div className='story-genres-new-genre-container'>
							<TextInput
								icon={FaPlus}
								label='Create New Genre'
								value={genresNewGenreName}
								onChange={changeGenresNewGenreName}
								size='s'
							/>
							<IconBtn icon={<FaPlus />} iconName='plus' seamless={true} size='m' onClick={createNewGenre} />
						</div>
					</div>
				</EditableContainer>
			</LabelContainer>
		</ContentItem>
	);
};
