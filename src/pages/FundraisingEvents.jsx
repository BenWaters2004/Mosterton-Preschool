import React, { useEffect, useState } from "react";
import Nav from "../components/Nav";
import Footer from "../components/Footer";
import { HeroImage } from "../assets";
import { getDatabase, ref, onValue } from "firebase/database";

export default function FundraisingEvents() {
  const [events, setEvents] = useState([]);

  const parseUKDate = (dateString) => {
    const [day, month, year] = dateString.split("/");
    return new Date(`${year}-${month}-${day}`);
  };

  const formatLongDate = (date) => {
    const day = date.getDate();
    const month = date.toLocaleString("default", { month: "long" });
    const year = date.getFullYear();

    const suffix = (n) => {
      if (n > 3 && n < 21) return "th";
      switch (n % 10) {
        case 1: return "st";
        case 2: return "nd";
        case 3: return "rd";
        default: return "th";
      }
    };

    return `${day}${suffix(day)} ${month} ${year}`;
  };

  useEffect(() => {
    const db = getDatabase();
    const eventsRef = ref(db, "events");

    onValue(eventsRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const eventArray = Object.entries(data).map(([id, entry]) => ({
          id,
          ...entry,
          parsedDate: parseUKDate(entry.date),
        }));

        eventArray.sort((a, b) => a.parsedDate - b.parsedDate);
        setEvents(eventArray);
      } else {
        setEvents([]);
      }
    });
  }, []);

  const upcomingEvents = events.filter(
    (event) => event.parsedDate >= new Date()
  );

  return (
    <>
      <Nav />
      <div
        className="relative w-full h-[400px] bg-cover bg-center flex items-center justify-center heroBorder"
        style={{ backgroundImage: `url(${HeroImage})` }}
      >
        <div className="absolute inset-0 bg-white/60 z-0"></div>
        <h2 className="text-center text-3xl font-bold text-primary z-10 sm:text-5xl">
          Fundraising Events
        </h2>
      </div>

      <section className="pt-16 px-6">
        <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-10 items-start">
          {/* Why Fundraise */}
          <div className="md:col-span-2 py-4">
            <h3 className="text-2xl font-bold py-4">Why do we fundraise?</h3>
            <p className="mb-4">
              We fundraise to support educational resources, special activities, and facility improvements for the preschool. Every donation helps us create a better environment for children to grow, learn, and thrive.
              <br /><br />Lorem ipsum dolor sit amet, consectetur adipisicing elit. Perferendis, nobis nostrum deserunt eum eaque, atque, ipsa quaerat ex officiis dolor corrupti magni. Excepturi similique architecto a incidunt esse, omnis harum. Lorem ipsum dolor sit amet consectetur, adipisicing elit. Alias ipsam ipsa error esse rem consectetur est doloribus praesentium dolorum voluptatem, omnis ratione corrupti explicabo. Sunt recusandae maxime ut debitis iure!
            </p>
          </div>

          {/* Upcoming Events */}
          <div className="flex-1 bg-white rounded-lg shadow-md pb-6 md:mb-0 mb-6">
            <h3 className="text-2xl font-semibold bg-primary text-white w-full p-6 rounded-t-lg text-center">
              Latest Events
            </h3>
            {upcomingEvents.length === 0 ? (
              <p className="text-gray-500 my-6 text-center">No upcoming events to display.</p>
            ) : (
              <div className="p-6 space-y-6">
                {upcomingEvents.slice(0, 3).map((event) => (
                  <div
                    key={event.id}
                    className="flex items-start gap-4 border-b border-gray-200 pb-4"
                  >
                    {/* Date Circle */}
                    <div className="min-w-[80px] h-[80px] bg-gray-200 rounded-full flex flex-col justify-center items-center text-center">
                      <p className="text-xl font-bold leading-none">{event.parsedDate.getDate()}</p>
                      <p className="text-sm font-medium">
                        {event.parsedDate.toLocaleString("default", { month: "short" })}
                      </p>
                    </div>

                    {/* Text */}
                    <div className="flex-1">
                      <h4 className="text-lg font-semibold">{event.title}</h4>
                      <p className="text-gray-700 text-sm">{event.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* SVG Section */}
      <div className="relative w-full h-[425px] mt-[-50px]">
        <div className="absolute inset-0"></div>
        <div className="custom-shape-divider-bottom-1745775394 absolute w-full bottom-6 overflow-hidden left-0 z-10">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
            <path d="M1200 120L0 16.48 0 0 1200 0 1200 120z" className="shape-fill2"></path>
          </svg>
        </div>
        <div className="custom-shape-divider-bottom-1745775394 absolute w-full bottom-0 overflow-hidden left-0 z-10">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
            <path d="M1200 120L0 16.48 0 0 1200 0 1200 120z" className="shape-fill"></path>
          </svg>
        </div>
      </div>

      {/* All Events */}
      <section className="bg-[#481317] pt-12 pb-20 mt-[-30px] z-30 relative">
        <div className="max-w-6xl mx-auto px-4 mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white">All Events</h2>
        </div>
        <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {events.map((event) => (
            <div key={event.id} className="bg-white rounded-lg shadow-md p-6">
              <div className="text-center mb-4">
                <div className="text-2xl font-bold text-primary">
                  {formatLongDate(event.parsedDate)}
                </div>
              </div>
              <h4 className="text-lg font-semibold text-center mb-2">{event.title}</h4>
              <p className="text-gray-700 text-center">{event.description}</p>
            </div>
          ))}
        </div>
      </section>

      <Footer />
    </>
  );
}
