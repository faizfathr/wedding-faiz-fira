import Hero from "./assets/components/Hero";
import Navbar from "./assets/components/Navbar";
import Couple from "./assets/components/Couple";
import Events from "./assets/components/Events";
import GallerySection from "./assets/components/Galeri";
import RSVPSection from "./assets/components/Rsvp";
import Footer from "./assets/components/Footer";
import StorySection from "./assets/components/StorySection";
import './App.css';
import GiftSection from "./assets/components/GiftSection";
import FloatingNav from "./assets/components/FloatingNav";
import WeddingLetterOpening from "./assets/components/Welcome";

export default function App() {
  return (
    // <WeddingLetterOpening
    //   initials="F & M"
    //   invitationTitle="Undangan Pernikahan"
    //   openLabel="Buka undangan"
    // >
      <div className="min-h-screen scroll-smooth bg-[#fffdf8] font-sans text-[#43362d] selection:bg-[#c9b28d] selection:text-white">

        <Navbar />
        <main>
          <Hero />
          <Couple />
          <Events />
          <StorySection />
          <GallerySection />
          <GiftSection />
          <RSVPSection />
        </main>
        <FloatingNav />
        <Footer />
      </div>
    // </WeddingLetterOpening>
  );
}