// Packages
import { ReactElement, useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  useReactTable,
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  getPaginationRowModel,
  Table as ITable,
  PaginationState,
  Updater,
} from '@tanstack/react-table';
import {
  ChevronDown as ChevronDownIcon,
  ChevronUp as ChevronUpIcon,
} from 'lucide-react';

// Components
import { DataTableSkeleton } from '@/components/core/data-table/data-table-skeleton';
import { DataTablePagination } from '@/components/core/data-table/data-table-pagination';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

// Libs
import { cn } from '@/libs/utils';

interface DataTableProps<T> {
  id: string;
  header?: (props: { table: ITable<T> }) => ReactElement;
  data: Array<T>;
  columns: ColumnDef<T>[];
  enableSortingRemoval: boolean;
  emptyText?: string;
  isLoading?: boolean;
  pageCount?: number;
  pagination?: PaginationState;
  onPaginationChange?: (updater: Updater<PaginationState>) => void;
}

export const DataTable = <T,>(props: DataTableProps<T>): ReactElement => {
  const { t } = useTranslation();

  const [paginationDefault, setPaginationDefault] = useState({
    pageIndex: 0,
    pageSize: 10,
  });

  const table = useReactTable({
    data: props?.data ?? [],
    columns: props?.columns ?? [],
    enableSortingRemoval: props?.enableSortingRemoval,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onPaginationChange: props?.onPaginationChange ?? setPaginationDefault,
    manualPagination: Boolean(props?.onPaginationChange),
    pageCount: props?.pageCount ?? undefined,
    state: {
      pagination: props?.pagination ?? paginationDefault,
    },
    // onPaginationChange: setPagination,
    // onSortingChange: setSorting,
    // onColumnFiltersChange: setColumnFilters,
    // onColumnVisibilityChange: setColumnVisibility,
    // getFilteredRowModel: getFilteredRowModel(),
    // getFacetedUniqueValues: getFacetedUniqueValues(),
  });

  return (
    <>
      {props?.header && <props.header table={table} />}

      <div className="w-full overflow-auto rounded-lg border border-gray-200 shadow dark:border-gray-800">
        <Table id={props?.id} className="overflow-auto">
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id} className="hover:bg-transparent">
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead
                      key={header.id}
                      style={{ width: `${header.getSize()}px` }}
                      className="h-8"
                    >
                      {header.isPlaceholder ? null : header.column.getCanSort() ? (
                        <div
                          tabIndex={header.column.getCanSort() ? 0 : undefined}
                          onClick={header.column.getToggleSortingHandler()}
                          className={cn(
                            header.column.getCanSort() &&
                              'flex h-full cursor-pointer select-none items-center justify-between gap-2',
                          )}
                          onKeyDown={(e) => {
                            // Enhanced keyboard handling for sorting
                            if (
                              header.column.getCanSort() &&
                              (e.key === 'Enter' || e.key === ' ')
                            ) {
                              e.preventDefault();
                              header.column.getToggleSortingHandler()?.(e);
                            }
                          }}
                        >
                          {flexRender(
                            header.column.columnDef.header,
                            header.getContext(),
                          )}
                          {{
                            asc: (
                              <ChevronUpIcon
                                className="shrink-0 opacity-60"
                                size={16}
                                aria-hidden="true"
                              />
                            ),
                            desc: (
                              <ChevronDownIcon
                                className="shrink-0 opacity-60"
                                size={16}
                                aria-hidden="true"
                              />
                            ),
                          }[header.column.getIsSorted() as string] ?? null}
                        </div>
                      ) : (
                        flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
                        )
                      )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {props?.isLoading ? (
              <DataTableSkeleton table={table} />
            ) : table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && 'selected'}
                  className="h-12"
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id} className="last:py-0">
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={props?.columns.length}
                  className="text-center"
                >
                  <p className="text-base font-light">
                    {props?.emptyText ?? t('components.dataTable.emptyResults')}
                  </p>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Pagination buttons */}
      <DataTablePagination table={table} />
    </>
  );
};
