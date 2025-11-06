

import { SidebarProvider } from '@/components/ui'
import React from 'react'
import { NavBar } from './NavBar'
import { brands, categories } from "../../../server/navBar/navData";


function NavBarContainer() {
    return (
        <header className="max-h-10">
            <SidebarProvider>
                <header className="fixed w-full backdrop-blur-md shadow-sm">
                    <NavBar brands={brands} categories={categories} />
                </header>
            </SidebarProvider>
        </header>
    )
}

export { NavBarContainer }