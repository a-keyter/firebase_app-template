import Link from "next/link";

const nav_links = [{ label: "Login", href: "/login" }];

export default function WebNav() {
  return (
    <nav className="flex py-5 justify-between">
      <Link href="/">
        <div>SF Surveys</div>
      </Link>
      <ul className="flex space-x-4">
        {nav_links.map((link) => {
          return (
            <Link key={link.label} href={link.href}>
              <li>{link.label}</li>
            </Link>
          );
        })}
      </ul>
    </nav>
  );
}
