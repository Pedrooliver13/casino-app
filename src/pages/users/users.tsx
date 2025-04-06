// Packages
import { ChangeEvent, ReactElement, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Helmet } from 'react-helmet-async';
import { Controller, useForm } from 'react-hook-form';
import { Search as SearchIcon } from 'lucide-react';

// Components
import { DataTable } from '@/components/core/data-table/data-table';
import { Input } from '@/components/ui/input';

// Hooks
import { useGetAllUsers } from './hooks/use-get-all-users';

// Utils
import { debounce } from '@/utils/common';

export const Users = (): ReactElement => {
  const { t } = useTranslation();
  const { control, watch } = useForm();

  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10,
  });

  const { data, isFetching } = useGetAllUsers({
    search: watch('search'),
    page: pagination.pageIndex + 1,
    limit: pagination.pageSize,
  });

  return (
    <>
      <Helmet title={t('components.appSidebar.user')} />

      <div className="flex flex-col gap-4">
        <header>
          <h1 className="text-lg">{t('pages.users.allUsers')}</h1>
        </header>

        <div className="flex items-center gap-2">
          <Controller
            name="search"
            control={control}
            render={({ field: { onChange, value: _value, ...fieldProps } }) => (
              <Input
                id="search"
                placeholder={t('pages.users.search')}
                removeHeight
                value={undefined}
                size={'sm'}
                suffixItem={<SearchIcon size={14} />}
                onChange={debounce((event: ChangeEvent<HTMLInputElement>) => {
                  onChange(String(event.target.value).trim());

                  if (pagination && pagination.pageIndex > 0) {
                    setPagination({
                      pageIndex: 0,
                      pageSize: 10,
                    });
                  }
                }, 500)}
                {...fieldProps}
              />
            )}
          />
        </div>

        <DataTable
          id="data-table-users"
          data={data?.data.docs || []}
          enableSortingRemoval={false}
          isLoading={isFetching}
          pageCount={data?.data.totalPages || 0}
          pagination={pagination}
          onPaginationChange={setPagination}
          columns={[
            {
              header: t('pages.users.userName'),
              accessorKey: 'username',
              size: 150,
            },
            {
              header: t('pages.users.email'),
              accessorKey: 'email',
              size: 200,
            },
            {
              header: t('pages.users.document'),
              accessorKey: 'document',
              size: 150,
            },
            {
              header: t('pages.users.account'),
              accessorKey: 'role',
              size: 150,
            },
            {
              header: t('pages.users.status'),
              accessorKey: 'status',
              size: 150,
            },
          ]}
        />
      </div>
    </>
  );
};
