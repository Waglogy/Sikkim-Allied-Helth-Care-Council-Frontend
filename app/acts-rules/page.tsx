import { Header } from '@/components/header'
import { Footer } from '@/components/footer'

export default function ActsRulesPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <main className="flex-1">
        <div className="max-w-4xl mx-auto px-4 py-8">
          {/* Breadcrumb */}
          <div className="text-sm mb-6 text-muted-foreground">
            <a href="/" className="hover:underline">Home</a> &gt; Acts & Rules
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {/* Main Content */}
            <div className="md:col-span-2 space-y-6">
              {/* Acts Section */}
              <div className="border border-border">
                <div className="bg-primary text-primary-foreground px-4 py-3 font-semibold border-b border-border">
                  Acts & Regulations
                </div>
                <div className="divide-y divide-border">
                  {[
                    {
                      title: 'Allied and Healthcare Professions Act, 2015',
                      description: 'Principal legislation regulating allied healthcare professions',
                      year: '2015',
                    },
                    {
                      title: 'Allied & Healthcare Professions Rules, 2016',
                      description: 'Detailed rules for implementation and enforcement',
                      year: '2016',
                    },
                    {
                      title: 'Registration and Code of Ethics Regulations, 2017',
                      description: 'Guidelines for professional registration and ethical conduct',
                      year: '2017',
                    },
                  ].map((act, idx) => (
                    <div key={idx} className="px-4 py-4 hover:bg-muted/50">
                      <div className="flex justify-between items-start gap-3">
                        <div className="flex-1">
                          <h3 className="font-semibold text-foreground">{act.title}</h3>
                          <p className="text-sm text-muted-foreground mt-1">{act.description}</p>
                          <p className="text-xs text-muted-foreground mt-2">Year: {act.year}</p>
                        </div>
                        <a
                          href="#"
                          className="text-xs bg-accent text-accent-foreground px-3 py-2 hover:opacity-80"
                        >
                          Download PDF
                        </a>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Notifications Section */}
              <div className="border border-border">
                <div className="bg-primary text-primary-foreground px-4 py-3 font-semibold border-b border-border">
                  Notifications & Orders
                </div>
                <div className="divide-y divide-border">
                  {[1, 2, 3, 4, 5].map((item) => (
                    <div key={item} className="px-4 py-4 hover:bg-muted/50">
                      <div className="flex justify-between items-start gap-3">
                        <div className="flex-1">
                          <h3 className="font-semibold text-foreground text-sm">
                            Official Notification No. {2025}/SAHC/{item}
                          </h3>
                          <p className="text-xs text-muted-foreground mt-1">
                            Subject: Amendment to Professional Registration Rules
                          </p>
                          <p className="text-xs text-muted-foreground mt-2">
                            Date: {new Date(2025, 0, item * 5).toLocaleDateString()}
                          </p>
                        </div>
                        <a
                          href="#"
                          className="text-xs bg-accent text-accent-foreground px-3 py-2 hover:opacity-80"
                        >
                          View
                        </a>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-4">
              {/* Important Links */}
              <div className="border border-border">
                <div className="bg-secondary text-secondary-foreground px-4 py-3 font-semibold border-b border-border text-sm">
                  Important Links
                </div>
                <div className="divide-y divide-border">
                  <a href="#" className="block px-4 py-3 text-sm hover:bg-muted">
                    Download All Acts
                  </a>
                  <a href="#" className="block px-4 py-3 text-sm hover:bg-muted">
                    View Latest Notifications
                  </a>
                  <a href="#" className="block px-4 py-3 text-sm hover:bg-muted">
                    Regulatory Guidelines
                  </a>
                  <a href="#" className="block px-4 py-3 text-sm hover:bg-muted">
                    Compliance Requirements
                  </a>
                </div>
              </div>

              {/* Document Info */}
              <div className="border border-border bg-muted/30 p-4">
                <p className="text-xs leading-relaxed">
                  <strong>Note:</strong> All official documents are available in PDF format. For assistance in accessing or understanding any regulation, please contact the Council office.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
