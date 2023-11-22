"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { cn } from "@/lib/utils";
import { Category } from "@/types";

interface MainNavProps {
  data: Category[];
}

const MainNav: React.FC<MainNavProps> = ({ data }) => {
  const pathname = usePathname();

  const routes = data.map((route) => ({
    href: `/category/${route.id}`,
    label: route.name,
    active: pathname === `/category/${route.id}`,
  }));

  return (
    <nav
      className="grid grid-cols-3 md:grid-cols-6"
    >
      {routes.map((route) => (
        <Link
          key={route.href}
          href={route.href}
          className={cn(
            'inline-flex justify-center items-center rounded-sm bg-gray-100 p-2 py-2 text-xs font-medium text-gray-600 ring-1 ring-inset ring-gray-100 mr-2 mb-2 transition-colors hover:text-black',
            route.active ? 'ring-gray-400 bg-gray-50' : 'text-neutral-500'
          )}
        >
          {route.label}
      </Link>
      ))}
    </nav>
  )
};

export default MainNav;
