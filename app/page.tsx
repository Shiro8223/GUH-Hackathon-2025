import { Hero } from "./components/Hero";
import { HowItWorks } from "./components/HowItWorks";
import { FeaturedEvents } from "./components/FeaturedEvents";
import { CTA } from "./components/CTA";
import { Navbar } from "./components/Navbar";
import { Footer } from "./components/Footer";


export default function HomePage() {
return (
<main className="flex min-h-screen flex-col">
<Navbar />
<Hero />
<HowItWorks />
<FeaturedEvents />
<CTA />
<Footer />
</main>
);
}