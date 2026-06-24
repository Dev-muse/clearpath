import BookingForm from "@/components/BookingForm";

export default function ContactPage() {
  return (
    <section className="py-20 bg-brand-bg min-h-screen flex items-center">
      <div className="max-w-7xl mx-auto px-6 md:px-16 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          
          {/* Left Context Deck */}
          <div className="lg:col-span-5 lg:sticky lg:top-12">
            <span className="text-xs uppercase font-heading tracking-widest text-gold-500 font-bold block mb-3">
              Direct Communication
            </span>
            <h1 className="font-heading text-4xl md:text-5xl font-bold text-navy-900 mb-6 leading-tight">
              Let&apos;s Map Your Architecture
            </h1>
            <p className="font-body text-base text-brand-muted leading-relaxed mb-10">
              Whether optimizing an expansive property collection or locking down your first residential acquisition, our desks provide wholesale liquidity maps tailored with accuracy.
            </p>

            <div className="space-y-6 font-body text-sm">
              <div className="flex gap-4 items-center">
                <div className="w-10 h-10 rounded-lg bg-navy-50 flex items-center justify-center text-navy-900">
                  <span className="material-symbols-outlined text-xl">phone_in_talk</span>
                </div>
                <div>
                  <h4 className="font-bold text-navy-900">Direct Inquiries</h4>
                  <p className="text-brand-muted text-xs mt-0.5">+44 (0) 20 7946 0192</p>
                </div>
              </div>

              <div className="flex gap-4 items-center">
                <div className="w-10 h-10 rounded-lg bg-navy-50 flex items-center justify-center text-navy-900">
                  <span className="material-symbols-outlined text-xl">mail</span>
                </div>
                <div>
                  <h4 className="font-bold text-navy-900">Advisory Desk</h4>
                  <p className="text-brand-muted text-xs mt-0.5">advisory@clearpathmortgages.co.uk</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Intake Component Form Wrapper */}
          <div className="lg:col-span-7">
            <BookingForm />
          </div>

        </div>
      </div>
    </section>
  );
}