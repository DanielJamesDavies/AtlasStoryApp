// Packages
import { FaBook, FaPlus, FaSearch, FaStar, FaTimes } from "react-icons/fa";

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
import { TextInput } from "../../../components/TextInput/TextInput";

// Assets

export const StoryGenres = () => {
	const {
		isAuthorizedToEdit,
		story,
		storyGenres,
		allGenres,
		revertStoryGenres,
		saveStoryGenres,
		addGenre,
		removeGenre,
		genresSearchValue,
		changeGenresSearchValue,
		genresNewGenreName,
		changeGenresNewGenreName,
		createNewGenre,
	} = StoryGenresLogic();

	if (!story?.data?.genres || !storyGenres)
		return (
			<ContentItem size='s' hasBg={true}>
				<LabelContainer label='Genres'>
					<div className='story-genres-container'>
						<div className='story-genres'>
							<div className='story-genres-list'>
								<div className='story-genres-item-placeholder'></div>
								<div className='story-genres-item-placeholder'></div>
							</div>
						</div>
					</div>
				</LabelContainer>
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
