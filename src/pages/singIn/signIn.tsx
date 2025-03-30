// Packages
import { ReactElement, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Helmet } from 'react-helmet-async';
import { Controller, useForm } from 'react-hook-form';
import { useSearchParams } from 'react-router-dom';
import { AxiosError } from 'axios';
import { zodResolver } from '@hookform/resolvers/zod';
import * as zod from 'zod';
import { GalleryVerticalEnd as GalleryVerticalEndIcon } from 'lucide-react';

// Components
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { InputOTP, InputOTPSlot } from '@/components/ui/input-otp';

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
    email: zod.string().email(t('signIn.error.invalidEmail')),
    password: zod.string().min(1, t('signIn.error.requiredField')),
    tenant: zod.string().min(1, t('signIn.error.requiredField')),
    code: zod.string({ message: t('signIn.error.requiredField') }),
  });

  type SignInForm = zod.infer<typeof signInForm>;

  const {
    control,
    register,
    setValue,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignInForm>({
    resolver: zodResolver(signInForm),
  });

  useEffect(() => {
    if (tenantValueByQuery) {
      setValue('tenant', tenantValueByQuery);
    }
  }, [tenantValueByQuery, setValue]);

  const onSignIn = async (data: SignInForm) => {
    try {
      const token = await signIn(data);

      toast({
        title: t('signIn.signInSuccess') + token,
      });
    } catch (err) {
      const error = err as AxiosError<{ message: string }>;

      if (error.response) {
        const { data } = error.response;

        const messages = {
          USER_NOT_FOUND: t('signIn.notFoundEmail'),
          USER_INVALID_CREDENTIALS: t('signIn.credentialsError'),
          USER_OTP_INVALID_CODE: t('signIn.codeError'),
        };

        toast({
          title:
            messages[data?.message as keyof typeof messages] ??
            t('genericRequestError'),
          variant: 'destructive',
        });
      }
    }
  };

  return (
    <>
      <Helmet title="Login" />

      <div className="container flex h-[90vh] w-full max-w-[400px] flex-col items-center justify-center">
        <form
          onSubmit={handleSubmit(onSignIn)}
          className="flex flex-col justify-center gap-6"
        >
          <header className="flex flex-col items-center gap-2">
            <div className="flex h-8 w-8 flex-col items-center justify-center gap-2 rounded-md font-medium">
              <GalleryVerticalEndIcon size={24} />
              <span className="sr-only">Acme Inc.</span>
            </div>
            <h1 className="text-xl font-bold">{t('signIn.welcome')} casino.</h1>
          </header>

          <div className="flex w-full max-w-full flex-col">
            <Input
              id="email"
              label={t('signIn.email')}
              type="email"
              placeholder="m@example.com"
              autoFocus
              required
              error={errors.email?.message}
              {...register('email')}
            />
            <Input
              id="password"
              type="password"
              label={t('signIn.password')}
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
                label={t('signIn.tenant')}
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
                  label={t('signIn.code')}
                  error={errors.code?.message}
                  {...field}
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
              {t('signIn.login')}
            </Button>
          </div>
          <div className="text-balance text-center text-xs text-muted-foreground [&_a]:underline [&_a]:underline-offset-4 hover:[&_a]:text-primary">
            {t('signIn.ByClickingContinueYouAgreeToOur')}{' '}
            <a href="#">{t('signIn.termsOfService')}</a> {t('signIn.and')}{' '}
            <a href="#">{t('signIn.privacyPolicy')}</a>.
          </div>
        </form>
      </div>
    </>
  );
};
