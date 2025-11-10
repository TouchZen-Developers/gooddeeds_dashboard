"use client"

import { useCallback, useMemo, useState } from "react"
import { useRouter } from "next/navigation"
import { usePageTitle } from "@/hooks/use-page-title"
import {
  Card,
  CardDescription,
  CardTitle,
} from "@/components/ui/card"
import { SearchInput } from '@/components/search-input'
import { DataTable } from "@/components/data-table"
import { z } from "zod"
import { ColumnDef } from "@tanstack/react-table"
import { useAllBeneficiaries, useBeneficiariesStatistics } from '@/hooks/use-beneficiaries'
import { Download } from "lucide-react";
import Button from "@/components/Button/Button";
import { id } from "date-fns/locale"

type TabType = 'approved' | 'pending' | 'rejected';
const schema = z.object({
  id: z.number(),
  affected_event: z.string(),
  family_size: z.number(),
  state: z.string(),
  city: z.string(),
  user: z.object({
    id: z.number(),
    first_name: z.string(),
    last_name: z.string(),
    email: z.string(),
    phone_number: z.string(),
    photo_url: z.string(),
  }),
})
export default function Page() {
  const { title } = usePageTitle();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<TabType>('approved');
  const [searchKey, setSearchKey] = useState(0)
  const [searchQuery, setSearchQuery] = useState<string>("")
  const { data: beneficiariesData, isLoading } = useAllBeneficiaries(activeTab);
  const { data: beneficiariesStatisticsData, isLoading: isStatisticsLoading } = useBeneficiariesStatistics();
  const handleSearch = useCallback((query: string) => {
    setSearchQuery(query)
  }, [])

  // Handle row click to navigate to detail page
  const handleRowClick = useCallback((row: unknown) => {
    const familyRow = row as z.infer<typeof schema>
    router.push(`/dashboard/families/${familyRow.id}`)
  }, [router])

  // Define columns specific to claims page
  const columns: ColumnDef<z.infer<typeof schema>>[] = useMemo(() => [
    {
      accessorKey: "last_name",
      header: "Last Name",
      cell: ({ row }) => {
        return (<>{row.original.user.last_name}</>)
      },
      enableHiding: false,
    },
    {
      accessorKey: "first_name",
      header: () => "First Name",
      cell: ({ row }) => (
        <>{row.original.user.first_name}</>
      ),
    },
    {
      accessorKey: "email",
      header: "Email",
      cell: ({ row }) => {
        return (<>{row.original.user.email}</>)
      },
      enableHiding: false,
    },
    {
      accessorKey: "city",
      header: "City",
      cell: ({ row }) => {
        return (<>{row.original.city}</>)
      },
      enableHiding: false,
    },
    {
      accessorKey: "state",
      header: "State",
      cell: ({ row }) => {
        return (<>{row.original.state}</>)
      },
      enableHiding: false,
    },
    {
      accessorKey: "family_size",
      header: "Family Size",
      cell: ({ row }) => {
        return (<>{row.original.family_size}</>)
      },
      enableHiding: false,
    },
    {
      accessorKey: "is_active",
      header: () => "Recent Events",
      cell: ({ row }) => (
        <>{row.original.affected_event}</>
      ),
    },
  ], [])


  const exportUsers = () => {
    // Get the current data from the table
    const dataToExport = beneficiariesData?.data?.data || [];

    if (dataToExport.length === 0) {
      console.log("No data to export");
      return;
    }

    // Define CSV headers based on the columns
    const headers = ["Last Name", "First Name", "Email", "City", "State", "Family Size", "Recent Events"];

    // Convert data to CSV format
    const csvContent = [
      headers.join(","),
      ...dataToExport.map((row) => {
        return [
          `"${row.user.last_name || ''}"`,
          `"${row.user.first_name || ''}"`,
          `"${row.user.email || ''}"`,
          `"${row.city || ''}"`,
          `"${row.state || ''}"`,
          `"${row.family_size || ''}"`,
          `"${row.affected_event || ''}"`,
        ].join(",");
      })
    ].join("\n");

    // Create a Blob and download the file
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `families_${activeTab}_${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    console.log(`Exported ${dataToExport.length} families to CSV`);
  }


  return (
    <div className="flex flex-col ">
      <h1 className="text-2xl font-semibold mb-5">{title}</h1>
      <div className="grid grid-cols-1 gap-5 *:data-[slot=card]:bg-gradient-to-t @xl/main:grid-cols-2 mb-8">
        <Card className="@container/card !shadow-none bg-white border-0 p-[30px]">
          <CardDescription>
            <div className="flex items-center gap-[30px] text-gray-900 ">
              <div className="w-18 h-18 flex items-center justify-center rounded-full bg-blue-1/10">
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" fill="none">
                  <path d="M19.1661 20.8958C19.1661 19.1412 17.7437 17.7188 15.989 17.7188C14.2344 17.7188 12.812 19.1412 12.8119 20.8958C12.8119 22.6505 14.2344 24.0729 15.989 24.0729C17.7437 24.0729 19.1661 22.6505 19.1661 20.8958ZM21.8328 20.8958C21.8328 24.1233 19.2165 26.7396 15.989 26.7396C12.7616 26.7396 10.1453 24.1233 10.1453 20.8958C10.1453 17.6684 12.7616 15.0521 15.989 15.0521C19.2164 15.0521 21.8327 17.6684 21.8328 20.8958Z" fill="#2F80ED" />
                  <path d="M11.0472 8.06598C11.0472 6.31132 9.62479 4.8889 7.87012 4.8889C6.11548 4.88894 4.69307 6.31134 4.69303 8.06598C4.69303 9.82065 6.11546 11.243 7.87012 11.2431C9.62481 11.2431 11.0472 9.82067 11.0472 8.06598ZM13.7139 8.06598C13.7139 11.2934 11.0976 13.9097 7.87012 13.9097C4.6427 13.9097 2.02637 11.2934 2.02637 8.06598C2.02641 4.83858 4.64272 2.22227 7.87012 2.22223C11.0975 2.22223 13.7138 4.83856 13.7139 8.06598Z" fill="#2F80ED" />
                  <path d="M27.0846 8.06598C27.0845 6.31132 25.6621 4.8889 23.9075 4.8889C22.1528 4.88894 20.7304 6.31134 20.7304 8.06598C20.7304 9.82065 22.1528 11.243 23.9075 11.2431C25.6622 11.2431 27.0846 9.82067 27.0846 8.06598ZM29.7512 8.06598C29.7512 11.2934 27.1349 13.9097 23.9075 13.9097C20.68 13.9097 18.0637 11.2934 18.0637 8.06598C18.0638 4.83858 20.6801 2.22227 23.9075 2.22223C27.1349 2.22223 29.7512 4.83856 29.7512 8.06598Z" fill="#2F80ED" />
                  <path d="M15.9886 24.073C17.4961 24.073 18.9784 24.4658 20.2873 25.2137C21.5962 25.9616 22.6868 27.0398 23.4522 28.3387C23.8257 28.973 23.6142 29.7895 22.98 30.1633C22.3456 30.5368 21.5291 30.3253 21.1553 29.6911C20.6256 28.7923 19.8702 28.0473 18.9643 27.5296C18.0583 27.0119 17.0322 26.7397 15.9886 26.7397C14.9455 26.7398 13.9205 27.0121 13.0147 27.5296C12.1089 28.0472 11.3535 28.7924 10.8237 29.6911C10.4499 30.3255 9.63175 30.5372 8.99733 30.1633C8.36335 29.7896 8.152 28.9729 8.52511 28.3387C9.29049 27.0398 10.3828 25.9616 11.6918 25.2137C13.0004 24.4661 14.4816 24.0731 15.9886 24.073Z" fill="#2F80ED" />
                  <path d="M7.86987 11.2432C9.37737 11.2432 10.8596 11.636 12.1685 12.3839C13.4774 13.1318 14.568 14.21 15.3334 15.5089C15.7069 16.1432 15.4955 16.9597 14.8612 17.3335C14.2268 17.707 13.4103 17.4955 13.0365 16.8613C12.5068 15.9625 11.7514 15.2175 10.8456 14.6998C9.93956 14.1821 8.91338 13.9099 7.86987 13.9099C6.8267 13.91 5.80169 14.1823 4.89592 14.6998C3.99014 15.2174 3.2347 15.9626 2.70494 16.8613C2.33109 17.4957 1.51298 17.7074 0.878556 17.3335C0.244574 16.9598 0.0332207 16.1431 0.406334 15.5089C1.17172 14.21 2.26406 13.1318 3.573 12.3839C4.88161 11.6363 6.36278 11.2433 7.86987 11.2432Z" fill="#2F80ED" />
                  <path d="M23.9071 11.2432C25.4146 11.2432 26.8968 11.636 28.2057 12.3839C29.5147 13.1318 30.6053 14.21 31.3706 15.5089C31.7441 16.1432 31.5327 16.9597 30.8984 17.3335C30.2641 17.707 29.4475 17.4955 29.0738 16.8613C28.544 15.9625 27.7886 15.2175 26.8828 14.6998C25.9768 14.1821 24.9506 13.9099 23.9071 13.9099C22.8639 13.91 21.8389 14.1823 20.9331 14.6998C20.0274 15.2174 19.2719 15.9626 18.7422 16.8613C18.3683 17.4957 17.5502 17.7074 16.9158 17.3335C16.2818 16.9598 16.0705 16.1431 16.4436 15.5089C17.2089 14.21 18.3013 13.1318 19.6102 12.3839C20.9188 11.6363 22.4 11.2433 23.9071 11.2432Z" fill="#2F80ED" />
                </svg>
              </div>
              <div>
                <div className=" text-gray-100">
                  Approved Families
                </div>
                <CardTitle className="text-2xl font-semibold tabular-nums text-primary-buffer">
                  {beneficiariesStatisticsData?.data.approved}
                </CardTitle>
              </div>
            </div>
          </CardDescription>

        </Card>
        <Card className="@container/card !shadow-none bg-white border-0 p-[30px]">
          <div className="flex items-center gap-[30px] text-gray-900 ">
            <div className="w-18 h-18 flex items-center justify-center rounded-full bg-red/10">
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" fill="none">
                <path d="M19.1661 20.8958C19.1661 19.1412 17.7437 17.7188 15.989 17.7188C14.2344 17.7188 12.812 19.1412 12.8119 20.8958C12.8119 22.6505 14.2344 24.0729 15.989 24.0729C17.7437 24.0729 19.1661 22.6505 19.1661 20.8958ZM21.8328 20.8958C21.8328 24.1233 19.2165 26.7396 15.989 26.7396C12.7616 26.7396 10.1453 24.1233 10.1453 20.8958C10.1453 17.6684 12.7616 15.0521 15.989 15.0521C19.2164 15.0521 21.8327 17.6684 21.8328 20.8958Z" fill="#EB5757" />
                <path d="M11.0472 8.06598C11.0472 6.31132 9.62479 4.8889 7.87012 4.8889C6.11548 4.88894 4.69307 6.31134 4.69303 8.06598C4.69303 9.82065 6.11546 11.243 7.87012 11.2431C9.62481 11.2431 11.0472 9.82067 11.0472 8.06598ZM13.7139 8.06598C13.7139 11.2934 11.0976 13.9097 7.87012 13.9097C4.6427 13.9097 2.02637 11.2934 2.02637 8.06598C2.02641 4.83858 4.64272 2.22227 7.87012 2.22223C11.0975 2.22223 13.7138 4.83856 13.7139 8.06598Z" fill="#EB5757" />
                <path d="M27.0846 8.06598C27.0845 6.31132 25.6621 4.8889 23.9075 4.8889C22.1528 4.88894 20.7304 6.31134 20.7304 8.06598C20.7304 9.82065 22.1528 11.243 23.9075 11.2431C25.6622 11.2431 27.0846 9.82067 27.0846 8.06598ZM29.7512 8.06598C29.7512 11.2934 27.1349 13.9097 23.9075 13.9097C20.68 13.9097 18.0637 11.2934 18.0637 8.06598C18.0638 4.83858 20.6801 2.22227 23.9075 2.22223C27.1349 2.22223 29.7512 4.83856 29.7512 8.06598Z" fill="#EB5757" />
                <path d="M15.9886 24.073C17.4961 24.073 18.9784 24.4658 20.2873 25.2137C21.5962 25.9616 22.6868 27.0398 23.4522 28.3387C23.8257 28.973 23.6142 29.7895 22.98 30.1633C22.3456 30.5368 21.5291 30.3253 21.1553 29.6911C20.6256 28.7923 19.8702 28.0473 18.9643 27.5296C18.0583 27.0119 17.0322 26.7397 15.9886 26.7397C14.9455 26.7398 13.9205 27.0121 13.0147 27.5296C12.1089 28.0472 11.3535 28.7924 10.8237 29.6911C10.4499 30.3255 9.63175 30.5372 8.99733 30.1633C8.36335 29.7896 8.152 28.9729 8.52511 28.3387C9.29049 27.0398 10.3828 25.9616 11.6918 25.2137C13.0004 24.4661 14.4816 24.0731 15.9886 24.073Z" fill="#EB5757" />
                <path d="M7.86987 11.2432C9.37737 11.2432 10.8596 11.636 12.1685 12.3839C13.4774 13.1318 14.568 14.21 15.3334 15.5089C15.7069 16.1432 15.4955 16.9597 14.8612 17.3335C14.2268 17.707 13.4103 17.4955 13.0365 16.8613C12.5068 15.9625 11.7514 15.2175 10.8456 14.6998C9.93956 14.1821 8.91338 13.9099 7.86987 13.9099C6.8267 13.91 5.80169 14.1823 4.89592 14.6998C3.99014 15.2174 3.2347 15.9626 2.70494 16.8613C2.33109 17.4957 1.51298 17.7074 0.878556 17.3335C0.244574 16.9598 0.0332207 16.1431 0.406334 15.5089C1.17172 14.21 2.26406 13.1318 3.573 12.3839C4.88161 11.6363 6.36278 11.2433 7.86987 11.2432Z" fill="#EB5757" />
                <path d="M23.9071 11.2432C25.4146 11.2432 26.8968 11.636 28.2057 12.3839C29.5147 13.1318 30.6053 14.21 31.3706 15.5089C31.7441 16.1432 31.5327 16.9597 30.8984 17.3335C30.2641 17.707 29.4475 17.4955 29.0738 16.8613C28.544 15.9625 27.7886 15.2175 26.8828 14.6998C25.9768 14.1821 24.9506 13.9099 23.9071 13.9099C22.8639 13.91 21.8389 14.1823 20.9331 14.6998C20.0274 15.2174 19.2719 15.9626 18.7422 16.8613C18.3683 17.4957 17.5502 17.7074 16.9158 17.3335C16.2818 16.9598 16.0705 16.1431 16.4436 15.5089C17.2089 14.21 18.3013 13.1318 19.6102 12.3839C20.9188 11.6363 22.4 11.2433 23.9071 11.2432Z" fill="#EB5757" />
              </svg>
            </div>
            <div>
              <div className=" text-gray-900">
                Rejected Families
              </div>
              <CardTitle className="text-2xl font-semibold tabular-nums text-primary-buffer">
                {beneficiariesStatisticsData?.data.rejected}
              </CardTitle>
            </div>
          </div>
        </Card>
      </div>
      <div>
        <div className="tabs">
          <div
            className={`tab-item ${activeTab === 'approved' ? 'active' : ''}`}
            onClick={() => setActiveTab('approved')}
            style={{ cursor: 'pointer' }}
          >
            <span>
              Approved
            </span>
            <svg xmlns="http://www.w3.org/2000/svg" width="181" height="42" viewBox="0 0 181 42" fill="none">
              <path d="M0 12C0 5.37258 5.37258 0 12 0H162.299C167.957 0 172.847 3.9528 174.033 9.48565L181 42H0V12Z" fill={activeTab === 'approved' ? '#fff' : '#EEEEF0'} />
            </svg>
          </div>
          <div
            className={`tab-item ${activeTab === 'pending' ? 'active' : ''}`}
            onClick={() => setActiveTab('pending')}
            style={{ cursor: 'pointer' }}
          >
            <span>
              Request
            </span>
            <svg xmlns="http://www.w3.org/2000/svg" width="181" height="42" viewBox="0 0 181 42" fill="none">
              <path d="M0 12C0 5.37258 5.37258 0 12 0H162.299C167.957 0 172.847 3.9528 174.033 9.48565L181 42H0V12Z" fill={activeTab === 'pending' ? '#fff' : '#EEEEF0'} />
            </svg>
          </div>
          <div
            className={`tab-item ${activeTab === 'rejected' ? 'active' : ''}`}
            onClick={() => setActiveTab('rejected')}
            style={{ cursor: 'pointer' }}
          >
            <span>
              Rejected
            </span>
            <svg xmlns="http://www.w3.org/2000/svg" width="181" height="42" viewBox="0 0 181 42" fill="none">
              <path d="M0 12C0 5.37258 5.37258 0 12 0H162.299C167.957 0 172.847 3.9528 174.033 9.48565L181 42H0V12Z" fill={activeTab === 'rejected' ? '#fff' : '#EEEEF0'} />
            </svg>
          </div>
        </div>
        {/* Tab Content */}
        <div className="tab-content bg-white rounded-lg !rounded-tl-none p-6 overflow-x-scroll">
          {activeTab === 'approved' && (
            <div>
              <div className="flex items-center justify-between gap-4 mb-6">
                <div className="flex items-center gap-4 w-full">
                  <SearchInput
                    key={searchKey}
                    onSearch={handleSearch}
                    placeholder="Search by name or email..."
                    disabled={isLoading}
                    isLoading={isLoading}
                  />
                  <Button
                    variant="outlined"
                    size="sm"
                    onClick={() => {
                      handleSearch("")
                      setSearchKey(prev => prev + 1)
                    }}
                    disabled={isLoading}
                  >
                    Clear
                  </Button>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="filled" size="lg" iconLeft={<Download />} onClick={exportUsers}>
                    Export Users
                  </Button>
                </div>
              </div>
              <DataTable
                data={beneficiariesData?.data?.data || []}
                schema={schema}
                isLoading={isLoading}
                columns={columns as ColumnDef<unknown>[]}
                onRowClick={handleRowClick}
              />
            </div>
          )}
          {activeTab === 'pending' && (
            <div>
              <div className="flex items-center justify-between gap-4 mb-6">
                <div className="flex items-center gap-4 w-full">
                  <SearchInput
                    key={searchKey}
                    onSearch={handleSearch}
                    placeholder="Search categories..."
                    disabled={isLoading}
                    isLoading={isLoading}
                  />
                  <Button
                    variant="outlined"
                    size="sm"
                    onClick={() => {
                      handleSearch("")
                      setSearchKey(prev => prev + 1)
                    }}
                    disabled={isLoading}
                  >
                    Clear
                  </Button>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="filled" size="lg" iconLeft={<Download />} onClick={exportUsers}>
                    Export Users
                  </Button>
                </div>
              </div>
              <DataTable
                data={beneficiariesData?.data?.data || []}
                schema={schema}
                isLoading={isLoading}
                columns={columns as ColumnDef<unknown>[]}
                onRowClick={handleRowClick}
              />
            </div>
          )}
          {activeTab === 'rejected' && (
            <div>
              <h2 className="text-xl font-semibold mb-4">Rejected Families</h2>
              <p className="text-gray-600">List of rejected families will be displayed here.</p>
              {/* Add your rejected families data table or content here */}
            </div>
          )}
        </div>
      </div>

    </div >
  )
}
