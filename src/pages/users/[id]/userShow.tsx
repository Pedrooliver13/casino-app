// Packages
import { ReactElement } from 'react';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import {
  BadgeDollarSign as BadgeDollarSignIcon,
  Calendar as CalendarIcon,
  ChartSpline,
  Cog as CogIcon,
  Gift as GiftIcon,
  IdCard as IdCardIcon,
  Key as KeyIcon,
  Mail as MailIcon,
  Phone as PhoneIcon,
  User as UserIcon,
} from 'lucide-react';

// Components
import { Box } from '@/components/core/box';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { DepositTab } from '@/components/shared/users/deposit-tab';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

// Hooks
import { useGetUserOperationById } from '../../../hooks/users/use-get-user-operations-by-id';

// Utils
import { priceFormatter } from '@/utils/common';

const tabs = [
  {
    id: 'deposit-tab',
    label: 'deposit',
    component: DepositTab,
  },
];

export const UserShow = (): ReactElement => {
  const { t } = useTranslation();
  const { id } = useParams();
  const { data, isFetching } = useGetUserOperationById({ id });

  return (
    <div className="flex flex-col gap-4">
      <header className="flex items-center justify-between gap-4">
        <h1 className="flex w-full max-w-full flex-1 items-center gap-2 font-bold md:max-w-[350px]">
          <UserIcon size={24} />
          <Box loading={isFetching} className="flex items-center gap-2">
            {data?.data?.user?.username}
            <div
              title={
                data?.data?.user?.active
                  ? t('pages.users.active')
                  : t('pages.users.inactive')
              }
              data-status={data?.data?.user?.active}
              className="h-2 w-2 max-w-[10px] rounded-full data-[status=false]:bg-red-600 data-[status=true]:bg-green-400"
            />{' '}
          </Box>
        </h1>

        <div className="flex gap-2">
          <Button
            title={t('pages.users.unlockUser')}
            type="button"
            size="sm"
            disabled={isFetching}
          >
            <KeyIcon />
            <span className="hidden md:inline-block">
              {t('pages.users.unlockUser')}
            </span>
          </Button>
          <Button
            title={t('pages.users.configUser')}
            type="button"
            size="sm"
            disabled={isFetching}
          >
            <CogIcon />
          </Button>
        </div>
      </header>

      <section className="flex flex-col gap-4 md:flex-row">
        <Card className="flex max-w-full flex-1 flex-col gap-2 p-4">
          <CardHeader className="flex flex-row items-center gap-2 p-0">
            <MailIcon size={18} />
            {t('pages.users.email')}:
          </CardHeader>{' '}
          <CardContent className="p-0">
            <Box
              as="div"
              loading={isFetching}
              className="w-full text-foreground"
            >
              {data?.data?.user?.email}
            </Box>
          </CardContent>
        </Card>

        <Card className="flex max-w-full flex-1 flex-col gap-2 p-4">
          <CardHeader className="flex flex-row items-center gap-2 p-0">
            <IdCardIcon size={18} />
            {t('pages.users.document')}:
          </CardHeader>{' '}
          <CardContent className="p-0">
            <Box
              as="div"
              loading={isFetching}
              className="w-full text-foreground"
            >
              {data?.data?.user?.document}
            </Box>
          </CardContent>
        </Card>

        <Card className="flex max-w-full flex-1 flex-col gap-2 p-4">
          <CardHeader className="flex flex-row items-center gap-2 p-0">
            <PhoneIcon size={18} />
            {t('pages.users.phone')}:
          </CardHeader>{' '}
          <CardContent className="p-0">
            <Box
              as="div"
              loading={isFetching}
              className="w-full text-foreground"
            >
              {data?.data?.user?.phone}
            </Box>
          </CardContent>
        </Card>

        <Card className="flex max-w-full flex-1 flex-col gap-2 p-4">
          <CardHeader className="flex flex-row items-center gap-2 p-0">
            <CalendarIcon size={18} />
            {t('pages.users.createAt')}:
          </CardHeader>{' '}
          <CardContent className="p-0">
            <Box
              as="div"
              loading={isFetching}
              className="w-full text-foreground"
            >
              {data?.data?.user?.createdAt &&
                new Date(data?.data?.user?.createdAt).toLocaleDateString(
                  'pt-BR',
                )}
            </Box>
          </CardContent>
        </Card>
      </section>

      <section className="flex flex-col justify-between gap-4 md:flex-row">
        <Card
          data-positive={Boolean(data?.data?.balance)}
          className="flex max-w-full flex-1 flex-col gap-2 p-4 data-[positive=false]:bg-red-600 data-[positive=true]:bg-green-600"
        >
          <CardHeader className="flex flex-row items-center gap-2 p-0 text-white">
            <BadgeDollarSignIcon size={18} />
            {t('pages.users.totalMoney')}:
          </CardHeader>{' '}
          <CardContent className="p-0">
            <Box
              as="div"
              loading={isFetching}
              className="w-full text-2xl text-white"
            >
              {priceFormatter.format(data?.data?.balance || 0)}
            </Box>
          </CardContent>
        </Card>

        <Card className="flex max-w-full flex-1 flex-col gap-2 p-4">
          <CardHeader className="flex flex-row items-center gap-2 p-0">
            <ChartSpline size={18} />
            {t('pages.users.realMoney')}:
          </CardHeader>{' '}
          <CardContent className="p-0">
            <Box
              as="div"
              loading={isFetching}
              className="w-full text-2xl text-foreground"
            >
              {priceFormatter.format(data?.data?.balance || 0)}
            </Box>
          </CardContent>
        </Card>

        <Card className="flex max-w-full flex-1 flex-col gap-2 p-4">
          <CardHeader className="flex flex-row items-center gap-2 p-0">
            <GiftIcon size={18} />
            {t('pages.users.bonusMoney')}:
          </CardHeader>{' '}
          <CardContent className="p-0">
            <Box
              as="div"
              loading={isFetching}
              className="w-full text-2xl text-foreground"
            >
              {priceFormatter.format(data?.data?.bonus || 0)}
            </Box>
          </CardContent>
        </Card>
      </section>

      <Separator className="my-4" />

      <Tabs defaultValue="deposit-tab">
        <TabsList className="gap-1 bg-transparent">
          {tabs.map((tab) => (
            <TabsTrigger
              key={`${tab.id}-trigger`}
              value={tab.id}
              className="rounded-full data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-none"
            >
              {t(`pages.users.${tab?.label}`)}
            </TabsTrigger>
          ))}
        </TabsList>

        {tabs.map((tab, index) => (
          <TabsContent key={`${tab.id}+${index}-content`} value={tab.id}>
            <tab.component />
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
};
