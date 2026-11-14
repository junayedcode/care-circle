
import Image from 'next/image';
import Link from 'next/link';


const Heropage = () => {
  return (
    <div>
      <section >
        <div className="relative min-h-[420px] md:min-h-[520px] overflow-hidden bg-[#edf5e7] shadow-sm">

          <Image
            src="/imege/treeeee-20210605120539.webp"
            alt="Community Service"
            width={1200}
            height={800}
            className="absolute inset-0 w-full h-full object-cover"
          />

          <div className="absolute inset-0 bg-gradient-to-r from-[#edf5e7] via-[#edf5e7]/95 to-[#edf5e7]/20"></div>

          <div className="relative z-10 flex items-center min-h-[420px] md:min-h-[520px] px-6 md:px-14 lg:px-20">

            <div className="max-w-xl">

              <p className="inline-flex items-center gap-2 text-green-800 bg-white/70 border border-green-200 rounded-full px-4 py-2 text-sm font-semibold mb-6 shadow-sm">
                💚 Together for a Better Community
              </p>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-[#123c2c] leading-[1.15] tracking-tight">
                Together We
                <br />
                Make a <span className="text-green-700">Difference</span>
              </h1>

              <p className="text-gray-600 text-base md:text-lg mt-6 leading-8 max-w-md">
                Join community events, volunteer for good causes,
                and help build a better society.
              </p>

              <div className="flex flex-wrap gap-4 mt-8">

                <Link
                  href="/events"
                  className="btn bg-green-800 hover:bg-green-900 text-white border-none rounded-full px-8 h-12 min-h-12 shadow-md hover:shadow-lg transition-all duration-300"
                >
                  Explore Events →
                </Link>

                <a
                  href="#about"
                  className="btn bg-white/70 border border-green-700 text-green-800 hover:bg-green-800 hover:text-white rounded-full px-8 h-12 min-h-12 transition-all duration-300"
                >
                  Learn More
                </a>

              </div>

            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Heropage;
