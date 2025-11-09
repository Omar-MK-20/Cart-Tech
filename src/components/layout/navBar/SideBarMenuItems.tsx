import { Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarTrigger } from '@/components/ui';
import { useIsMobile } from '@/hooks/use-mobile';
import dynamic from 'next/dynamic';
import { NavItemI } from "./navInterfaces";
import { BadgeCent } from 'lucide-react';
import Link from 'next/link';



function NavBarMenuItems({ navList }: { navList: NavItemI[] }) {

    const isMobile = useIsMobile();

    if (isMobile) {
        return (

            <>
                <SidebarTrigger />
                <Sidebar>
                    <SidebarContent>
                        <SidebarGroup>
                            <SidebarGroupLabel className='pt-15'>
                            </SidebarGroupLabel>
                            <SidebarGroupContent>
                                <SidebarMenu className="my-4">
                                    {
                                        navList.map((navItem) => (
                                            <SidebarMenuItem key={navItem.href}>
                                                <SidebarMenuButton asChild className="p-6">
                                                    <Link href={navItem.href}>
                                                        {navItem.icon(24)}
                                                        <span className="text-xl">{navItem.label}</span>
                                                    </Link>
                                                </SidebarMenuButton>
                                            </SidebarMenuItem>
                                        ))
                                    }
                                </SidebarMenu>
                            </SidebarGroupContent>
                        </SidebarGroup>
                    </SidebarContent>
                </Sidebar>
            </>

        )
    }


}

export default dynamic(() => Promise.resolve(NavBarMenuItems), { ssr: false })