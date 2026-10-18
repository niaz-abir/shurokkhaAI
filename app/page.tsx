import AboutUs from "./src/components/AboutUS";
import Banner from "./src/components/Banner";
import Footer from "./src/components/Footer";
import HowWeWork from "./src/components/How-we-work";
import Navbar from "./src/components/Navbar";
import Services from "./src/components/Services";
import VideoSection from "./src/components/VideoSection";

export default function Home() {
  return (
    <main className="min-h-screen flex items-center justify-center px-4">
      <div>
        <Navbar/>
        <Banner/>
        <AboutUs/>
        <Services/>
        <HowWeWork/>
        <VideoSection/>
        <Footer/>
      </div>
    </main>
  );
}
