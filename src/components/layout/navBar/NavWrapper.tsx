"use client";
import React from 'react';
import { NavBar } from './NavBar';
import { brands, categories } from '@/server/navBar/navData';
import { SessionProvider } from 'next-auth/react';

function NavWrapper()
{
    return (
        <div>
            <SessionProvider>
                <NavBar brands={brands} categories={categories} />
            </SessionProvider>
        </div>
    );
}

export default NavWrapper;