import AdminNavbar from "../../components/AdminNav";
import AdminFooter from "../../components/AdminFooter";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faPhone, faUser, faArrowLeft } from '@fortawesome/free-solid-svg-icons';

export default function AdminHelp() {

  const handleBackClick = () => {
    window.location.href = "/AdminDashboard"; // Directly redirect to AdminDashboard
  };

  return (
    <>
      <AdminNavbar />

      <section className="p-8 rounded-lg shadow-lg bg-white w-full max-w-lg mx-auto mt-8">
        {/* Back Button */}
        <button
          onClick={handleBackClick}
          className="mb-6 text-primary hover:text-black flex items-center space-x-2 transition-all duration-300"
        >
          <FontAwesomeIcon icon={faArrowLeft} className="text-lg" />
          <span>Back to Dashboard</span>
        </button>

        {/* Help Information Section */}
        <h3 className="text-2xl font-semibold mb-4 text-center">Ben Waters</h3>
        <p className="mb-1 text-center">
          <FontAwesomeIcon icon={faUser} className="text-lg mr-2" />
          Website Developer
        </p>
        <p className="mb-1 text-center">
          <FontAwesomeIcon icon={faEnvelope} className="text-lg mr-2" />
          Email: <a href="mailto:contact@b-waters.com" className="hover:underline">contact@b-waters.com</a>
        </p>
        <p className="mb-1 text-center">
          <FontAwesomeIcon icon={faPhone} className="text-lg mr-2" />
          Phone: +44 (0)7496 167867
        </p>
      </section>

      <div className="fixed bottom-0 w-full">
        <AdminFooter />
      </div>
    </>
  );
}
