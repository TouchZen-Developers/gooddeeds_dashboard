"use client"

import { Separator } from "@/components/ui/separator"
import { SidebarTrigger } from "@/components/ui/sidebar"

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"
import { useUser } from "@/hooks/use-user";


export function SiteHeader() {
  const { user } = useUser();

  return (
    <header className="flex h-[70px] shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-(--header-height)">
      <div className="flex w-full items-center gap-1 px-4 lg:gap-2 lg:px-10">
        <SidebarTrigger className="-ml-1" />
        <Separator
          orientation="vertical"
          className="mx-2 data-[orientation=vertical]:h-4"
        />
        <div className="ml-auto flex gap-4">
          <Avatar className="h-8 w-8 rounded-lg grayscale">
            <AvatarImage src="/avatars-default.jpg" alt={user?.name} />
            <AvatarFallback className="rounded-lg">GC</AvatarFallback>
          </Avatar>
          <div className="grid flex-1 text-left text-sm leading-tight">
            <span className="truncate font-medium">{user?.name}</span>
            <span className="text-muted-foreground truncate text-xs">
              Admin
            </span>
          </div>
        </div>
      </div>
    </header>
  )
}
