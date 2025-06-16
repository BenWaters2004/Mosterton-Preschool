import Nav from "../components/Nav";
import Footer from "../components/Footer";
import { HeroImage } from '../assets';
import { getDatabase, ref, onValue } from "firebase/database";
import { useEffect, useState } from "react";

export default function Safeguarding() {
  const [officer, setOfficer] = useState(null);

  useEffect(() => {
    const db = getDatabase();
    const staffRef = ref(db, "staff");

    onValue(staffRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const staffArray = Object.entries(data).map(([id, value]) => ({ id, ...value }));
        const safeguardingOfficer = staffArray.find(member => member.isSafeguardingOfficer);
        setOfficer(safeguardingOfficer || null);
      }
    });
  }, []);

  return (
    <div className="overflow-hidden">
      <Nav />

      {/* Hero */}
      <div
        className="relative w-full h-[400px] bg-cover bg-center flex items-center justify-center heroBorder"
        style={{ backgroundImage: `url(${HeroImage})` }}
      >
        <div className="absolute inset-0 bg-white/60 z-0"></div>
        <h1 className="text-center text-3xl font-bold text-primary z-10 sm:text-5xl">
          Safeguarding
        </h1>
      </div>

      {/* Content */}
      <section className="bg-[#481317] text-white py-20 px-6 md:px-12">
        <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-10 items-start">
          {/* Text Content */}
          <div className="md:col-span-2">
            <h3 className="text-2xl font-bold mb-4">Designated Safeguarding Officer</h3>
            <p className="mb-4">
              Safeguarding is the process of protecting children from abuse, neglect, and harm, while promoting their health, wellbeing, and development. It ensures that every child feels safe, supported, and listened to. At our preschool, we have a designated Safeguarding Officer who is specially trained to handle any concerns. They oversee our safeguarding procedures, ensure staff are aware of their responsibilities, and work with families and external agencies to keep all children safe and secure.
            </p>
          </div>

          {/* Officer Card */}
          <div className="bg-white rounded-lg shadow-md p-6 text-center w-full max-w-xs mx-auto">
            {officer?.photoURL ? (
              <img
                src={officer.photoURL}
                alt={officer.name}
                className="w-40 h-40 rounded-full object-cover mx-auto mb-6"
              />
            ) : (
              <div className="w-40 h-40 bg-gray-200 rounded-full mx-auto mb-6" />
            )}
            <h3 className="text-lg font-semibold mb-1 text-black">{officer?.name || "Not Assigned"}</h3>
            <p className="text-gray-600 text-sm">Safeguarding Officer</p>
          </div>
        </div>

        {/* Info Boxes */}
        <div className="grid md:grid-cols-3 gap-16 mt-24 md:mx-12">
          <div className="bg-[#8A3339] text-white p-6 rounded-xl shadow-md text-center">
            <h4 className="text-xl font-semibold underline mb-2">Dorset Safeguarding Children Partnership</h4>
            <p className="text-md my-8">
              For local Safeguarding information please contact: 01305 221196.<br />Or go to www.dscp.co.uk.
            </p>
          </div>
          <div className="bg-[#8A3339] text-white p-6 rounded-xl shadow-md text-center">
            <h4 className="text-xl font-semibold underline mb-2">CHAD - Children's Advice and Duty Service</h4>
            <p className="text-md my-8">
              You can call the Children’s advice and duty service (CHAD) on 01782 235100 (Monday to Friday 8.30am to 6pm).<br /><br />If you need to contact us out of hours, then please call our emergency duty team on 01782 234234.
            </p>
          </div>
          <div className="bg-[#8A3339] text-white p-6 rounded-xl shadow-md text-center">
            <h4 className="text-xl font-semibold underline mb-2">Families and Members of the Public</h4>
            <p className="text-md my-8">You can call 01305 228866</p>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
