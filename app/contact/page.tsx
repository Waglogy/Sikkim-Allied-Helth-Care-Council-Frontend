import { Header } from '@/components/header'
import { Footer } from '@/components/footer'

export default function ContactPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <main className="flex-1">
        <div className="max-w-4xl mx-auto px-4 py-8">
          {/* Breadcrumb */}
          <div className="text-sm mb-6 text-muted-foreground">
            <a href="/" className="hover:underline">Home</a> &gt; Contact Us
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Contact Information */}
            <div className="space-y-6">
              <div className="border border-border">
                <div className="bg-primary text-primary-foreground px-4 py-3 font-semibold border-b border-border">
                  Office Address
                </div>
                <div className="px-4 py-6 text-sm leading-relaxed">
                  <p className="font-semibold mb-2">Sikkim State Allied & Healthcare Council</p>
                  <p>Office Address Line 1</p>
                  <p>Office Address Line 2</p>
                  <p>Gangtok, Sikkim 737001</p>
                  <p>India</p>
                </div>
              </div>

              <div className="border border-border">
                <div className="bg-primary text-primary-foreground px-4 py-3 font-semibold border-b border-border">
                  Contact Details
                </div>
                <div className="px-4 py-6 text-sm space-y-3">
                  <div>
                    <p className="font-semibold text-foreground">Telephone</p>
                    <p className="text-muted-foreground">+91 (3592) XXXXXX (Main Office)</p>
                    <p className="text-muted-foreground">+91 (3592) XXXXXX (Registration)</p>
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">Email</p>
                    <p className="text-muted-foreground">info@sahealthcouncil.gov.in</p>
                    <p className="text-muted-foreground">registration@sahealthcouncil.gov.in</p>
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">Fax</p>
                    <p className="text-muted-foreground">+91 (3592) XXXXXX</p>
                  </div>
                </div>
              </div>

              <div className="border border-border">
                <div className="bg-primary text-primary-foreground px-4 py-3 font-semibold border-b border-border">
                  Office Timings
                </div>
                <div className="px-4 py-6 text-sm space-y-2">
                  <div className="flex justify-between pb-2 border-b border-border">
                    <span>Monday - Friday</span>
                    <span className="font-semibold">10:00 AM - 5:00 PM</span>
                  </div>
                  <div className="flex justify-between pb-2 border-b border-border">
                    <span>Saturday</span>
                    <span className="font-semibold">10:00 AM - 1:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Sunday & Public Holidays</span>
                    <span className="font-semibold">Closed</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="border border-border">
              <div className="bg-primary text-primary-foreground px-4 py-3 font-semibold border-b border-border">
                Send us a Message
              </div>
              <form className="px-4 py-6 space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-foreground mb-2">Name</label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border border-input bg-background text-foreground text-sm"
                    placeholder="Your Full Name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-foreground mb-2">Email</label>
                  <input
                    type="email"
                    className="w-full px-3 py-2 border border-input bg-background text-foreground text-sm"
                    placeholder="your.email@example.com"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-foreground mb-2">Phone (Optional)</label>
                  <input
                    type="tel"
                    className="w-full px-3 py-2 border border-input bg-background text-foreground text-sm"
                    placeholder="+91 XXXXX XXXXX"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-foreground mb-2">Subject</label>
                  <select className="w-full px-3 py-2 border border-input bg-background text-foreground text-sm">
                    <option>Select Subject</option>
                    <option>General Inquiry</option>
                    <option>Registration Related</option>
                    <option>Complaint</option>
                    <option>Other</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-foreground mb-2">Message</label>
                  <textarea
                    rows={4}
                    className="w-full px-3 py-2 border border-input bg-background text-foreground text-sm"
                    placeholder="Your message here..."
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-primary text-primary-foreground px-4 py-2 font-semibold text-sm hover:opacity-90"
                >
                  Submit
                </button>
              </form>
            </div>
          </div>

          {/* Map Placeholder */}
          <div className="mt-8 border border-border">
            <div className="bg-primary text-primary-foreground px-4 py-3 font-semibold border-b border-border">
              Location Map
            </div>
            <div className="w-full h-80 bg-muted flex items-center justify-center">
              <span className="text-muted-foreground text-lg font-semibold">
                Map Placeholder - Gangtok, Sikkim
              </span>
            </div>
          </div>

          {/* FAQs */}
          <div className="mt-8 border border-border">
            <div className="bg-primary text-primary-foreground px-4 py-3 font-semibold border-b border-border">
              Frequently Asked Questions
            </div>
            <div className="divide-y divide-border">
              {[
                {
                  q: 'How do I apply for professional registration?',
                  a: 'You can download the registration form from the website or collect it from our office. Please refer to the "Registration Guidelines" for complete requirements and procedure.',
                },
                {
                  q: 'What documents are required for registration?',
                  a: 'Educational qualification certificates, identity proof, address proof, and character certificate are required. Detailed requirements are available in the registration form.',
                },
                {
                  q: 'What is the registration fee?',
                  a: 'Registration fee varies based on the profession. Please contact our Registration Office for current fee structure.',
                },
                {
                  q: 'How long does the registration process take?',
                  a: 'Standard processing time is 15-30 days from submission of complete documents. Emergency processing may be available.',
                },
              ].map((item, idx) => (
                <div key={idx} className="px-4 py-4">
                  <p className="font-semibold text-foreground text-sm mb-2">{item.q}</p>
                  <p className="text-sm text-muted-foreground">{item.a}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
