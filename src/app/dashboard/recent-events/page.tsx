"use client"

import { useCallback, useMemo, useState } from "react"
import { useRouter } from "next/navigation"
import { usePageTitle } from "@/hooks/use-page-title"

import { DataTable } from "@/components/data-table"
import { z } from "zod"
import { ColumnDef } from "@tanstack/react-table"
import { useAllAffectedEvents } from '@/hooks/use-affected-events'
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import Image from "next/image"
import Button from "@/components/Button/Button"
import { Download, PlusCircle } from "lucide-react"
import Link from "next/link"

const schema = z.object({
  id: z.number(),
  name: z.string(),
  affected_event: z.string(),
  family_size: z.number(),
  is_featured: z.boolean().optional(),
  image_url: z.string().optional(),
})
export default function Page() {
  const { title } = usePageTitle();
  const router = useRouter();
  const { data: affectedEventsData, isLoading } = useAllAffectedEvents();
  const [isFeatured, setIsFeatured] = useState(false)

  // Handle row click to navigate to detail page
  const handleRowClick = useCallback((row: unknown) => {
    const familyRow = row as z.infer<typeof schema>
    router.push(`/dashboard/recent-events/${familyRow.id}`)
  }, [router])

  // Define columns specific to claims page
  const columns: ColumnDef<z.infer<typeof schema>>[] = useMemo(() => [
    {
      accessorKey: "name",
      header: "Event Name",
      cell: ({ row }) => {
        return (<>{row.original.name}</>)
      },
      enableHiding: false,
    },
    {
      accessorKey: "total-families",
      header: () => "Total Families",
      cell: ({ row }) => (
        <>{0}</>
      ),
    },
    {
      accessorKey: "Featured",
      header: () => "Featured",
      cell: ({ row }) => {

        return (
          <>
            <div className="flex items-center space-x-2">
              <Switch
                id={`featured-${row.index}`}
                checked={row.original.is_featured}
                onCheckedChange={setIsFeatured}
              />
              <Label htmlFor={`featured-${row.index}`}>{row.original.is_featured ? "Yes" : "No"}</Label>
            </div>
          </>
        )
      },
    },

    {
      accessorKey: "image_url",
      header: () => "Photo",
      cell: ({ row }) => (
        <><Image src={row.original.image_url || ''} alt={row.original.name} width={100} height={100} /></>
      ),
    },
  ], [])


  return (
    <div className="flex flex-col ">
      <div className="flex justify-between items-center gap-5 mb-8" >
        <h1 className="text-3xl font-semibold mb-5">{title}</h1>
        <Link href="/dashboard/recent-events/new">
          <Button variant="filled" size="lg" iconLeft={<PlusCircle />}>
            Add New Event
          </Button>
        </Link>
      </div>
      <div>
        <div className="tab-content bg-white rounded-lg !rounded-tl-none p-6 overflow-x-scroll">
          <div>
            <DataTable
              data={affectedEventsData?.data?.data || []}
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
