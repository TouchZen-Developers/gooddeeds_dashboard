"use client"

import { useCallback, useMemo, useState } from "react"
import { useRouter } from "next/navigation"
import { usePageTitle } from "@/hooks/use-page-title"

import { DataTable } from "@/components/data-table"
import { z } from "zod"
import { ColumnDef } from "@tanstack/react-table"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import Image from "next/image"
import Button from "@/components/Button/Button"
import { Download, PlusCircle } from "lucide-react"
import Link from "next/link"
import { useAllItems } from "@/hooks/use-items"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"

const schema = z.object({
  id: z.number(),
  title: z.string(),
  product_count: z.number(),
  category: z.object({
    name: z.string(),
  }),
})
export default function Page() {
  const { title } = usePageTitle();
  const router = useRouter();
  const { data: itemsData, isLoading } = useAllItems();

  // Handle row click to navigate to detail page
  const handleRowClick = useCallback((row: unknown) => {
    const familyRow = row as z.infer<typeof schema>
    router.push(`/dashboard/items/${familyRow.id}`)
  }, [router])

  // Define columns specific to claims page
  const columns: ColumnDef<z.infer<typeof schema>>[] = useMemo(() => [
    {
      accessorKey: "name",
      header: "Item Category",
      cell: ({ row }) => {
        return (<>{row.original.category.name}</>)
      },
      enableHiding: false,
    },
    {
      accessorKey: "title",
      header: () => "Item Name",
      cell: ({ row }) => {
        const title = row.original.title || "";
        const truncated = title.length > 25 ? `${title.substring(0, 25)}...` : title;
        return (
          <Tooltip>
            <TooltipTrigger asChild>
              <span className="cursor-default">
                {truncated}
              </span>
            </TooltipTrigger>
            <TooltipContent>
              <p>{title}</p>
            </TooltipContent>
          </Tooltip>
        );
      },
    },
    {
      accessorKey: "price",
      header: () => "Item Cost",
      cell: ({ row }) => (
        <>${row.original.price}</>
      ),
    },
    {
      accessorKey: "product_count",
      header: () => "Requested",
      cell: ({ row }) => (
        <>{row.original.product_count}</>
      ),
    },
    {
      accessorKey: "product_count",
      header: () => "Completed Orders",
      cell: ({ row }) => (
        <>{row.original.product_count}</>
      ),
    },

  ], [])


  return (
    <div className="flex flex-col ">
      <div className="flex justify-between items-center gap-5 mb-8" >
        <h1 className="text-3xl font-semibold mb-5">{title}</h1>
        <Link href="/dashboard/items/new">
          <Button variant="filled" size="lg" iconLeft={<PlusCircle />}>
            Add Items
          </Button>
        </Link>
      </div>
      <div>
        <div className="tab-content bg-white rounded-lg !rounded-tl-none p-6 overflow-x-scroll">
          <div>
            <DataTable
              data={itemsData?.data?.data || []}
              schema={schema}
              isLoading={isLoading}
              columns={columns as ColumnDef<unknown>[]}
              onRowClick={handleRowClick}
            />
          </div>
        </div>
      </div>

    </div >
  )
}
