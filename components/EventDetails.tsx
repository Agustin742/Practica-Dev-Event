import Image from "next/image";
import { notFound } from "next/navigation";
import { cacheLife } from "next/cache";
import BookEvent from "./BookEvent";
import EventAgenda from "./EventAgenda";
import EventCard from "./EventCard";
import EventDetailItem from "./EventDetailItem";
import EventTags from "./EventTags";
import { getSimilarEventsBySlug } from "@/lib/actions/event.action";
import { IEvent } from "@/database";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

const EventDetails = async ({ params }: { params: Promise<string> }) => {
  'use cache'
  cacheLife('hours');

  const slug = await params;

  let event;

  try {
    const request = await fetch(`${BASE_URL}/api/event/${slug}`);

    if (!request.ok) {
      if (request.status === 400) {
        return notFound()
      }
      throw new Error(`Failed to fecth event: ${request.statusText}`);
    }

    const response = await request.json();
    event = response.event;

    if (!event) {
      return notFound()
    }

  } catch (error) {
    console.error('Error fetching event: ', error);
    return notFound();
  }

  const { description, image, overview, date, time, location, mode, agenda, audience, tags, organizer} = event;
  const booking = 10;

  const similarEvents: IEvent[] = await getSimilarEventsBySlug(slug);

  return (
    <section id="event">
      <div className="header">
        <h1>Event Description</h1>
        <p>{description}</p>
      </div>

      <div className="details">
      {/* Left Side - Event Content */}
        <div className="content">
          <Image src={image} alt="Event Banner" width={800} height={800} className="banner" />

          <section className="flex-col-gap-2">
            <h2>Overview</h2>
            <p>{overview}</p>
          </section>

          <section className="flex-col-gap-2">
            <h2>Event Details</h2>
            <EventDetailItem icon="/icons/calendar.svg" alt="calendar" label={date} />
            <EventDetailItem icon="/icons/clock.svg" alt="clock" label={time} />
            <EventDetailItem icon="/icons/pin.svg" alt="pin" label={location} />
            <EventDetailItem icon="/icons/mode.svg" alt="mode" label={mode} />
            <EventDetailItem icon="/icons/audience.svg" alt="audience" label={audience} />
          </section>

          <EventAgenda agendaItems={agenda}/>

          <section className="flex-col-gap-2">
            <h2>About the Organizer</h2>
            <p>{organizer}</p>
          </section>

          <EventTags tags={tags} />

        </div>

      {/* Right Side - Booking Form */}
        <aside className="booking">
          <div className="signup-card">
            <h2>Book Your Spot</h2>
            {booking > 0 ? (
              <p className="text-sm">
                Join {booking} people who have already booked their spot!
              </p>
            ) : (
              <p className="text-sm">
                Be the first to book your spot! 
              </p>
            )}

            <BookEvent 
            eventId={event._id} 
            slug={slug} 
            />
          </div>
        </aside>
      </div>

      <div className="w-full flex-col gap-4 p-20 mt-20">
          <h2>Similar Events</h2>
        <div className="events">
          {similarEvents.length > 0 && similarEvents.map((similarEvent: IEvent) => (
            <EventCard 
              key={similarEvent.title}
              title={similarEvent.title}
              image={similarEvent.image}
              slug={similarEvent.slug}
              location={similarEvent.location}
              date={similarEvent.date}
              time={similarEvent.time}
              />
          ))}
        </div>
      </div>
    </section>
  )
}

export default EventDetails