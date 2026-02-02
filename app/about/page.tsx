import { Header } from '@/components/header'
import { Footer } from '@/components/footer'

export default function AboutPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <main className="flex-1">
        <div className="max-w-4xl mx-auto px-4 py-8">
          {/* Breadcrumb */}
          <div className="text-sm mb-6 text-muted-foreground">
            <a href="/" className="hover:underline">Home</a> &gt; About Us
          </div>

          {/* Main Content */}
          <div className="border border-border mb-8">
            <div className="bg-primary text-primary-foreground px-4 py-3 font-semibold border-b border-border">
              About the Sikkim Allied & Healthcare Council
            </div>

            <div className="px-4 py-6 space-y-6 text-sm leading-relaxed">
              <section>
                <h2 className="font-bold text-lg text-primary mb-3">Overview</h2>
                <p>
                  The Sikkim Allied & Healthcare Council (SAHC) is a statutory body established by the Government of Sikkim to regulate and oversee allied healthcare professions in the state. The Council operates under the statutory framework provided by the Allied and Healthcare Professions Act and related regulations.
                </p>
              </section>

              <section>
                <h2 className="font-bold text-lg text-primary mb-3">Mission & Vision</h2>
                <div className="border-l-4 border-secondary pl-4 bg-muted/30 py-3 px-3">
                  <p className="mb-2"><strong>Vision:</strong></p>
                  <p className="mb-4">To ensure excellence, professionalism, and high ethical standards in allied healthcare professions through effective regulation and continuous professional development.</p>
                  
                  <p className="mb-2"><strong>Mission:</strong></p>
                  <p>To regulate and supervise allied healthcare professionals, maintain professional standards, safeguard public interests, facilitate professional growth, and promote quality healthcare services in the state.</p>
                </div>
              </section>

              <section>
                <h2 className="font-bold text-lg text-primary mb-3">Functions & Responsibilities</h2>
                <ul className="list-disc list-inside space-y-2">
                  <li>Registration and regulation of allied healthcare professionals</li>
                  <li>Recognition of educational institutions offering courses in allied healthcare professions</li>
                  <li>Conduct and supervision of professional examinations and assessments</li>
                  <li>Maintenance of professional registers and records</li>
                  <li>Enforcement of professional standards and code of ethics</li>
                  <li>Investigation of professional misconduct complaints</li>
                  <li>Promotion of professional development and continuing education</li>
                  <li>Coordination with national regulatory bodies and professional organizations</li>
                </ul>
              </section>

              <section>
                <h2 className="font-bold text-lg text-primary mb-3">Council Structure</h2>
                <div className="bg-muted/30 border border-border">
                  <table className="w-full text-sm">
                    <tbody>
                      <tr className="border-b border-border">
                        <td className="px-4 py-3 font-semibold">Position</td>
                        <td className="px-4 py-3 font-semibold">Name</td>
                        <td className="px-4 py-3 font-semibold">Designation</td>
                      </tr>
                      <tr className="border-b border-border">
                        <td className="px-4 py-3">Chairman</td>
                        <td className="px-4 py-3">Dr. [Name]</td>
                        <td className="px-4 py-3">Health Department Nominee</td>
                      </tr>
                      <tr className="border-b border-border">
                        <td className="px-4 py-3">Registrar</td>
                        <td className="px-4 py-3">Mr./Ms. [Name]</td>
                        <td className="px-4 py-3">Executive Officer</td>
                      </tr>
                      <tr className="border-b border-border">
                        <td className="px-4 py-3">Member</td>
                        <td className="px-4 py-3">Multiple Members</td>
                        <td className="px-4 py-3">Professional & Government Representatives</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </section>

              <section>
                <h2 className="font-bold text-lg text-primary mb-3">Regulated Professions</h2>
                <p className="mb-3">The Council regulates the following allied healthcare professions:</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {[
                    'Physiotherapy',
                    'Nursing',
                    'Medical Technology',
                    'Radiography',
                    'Pharmacy',
                    'Dietetics',
                    'Occupational Therapy',
                    'Orthotic & Prosthetic Technology',
                  ].map((profession) => (
                    <div key={profession} className="bg-secondary/10 border border-secondary px-3 py-2">
                      {profession}
                    </div>
                  ))}
                </div>
              </section>

              <section className="pt-4 border-t border-border">
                <p className="text-muted-foreground">
                  For more detailed information, please contact the Council office or refer to the Acts & Regulations section.
                </p>
              </section>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
