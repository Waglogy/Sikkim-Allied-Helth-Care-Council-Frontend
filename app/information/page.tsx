'use client'

import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { useState } from 'react'

export default function InformationPage() {
  const [activeTab, setActiveTab] = useState('recognition')

  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <main className="flex-1">
        <div className="max-w-4xl mx-auto px-4 py-8">
          {/* Breadcrumb */}
          <div className="text-sm mb-6 text-muted-foreground">
            <a href="/" className="hover:underline">Home</a> &gt; Information
          </div>

          {/* Tabs */}
          <div className="border-b border-border mb-6">
            <div className="flex flex-wrap gap-4">
              <button
                onClick={() => setActiveTab('recognition')}
                className={`px-4 py-3 font-semibold border-b-2 transition-colors ${
                  activeTab === 'recognition'
                    ? 'border-primary text-primary'
                    : 'border-transparent text-muted-foreground hover:text-foreground'
                }`}
              >
                Recognition
              </button>
              <button
                onClick={() => setActiveTab('ethics')}
                className={`px-4 py-3 font-semibold border-b-2 transition-colors ${
                  activeTab === 'ethics'
                    ? 'border-primary text-primary'
                    : 'border-transparent text-muted-foreground hover:text-foreground'
                }`}
              >
                Code of Ethics
              </button>
              <button
                onClick={() => setActiveTab('circulars')}
                className={`px-4 py-3 font-semibold border-b-2 transition-colors ${
                  activeTab === 'circulars'
                    ? 'border-primary text-primary'
                    : 'border-transparent text-muted-foreground hover:text-foreground'
                }`}
              >
                Circulars & Notices
              </button>
            </div>
          </div>

          {/* Recognition Section */}
          {activeTab === 'recognition' && (
            <div className="space-y-6">
              <div className="border border-border">
                <div className="bg-primary text-primary-foreground px-4 py-3 font-semibold border-b border-border">
                  Recognition of Educational Institutions
                </div>
                <div className="px-4 py-6 text-sm space-y-4">
                  <p className="leading-relaxed">
                    The Sikkim Allied & Healthcare Council recognizes educational institutions offering courses in allied healthcare professions, subject to compliance with prescribed educational standards, infrastructure requirements, faculty qualifications, and curricular provisions.
                  </p>

                  <div className="bg-muted/30 border border-border p-4">
                    <h4 className="font-semibold mb-3">Recognition Criteria:</h4>
                    <ul className="list-disc list-inside space-y-2">
                      <li>Adequate infrastructure and laboratory facilities</li>
                      <li>Qualified and experienced faculty members</li>
                      <li>Curriculum as prescribed by the Council</li>
                      <li>Admission standards and academic regulations</li>
                      <li>Affiliation with recognized universities</li>
                      <li>Regular audit and compliance checks</li>
                    </ul>
                  </div>

                  <p className="leading-relaxed">
                    For recognition of a new institution or recognition of additional courses, please submit the application with supporting documents to the Council office. The Council may conduct an inspection visit before granting recognition.
                  </p>

                  <div className="bg-blue-50 border border-blue-200 p-4">
                    <p className="text-xs">
                      <strong>Application Procedure:</strong> Interested institutions may download the recognition application form from the website or contact the Council office for details.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Code of Ethics Section */}
          {activeTab === 'ethics' && (
            <div className="space-y-6">
              <div className="border border-border">
                <div className="bg-primary text-primary-foreground px-4 py-3 font-semibold border-b border-border">
                  Code of Ethics for Allied Healthcare Professionals
                </div>
                <div className="px-4 py-6 text-sm space-y-4">
                  <p className="leading-relaxed">
                    All registered allied healthcare professionals are required to adhere to the Code of Ethics prescribed by the Council. The Code emphasizes professional competence, integrity, and responsibility towards patients and society.
                  </p>

                  <div className="space-y-3">
                    <div className="border-l-4 border-primary pl-4">
                      <h4 className="font-semibold mb-2">Core Principles:</h4>
                      <ul className="list-disc list-inside space-y-1 text-xs">
                        <li>Respect for human dignity and patient autonomy</li>
                        <li>Competence and professional excellence</li>
                        <li>Beneficence and non-maleficence</li>
                        <li>Justice and fair treatment</li>
                        <li>Confidentiality and privacy</li>
                        <li>Honesty and transparency in practice</li>
                      </ul>
                    </div>
                  </div>

                  <div className="bg-muted/30 border border-border p-4">
                    <h4 className="font-semibold mb-3 text-sm">Professional Responsibilities:</h4>
                    <div className="space-y-2 text-xs">
                      <p><strong>Towards Patients:</strong> Provide competent, ethical care; maintain confidentiality; ensure informed consent; and report adverse events.</p>
                      <p><strong>Towards Colleagues:</strong> Maintain professional relationships; cooperate in healthcare teams; and report unethical conduct.</p>
                      <p><strong>Towards Society:</strong> Contribute to public health; educate communities; and support professional development.</p>
                    </div>
                  </div>

                  <a href="#" className="text-primary font-semibold text-sm hover:underline">
                    Download Complete Code of Ethics (PDF) →
                  </a>
                </div>
              </div>
            </div>
          )}

          {/* Circulars & Notices Section */}
          {activeTab === 'circulars' && (
            <div className="space-y-4">
              <div className="border border-border">
                <div className="bg-primary text-primary-foreground px-4 py-3 font-semibold border-b border-border">
                  Recent Circulars & Notices
                </div>
                <div className="divide-y divide-border">
                  {[
                    {
                      title: 'Circular on Professional Conduct Standards',
                      date: '2025-01-15',
                      type: 'Circular',
                    },
                    {
                      title: 'Notice: Updated Registration Form',
                      date: '2025-01-10',
                      type: 'Notice',
                    },
                    {
                      title: 'Circular: Professional Development Requirements',
                      date: '2025-01-05',
                      type: 'Circular',
                    },
                    {
                      title: 'Notice: Examination Schedule Amendment',
                      date: '2024-12-28',
                      type: 'Notice',
                    },
                    {
                      title: 'Circular: Code of Ethics Amendments',
                      date: '2024-12-20',
                      type: 'Circular',
                    },
                    {
                      title: 'Notice: New Registration Fee Structure',
                      date: '2024-12-15',
                      type: 'Notice',
                    },
                  ].map((item, idx) => (
                    <div key={idx} className="px-4 py-4 hover:bg-muted/50">
                      <div className="flex justify-between items-start gap-3">
                        <div className="flex-1">
                          <h4 className="font-semibold text-foreground text-sm">{item.title}</h4>
                          <p className="text-xs text-muted-foreground mt-1">
                            {new Date(item.date).toLocaleDateString()}
                          </p>
                        </div>
                        <div className="flex gap-2">
                          <span
                            className={`text-xs px-2 py-1 ${
                              item.type === 'Circular'
                                ? 'bg-purple-100 text-purple-800'
                                : 'bg-green-100 text-green-800'
                            }`}
                          >
                            {item.type}
                          </span>
                          <a href="#" className="text-xs bg-accent text-accent-foreground px-2 py-1 hover:opacity-80">
                            PDF
                          </a>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <a href="/notices" className="text-primary font-semibold text-sm hover:underline">
                View All Notices & Circulars →
              </a>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  )
}
