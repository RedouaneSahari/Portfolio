import { Linkedin, Mail, Phone, Github } from "lucide-react"

export function Footer() {
  const currentYear = new Date().getFullYear()

  const socialLinks = [
    {
      icon: Linkedin,
      href: "https://www.linkedin.com/in/Redouane%20Sahari",
      label: "LinkedIn",
    },
    {
      icon: Mail,
      href: "mailto:redouane.sahari@gmail.com",
      label: "Email",
    },
    {
      icon: Phone,
      href: "tel:0760765679",
      label: "Téléphone",
    },
    {
      icon: Github,
      href: "#",
      label: "GitHub",
    },
  ]

  return (
    <footer className="bg-[#0a1628] py-8 border-t border-[#2a3544]">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center gap-4">
          <div className="flex items-center gap-6">
            {socialLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target={link.label === "LinkedIn" ? "_blank" : undefined}
                rel={link.label === "LinkedIn" ? "noopener noreferrer" : undefined}
                className="text-[#ccd6f6] hover:text-[#00d9ff] transition-all duration-300 hover:scale-110"
                aria-label={link.label}
              >
                <link.icon className="h-6 w-6" />
              </a>
            ))}
          </div>
          <p className="text-[#8892b0] text-center">&copy; {currentYear} Redouane Sahari - Tous droits réservés</p>
        </div>
      </div>
    </footer>
  )
}
