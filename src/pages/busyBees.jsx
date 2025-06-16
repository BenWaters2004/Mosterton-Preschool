import Nav from "../components/Nav";
import Footer from "../components/Footer";
import { grass, hut, tree, Bee } from "../assets";


export default function BusyBees() {
  return (
    <>
      <Nav />
      {/* Banner */}
      <div className="relative bg-[#C7E9FF] py-20 overflow-hidden text-center">
        {/* Trees */}
        <img
          src={tree}
          alt="Tree Left"
          className="absolute bottom-0 left-0 w-[200px] sm:w-[350px] z-8"
        />
        <img
          src={tree}
          alt="Tree Right"
          className="absolute bottom-0 right-0 w-[200px] sm:w-[350px] transform scale-x-[-1] z-8"
        />

        {/* Bee */}
        <img
          src={Bee}
          alt="Bee"
          className="absolute top-6 left-1/2 transform -translate-x-1/2 w-20 sm:w-32 animate-bounce z-9"
        />

        {/* Heading */}
        <h1 className="font-bold text-5xl md:text-6xl z-10 relative mt-10 z-10">
          <span className="text-[#FECF00]">B</span>u
          <span className="text-[#FECF00]">s</span>y
          <span className="text-[#FECF00]">B</span>e
          <span className="text-[#FECF00]">e</span>s
        </h1>
        <h3 className="text-[#481317] text-xl font-semibold mt-4 z-10 relative z-10">3 - 4 Years</h3>
      </div>

      {/* grass Divider */}
      <div className="relative bg-repeat bg-contain w-full h-[100px] sm:h-[170px] overflow-hidden z-10 mt-[-100px] sm:mt-[-155px]" style={{ backgroundImage: `url(${grass})` }}></div>

      <section
        className="flex flex-col md:flex-row items-center md:items-center px-8 py-20 bg-[#38B349] z-30 text-white relative mt-[-10px]"
      >
        <div
          className="md:w-1/2 md:pr-8"
        >
          <h3 className="text-2xl font-bold mb-4 md:pl-24">Who are the Busy Bees?</h3>
          <p className="mb-4 md:pl-24">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec vehicula lectus eget
            interdum cursus. Aenean et ligula ut augue placerat finibus.
          </p>
          <p className="mb-12 md:pl-24">
            Maecenas imperdiet sit amet libero eu iaculis. Sed condimentum vestibulum purus, vitae
            varius diam elementum non. Nam pulvinar malesuada odio, sed faucibus enim fringilla
            vitae. Pellentesque molestie orci eget felis dictum viverra. Sed nulla arcu, pharetra
            at volutpat nec, consectetur nec augue.
          </p>
        </div>

        <div
          className="md:w-1/2 mt-8 md:mt-0"
        >
          <img
            src={hut}
            alt="About Us"
            className="md:w-1/2 rounded-[45px] md:mx-28 mt-12 md:mt-0"
          />
        </div>
      </section>
      
      <Footer />
    </>
  )
}