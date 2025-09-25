"use client"

import { Brand, Category } from "@/interfaces";
import { BadgeCent, Building2, ListTree, ShoppingCart, SwatchBook, User } from "lucide-react";
import Link from "next/link";
import { Button } from "../../ui";
import NavBarMenuItems from "./NavBarMenuItems";
import { brands, categories } from "./navData";
import { NavItemI } from "./navInterfaces";
import SideBarMenuItems from "./SideBarMenuItems";





function NavBar() {



    const navList: NavItemI[] =
        [
            { icon: (size: number) => <SwatchBook size={size} />, href: "/products", label: "Products", children: [] },
            { icon: (size: number) => <ListTree size={size} />, href: "/categories", label: "Categories", children: categories.map((category: Category) => ({ href: `/categories/${category._id}`, label: category.name })) },
            { icon: (size: number) => <Building2 size={size} />, href: "/brands", label: "Brands", children: brands.map((brand: Brand) => ({ href: `/brands/${brand._id}`, label: brand.name })) },
        ]



    return (
        <>
            {/* <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60"> */}
            <nav className="container mx-auto p-5">
                <div className="flex items-center justify-between">
                    <Link href="/" className="flex items-center space-x-2">
                        <div className="h-8 w-8 bg-primary rounded-lg flex items-center justify-center">
                            <span className="text-primary-foreground font-bold text-lg">
                                <BadgeCent />
                            </span>
                        </div>
                        <span className="font-bold text-xl">CartTech</span>
                    </Link>

                    <NavBarMenuItems navList={navList} />

                    <div className="flex items-center space-x-2">
                        {/* User Account */}
                        <Button variant="ghost" size="icon">
                            <User className="h-5 w-5" />
                            <span className="sr-only">Account</span>
                        </Button>

                        {/* Shopping Cart */}
                        <Button variant="ghost" size="icon" className="relative">
                            <ShoppingCart className="h-5 w-5" />
                            <span className="absolute -top-1 -right-1 aspect-square w-fit rounded-full bg-primary text-xs text-primary-foreground flex items-center justify-center">
                                99+
                            </span>
                            <span className="sr-only">Shopping cart</span>
                        </Button>

                        <SideBarMenuItems navList={navList} />

                    </div>
                </div>

            </nav>
        </>
    )
}

export { NavBar };

