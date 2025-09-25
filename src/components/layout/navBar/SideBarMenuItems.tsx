import { Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarTrigger } from '@/components/ui';
import { useIsMobile } from '@/hooks/use-mobile';
import dynamic from 'next/dynamic';
import { NavItemI } from "./navInterfaces";
import { BadgeCent } from 'lucide-react';



function NavBarMenuItems({ navList }: { navList: NavItemI[] }) {

    const isMobile = useIsMobile();

    if (isMobile) {
        return (

            <>
                <SidebarTrigger />
                <Sidebar>
                    <SidebarContent>
                        <SidebarGroup>
                            <SidebarGroupLabel>
                                <div className="h-8 w-8 bg-primary rounded-lg flex items-center justify-center">
                                    <span className="text-primary-foreground font-bold text-lg">
                                        <BadgeCent />
                                    </span>
                                </div>
                                <span className="px-3 font-bold text-2xl">CartTech</span>
                            </SidebarGroupLabel>
                            <SidebarGroupContent>
                                <SidebarMenu className="my-4">
                                    {
                                        navList.map((navItem) => (
                                            <SidebarMenuItem key={navItem.href}>
                                                <SidebarMenuButton asChild className="p-6">
                                                    <a href={navItem.href}>
                                                        {navItem.icon(24)}
                                                        <span className="text-xl">{navItem.label}</span>
                                                    </a>
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