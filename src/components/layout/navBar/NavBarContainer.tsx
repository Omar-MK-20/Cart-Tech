import { SidebarProvider } from '@/components/ui';
import NavWrapper from './NavWrapper';


function NavBarContainer()
{
    return (
        // <header>
        <SidebarProvider>
            <header className="fixed w-full backdrop-blur-md shadow-sm z-100">
                <NavWrapper />
            </header>
        </SidebarProvider>
        // </header>
    );
}

export { NavBarContainer };

