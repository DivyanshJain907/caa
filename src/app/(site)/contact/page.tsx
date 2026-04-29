import SectionHeading from "@/components/site/SectionHeading";
import ContactForm from "@/components/site/ContactForm";
import WhatsAppButton from "@/components/site/WhatsAppButton";

export const dynamic = "force-dynamic";

export default function ContactPage() {
  return (
    <div className="section-space">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading
          eyebrow="Contact"
          title="Start a conversation with our advisors"
          description="Share your requirements, and we will respond with a clear, customized roadmap."
        />

        <div className="mt-8 grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="flex flex-col gap-6">
            <div className="grid gap-4 sm:grid-cols-3 text-sm">
              <div className="flex flex-col gap-2 rounded-2xl border border-white/60 bg-white/70 p-4">
                <div className="text-xs font-semibold text-navy-900">
                  Address
                </div>
                <div className="text-slate-600">
                  Amar Complex, HC-49, Ram Ganga Vihar Phase 2, Moradabad, Uttar
                  Pradesh 244001
                </div>
              </div>
              <div className="flex flex-col gap-2 rounded-2xl border border-white/60 bg-white/70 p-4">
                <div className="text-xs font-semibold text-navy-900">Phone</div>
                <div className="text-slate-600">098371 50633</div>
              </div>
              <div className="flex flex-col gap-2 rounded-2xl border border-white/60 bg-white/70 p-4">
                <div className="text-xs font-semibold text-navy-900">Email</div>
                <div className="text-slate-600">info@aaca.in</div>
              </div>
            </div>

            <div className="glass-panel rounded-3xl p-4">
              <ContactForm />
            </div>
          </div>

          <div className="glass-panel rounded-3xl p-4">
            <div className="text-sm font-semibold text-navy-900">
              Office Location
            </div>
            <div className="mt-4 overflow-hidden rounded-2xl">
              <iframe
                title="Ajit Agarwal & Associates Map"
                src="https://www.google.com/maps?q=VQC4%2BG24%20Amar%20Complex%2C%20HC-49%2C%20Ram%20Ganga%20Vihar%20Phase%202%2C%20Moradabad%2C%20Uttar%20Pradesh%20244001&output=embed"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full h-60 md:h-96 lg:h-96 rounded-2xl border-0"
              />
            </div>

            <div className="mt-4">
              <WhatsAppButton inline />
              <div className="mt-3 text-xs text-slate-500">
                WhatsApp us directly for quick responses and priority
                scheduling.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
