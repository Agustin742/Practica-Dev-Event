/* eslint-disable react/no-unescaped-entities */

import EventCard from "@/components/EventCard"
import ExploreBtn from "@/components/ExploreBtn"
import { IEvent } from "@/database";
import { cacheLife, cacheTag } from "next/cache";


const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

const Page = async () => {
  'use cache';
  cacheLife('hours');
  cacheTag('events')

  const response = await fetch(`${BASE_URL}/api/event`);
  
  if (!response.ok) {
    console.error('Failed to fetch events:', response.status);
    return (
      <section>
        <h1 className='text-center'>
          The Hub for Every Dev <br />
          Event You Can't Miss
        </h1>
        <p className="text-center mt-5">Failed to load events. Please try again later.</p>
      </section>
    );
  }
  
  const { events } = await response.json();


  return (
    <section>
      <h1 className='text-center'>
        The Hub for Every Dev <br />
        Event You Can't Miss
        </h1>
        <p className="text-center mt-5">
          Hackaton, Meetups and Conferences, All in One Place
        </p>

        <ExploreBtn />

        <div className="mt-20 space-y-7">
          <h3>Feature events</h3>

          <ul className="events">
            {events && events.length > 0 && events.map((event: IEvent) => (
              <li key={event.title} className="list-none">
                <EventCard {...event} />
              </li>
            ))}
          </ul>
        </div>
    </section>
  )
}

export default Page 