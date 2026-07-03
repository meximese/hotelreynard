import Link from "next/link";

const navItems = [
  { href: "/stay", label: "Stay" },
  { href: "/restaurant", label: "Restaurant" },
  { href: "/events", label: "Events" },
  { href: "/private-events", label: "Private Events" },
  { href: "/location", label: "Location" },
];

export function SiteHeader() {
  return (
    <header className="site-header">
      <Link href="/" className="brand">
        Hotel Reynard
      </Link>
      <nav aria-label="Primary">
        <ul className="nav-list">
          {navItems.map((item) => (
            <li key={item.href}>
              <Link href={item.href}>{item.label}</Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
