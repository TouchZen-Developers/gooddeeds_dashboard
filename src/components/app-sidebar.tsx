"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { IconInnerShadowTop, IconLogout } from "@tabler/icons-react"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

import {
  SidebarGroup,
  SidebarGroupContent,
} from "@/components/ui/sidebar"
import { navMain } from "@/config/navigation"
import { useUser } from "@/hooks/use-user"
import Image from "next/image"
import { removeToken } from "@/lib/jwt-utils"


export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
   const router = useRouter()
  const pathname = usePathname();
  const { user } = useUser();
  console.log("User from token in AppSidebar:", user)

  const normalize = (url: string) => {
    if (!url) return "/"
    if (url === "/") return "/"
    const withLeading = url.startsWith("/") ? url : `/${url}`
    return withLeading !== "/" ? withLeading.replace(/\/+$/, "") : withLeading
  }

  const normalizedPath = normalize(pathname)
  const activeHref =
    navMain
      .map((i) => normalize(i.url))
      .filter((href) => normalizedPath === href || (href !== "/" && normalizedPath.startsWith(href + "/")))
      .sort((a, b) => b.length - a.length)[0]

  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="data-[slot=sidebar-menu-button]:!p-1.5 mb-6 text-center h-16"
            >
              <Link href="/">
                <Image src="/logo.svg" alt="goodDeeds" width={161} height={32} className="m-auto " />
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent className="flex flex-col gap-2">
            <SidebarMenu  className="gap-0">
              {navMain.map((item) => {
                const href = normalize(item.url)
                const isActive = href === activeHref
                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild tooltip={item.title} isActive={isActive} className="py-5 px-6 h-15 rounded-none">
                      <Link href={href} prefetch>
                        {item.icon && <item.icon />}
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                )
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        {/* <NavDocuments items={data.documents} /> */}
        {/* <NavSecondary items={data.navSecondary} className="mt-auto" /> */}
      </SidebarContent>
      <SidebarFooter>
        <a
          className="cursor-pointer"
          onSelect={() => {
            try {
              removeToken()
            } catch { }
            router.push("/login")
          }}>
          <IconLogout />
          Log out
        </a>
      </SidebarFooter>
    </Sidebar>
  )
}
