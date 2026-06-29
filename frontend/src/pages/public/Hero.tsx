const Hero = () => {
  return (
    <section className="bg-blue-600 text-white">

      <div className="max-w-7xl mx-auto px-6 py-24">

        <h1 className="text-5xl font-bold">
          Find Your Perfect Hotel
        </h1>

        <p className="mt-4 text-lg">
          Discover amazing hotels at the best prices.
        </p>

        <div className="bg-white rounded-xl p-5 mt-10 grid md:grid-cols-5 gap-4">

          <input
            placeholder="Location"
            className="border rounded-lg p-3 text-black"
          />

          <input
            type="date"
            className="border rounded-lg p-3 text-black"
          />

          <input
            type="date"
            className="border rounded-lg p-3 text-black"
          />

          <input
            type="number"
            min="1"
            defaultValue="2"
            className="border rounded-lg p-3 text-black"
          />

          <button className="bg-blue-600 rounded-lg text-white font-semibold">
            Search
          </button>

        </div>

      </div>

    </section>
  );
};

export default Hero;