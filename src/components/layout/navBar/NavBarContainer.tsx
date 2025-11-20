import { SidebarProvider } from '@/components/ui';
import { brands, categories } from '@/server/navBar/navData';
import { NavBar } from './NavBar';


function NavBarContainer() {
    return (
        <header>
            <SidebarProvider>
                <header className="fixed w-full backdrop-blur-md shadow-sm z-100">
                    <NavBar brands={brands} categories={categories} />
                </header>
            </SidebarProvider>
        </header>
    )
}

export { NavBarContainer };
