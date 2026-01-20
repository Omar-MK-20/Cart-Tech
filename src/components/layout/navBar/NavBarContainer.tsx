'use client';
import { SidebarProvider } from '@/components/ui';
import { brands, categories } from '@/server/navBar/navData';
import { NavBar } from './NavBar';
import { SessionProvider } from 'next-auth/react';


function NavBarContainer()
{
    return (
        // <header>
        <SidebarProvider>
            <header className="fixed w-full backdrop-blur-md shadow-sm z-100">
                <SessionProvider>
                    <NavBar brands={brands} categories={categories} />
                </SessionProvider>
            </header>
        </SidebarProvider>
        // </header>
    );
}

export { NavBarContainer };
