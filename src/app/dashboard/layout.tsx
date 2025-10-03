import { AppSidebar } from "@/components/app-sidebar"
import PrivateRoute from "@/components/PrivateRoute";
import { SiteHeader } from "@/components/site-header"
import {
  SidebarInset,
  SidebarProvider,
} from "@/components/ui/sidebar"

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <PrivateRoute>
      <div
        className={`antialiased`}
      >
        <SidebarProvider
          style={
            {
              "--sidebar-width": "calc(var(--spacing) * 72)",
              "--header-height": "calc(var(--spacing) * 12)",
            } as React.CSSProperties
          }
        >
          <AppSidebar variant="inset" />
          <SidebarInset>
            <SiteHeader />
            <div className="flex flex-1 flex-col bg-gray-10">
              <div className="@container/main flex flex-1 flex-col gap-2 bg-buffer-50">
                <div className="p-4 md:p-10">
                  {children}
                </div>
              </div>
            </div>
          </SidebarInset>
        </SidebarProvider>
      </div>
    </PrivateRoute>

  );
}
