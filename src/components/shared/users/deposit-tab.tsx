// Packages
import { ReactElement, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

// Components
import { DataTable } from '@/components/core/data-table/data-table';

// Hooks
import { useGetUserDepositById } from '@/hooks/users/use-get-user-deposit-by-id';

// Utils
import { dateFormatter } from '@/utils/common';

export const DepositTab = (): ReactElement => {
  const { id } = useParams();
  const { t } = useTranslation();

  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10,
  });

  const { data, isFetching } = useGetUserDepositById({
    id,
    page: pagination.pageIndex + 1,
    limit: pagination.pageSize,
  });

  return (
    <div className="my-5">
      <DataTable
        id={'deposit-table'}
        isLoading={isFetching}
        pagination={pagination}
        onPaginationChange={setPagination}
        pageCount={data?.data?.totalPages}
        data={data?.data?.deposits || []}
        columns={[
          {
            header: t('pages.users.createAt'),
            accessorKey: 'createdAt',
            cell: ({ row }) => {
              return dateFormatter(row.getValue('createdAt'));
            },
          },
          {
            header: t('pages.users.depositInformation'),
            accessorKey: '_id',
          },
          {
            header: t('pages.users.status'),
            accessorKey: 'paid',
            cell: ({ row }) => {
              return (
                <span
                  data-paid={Boolean(row.getValue('paid'))}
                  className="font-bold uppercase data-[paid=false]:text-red-600 data-[paid=true]:text-green-600"
                >
                  {row.getValue('paid')
                    ? t('pages.users.paidCompleted')
                    : t('pages.users.paidIncomplete')}
                </span>
              );
            },
          },
          {
            header: t('pages.users.paidBy'),
            accessorKey: 'paid',
            cell: () => {
              return <span className="font-bold uppercase">Desconhecido</span>;
            },
          },
        ]}
        enableSortingRemoval={false}
      />
    </div>
  );
};
