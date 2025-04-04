// Packages
import { ReactElement } from 'react';
import { Table } from '@tanstack/react-table';

// Components
import { Skeleton } from '@/components/ui/skeleton';
import { TableCell, TableRow } from '@/components/ui/table';

interface DataTableSkeletonProps<T> {
  table: Table<T>;
}

export const DataTableSkeleton = <T,>(
  props: DataTableSkeletonProps<T>,
): ReactElement => {
  const columnLenght = props?.table?.getAllColumns().length;

  if (!columnLenght) {
    return <></>;
  }

  return (
    <>
      {Array?.from({ length: 8 }).map((_, index) => (
        <TableRow className="h-12" key={`${index}-row-skeleton`}>
          {Array.from({ length: columnLenght }).map(() => (
            <TableCell className="last:py-0" key={`${Math.random()}-skeleton`}>
              <Skeleton className="h-8 w-full" />
            </TableCell>
          ))}
        </TableRow>
      ))}
    </>
  );
};
