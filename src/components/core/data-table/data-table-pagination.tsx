// Packages
import { ReactElement } from 'react';
import { useTranslation } from 'react-i18next';
import { Table } from '@tanstack/react-table';
import {
  ChevronFirst as ChevronFirstIcon,
  ChevronLast as ChevronLastIcon,
  ChevronLeft as ChevronLeftIcon,
  ChevronRight as ChevronRightIcon,
} from 'lucide-react';

// Components
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
} from '@/components/ui/pagination';

interface DataTablePaginationProps<T> {
  table: Table<T>;
}

export const DataTablePagination = <T,>(
  props: DataTablePaginationProps<T>,
): ReactElement => {
  const { t } = useTranslation();

  return (
    <div className="flex w-full items-center justify-between gap-8">
      <div className="flex items-center gap-3">
        <Label htmlFor="rows-per-page" className="max-sm:sr-only">
          {t('components.dataTable.rowsPerPage')}
        </Label>
        <Select
          value={props?.table?.getState().pagination.pageSize.toString()}
          onValueChange={(value) => {
            props?.table.setPageSize(Number(value));
          }}
        >
          <SelectTrigger
            id={'rows-per-page'}
            className="w-fit whitespace-nowrap"
          >
            <SelectValue placeholder="Select number of results" />
          </SelectTrigger>

          <SelectContent className="[&_*[role=option]>span]:end-2 [&_*[role=option]>span]:start-auto [&_*[role=option]]:pe-8 [&_*[role=option]]:ps-2">
            {[5, 10, 25, 50].map((pageSize) => (
              <SelectItem key={pageSize} value={pageSize.toString()}>
                {pageSize}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Pagination buttons */}
      <div>
        <Pagination>
          <PaginationContent>
            {/* First page button */}
            <PaginationItem>
              <Button
                size="icon"
                variant="outline"
                className="disabled:pointer-events-none disabled:opacity-50"
                onClick={() => props?.table.firstPage()}
                disabled={!props?.table.getCanPreviousPage()}
                aria-label="Go to first page"
              >
                <ChevronFirstIcon size={16} aria-hidden="true" />
              </Button>
            </PaginationItem>
            {/* Previous page button */}
            <PaginationItem>
              <Button
                size="icon"
                variant="outline"
                className="disabled:pointer-events-none disabled:opacity-50"
                onClick={() => props?.table.previousPage()}
                disabled={!props?.table.getCanPreviousPage()}
                aria-label="Go to previous page"
              >
                <ChevronLeftIcon size={16} aria-hidden="true" />
              </Button>
            </PaginationItem>
            {/* Next page button */}
            <PaginationItem>
              <Button
                size="icon"
                variant="outline"
                className="disabled:pointer-events-none disabled:opacity-50"
                onClick={() => props?.table.nextPage()}
                disabled={!props?.table.getCanNextPage()}
                aria-label="Go to next page"
              >
                <ChevronRightIcon size={16} aria-hidden="true" />
              </Button>
            </PaginationItem>
            {/* Last page button */}
            <PaginationItem>
              <Button
                size="icon"
                variant="outline"
                className="disabled:pointer-events-none disabled:opacity-50"
                onClick={() => props?.table.lastPage()}
                disabled={!props?.table.getCanNextPage()}
                aria-label="Go to last page"
              >
                <ChevronLastIcon size={16} aria-hidden="true" />
              </Button>
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  );
};
