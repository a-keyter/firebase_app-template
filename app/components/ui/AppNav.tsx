"use client";

import Link from "next/link";
import NavLinks from "@/app/components/ui/NavLinks";
import { Bars3Icon } from "@heroicons/react/24/outline";
import { useState, useEffect } from "react";

export default function AppNav() {
  // Initialize state based on window width
  const [isMenuVisible, setIsMenuVisible] = useState(
    typeof window !== "undefined" && window.innerWidth > 768
  );

  // Function to toggle menu on mobile devices
  const toggleMenu = () => {
    if (window.innerWidth < 768) {
      setIsMenuVisible(!isMenuVisible);
    }
  };

  // Add a resize listener to reset menu visibility on screen size change
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsMenuVisible(true); // Show menu on larger screens
      } else if (window.innerWidth < 768) {
        setIsMenuVisible(false); // Hide menu on smaller screens
      }
    };

    window.addEventListener("resize", handleResize);

    // Cleanup the event listener
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [isMenuVisible]);

  return (
    <div className="md:h-screen w-full md:w-80 md:border-r-4 border-slate-400 flex flex-col space-y-2">
      <div className="px-2 py-8 bg-yellow-100 flex justify-between items-center">
        <Link href="/">Logo/Home</Link>
        <button onClick={toggleMenu} className="md:hidden pr-2 w-12 h-12 text-black">
          <Bars3Icon />
        </button>
      </div>
      {isMenuVisible && (
        <div id="AppMenu">
          <NavLinks />
        </div>
      )}
    </div>
  );
}

// "use client"

// import Link from "next/link";
// import NavLinks from "@/app/components/ui/NavLinks";
// import {
//   Bars3Icon,
// } from "@heroicons/react/24/outline";

// export default function AppNav() {
//   return (
//     <div className="md:h-screen w-full md:w-80 md:border-r-4 border-slate-400 flex flex-col space-y-2 ">
//         <div className="px-2 py-8 bg-yellow-100 flex justify-between items-center"><Link href="/">Logo/Home</Link><button className="md:hidden pr-2 w-12 h-12 text-black"><Bars3Icon/></button></div>
//         <div id="AppMenu"><NavLinks /></div>
//     </div>
//   );
// }
