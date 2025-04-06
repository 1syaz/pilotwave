import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/app/_components/ui/sidebar";
import { LuUser } from "react-icons/lu";
import Logo from "@/app/_components/Logo";
import CustomSideBarTrigger from "./CustomSideBarTrigger";
import { IoAnalyticsSharp, IoClose, IoSettingsOutline } from "react-icons/io5";
import { RxDashboard } from "react-icons/rx";
import LogoutButton from "./LogoutButton";
import SideBarLink from "./SideBarLink";

// Menu items.
const items = [
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: <RxDashboard className="" size={20} />,
  },
  {
    title: "Analytics",
    url: "/analytics",
    icon: <IoAnalyticsSharp className="" size={20} />,
  },
  {
    title: "Profile",
    url: "/profile",
    icon: <LuUser className="" size={20} />,
  },

  {
    title: "Settings",
    url: "/setting",
    icon: <IoSettingsOutline className="" size={20} />,
  },
];

export function AppSidebar() {
  return (
    <Sidebar className="">
      <SidebarHeader className="  lg:px-4 px-3 lg:py-5 py-4 flex flex-row justify-between">
        <Logo iconColor="#111827" textColor="#fc350b" />
        <CustomSideBarTrigger icon={<IoClose size={23} />} />
      </SidebarHeader>
      <SidebarContent className="">
        <SidebarGroup className="">
          <SidebarGroupContent>
            <SidebarMenu className="p-3   gap-3 ">
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild className="text-md ">
                    <SideBarLink item={item} key={item.title} />
                    {/* <Link href={item.url} className=" w-full ">
                      <div className={`w-full flex items-center gap-5 p-3 `}>
                        {item.icon}
                        <span className="text-md font-medium">
                          {item.title}
                        </span>
                      </div>
                    </Link> */}
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className=" px-3 border-t border-foreground/10 lg:py-3 py-3 flex flex-row justify-between">
        <LogoutButton />
      </SidebarFooter>
    </Sidebar>
  );
}
