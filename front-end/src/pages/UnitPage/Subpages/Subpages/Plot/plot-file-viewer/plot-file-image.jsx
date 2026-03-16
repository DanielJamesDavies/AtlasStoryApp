// Packages
import { useState, useEffect, useContext } from "react";

// Components

// Logic

// Context
import { UnitPageContext } from "../../../../UnitPageContext";
import { APIContext } from "../../../../../../context/APIContext";

// Services

// Styles

// Assets

// 24-character hex MongoDB ObjectID pattern
const OBJECT_ID_RE = /^[a-f0-9]{24}$/i;

export const PlotFileImage = ({ src, alt }) => {
	const { unitImages } = useContext(UnitPageContext);
	const { APIRequest } = useContext(APIContext);

	const isObjectId = OBJECT_ID_RE.test(src);
	const [imageSrc, setImageSrc] = useState(isObjectId ? null : src);
	const [loading, setLoading] = useState(isObjectId);

	useEffect(() => {
		if (!isObjectId) {
			setImageSrc(src);
			setLoading(false);
			return;
		}

		let cancelled = false;

		// Check pre-loaded unit gallery cache first
		const cached = unitImages.find((img) => String(img._id) === String(src));
		if (cached?.image) {
			setImageSrc(cached.image);
			setLoading(false);
			return;
		}

		// Fetch from API
		setLoading(true);
		APIRequest(`/image/${src}`, "GET").then((response) => {
			if (cancelled) return;
			const base64 = response?.data?.image?.image;
			setImageSrc(base64 || null);
			setLoading(false);
		});

		return () => {
			cancelled = true;
		};
	}, [src, unitImages, APIRequest, isObjectId]);

	if (loading) {
		return <span className='plot-file-image-loading' aria-hidden='true' />;
	}

	if (!imageSrc) return null;

	return (
		<span className='plot-file-image-wrapper'>
			<img src={imageSrc} alt={alt || ""} className='plot-file-viewer-image' />
			{alt && <span className='plot-file-image-caption'>{alt}</span>}
		</span>
	);
};
