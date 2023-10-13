// Packages

// Components
import { CarouselContainer } from "../../../components/CarouselContainer/CarouselContainer";

// Logic
import { TimelineLogic } from "./TimelineLogic";

// Context

// Services

// Styles
import "./Timeline.css";

// Assets

export const Timeline = () => {
	const { events, onEventClick } = TimelineLogic();

	return (
		<div className='events-timeline-container'>
			<CarouselContainer className='events-timeline' speed={1} fallback={true} disableOnMobile={true}>
				<div className='events-timeline-events'>
					{events
						?.sort((a, b) => {
							try {
								if (parseFloat(b?.data?.date?.year) > parseFloat(a?.data?.date?.year)) return -1;
								if (parseFloat(b?.data?.date?.year) < parseFloat(a?.data?.date?.year)) return 1;
								if (parseFloat(b?.data?.date?.month) > parseFloat(a?.data?.date?.month)) return -1;
								if (parseFloat(b?.data?.date?.month) < parseFloat(a?.data?.date?.month)) return 1;
								if (parseFloat(b?.data?.date?.day) > parseFloat(a?.data?.date?.day)) return -1;
								if (parseFloat(b?.data?.date?.day) < parseFloat(a?.data?.date?.day)) return 1;
								if (parseFloat(b?.data?.date?.time.split(":")[0]) > parseFloat(a?.data?.date?.time.split(":")[0])) return -1;
								if (parseFloat(b?.data?.date?.time.split(":")[0]) < parseFloat(a?.data?.date?.time.split(":")[0])) return 1;
								if (parseFloat(b?.data?.date?.time.split(":")[1]) > parseFloat(a?.data?.date?.time.split(":")[1])) return -1;
								if (parseFloat(b?.data?.date?.time.split(":")[1]) < parseFloat(a?.data?.date?.time.split(":")[1])) return 1;
							} catch {}
							return 0;
						})
						?.map((event, index) => (
							<div
								key={index}
								className={
									"events-timeline-event-container" +
									(event?.data?.isMajor ? " events-timeline-event-container-major" : " events-timeline-event-container-minor")
								}
							>
								<div
									className='events-timeline-event'
									onClick={(e) => onEventClick(e, event?.uid)}
									onAuxClick={(e) => onEventClick(e, event?.uid)}
									onMouseDown={(e) => e.preventDefault()}
								>
									<div className='events-timeline-event-name'>{event?.data?.name}</div>
									<div className='events-timeline-event-date'>
										{event?.data?.date?.time} {event?.data?.date?.day}/{event?.data?.date?.month}/{event?.data?.date?.year}
									</div>
								</div>
								<div
									className='events-timeline-event-line'
									onClick={(e) => onEventClick(e, event?.uid)}
									onAuxClick={(e) => onEventClick(e, event?.uid)}
									onMouseDown={(e) => e.preventDefault()}
								></div>
							</div>
						))}
				</div>
				<div></div>
			</CarouselContainer>
		</div>
	);
};
