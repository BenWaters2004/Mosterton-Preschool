import React, { useEffect, useState } from "react";
import Nav from "../components/Nav";
import Footer from "../components/Footer";
import { garden, Pencils, gradenLeaves } from "../assets";
import { getDatabase, ref, onValue } from "firebase/database";

export default function Committee() {
  const [committeeMembers, setCommitteeMembers] = useState([]);

  useEffect(() => {
    const db = getDatabase();
    const membersRef = ref(db, "committeeMembers");

    const unsubscribe = onValue(membersRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const formatted = Object.entries(data).map(([id, member]) => ({
          id,
          ...member,
        }));
        setCommitteeMembers(formatted);
      } else {
        setCommitteeMembers([]);
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <>
      <Nav />

      {/* Top Background Image */}
      <section className="relative w-full h-[425px] bg-cover bg-center" style={{ backgroundImage: `url(${garden})` }}>
        <div className="absolute inset-0 bg-white opacity-60"></div>

        {/* SVG Divider */}
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
      </section>

      {/* Committee Members Section */}
      <section className="bg-[#481317] pt-12 pb-20 mt-[-30px] z-30 relative">
        <div className="max-w-6xl mx-auto px-4 mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white">Our Committee Members</h2>
        </div>

        <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {committeeMembers.map((member) => (
            <div key={member.id} className="bg-white rounded-lg shadow-md p-6 flex flex-col items-center">
              {member.photoURL ? (
                <img
                  src={member.photoURL}
                  alt={member.name}
                  className="w-40 h-40 rounded-full object-cover mb-6 mt-4"
                />
              ) : (
                <div className="w-40 h-40 bg-gray-200 rounded-full mb-6"></div>
              )}
              <h3 className="text-lg font-semibold mb-2 text-center">{member.name}</h3>
              <p className="text-gray-600 text-center mb-4">{member.role}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Pencils Divider */}
      <div className="bg-primary bg-repeat bg-contain w-full h-[200px] md:h-[370px] mt-[-100px]" style={{ backgroundImage: `url(${Pencils})` }}></div>

      {/* Bottom Background with Low Opacity */}
      <section className="relative w-full py-20">
        {/* Faint background */}
        <div
          className="absolute inset-0 bg-cover bg-center opacity-20"
          style={{ backgroundImage: `url(${gradenLeaves})` }}
        ></div>

        {/* Content above background */}
        <div className="relative z-10 w-[90%] mx-[5%] md:w-[70%] md:mx-[15%] overflow-hidden">
          <h3 className="text-2xl font-bold mb-4 text-center text-[#8A3339]">Mosterton Pre-School Committee</h3>
          <p className="text-md text-black">We are a registered charity run, by a Committee of volunteers, mostly made up of parents of children attending the Pre-School. The Committee work in tandem with the Pre-School managers and staff to ensure the smooth running of the Pre-School. Being involved is also a great way to meet other parents and be involved in your child’s Pre-school.</p><br />

          <p className="text-md text-black">The Committee is responsible for:
            <ul className="list-disc list-inside">
              <li>Supporting the managers</li>
              <li>Fundraising</li>
              <li>Making sure that the Pre-School has – and works to – policies which help it to provide a high quality service</li>
              <li>Making sure that the Pre-School works in partnership with the children’s parents</li>
            </ul>
          </p><br />
          <p className="text-md text-black">We depend very much on the goodwill of parents and their involvement with the Pre-School. Without the Committee the Pre-School would not be able to operate and would have to close.</p>
          <p className="text-md text-black">Each volunteer member of the Committee will bring different skills which are invaluable to the running of our Pre-School. Both Mum’s and Dad’s are equally welcome to join us. The important thing is, you don’t need any direct experience to make a difference.</p>
          <p className="text-md text-black">There are three main roles required on the Committee, the Chair, the Treasurer and the Secretary. These posts have a more defined role, some details of which are set out below together with some of the duties shared amongst Committee members:</p><br />
          <h4 className="text-md font-bold text-[#8A3339]">Chair</h4>
          <p className="text-md text-black">Chairs all committee, general and annual meetings including the AGM. Assists the Secretary with the preparation of the agenda for these meetings. Co-ordinates the work of the Committee. Works alongside the Treasurer and supports the rest of the Committee members. Is involved with the Development and staff recruitment. Regularly visits setting to communicate with management. Is a signatory on the bank account and occasionally needs to authorise payments.</p><br />
          <h4 className="text-md font-bold text-[#8A3339]">Treasurer</h4>
          <p className="text-md text-black">This role involves little more than general committee members these days but pays in cheques and any cash after fundraisers. Is a signatory on the bank account and occasionally needs to authorise payments.</p><br />
          <h4 className="text-md font-bold text-[#8A3339]">Secretary</h4>
          <p className="text-md text-black">Organises all meetings liaising with Committee members to ensure they are all informed. Prepares and circulates agenda’s for each meeting, takes minutes at each meeting and circulates minutes for approval of all Committee members. Supports all Committee members.</p><br />
          <h4 className="text-md font-bold text-[#8A3339]">Shared responsibilities for all Committee members</h4>
          <p className="text-md text-black">Act in the best interests of the Pre-School, promoting its values and working together to achieve its charitable objectives. Working as part of a team, reading Committee papers and contributing to the decision making process of the Committee. Undertake Ofsted suitability checks as appropriate.</p>
          <p className="text-md text-black">The Committee generally meets once or twice a term.</p><br />
          <p className="text-md text-black">The Annual General Meeting is open to the parents of all of the children who attend the Pre-School. If you would like to feel that you are putting something back into our community and volunteer for the Committee in any role, no matter how large or small, please speak with our chairperson Sophie, another committee member or management. </p>
          <p>You can contact us on mostertonpreschooloffice@gmail.com</p><br />
          <h4 className="text-md font-bold text-[#8A3339]">We very much look forward to welcoming all new volunteers.</h4>
        </div>
      </section>

      <Footer />
    </>
  );
}
