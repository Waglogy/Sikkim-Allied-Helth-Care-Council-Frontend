import { Header } from '@/components/header'
import { Footer } from '@/components/footer'

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <main className="flex-1">
        {/* Banner Section */}
        <div className="bg-muted border-b border-border">
          <div className="max-w-7xl mx-auto px-4 py-24">
            <div className="w-full h-48 bg-primary/10 border-2 border-dashed border-primary flex items-center justify-center">
              <span className="text-primary text-lg font-semibold">
                Government Banner Image Placeholder
              </span>
            </div>
          </div>
        </div>

        {/* Important Notices Section */}
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {/* Notices */}
            <div className="md:col-span-2 border border-border">
              <div className="bg-primary text-primary-foreground px-4 py-3 font-semibold border-b border-border">
                Important Notices / Circulars
              </div>
              <div className="divide-y divide-border">
                {[1, 2, 3].map((item) => (
                  <div key={item} className="px-4 py-4 hover:bg-muted/50">
                    <div className="flex justify-between items-start gap-2">
                      <div className="flex-1">
                        <p className="font-semibold text-foreground text-sm">
                          Important Notice #{item}: Renewal of Professional Registration
                        </p>
                        <p className="text-xs text-muted-foreground mt-1">
                          Issued on: {new Date(2025, 1, item).toLocaleDateString()}
                        </p>
                      </div>
                      <span className="text-xs bg-accent text-accent-foreground px-2 py-1">
                        PDF
                      </span>
                    </div>
                  </div>
                ))}
              </div>
              <div className="px-4 py-3 bg-muted/30 border-t border-border text-right">
                <a href="/notices" className="text-primary font-semibold text-sm hover:underline">
                  View All Notices →
                </a>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="space-y-4">
              <div className="border border-border bg-background">
                <div className="bg-secondary text-secondary-foreground px-4 py-3 font-semibold border-b border-border text-sm">
                  Quick Statistics
                </div>
                <div className="px-4 py-4 space-y-3">
                  <div className="flex justify-between items-center pb-3 border-b border-border">
                    <span className="text-sm">Registered Professionals</span>
                    <span className="font-bold text-primary text-lg">2,340</span>
                  </div>
                  <div className="flex justify-between items-center pb-3 border-b border-border">
                    <span className="text-sm">Recognized Institutions</span>
                    <span className="font-bold text-primary text-lg">45</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Examination Held</span>
                    <span className="font-bold text-primary text-lg">12</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Chairman Message */}
          <div className="border border-border mb-8">
            <div className="bg-primary text-primary-foreground px-4 py-3 font-semibold border-b border-border flex items-center gap-2">
              <span>Message from Chairman</span>
            </div>
            <div className="px-4 py-6 flex gap-6">
              <div className="w-24 h-32 bg-muted border border-border flex items-center justify-center flex-shrink-0">
                <span className="text-xs text-center text-muted-foreground">Photo</span>
              </div>
              <div className="flex-1">
                <p className="text-sm leading-relaxed mb-3">
                  The Sikkim State Allied & Healthcare Council is committed to promoting excellence in allied healthcare professions. Our regulatory framework ensures that all practitioners maintain the highest standards of professional conduct and practice.
                </p>
                <p className="text-sm leading-relaxed mb-3">
                  We are dedicated to fostering continuous professional development, ensuring patient safety, and maintaining the integrity of healthcare services in the state.
                </p>
                <p className="text-sm font-semibold text-primary">
                  Dr. [Chairman Name]<br />
                  <span className="font-normal text-muted-foreground">Chairman, SAHC</span>
                </p>
              </div>
            </div>
          </div>

          {/* About Section */}
          <div className="border border-border mb-8">
            <div className="bg-primary text-primary-foreground px-4 py-3 font-semibold border-b border-border">
              About the Council
            </div>
            <div className="px-4 py-6">
              <p className="text-sm leading-relaxed mb-4">
                The Sikkim State Allied & Healthcare Council is a statutory regulatory body established under the Government of Sikkim to regulate, coordinate, and supervise allied healthcare professions in the state. The Council ensures that all registered professionals adhere to professional standards, ethical codes, and regulatory requirements.
              </p>
              <p className="text-sm leading-relaxed mb-4">
                The Council's primary functions include registration and regulation of allied healthcare professionals, recognition of educational institutions, conduct of professional examinations, and maintenance of professional standards and discipline.
              </p>
              <div className="text-right">
                <a href="/about" className="text-primary font-semibold text-sm hover:underline">
                  Read More About the Council →
                </a>
              </div>
            </div>
          </div>

          {/* Quick Links Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {[
              { title: 'Acts & Rules', icon: '📋' },
              { title: 'Professional Register', icon: '👥' },
              { title: 'Notifications', icon: '📢' },
              { title: 'Contact Us', icon: '📞' },
            ].map((link) => (
              <a
                key={link.title}
                href="#"
                className="border border-border p-4 text-center hover:bg-muted/50 transition-colors"
              >
                <div className="text-3xl mb-2">{link.icon}</div>
                <p className="font-semibold text-sm text-foreground">{link.title}</p>
              </a>
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
