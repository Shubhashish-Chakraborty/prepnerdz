import Navbar from "../ui/navbars/Navbar";

export const TestimonialPage = () => {
  return (
    <section className="bg-gradient-to-r from-slate-100 via-gray-100 to-gray-200">
          <Navbar/>
      <div className="py-8 px-4 mx-auto max-w-screen-xl text-center lg:py-16 lg:px-6">
        <div className="mx-auto max-w-screen-sm">
          <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-gray-900">
            Testimonials
          </h2>
          <h2 className="mb-4 animate-pulse text-xl tracking-tight font-extrabold text-red-600">
            Under Development
          </h2>
          <p className="mb-8 font-light lg:mb-16 sm:text-xl text-gray-950">
            Discover how PrepNerdz is making a difference — straight from the students themselves.
          </p>
        </div>
        <div className="grid mb-8 lg:mb-12 lg:grid-cols-2">
          {/* Testimonial 1 */}
          <figure className="flex flex-col justify-center items-center p-8 text-center bg-white border border-black md:p-12 lg:border-r">
            <blockquote className="mx-auto mb-8 max-w-2xl text-black">
              <h3 className="text-lg font-semibold text-black">
                A Must-Have for Every B.Tech Student!
              </h3>
              <p className="my-4">
                &quot;PrepNerdz helped me stay ahead in my academics. The Shivani book notes and previous year papers were a lifesaver during exam week. Everything is clearly organized — I didn’t waste time hunting for material.
              </p>
              
            </blockquote>
            <figcaption className="flex justify-center items-center space-x-3">
              <div className="space-y-0.5 font-medium text-left text-black">
                <div>Priya Sharma</div>
                <div className="text-sm font-light text-black">
                  3rd Year CSE, RGPV University
                </div>
              </div>
            </figcaption>
          </figure>

          {/* Testimonial 2 */}
          <figure className="flex flex-col justify-center items-center p-8 text-center bg-white border border-black md:p-12">
            <blockquote className="mx-auto mb-8 max-w-2xl text-black">
              <h3 className="text-lg font-semibold text-black">
                Everything You Need, All in One Place
              </h3>
              <p className="my-4">
                &quot;I used to rely on random WhatsApp groups for study material, but PrepNerdz changed that. From lab manuals to IMP questions, it’s got everything. The best part? The content is verified and high-quality
              </p>
            </blockquote>
            <figcaption className="flex justify-center items-center space-x-3">
              <div className="space-y-0.5 font-medium text-left text-black">
                <div>Ankit Verma</div>
                <div className="text-sm font-light text-black">
                  Final Year ECE, RGPV
                </div>
              </div>
            </figcaption>
          </figure>

          {/* Testimonial 3 */}
          <figure className="flex flex-col justify-center items-center p-8 text-center bg-white border border-black md:p-12 lg:border-r">
            <blockquote className="mx-auto mb-8 max-w-2xl text-black">
              <h3 className="text-lg font-semibold text-black">
                Perfect for Last-Minute Preparation
              </h3>
              <p className="my-4">
                &quot;During my end-sems, PrepNerdz was my go-to platform. The semester-wise papers and Shivani summaries helped me revise quickly and effectively. I also love how clean and easy the site is to navigate
              </p>
            </blockquote>
            <figcaption className="flex justify-center items-center space-x-3">
              <div className="space-y-0.5 font-medium text-left text-black">
                <div>Sanya Rathore</div>
                <div className="text-sm font-light text-black">
                  2nd Year IT, RGPV
                </div>
              </div>
            </figcaption>
          </figure>

          {/* Testimonial 4 */}
          <figure className="flex flex-col justify-center items-center p-8 text-center bg-white border border-black md:p-12">
            <blockquote className="mx-auto mb-8 max-w-2xl text-black">
              <h3 className="text-lg font-semibold text-black">
                Contributing to PrepNerdz Boosted My Confidence
              </h3>
              <p className="my-4">
                &quot;I uploaded my handwritten notes and they got featured! It felt great knowing I could help others while getting recognized. PrepNerdz isn’t just a resource hub — it’s a growing student community.
              </p>
             
            </blockquote>
            <figcaption className="flex justify-center items-center space-x-3">
              <div className="space-y-0.5 font-medium text-left text-black">
                <div>Ravi Deshmukh</div>
                <div className="text-sm font-light text-black">
                  3rd Year ME, RGPV
                </div>
              </div>
            </figcaption>
          </figure>
        </div>
      </div>
    </section>
  );
};
