import { Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarTrigger } from '@/components/ui';
import { useIsMobile } from '@/hooks/use-mobile';
import Link from 'next/link';
import { NavItemI } from "./navInterfaces";



function SideBarMenuItems({ navList }: { navList: NavItemI[]; })
{

    const isMobile = useIsMobile();

    if (isMobile)
    {
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

        );
    }


}

export default SideBarMenuItems;