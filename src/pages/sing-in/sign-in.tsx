// Packages
import { ReactElement, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Helmet } from 'react-helmet-async';
import { Controller, FormProvider, useForm } from 'react-hook-form';
import { useSearchParams } from 'react-router-dom';
import { AxiosError } from 'axios';
import { zodResolver } from '@hookform/resolvers/zod';
import * as zod from 'zod';

// Components
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { InputOTP, InputOTPSlot } from '@/components/ui/input-otp';
import { TenantImage } from '@/components/shared/tenant-image';

// Hooks
import { useToast } from '@/hooks/use-toast';
import { useAuthContext } from '@/hooks/use-auth';

export const SignIn = (): ReactElement => {
  const { t } = useTranslation();
  const { toast } = useToast();
  const { signIn } = useAuthContext();
  const [seachParams] = useSearchParams();
  const tenantValueByQuery = seachParams.get('tenant');

  const signInForm = zod.object({
    email: zod.string().email(t('pages.signIn.error.invalidEmail')),
    password: zod.string().min(1, t('pages.signIn.error.requiredField')),
    tenant: zod.string().min(1, t('pages.signIn.error.requiredField')),
    code: zod.string().optional(),
  });

  type SignInForm = zod.infer<typeof signInForm>;

  const methods = useForm<SignInForm>({
    resolver: zodResolver(signInForm),
  });

  const {
    control,
    register,
    setValue,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = methods;

  useEffect(() => {
    if (tenantValueByQuery) {
      setValue('tenant', tenantValueByQuery);
    }
  }, [tenantValueByQuery, setValue]);

  const onSignIn = async (data: SignInForm) => {
    try {
      await signIn({ ...data, code: data?.code || '' });

      toast({
        title: t('pages.signIn.signInSuccess'),
        duration: 3000,
      });
    } catch (err) {
      const error = err as AxiosError<{ message: string }>;

      if (error?.response) {
        const { data } = error.response;

        const messages = {
          'Email ou senha errado': t(
            'pages.signIn.error.invalidEmailOrPassword',
          ),
        };

        toast({
          variant: 'destructive',
          duration: 3000,
          title:
            messages[data?.message as keyof typeof messages] ??
            t('genericRequestError'),
        });
      }
    }
  };

  return (
    <>
      <Helmet title="Login" />

      <FormProvider {...methods}>
        <div className="container mt-10 flex w-full max-w-[400px] flex-col items-center justify-center md:m-auto md:h-[90vh]">
          <form
            onSubmit={handleSubmit(onSignIn)}
            className="flex flex-col justify-center gap-6"
          >
            <header className="flex flex-col items-center gap-2">
              <div className="flex flex-col items-center justify-center gap-2 rounded-md font-medium">
                <TenantImage />
                <span className="sr-only">Acme Inc.</span>
              </div>
              <h1 className="text-xl font-bold">
                {t('pages.signIn.welcome')} casino.
              </h1>
            </header>

            <div className="flex w-full max-w-full flex-col">
              <Input
                id="email"
                type="email"
                label={t('pages.signIn.email')}
                placeholder="m@example.com"
                autoComplete="email"
                autoFocus
                required
                error={errors.email?.message}
                {...register('email')}
              />
              <Input
                id="password"
                type="password"
                label={t('pages.signIn.password')}
                placeholder="********"
                isPassword
                autoComplete="off"
                required
                error={errors.password?.message}
                {...register('password')}
              />
              {!tenantValueByQuery && (
                <Input
                  id="tenat"
                  label={t('pages.signIn.tenant')}
                  autoComplete="off"
                  autoCapitalize="off"
                  required
                  error={errors.tenant?.message}
                  disabled={Boolean(tenantValueByQuery)}
                  {...register('tenant')}
                />
              )}
              <Controller
                control={control}
                name="code"
                render={({ field }) => (
                  <InputOTP
                    id="code"
                    className="mt-1 w-full flex-1 justify-center"
                    maxLength={6}
                    label={t('pages.signIn.code')}
                    error={errors.code?.message}
                    {...field}
                    onChange={(event) => {
                      field.onChange(event);

                      if (event.length === 6) {
                        handleSubmit(onSignIn)();
                      }
                    }}
                  >
                    {Array(6)
                      .fill(null)
                      .map((_, index) => (
                        <InputOTPSlot
                          className="outline-none"
                          key={index}
                          index={index}
                        />
                      ))}
                  </InputOTP>
                )}
              />
              <Button
                type="submit"
                className="mt-4 w-full"
                isLoading={isSubmitting}
                disabled={isSubmitting}
              >
                {t('pages.signIn.login')}
              </Button>
            </div>
            <div className="text-balance text-center text-xs text-muted-foreground [&_a]:underline [&_a]:underline-offset-4 hover:[&_a]:text-primary">
              {t('pages.signIn.ByClickingContinueYouAgreeToOur')}{' '}
              <a href="#">{t('pages.signIn.termsOfService')}</a>{' '}
              {t('pages.signIn.and')}{' '}
              <a href="#">{t('pages.signIn.privacyPolicy')}</a>.
            </div>
          </form>
        </div>
      </FormProvider>
    </>
  );
};
