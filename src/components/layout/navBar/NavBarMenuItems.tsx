import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, NavigationMenuTrigger } from '@/components/ui';
import { useIsMobile } from '@/hooks/use-mobile';
import { cn } from '@/lib/utils';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';
import { ChildNavItemI, NavItemI } from "./navInterfaces";



function NavBarMenuItems({ navList }: { navList: NavItemI[] }) {

    const isMobile = useIsMobile();
    const pathname = usePathname();

    function handleNavigate(child: ChildNavItemI): string {
        if (child.parent == "categories") {
            return `/products?category[in]=${child._id}`
        }
        if (child.parent == "brands") {
            return `/products?brand=${child._id}`
        }
        else {
            return '/'
        }
    }

    if (!isMobile) {
        return (

            <NavigationMenu className='relative z-100'>
                <NavigationMenuList>
                    {
                        navList.map((navItem) => {
                            const isActive = pathname.startsWith(navItem.href);
                            return (<React.Fragment key={navItem.href}>
                                <NavigationMenuItem>
                                    <div>
                                        {
                                            navItem.children.length > 0 ? (
                                                <>
                                                    <NavigationMenuTrigger className={cn("group inline-flex h-10 w-max justify-center px-4 py-2 text-sm font-medium transition-all duration-200 focus:outline-none disabled:pointer-events-none disabled:opacity-50",
                                                        isActive
                                                            ? "bg-primary text-primary-foreground shadow-md font-semibold"
                                                            : "bg-background hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                                                    )}>
                                                        <Link href={navItem.href}>
                                                            <div className="flex space-x-2 items-center">
                                                                {navItem.icon(16)}
                                                                <span>{navItem.label}</span>
                                                            </div>
                                                        </Link>
                                                    </NavigationMenuTrigger>
                                                    <NavigationMenuContent>
                                                        <ul className="grid grid-cols-4 gap-2 md:w-100">
                                                            {navItem.children.map((child) => (
                                                                <NavigationMenuLink key={child._id} asChild>
                                                                    <Link className="flex justify-center items-center border-2 shadow-2xs text-center"
                                                                        key={child._id}
                                                                        title={child.label}
                                                                        href={handleNavigate(child)}
                                                                    >
                                                                        {child.label}
                                                                    </Link>
                                                                </NavigationMenuLink>
                                                            ))}
                                                        </ul>
                                                    </NavigationMenuContent>
                                                </>
                                            ) : (
                                                <Link href={navItem.href}
                                                    className={cn("group inline-flex h-10 w-max justify-center px-4 py-2 text-sm font-medium transition-all duration-200 focus:outline-none disabled:pointer-events-none disabled:opacity-50 rounded-lg",
                                                        isActive
                                                            ? "bg-primary text-primary-foreground shadow-md font-semibold"
                                                            : "bg-background hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                                                    )}>
                                                    <div className="flex space-x-2 items-center">
                                                        {navItem.icon(16)}
                                                        <span>{navItem.label}</span>
                                                    </div>
                                                </Link>
                                            )
                                        }
                                    </div>
                                </NavigationMenuItem>
                            </React.Fragment>)
                        })
                    }
                </NavigationMenuList>
            </NavigationMenu>
        )
    }
}

export default dynamic(() => Promise.resolve(NavBarMenuItems), { ssr: false })