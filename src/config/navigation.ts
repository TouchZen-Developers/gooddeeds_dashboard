import { ContactRound, SquareRoundCorner, LayoutDashboard, Package, School, Users, Coins } from "lucide-react"

export interface NavMainItem {
  title: string
  pageTitle?: string
  url: string
  icon?: NavIcon
}

// Infer the shared icon component type from one imported icon
export type NavIcon = typeof ContactRound

// Central navigation definition so both sidebar & header can stay in sync.
export const navMain: NavMainItem[] = [
  {
    title: "Families",
    pageTitle: "Families",
    url: "/dashboard/families",
    icon: ContactRound,
  },
  {
    title: "Orders",
    pageTitle: "Orders",
    url: "/dashboard/claims",
    icon: SquareRoundCorner,
  },
  {
    title: "Amazon Items",
    pageTitle: "Amazon Items",
    url: "/dashboard/items",
    icon: LayoutDashboard,
  },
  {
    title: "Amazon Categories",
    pageTitle: "Amazon Categories",
    url: "/dashboard/categories",
    icon: Package,
  },
  {
    title: "Recent Events",
    pageTitle: "Recent Events",
    url: "/dashboard/recent-events",
    icon: School,
  },
  {
    title: "Taxes & Fees",
    pageTitle: "Taxes & Fees",
    url: "/dashboard/warranty-pricing",
    icon: Coins,
  },
  {
    title: "Revenue",
    pageTitle: "Revenue",
    url: "/dashboard/revenue",
    icon: Users,
  },
  {
    title: "Users",
    pageTitle: "Users",
    url: "/dashboard/users",
    icon: Users,
  },
  {
    title: "Reports",
    pageTitle: "Reports",
    url: "/dashboard/reports",
    icon: Users,
  },
]

// Utility to find a nav item for a given pathname (exact or nested match)
export function matchNavItem(pathname: string): NavMainItem | undefined {
  // Prefer longest match for nested routes
  return navMain
    .filter((item) => pathname === item.url || pathname.startsWith(item.url + "/"))
    .sort((a, b) => b.url.length - a.url.length)[0]
}
