// Packages

// Components

// Logic
import { CarouselContainerLogic } from "./CarouselContainerLogic";

// Context

// Services

// Styles
import "./CarouselContainer.css";

// Assets

export const CarouselContainer = ({ children, className, speed, fallback, scrollStartOnDataChange }) => {
	const { carouselClassName, carouselContentRef, scrollCarousel } = CarouselContainerLogic({
		className,
		speed,
		scrollStartOnDataChange,
	});

	return (
		<div
			className={carouselClassName}
			onMouseEnter={fallback ? () => scrollCarousel(0) : null}
			onMouseLeave={fallback ? () => scrollCarousel(speed ? -0.85 * speed : -0.85) : null}
		>
			<div ref={carouselContentRef} className='carousel-content'>
				{children}
			</div>
			<div
				className={carouselContentRef?.current?.scrollLeft === 0 ? "carousel-scroll-left carousel-scroll-hidden" : "carousel-scroll-left"}
				onPointerEnter={() => scrollCarousel(speed ? -1 * speed : -1)}
				onPointerLeave={() => scrollCarousel(0)}
				onMouseLeave={() => scrollCarousel(0)}
				onDragEnter={() => scrollCarousel(speed ? -1 * speed : -1)}
				onDragLeave={() => scrollCarousel(0)}
			></div>
			<div
				className={
					carouselContentRef?.current?.scrollLeft === carouselContentRef?.current?.scrollWidth - carouselContentRef?.current?.clientWidth
						? "carousel-scroll-right carousel-scroll-hidden"
						: "carousel-scroll-right"
				}
				onPointerEnter={() => scrollCarousel(speed ? 1.25 * speed : 1.25)}
				onPointerLeave={() => scrollCarousel(0)}
				onMouseLeave={() => scrollCarousel(0)}
				onDragEnter={() => scrollCarousel(speed ? 1.25 * speed : 1.25)}
				onDragLeave={() => scrollCarousel(0)}
			></div>
		</div>
	);
};
