import AdminNavbar from "../../components/AdminNav";
import AdminFooter from "../../components/AdminFooter";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faUsers, faCalendar, faGift, faCircleQuestion } from '@fortawesome/free-solid-svg-icons';

export default function AdminDash() {
  return (
    <>
      <AdminNavbar />
      
      <section className="p-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Manage Users Section */}
        <div className="w-full h-[200px] bg-green-300 rounded-lg flex justify-center items-center relative group">
          <a href="/ManageAdmins" className="w-full h-full flex flex-col justify-center items-center text-white text-center p-4 group-hover:text-black transition-all duration-300">
            <FontAwesomeIcon icon={faUser} className="text-6xl mb-4" />
            <h3 className="font-bold text-lg">Manage Users</h3>
            <p className="text-sm">Control who has admin access</p>
          </a>
        </div>

        {/* Staff Members Section */}
        <div className="w-full h-[200px] bg-blue-300 rounded-lg flex justify-center items-center relative group">
          <a href="/AdminStaff" className="w-full h-full flex flex-col justify-center items-center text-white text-center p-4 group-hover:text-black transition-all duration-300">
            <FontAwesomeIcon icon={faUsers} className="text-6xl mb-4" />
            <h3 className="font-bold text-lg">Staff Members</h3>
            <p className="text-sm">Manage staff shown</p>
          </a>
        </div>

        {/* Committee Members Section */}
        <div className="w-full h-[200px] bg-purple-300 rounded-lg flex justify-center items-center relative group">
          <a href="/AdminCommittee" className="w-full h-full flex flex-col justify-center items-center text-white text-center p-4 group-hover:text-black transition-all duration-300">
            <FontAwesomeIcon icon={faUsers} className="text-6xl mb-4" />
            <h3 className="font-bold text-lg">Committee Members</h3>
            <p className="text-sm">Manage committee members shown</p>
          </a>
        </div>

        {/* Term Dates Section */}
        <div className="w-full h-[200px] bg-yellow-300 rounded-lg flex justify-center items-center relative group">
          <a href="/AdminTerms" className="w-full h-full flex flex-col justify-center items-center text-white text-center p-4 group-hover:text-black transition-all duration-300">
            <FontAwesomeIcon icon={faCalendar} className="text-6xl mb-4" />
            <h3 className="font-bold text-lg">Term Dates</h3>
            <p className="text-sm">Update term dates</p>
          </a>
        </div>

        {/* Fundraising Events Section */}
        <div className="w-full h-[200px] bg-orange-300 rounded-lg flex justify-center items-center relative group">
          <a href="/AdminEvents" className="w-full h-full flex flex-col justify-center items-center text-white text-center p-4 group-hover:text-black transition-all duration-300">
            <FontAwesomeIcon icon={faGift} className="text-6xl mb-4" />
            <h3 className="font-bold text-lg">Fundraising Events</h3>
            <p className="text-sm">Update Fundraising Events</p>
          </a>
        </div>

        {/* Help Section */}
        <div className="w-full h-[200px] bg-indigo-300 rounded-lg flex justify-center items-center relative group">
          <a href="/AdminHelp" className="w-full h-full flex flex-col justify-center items-center text-white text-center p-4 group-hover:text-black transition-all duration-300">
            <FontAwesomeIcon icon={faCircleQuestion} className="text-6xl mb-4" />
            <h3 className="font-bold text-lg">Need Help?</h3>
            <p className="text-sm">How to get in contact if you need help</p>
          </a>
        </div>

      </section>
      <AdminFooter />
    </>
  );
}
