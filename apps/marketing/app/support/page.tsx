import Contact from '../../components/contact'
export default function Support() {

  return (
    <section className="max-w-6xl mx-auto px-4 sm:px-6 relative">

      {/* Support page content */}
      <div className="pt-20 md:pt-32 pb-16">
        {/* Section header */}
        <div className="max-w-3xl mx-auto text-center pb-12 md:pb-16">
          <h1 className="h1 mb-4" data-aos="fade-up">Contact Support</h1>
          <p className="text-xl text-gray-400 mb-8" data-aos="fade-up" data-aos-delay="200">
            If you have any questions or need assistance, please feel free to contact our support team.
          </p>
        </div>

        <Contact />
      </div>

    </section>
  )
}

