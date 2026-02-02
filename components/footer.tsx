export function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground border-t border-border">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div>
            <h3 className="font-semibold text-base mb-3">About Council</h3>
            <p className="text-sm leading-relaxed">
              Sikkim Allied & Healthcare Council is a statutory body established by the Government of Sikkim to regulate and promote allied healthcare professions.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-base mb-3">Quick Links</h3>
            <ul className="text-sm space-y-2">
              <li><a href="#" className="hover:underline">Professional Register</a></li>
              <li><a href="#" className="hover:underline">Acts & Regulations</a></li>
              <li><a href="#" className="hover:underline">Notifications</a></li>
              <li><a href="#" className="hover:underline">Contact Information</a></li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-base mb-3">Contact</h3>
            <p className="text-sm leading-relaxed">
              Office Address:<br />
              Gangtok, Sikkim 737001<br />
              <br />
              Phone: +91-XXXX-XXXXXX<br />
              Email: info@sahealthcouncil.gov.in
            </p>
          </div>
        </div>

        <div className="border-t border-primary-foreground/20 pt-4">
          <p className="text-xs text-center leading-relaxed">
            <strong>Disclaimer:</strong> This is an official website of Sikkim Allied & Healthcare Council, a statutory body under the Government of Sikkim. The website is under development – Phase I. For queries, please contact the office directly.
          </p>
          <p className="text-xs text-center mt-3">
            © 2025 Sikkim Allied & Healthcare Council. All rights reserved.
          </p>
          <p className="text-xs text-center mt-2">
            "Website is under development – Phase I"
          </p>
        </div>
      </div>
    </footer>
  )
}
