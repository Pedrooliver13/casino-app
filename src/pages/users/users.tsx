// Packages
import { ReactElement } from 'react';
import { useTranslation } from 'react-i18next';

// Components
import { Checkbox } from '@/components/ui/checkbox';
import { DataTable } from '@/components/core/data-table/data-table';

export const Users = (): ReactElement => {
  const { t } = useTranslation();

  return (
    <div className="flex flex-col gap-4">
      <header>
        <h1 className="text-lg">{t('pages.users.allUsers')}</h1>
      </header>

      <DataTable
        id="data-table-users"
        enableSortingRemoval={false}
        header={() => {
          return <h1>Hello World</h1>;
        }}
        data={[
          {
            name: 'Pedro Oliveira 123',
            email: 'pedro_oliver@hotmail.com',
          },
          {
            name: 'Pedro Oliveira',
            email: 'pedro_oliver@hotmail.com',
          },
        ]}
        columns={[
          {
            id: 'select',
            header: ({ table }) => (
              <Checkbox
                checked={
                  table.getIsAllPageRowsSelected() ||
                  (table.getIsSomePageRowsSelected() && 'indeterminate')
                }
                onCheckedChange={(value) => {
                  table.toggleAllPageRowsSelected(!!value);
                }}
                aria-label="Select all"
              />
            ),
            cell: ({ row }) => (
              <Checkbox
                checked={row.getIsSelected()}
                onCheckedChange={(value) => row.toggleSelected(!!value)}
                aria-label="Select row"
              />
            ),
            size: 0,
            enableSorting: false,
            enableHiding: false,
          },
          {
            header: 'name',
            accessorKey: 'name',
          },
          {
            header: 'Email',
            accessorKey: 'email',
          },
        ]}
      />
    </div>
  );
};
