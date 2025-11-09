import { ReactNode } from "react";

interface ChildNavItemI {
    _id: string
    parent: string;
    label: string;
}

interface NavItemI {
    icon: (size: number) => ReactNode; // Optional, since some items (like Contact) may not have it
    href: string;
    label: string;
    children: ChildNavItemI[]; // Recursive type for nested menus
}

export type { NavItemI, ChildNavItemI }