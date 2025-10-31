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
import { useAllCategories } from "@/hooks/use-categories"
import Link from "next/link"

const schema = z.object({
  id: z.number(),
  name: z.string(),
  product_count: z.number(),
  icon_url: z.string().optional(),
})
export default function Page() {
  const { title } = usePageTitle();
  const router = useRouter();
  const { data: categoriesData, isLoading } = useAllCategories();

  // Handle row click to navigate to detail page
  const handleRowClick = useCallback((row: unknown) => {
    const familyRow = row as z.infer<typeof schema>
    router.push(`/dashboard/categories/${familyRow.id}`)
  }, [router])

  // Define columns specific to claims page
  const columns: ColumnDef<z.infer<typeof schema>>[] = useMemo(() => [
    {
      accessorKey: "name",
      header: "Amazon Category",
      cell: ({ row }) => {
        return (<>{row.original.name}</>)
      },
      enableHiding: false,
    },
    {
      accessorKey: "product_count",
      header: () => "Total Items",
      cell: ({ row }) => (
        <>{row.original.product_count}</>
      ),
    },
    {
      accessorKey: "icon_url",
      header: () => "Category Icon",
      cell: ({ row }) => (
        <>
          <Image src={row.original.icon_url} width={24} height={24} alt="Category Icon" />
        </>
      ),
    },

  ], [])


  return (
    <div className="flex flex-col ">
      <div className="flex justify-between items-center gap-5 mb-8" >
        <h1 className="text-3xl font-semibold mb-5">{title}</h1>
        <Link href="/dashboard/categories/new">
          <Button variant="filled" size="lg" iconLeft={<PlusCircle />}>
            Add New Category
          </Button>
        </Link>
      </div>
      <div>
        <div className="tab-content bg-white rounded-lg !rounded-tl-none p-6 overflow-x-scroll">
          <div>
            <DataTable
              data={categoriesData?.data?.categories || []}
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
