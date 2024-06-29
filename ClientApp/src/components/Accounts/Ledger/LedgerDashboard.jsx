import React, { useEffect, useState } from 'react';

import {
    createColumnHelper,
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getSortedRowModel,
    sortingFns,
    useReactTable
} from '@tanstack/react-table';
import Accounts from '../../../libs/api/Accounts';

import {
    compareItems,
    rankItem
} from '@tanstack/match-sorter-utils';


// const defaultData = [
//     {
//         firstName: 'tanner',
//         lastName: 'linsley',
//         age: 24,
//         visits: 100,
//         status: 'In Relationship',
//         progress: 50,
//     },
//     {
//         firstName: 'tandy',
//         lastName: 'miller',
//         age: 40,
//         visits: 40,
//         status: 'Single',
//         progress: 80,
//     },
//     {
//         firstName: 'joe',
//         lastName: 'dirte',
//         age: 45,
//         visits: 20,
//         status: 'Complicated',
//         progress: 10,
//     },
// ]





export default function LedgerDashboard() {
    const [pagination, setPagination] = useState({
        pageIndex: 6, //initial page index
        pageSize: 1, //default page size
    });
    const [columnFilters, setColumnFilters] = React.useState(
        []
    )
    const [globalFilter, setGlobalFilter] = React.useState('')

    const [data, _setData] = React.useState(() => [])

    // const rerender = React.useReducer(() => ({}), {})[1]

    // Define a custom fuzzy filter function that will apply ranking info to rows (using match-sorter utils)
    const fuzzyFilter = (row, columnId, value, addMeta) => {
        // Rank the item
        const itemRank = rankItem(row.getValue(columnId), value)

        // Store the itemRank info
        addMeta({
            itemRank,
        })

        // Return if the item should be filtered in/out
        return itemRank.passed
    }
    // Define a custom fuzzy sort function that will sort by rank if the row has ranking information
    const fuzzySort = (rowA, rowB, columnId) => {
        let dir = 0

        // Only sort by rank if the column has ranking information
        if (rowA.columnFiltersMeta[columnId]) {
            dir = compareItems(
                rowA.columnFiltersMeta[columnId]?.itemRank,
                rowB.columnFiltersMeta[columnId]?.itemRank
            )
        }

        // Provide an alphanumeric fallback for when the item ranks are equal
        return dir === 0 ? sortingFns.alphanumeric(rowA, rowB, columnId) : dir
    }

    const columnHelper = createColumnHelper()

    const columns = [
        // columnHelper.accessor('id', {
        //     header: () => '#',
        //     cell: info => info.getValue(),
        //     footer: info => info.column.id,
        // }),
        columnHelper.accessor('account', {
            header: () => 'Account',
            cell: info => info.getValue(),
            footer: info => info.column.id,
        }),
        // columnHelper.accessor('dateTime', {
        //     header: () => 'Date / Time',
        //     cell: info => info.getValue(),
        //     filterFn: 'fuzzy', //using our custom fuzzy filter function
        //     // filterFn: fuzzyFilter, //or just define with the function
        //     sortingFn: fuzzySort, //sort by fuzzy rank (falls back to alphanumeric)
        //     footer: info => info.column.id,
        // }),
        {
            accessorFn: row => row.dateTime, //note: normal non-fuzzy filter column - case sensitive
            id: 'dateTime',
            cell: info => info.getValue(),
            header: () => <span>Date / Time</span>,
            filterFn: 'includesString', //or just define with the function
            // sortingFn: fuzzySort, //sort by fuzzy rank (falls back to alphanumeric)
        },
        columnHelper.accessor('description', {
            header: () => 'Description',
            cell: info => info.getValue(),
            footer: info => info.column.id,
        }),
        columnHelper.accessor('amount', {
            header: () => 'Amount',
            cell: info => info.getValue(),
            footer: info => info.column.id,
        }),
    ]


    const table = useReactTable({
        data,
        columns,
        filterFns: {
            fuzzy: fuzzyFilter, //define as a filter function that can be used in column definitions
        },
        onColumnFiltersChange: setColumnFilters,
        onGlobalFilterChange: setGlobalFilter,
        globalFilterFn: 'fuzzy', //apply fuzzy filter to the global filter (most common use case for 
        getCoreRowModel: getCoreRowModel(),
        getFilteredRowModel: getFilteredRowModel(), //client side filtering
        getSortedRowModel: getSortedRowModel(), //provide a sorting row model
        //getPaginationRowModel: getPaginationRowModel(), //load client-side pagination code

        onPaginationChange: setPagination, //update the pagination state when internal APIs mutate the pagination state
        autoResetPageIndex: false, //turn off auto reset of pageIndex
        debugTable: true,
        debugHeaders: true,
        debugColumns: false,
        state: {
            //...
            pagination,
            columnFilters,
            globalFilter,
        },
        initialState: {
            sorting: [
                {
                    id: 'dateTime',
                    desc: true, // sort by name in descending order by default
                },
            ],
            pagination: {
                pageIndex: 2, //custom initial page index
                pageSize: 25, //custom default page size
            },
        },
    })

    useEffect(() => {
        const load = async () => {
            // setLedger(await Accounts.ListRunningLedger(localStorage.getItem('Account')))
            _setData(await Accounts.ListRunningLedger(localStorage.getItem('Account')))
        }
        load()
    }, [])



    //   type Person = {
    //     firstName: string
    //     lastName: string
    //     age: number
    //     visits: number
    //     status: string
    //     progress: number
    //   }

    // A typical debounced input react component
    function DebouncedInput({
        value: initialValue,
        onChange,
        debounce = 3500,
        ...props
    }) {
        const [value, setValue] = React.useState(initialValue)

        // const [value, setValue] = useState()
        // React.useEffect(() => {
        //     setValue(initialValue)
        // }, [initialValue])

        // React.useEffect(() => {
        //     const timeout = setTimeout(() => {
        //         onChange(value)
        //     }, debounce)

        //     return () => clearTimeout(timeout)
        // }, [value])

        return (
            // <input {...props} value={value} onChange={e => setValue(e.target.value)} />
            <>
                <input {...props} value={value} onChange={e => setValue(e.target.value)} />
                <button className='btn btn-sm' onClick={() => onChange(value)}>Filter</button>
            </>
        )
    }


    function Filter({ column }) {
        const columnFilterValue = column.getFilterValue()

        return (
            <DebouncedInput
                type="text"
                value={(columnFilterValue ?? '')}
                onChange={value => column.setFilterValue(value)}
                // onChange={value => setValue(value)}
                placeholder={`Search...`}
                className="w-36 border shadow rounded"
            />

        )
    }
    return (
        <div className="p-2">
            <DebouncedInput
                value={globalFilter ?? ''}
                onChange={value => setGlobalFilter(String(value))}
                className="p-2 font-lg shadow border border-block"
                placeholder="Search all columns..."
            />
            <table className='w-100'>
                <thead>
                    {table.getHeaderGroups().map(headerGroup => (
                        <tr key={headerGroup.id}>
                            {headerGroup.headers.map(header => (
                                <th key={header.id}>
                                    {header.isPlaceholder ? null : (
                                        <>
                                            <div
                                                {...{
                                                    className: header.column.getCanSort()
                                                        ? 'cursor-pointer select-none'
                                                        : '',
                                                    onClick: header.column.getToggleSortingHandler(),
                                                }}
                                            >
                                                {flexRender(
                                                    header.column.columnDef.header,
                                                    header.getContext()
                                                )}
                                                {{
                                                    asc: ' 🔼',
                                                    desc: ' 🔽',
                                                }[header.column.getIsSorted()] ?? null}
                                            </div>
                                            {header.column.getCanFilter() ? (
                                                <div>
                                                    <Filter column={header.column} />
                                                </div>
                                            ) : null}
                                        </>
                                    )}
                                </th>
                            ))}
                        </tr>
                    ))}
                </thead>
                <tbody>
                    {table.getRowModel().rows.map(row => (
                        <tr key={row.id}>
                            {row.getVisibleCells().map(cell => (
                                <td key={cell.id}>
                                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
                <tfoot>
                    {table.getFooterGroups().map(footerGroup => (
                        <tr key={footerGroup.id}>
                            {footerGroup.headers.map(header => (
                                <th key={header.id}>
                                    {header.isPlaceholder
                                        ? null
                                        : flexRender(
                                            header.column.columnDef.footer,
                                            header.getContext()
                                        )}
                                </th>
                            ))}
                        </tr>
                    ))}
                </tfoot>
            </table>
            <div className="h-4" />
        </div>
    )
}
