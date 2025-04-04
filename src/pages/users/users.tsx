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
    email: watch('search'),
    page: pagination.pageIndex + 1,
    limit: pagination.pageSize,
  });

  return (
    <>
      <Helmet title={t('pages.users.allUsers')} />

      <div className="flex flex-col gap-4">
        <header>
          <h1 className="text-lg">{t('pages.users.allUsers')}</h1>
        </header>

        <form className="flex items-center gap-2">
          <Controller
            name="search"
            control={control}
            render={({ field: { onChange, value: _value, ...fieldProps } }) => (
              <Input
                id="search"
                placeholder="Pesquisar"
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
        </form>

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
              header: 'Usuário',
              accessorKey: 'username',
              size: 150,
            },
            {
              header: 'E-mail',
              accessorKey: 'email',
              size: 300,
            },
            {
              header: 'Conta',
              accessorKey: 'role',
              size: 150,
            },
            {
              header: 'Documento',
              accessorKey: 'document',
              size: 150,
            },
            {
              header: 'Status',
              accessorKey: 'active',
              size: 150,
            },
          ]}
        />
      </div>
    </>
  );
};
