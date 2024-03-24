// Packages

// Components
import { Piece } from "./Piece/Piece";

// Logic
import { ContentLogic } from "./ContentLogic";

// Context

// Services

// Styles
import "./Content.css";

// Assets

export const Content = () => {
	const { pieces, piecesRef } = ContentLogic();

	return (
		<div className='unit-page-storyboard-player-content'>
			<div ref={piecesRef} className='unit-page-storyboard-player-content-pieces'>
				{pieces?.map((piece, index) => (
					<Piece key={index} piece={piece} piecesRef={piecesRef} />
				))}
			</div>
		</div>
	);
};
