'use client'

import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { useState } from 'react'

export default function RegistersPage() {
  const [activeTab, setActiveTab] = useState('professional')

  const professionalData = [
    { id: 'REG001', name: 'Dr. Rajesh Kumar', profession: 'Physiotherapist', qualification: 'BPT', registrationDate: '2023-01-15' },
    { id: 'REG002', name: 'Ms. Priya Singh', profession: 'Nursing', qualification: 'GNM', registrationDate: '2023-02-20' },
    { id: 'REG003', name: 'Mr. Anil Sharma', profession: 'Medical Technologist', qualification: 'BMT', registrationDate: '2023-03-10' },
    { id: 'REG004', name: 'Dr. Neha Patel', profession: 'Radiographer', qualification: 'BSRT', registrationDate: '2023-04-05' },
    { id: 'REG005', name: 'Ms. Deepika Nair', profession: 'Pharmacist', qualification: 'BPharm', registrationDate: '2023-05-12' },
  ]

  const institutionData = [
    { id: 'INST001', name: 'Sikkim Institute of Allied Health Sciences', city: 'Gangtok', courses: 'Nursing, Physiotherapy', affiliation: 'State Approved' },
    { id: 'INST002', name: 'Central College of Healthcare Professions', city: 'Gangtok', courses: 'Medical Technology, Radiography', affiliation: 'State Approved' },
    { id: 'INST003', name: 'Sikkim Healthcare Academy', city: 'Siliguri', courses: 'Nursing, Pharmacy', affiliation: 'State Approved' },
    { id: 'INST004', name: 'East Region Medical Institute', city: 'Gangtok', courses: 'Occupational Therapy, Radiography', affiliation: 'State Recognized' },
  ]

  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <main className="flex-1">
        <div className="max-w-6xl mx-auto px-4 py-8">
          {/* Breadcrumb */}
          <div className="text-sm mb-6 text-muted-foreground">
            <a href="/" className="hover:underline">Home</a> &gt; Registers
          </div>

          {/* Tabs */}
          <div className="border-b border-border mb-6">
            <div className="flex gap-6">
              <button
                onClick={() => setActiveTab('professional')}
                className={`px-4 py-3 font-semibold border-b-2 transition-colors ${
                  activeTab === 'professional'
                    ? 'border-primary text-primary'
                    : 'border-transparent text-muted-foreground hover:text-foreground'
                }`}
              >
                Professional Register
              </button>
              <button
                onClick={() => setActiveTab('institution')}
                className={`px-4 py-3 font-semibold border-b-2 transition-colors ${
                  activeTab === 'institution'
                    ? 'border-primary text-primary'
                    : 'border-transparent text-muted-foreground hover:text-foreground'
                }`}
              >
                Institution Register
              </button>
            </div>
          </div>

          {/* Professional Register */}
          {activeTab === 'professional' && (
            <div className="space-y-4">
              <div className="border border-border">
                <div className="bg-primary text-primary-foreground px-4 py-3 font-semibold border-b border-border">
                  Registered Allied Healthcare Professionals
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="bg-muted/50 border-b border-border">
                        <th className="px-4 py-3 text-left font-semibold">Registration No.</th>
                        <th className="px-4 py-3 text-left font-semibold">Professional Name</th>
                        <th className="px-4 py-3 text-left font-semibold">Profession</th>
                        <th className="px-4 py-3 text-left font-semibold">Qualification</th>
                        <th className="px-4 py-3 text-left font-semibold">Registration Date</th>
                        <th className="px-4 py-3 text-left font-semibold">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {professionalData.map((row, idx) => (
                        <tr key={idx} className="border-b border-border hover:bg-muted/30">
                          <td className="px-4 py-3">{row.id}</td>
                          <td className="px-4 py-3">{row.name}</td>
                          <td className="px-4 py-3">{row.profession}</td>
                          <td className="px-4 py-3">{row.qualification}</td>
                          <td className="px-4 py-3">{new Date(row.registrationDate).toLocaleDateString()}</td>
                          <td className="px-4 py-3">
                            <span className="text-xs bg-green-100 text-green-800 px-2 py-1">Active</span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <div className="px-4 py-3 bg-muted/30 border-t border-border text-center text-xs">
                  Showing {professionalData.length} records (Page 1 of Multiple)
                </div>
              </div>

              <div className="bg-blue-50 border border-blue-200 p-4 text-xs">
                <p><strong>Search Verification:</strong> To verify a professional's registration status, please visit the Search Register function or contact the Council office with the registration number.</p>
              </div>
            </div>
          )}

          {/* Institution Register */}
          {activeTab === 'institution' && (
            <div className="space-y-4">
              <div className="border border-border">
                <div className="bg-primary text-primary-foreground px-4 py-3 font-semibold border-b border-border">
                  Recognized Allied Healthcare Educational Institutions
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="bg-muted/50 border-b border-border">
                        <th className="px-4 py-3 text-left font-semibold">Institution ID</th>
                        <th className="px-4 py-3 text-left font-semibold">Institution Name</th>
                        <th className="px-4 py-3 text-left font-semibold">City</th>
                        <th className="px-4 py-3 text-left font-semibold">Approved Courses</th>
                        <th className="px-4 py-3 text-left font-semibold">Affiliation</th>
                        <th className="px-4 py-3 text-left font-semibold">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {institutionData.map((row, idx) => (
                        <tr key={idx} className="border-b border-border hover:bg-muted/30">
                          <td className="px-4 py-3">{row.id}</td>
                          <td className="px-4 py-3 font-semibold">{row.name}</td>
                          <td className="px-4 py-3">{row.city}</td>
                          <td className="px-4 py-3 text-xs">{row.courses}</td>
                          <td className="px-4 py-3 text-xs">{row.affiliation}</td>
                          <td className="px-4 py-3">
                            <span className="text-xs bg-green-100 text-green-800 px-2 py-1">Approved</span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <div className="px-4 py-3 bg-muted/30 border-t border-border text-center text-xs">
                  Showing {institutionData.length} records
                </div>
              </div>

              <div className="bg-blue-50 border border-blue-200 p-4 text-xs">
                <p><strong>Recognition Status:</strong> Only institutions listed here are recognized by the Council for offering approved courses in allied healthcare professions. Recognition is subject to compliance with prescribed standards.</p>
              </div>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  )
}
