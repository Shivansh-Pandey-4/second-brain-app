import Cta from "./CTA";
import Features from "./Features";
import Contact from "./Contact";
import Header from "./Header";
import Hero from "./Hero";
import HowItWorks from "./HowItWorks";
import Footer from "./Footer";


export default function HomePage() {

    return (
        <div className="min-h-screen overflow-hidden bg-[#07070a] text-white">
            <Header />
            <Hero />
            <Features />
            <HowItWorks />
            {/* <Cta /> */}
            <Contact />
            <Footer />
        </div>
    )
}