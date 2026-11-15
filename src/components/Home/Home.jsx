import React from "react";
import Navbar from "./Navbar";
import Hero from "./Hero";
import About from "./About";
import Services from "./Services";
import Gallery from "./Gallery";
import Reviews from "./Reviews";
import Staff from "./Staff";
import Footer from "./Footer";
import "./Home.css";

export default function Home() {
  return (
    <main className="gt-site">
      <Navbar />
      <Hero />
      <About />
      <Services />
      <Gallery />
      <Reviews />
      <Staff />
      <Footer />
      <a className="gt-back-top" href="#top" aria-label="Back to top">↑</a>
    </main>
  );
}
