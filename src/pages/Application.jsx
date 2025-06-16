import Nav from "../components/Nav";
import Footer from "../components/Footer";
import { HeroImage, ApplicationToJoinPDF } from '../assets';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileWord, faFilePdf } from '@fortawesome/free-solid-svg-icons';

export default function Application() {
  return (
    <div className="overflow-hidden">
      <Nav />
      <div
        className="relative w-full h-[400px] bg-cover bg-center flex items-center justify-center"
        style={{ backgroundImage: `url(${HeroImage})` }}
      >
        {/* Semi-transparent white overlay */}
        <div className="absolute inset-0 bg-white/60 z-0"></div>
        <h1 className="text-center text-3xl font-bold text-primary z-10 sm:text-5xl">
          Application
        </h1>
      </div>

      <section className="p-4">
        {/* Grid container */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Left section: bg-primary spanning 2 columns and 2 rows */}
          <div className="bg-primary p-4 text-white md:col-span-2 md:row-span-2 text-center">
            <p className="px-2 py-4 md:px-8 md:py-12 text-lg">
              <h3 className="text-2xl font-bold mb-6 underline">How to Apply</h3>
              To apply, fill in one of the forms. Then send it in using one of the below methods.<br />
              We look forward to hearing from you shortly.
              <br /><br />
              Via email at:
              <br />
              <a href="mailto:mostertonpreschool@gmail.com">mostertonpreschool@gmail.com</a>
              <br /><br />
              In person at:
              <br />
              Fairoak Way, Mosterton, Beaminster, Dorset, DT8 3JQ
            </p>
          </div>

          {/* Word download link */}
          <a
            href="../assets/Application to join Mosterton Preschool.docx"
            className="flex flex-col items-center text-white bg-[#1F6FB6] py-12 px-4 rounded shadow hover:opacity-90"
            download
          >
            <FontAwesomeIcon icon={faFileWord} className="text-8xl mb-4" />
            <span className="text-center font-bold text-2xl">Download Form as Word</span>
          </a>

          {/* PDF download link */}
          <a
            href={ ApplicationToJoinPDF }
            className="flex flex-col items-center text-white bg-[#FF808C] py-12 px-4 rounded shadow hover:opacity-90"
            download
          >
            <FontAwesomeIcon icon={faFilePdf} className="text-8xl mb-4" />
            <span className="text-center font-bold text-2xl">Download Form as PDF</span>
          </a>
        </div>
      </section>

      <Footer />
    </div>
  );
}
