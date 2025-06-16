import React, { useEffect, useState } from "react";
import Nav from "../components/Nav";
import Footer from "../components/Footer";
import Calendar from "react-calendar";
import 'react-calendar/dist/Calendar.css';
import "../CustomCalendar.css";
import { HeroImage } from "../assets";
import { getDatabase, ref, onValue } from "firebase/database";

export default function TermDates() {
  const [date, setDate] = useState(new Date());
  const [terms, setTerms] = useState([]);

  useEffect(() => {
    const db = getDatabase();
    const termsRef = ref(db, 'terms');

    onValue(termsRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const parsed = Object.values(data).map(term => ({
          ...term,
          start: new Date(term.startDate),
          end: new Date(term.endDate),
          color: term.color || "#98C617" // fallback color
        }));
        setTerms(parsed);
      }
    });
  }, []);

  const normalizeDate = (date) => {
    return new Date(date.getFullYear(), date.getMonth(), date.getDate());
  };

  const getTermForDate = (date) => {
    const normalizedDate = normalizeDate(date);
    return terms.find(term => {
      const start = normalizeDate(new Date(term.start));
      const end = normalizeDate(new Date(term.end));
      return normalizedDate >= start && normalizedDate <= end;
    });
  };

  return (
    <>
      <Nav />

      {/* Hero */}
      <div
        className="relative w-full h-[400px] bg-cover bg-center flex items-center justify-center heroBorder"
        style={{ backgroundImage: `url(${HeroImage})` }}
      >
        <div className="absolute inset-0 bg-white/60 z-0"></div>
        <h1 className="text-center text-3xl font-bold text-primary z-10 sm:text-5xl">
          For Parents
        </h1>
      </div>

      {/* Term Dates Section */}
      <section className="bg-white text-[#481317] py-16 px-4">
        <div className="max-w-6xl mx-auto text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Term Dates</h2>
          <p className="text-md max-w-xl mx-auto">View our current and upcoming preschool term dates. Hover over highlighted dates for term details.</p>
        </div>

        <div className="flex flex-col md:flex-row gap-12 items-start justify-center max-w-6xl mx-auto">
          {/* Calendar */}
          <div className="bg-[#f4f4f4] rounded-lg shadow-md p-6 w-full max-w-[400px] mx-auto">
            <Calendar
              value={date}
              onChange={setDate}
              tileContent={({ date, view }) => {
                if (view === 'month') {
                  const term = getTermForDate(date);
                  return term ? (
                    <div
                      className="term-dot"
                      style={{ backgroundColor: term.color }}
                      title={term.name}
                    ></div>
                  ) : null;
                }
              }}
              tileClassName={({ date }) => {
                const term = getTermForDate(date);
                return term ? 'highlight-term' : '';
              }}
              className="text-[#481317]"
            />
          </div>

          {/* Term Key */}
          <div className="w-full max-w-sm">
            <h4 className="text-xl font-bold mb-4">Term Key</h4>
            <ul className="space-y-4">
              {terms.map((term, index) => (
                <li key={index} className="flex items-center space-x-3">
                  <div className="w-4 h-4 rounded-full" style={{ backgroundColor: term.color }}></div>
                  <span>
                    {term.name}: {new Date(term.start).toLocaleDateString('en-GB')} – {new Date(term.end).toLocaleDateString('en-GB')}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
