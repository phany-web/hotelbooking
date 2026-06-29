import Navbar from "./Navbar";
import Hero from "./Hero";

const Home = () => {
  return (
    <div className="bg-slate-100 min-h-screen">
      <Navbar />

      <Hero />

      <section className="max-w-7xl mx-auto py-16 px-6">
        <h2 className="text-3xl font-bold mb-8">Featured Hotels</h2>

        <p className="text-gray-600">
          Hotel cards will be loaded from the backend in the next step.
        </p>
      </section>
    </div>
  );
};

export default Home;
