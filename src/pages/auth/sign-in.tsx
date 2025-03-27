// Packages
import { ReactElement } from 'react';
import { useTranslation } from 'react-i18next';
import { Helmet } from 'react-helmet-async';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { toast } from 'sonner';
import { GalleryVerticalEnd as GalleryVerticalEndIcon } from 'lucide-react';
import { zodResolver } from '@hookform/resolvers/zod';
import * as zod from 'zod';

// Components
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export const SignIn = (): ReactElement => {
  const { t } = useTranslation();

  const signInForm = zod.object({
    email: zod.string().email(t('invalidEmail')),
    password: zod.string(),
  });

  type SignInForm = zod.infer<typeof signInForm>;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInForm>({
    resolver: zodResolver(signInForm),
  });

  const onSignIn = () => {
    toast.success(t('signInSuccess'));
  };

  return (
    <>
      <Helmet title="Login" />

      <div className={'flex flex-col gap-6'}>
        <form className="flex flex-col gap-6" onSubmit={handleSubmit(onSignIn)}>
          <header className="flex flex-col items-center gap-2">
            <Link
              to="/"
              className="flex h-8 w-8 flex-col items-center justify-center gap-2 rounded-md font-medium"
            >
              <div className="flex h-8 w-8 items-center">
                <GalleryVerticalEndIcon size={24} />
              </div>
              <span className="sr-only">Acme Inc.</span>
            </Link>
            <h1 className="text-xl font-bold">{t('welcome')} casino.</h1>
          </header>

          <div className="flex flex-col gap-6">
            <div className="grid gap-2">
              <Input
                id="email"
                label={t('email')}
                placeholder="m@example.com"
                autoComplete="off"
                autoFocus
                required
                error={errors.email?.message}
                {...register('email')}
              />
              <Input
                id="password"
                type="password"
                label={t('password')}
                placeholder="********"
                isPassword
                autoComplete="off"
                required
                {...register('password')}
              />
            </div>
            <Button type="submit" className="w-full">
              {t('login')}
            </Button>
          </div>
        </form>
        <div className="text-balance text-center text-xs text-muted-foreground [&_a]:underline [&_a]:underline-offset-4 hover:[&_a]:text-primary">
          {t('ByClickingContinueYouAgreeToOur')}{' '}
          <a href="#">{t('termsOfService')}</a> {t('and')}{' '}
          <a href="#">{t('privacyPolicy')}</a>.
        </div>
      </div>
    </>
  );
};
