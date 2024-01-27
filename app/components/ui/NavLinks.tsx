"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";

const links = [
  { name: "Dashboard", href: "/dashboard" },
  { name: "All Surveys", href: "/dashboard/archive" },
  { name: "New Survey", href: "/dashboard/create" },
  { name: "Survey Overview", href: "/dashboard/surveys/overview" },
  { name: "Respond to Survey", href: "/dashboard/surveys/respond" },
  { name: "Account Management", href: "/dashboard/account" },
  { name: "Support & FAQ", href: "/dashboard/support" },
];

export default function NavLinks() {
  const pathname = usePathname();
    return(
        <div className="flex flex-col">
            {links.map((link, index) => (
                <Link key={index} href={link.href} 
                className={
                    clsx("px-2 py-4 border-b-2 border-slate-200 hover:bg-slate-200",
                    {"bg-slate-200 text-slate-800": pathname === link.href })
                    }
                >
                    {link.name}
                </Link>
            ))}
        </div>
    );
}



// export default function NavLinks() {
//   const pathname = usePathname();
//   return (
//     <>
//       {links.map((link) => {
//         return (
//           <Link
//             key={link.name}
//             href={link.href}
//             className={clsx(
//               "flex h-[48px] grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-purple-100 hover:text-purple-600 md:flex-none md:justify-start md:p-2 md:px-3",
//               {
//                 "bg-red-100 text-purple-600": pathname === link.href,
//               }
//             )}
//           >
//             <p className="hidden md:block">{link.name}</p>
//           </Link>
//         );
//       })}
//     </>
//   );
// }
