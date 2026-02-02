import { Header } from '@/components/header'
import { Footer } from '@/components/footer'

export default function NoticesPage() {
  const notices = [
    {
      id: 1,
      title: 'Renewal of Professional Registration - 2025',
      date: '2025-02-01',
      description: 'Important notice regarding renewal of professional registration valid upto December 31, 2024',
      category: 'Important',
    },
    {
      id: 2,
      title: 'Conduct of Professional Examination - Spring 2025',
      date: '2025-01-25',
      description: 'Notification regarding the conduct of professional examination scheduled for March 2025',
      category: 'Examination',
    },
    {
      id: 3,
      title: 'Amendment to Code of Ethics - Effective from February 2025',
      date: '2025-01-20',
      description: 'Amendment to the existing Code of Ethics for allied healthcare professionals',
      category: 'Amendment',
    },
    {
      id: 4,
      title: 'Recognition of New Educational Institutions',
      date: '2025-01-15',
      description: 'Notice regarding recognition of three new institutions offering allied healthcare courses',
      category: 'Recognition',
    },
    {
      id: 5,
      title: 'Circular on Mandatory Continuing Education',
      date: '2025-01-10',
      description: 'Mandatory continuing education requirements for maintenance of active registration status',
      category: 'Circular',
    },
    {
      id: 6,
      title: 'Change in Council Composition',
      date: '2025-01-05',
      description: 'Announcement regarding change in the composition of Council members',
      category: 'Official',
    },
    {
      id: 7,
      title: 'Notification: Professional Misconduct Inquiry',
      date: '2024-12-28',
      description: 'Notification regarding initiation of professional misconduct inquiry',
      category: 'Inquiry',
    },
    {
      id: 8,
      title: 'Guidelines for Application of New Registration',
      date: '2024-12-20',
      description: 'Updated guidelines for submission of applications for new professional registration',
      category: 'Guidelines',
    },
  ]

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Important':
        return 'bg-red-100 text-red-800'
      case 'Examination':
        return 'bg-blue-100 text-blue-800'
      case 'Amendment':
        return 'bg-yellow-100 text-yellow-800'
      case 'Recognition':
        return 'bg-green-100 text-green-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <main className="flex-1">
        <div className="max-w-4xl mx-auto px-4 py-8">
          {/* Breadcrumb */}
          <div className="text-sm mb-6 text-muted-foreground">
            <a href="/" className="hover:underline">Home</a> &gt; Notices
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {/* Main Content */}
            <div className="md:col-span-2 space-y-4">
              <div className="border border-border">
                <div className="bg-primary text-primary-foreground px-4 py-3 font-semibold border-b border-border">
                  Notices & Circulars
                </div>

                <div className="divide-y divide-border">
                  {notices.map((notice) => (
                    <div
                      key={notice.id}
                      className="px-4 py-4 hover:bg-muted/50 transition-colors"
                    >
                      <div className="flex justify-between items-start gap-3 mb-2">
                        <div className="flex-1">
                          <h3 className="font-semibold text-foreground hover:text-primary cursor-pointer">
                            {notice.title}
                          </h3>
                          <p className="text-xs text-muted-foreground mt-1">
                            Published on: {new Date(notice.date).toLocaleDateString()}
                          </p>
                        </div>
                        <span
                          className={`text-xs px-2 py-1 ${getCategoryColor(
                            notice.category
                          )}`}
                        >
                          {notice.category}
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground mb-3">
                        {notice.description}
                      </p>
                      <div className="flex gap-2">
                        <a
                          href="#"
                          className="text-xs text-primary font-semibold hover:underline"
                        >
                          Read More →
                        </a>
                        <a
                          href="#"
                          className="text-xs bg-accent text-accent-foreground px-2 py-1 hover:opacity-80"
                        >
                          Download PDF
                        </a>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="px-4 py-3 bg-muted/30 border-t border-border text-center text-xs">
                  Showing {notices.length} notices (Showing Latest First)
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-4">
              {/* Categories Filter */}
              <div className="border border-border">
                <div className="bg-secondary text-secondary-foreground px-4 py-3 font-semibold border-b border-border text-sm">
                  Filter by Category
                </div>
                <div className="divide-y divide-border">
                  {['All Notices', 'Important', 'Examination', 'Amendment', 'Recognition', 'Circular'].map(
                    (category) => (
                      <a
                        key={category}
                        href="#"
                        className="block px-4 py-3 text-sm hover:bg-muted"
                      >
                        {category}
                      </a>
                    )
                  )}
                </div>
              </div>

              {/* Subscribe */}
              <div className="border border-border bg-secondary/10 p-4">
                <h4 className="font-semibold text-sm mb-3">Subscribe to Updates</h4>
                <p className="text-xs mb-3">
                  Subscribe to receive important notices and circulars via email.
                </p>
                <input
                  type="email"
                  placeholder="your.email@example.com"
                  className="w-full px-3 py-2 border border-input bg-background text-foreground text-xs mb-2"
                />
                <button className="w-full bg-primary text-primary-foreground px-3 py-2 text-xs font-semibold hover:opacity-90">
                  Subscribe
                </button>
              </div>

              {/* Archive */}
              <div className="border border-border">
                <div className="bg-secondary text-secondary-foreground px-4 py-3 font-semibold border-b border-border text-sm">
                  Archive
                </div>
                <div className="divide-y divide-border">
                  {['2025', '2024', '2023', '2022'].map((year) => (
                    <a
                      key={year}
                      href="#"
                      className="block px-4 py-3 text-sm hover:bg-muted"
                    >
                      Notices from {year}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
