"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Webhook,
  History,
  LogIn,
} from "lucide-react";
import {
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";

const navItems = [
  {
    href: "/",
    icon: LayoutDashboard,
    label: "Dashboard",
  },
  {
    href: "/webhooks",
    icon: Webhook,
    label: "Webhooks",
  },
  {
    href: "/delivery-reports",
    icon: History,
    label: "Delivery Reports",
  },
];

const bottomNavItems = [
  {
    href: "/login",
    icon: LogIn,
    label: "Login Page",
  },
];

export function SidebarNav() {
  const pathname = usePathname();

  const renderNavItems = (items: typeof navItems) => (
    <SidebarMenu>
      {items.map((item) => (
        <SidebarMenuItem key={item.href}>
          <Link href={item.href} legacyBehavior passHref>
            <SidebarMenuButton
              asChild
              isActive={pathname === item.href}
              tooltip={item.label}
              className={cn(
                "group-data-[collapsible=icon]:justify-center"
              )}
            >
              <a>
                <item.icon />
                <span>{item.label}</span>
              </a>
            </SidebarMenuButton>
          </Link>
        </SidebarMenuItem>
      ))}
    </SidebarMenu>
  );

  return (
    <>
      <div className="flex-1 overflow-auto">
        {renderNavItems(navItems)}
      </div>
      <div className="mt-auto">
        {renderNavItems(bottomNavItems)}
      </div>
    </>
  );
}
