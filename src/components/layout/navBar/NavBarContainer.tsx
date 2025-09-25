"use client"

import { SidebarProvider } from '@/components/ui'
import React from 'react'
import { NavBar } from './NavBar'


function NavBarContainer() {
    return (
        <header className="max-h-10">
            <SidebarProvider>
                <header className="fixed w-full backdrop-blur-md shadow-sm">
                    <NavBar />
                </header>
            </SidebarProvider>
        </header>
    )
}

export { NavBarContainer }