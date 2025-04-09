// Packages
import { ReactElement } from 'react';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import {
  BadgeDollarSign as BadgeDollarSignIcon,
  Calendar as CalendarIcon,
  ChartSpline,
  Cog as CogIcon,
  Dices as DicesIcon,
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

// Hooks
import { useGetUserOperationById } from '../hooks/use-get-user-operations-by-id';

// Utils
import { priceFormatter } from '@/utils/common';

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

      <Separator className="my-4" />

      <section className="flex flex-col justify-between gap-4 md:flex-row">
        <Card className="flex max-w-full flex-1 flex-col gap-2 p-4">
          <CardHeader className="flex flex-row items-center gap-2 p-0">
            <BadgeDollarSignIcon size={18} />
            {t('pages.users.totalMoney')}:
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

      <section className="flex flex-col justify-between gap-4 md:flex-row">
        <Card className="flex flex-1 flex-col gap-2 p-4">
          <CardHeader className="flex flex-row items-center gap-2 p-0">
            <DicesIcon size={18} />
            {t('pages.users.bets')}:
          </CardHeader>{' '}
          <CardContent className="p-0">
            <ul className="flex w-full flex-col gap-2">
              <li className="flex w-full items-center justify-center gap-2 text-base">
                {t('pages.users.totalBet')}:
                <Box loading={isFetching} className="flex-1 text-foreground">
                  {priceFormatter.format(data?.data?.balance || 0)}
                </Box>
              </li>
              <li className="flex w-full items-center justify-center gap-2 text-base">
                {t('pages.users.totalWon')}:
                <Box loading={isFetching} className="flex-1 text-foreground">
                  {priceFormatter.format(data?.data?.balance || 0)}
                </Box>
              </li>
              <li className="flex w-full items-center justify-center gap-2 text-base">
                {t('pages.users.ggr')}:
                <Box loading={isFetching} className="flex-1 text-foreground">
                  {priceFormatter.format(data?.data?.balance || 0)}
                </Box>
              </li>
            </ul>
          </CardContent>
        </Card>

        <Card className="flex max-w-full flex-1 flex-col gap-2 p-4">
          <CardHeader className="flex flex-row items-center gap-2 p-0">
            <DicesIcon size={18} />
            {t('pages.users.balanceChanges')}:
          </CardHeader>{' '}
          <CardContent className="p-0">
            <ul className="flex w-full flex-col gap-2">
              <li className="flex w-full items-center justify-center gap-2 text-base">
                {t('pages.users.balanceAdded')}:
                <Box loading={isFetching} className="flex-1 text-foreground">
                  {priceFormatter.format(data?.data?.balance || 0)}
                </Box>
              </li>
              <li className="flex w-full items-center justify-center gap-2 text-base">
                {t('pages.users.balanceSubtracted')}:
                <Box loading={isFetching} className="flex-1 text-foreground">
                  {priceFormatter.format(data?.data?.balance || 0)}
                </Box>
              </li>
            </ul>
          </CardContent>
        </Card>
      </section>

      <Separator className="my-4" />

      <Tabs defaultValue="tab-1">
        <TabsList className="gap-1 bg-transparent">
          <TabsTrigger
            value="tab-1"
            className="rounded-full data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-none"
          >
            Depositos
          </TabsTrigger>
          <TabsTrigger
            value="tab-2"
            className="rounded-full data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-none"
          >
            Saques
          </TabsTrigger>
        </TabsList>
        <TabsContent value="tab-1">
          <p className="p-4 text-center text-xs text-muted-foreground">
            Content for Tab 1
          </p>
        </TabsContent>
        <TabsContent value="tab-2">
          <p className="p-4 text-center text-xs text-muted-foreground">
            Content for Tab 2
          </p>
        </TabsContent>
      </Tabs>
    </div>
  );
};
