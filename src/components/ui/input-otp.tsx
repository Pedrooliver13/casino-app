import { OTPInput, OTPInputContext } from 'input-otp';
import { Label } from './label';

// Packages
import * as React from 'react';
import { Dot } from 'lucide-react';

// Libs
import { cn } from '@/libs/utils';

type InputOTPProps = React.ComponentPropsWithoutRef<typeof OTPInput> & {
  error?: string;
  label?: string;
};

const InputOTP = React.forwardRef<
  React.ElementRef<typeof OTPInput>,
  InputOTPProps
>(
  (
    { className, containerClassName, error, label, required, ...props },
    ref,
  ) => (
    <div className="min-h-[95px] translate-y-4 animate-[fadeIn_0.5s_ease-out_forwards] opacity-0">
      {label && (
        <Label
          htmlFor={props?.id}
          className={`text-base ${error ? 'text-red-600' : ''}`}
        >
          {label} {required && <span className="text-foreground">*</span>}
        </Label>
      )}
      <OTPInput
        ref={ref}
        containerClassName={cn(
          'flex items-center justify-between gap-2 has-[:disabled]:opacity-50',
          containerClassName,
        )}
        className={cn('disabled:cursor-not-allowed', className)}
        {...props}
      />
      {error && (
        <p className="mt-1 translate-y-4 animate-[fadeIn_0.5s_ease-out_forwards] text-xs text-red-600 opacity-0">
          {error}
        </p>
      )}
    </div>
  ),
);
InputOTP.displayName = 'InputOTP';

const InputOTPGroup = React.forwardRef<
  React.ElementRef<'div'>,
  React.ComponentPropsWithoutRef<'div'>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn('flex items-center', className)} {...props} />
));
InputOTPGroup.displayName = 'InputOTPGroup';

const InputOTPSlot = React.forwardRef<
  React.ElementRef<'div'>,
  React.ComponentPropsWithoutRef<'div'> & { index: number }
>(({ index, className, ...props }, ref) => {
  const inputOTPContext = React.useContext(OTPInputContext);
  const { char, hasFakeCaret, isActive } = inputOTPContext.slots[index];

  return (
    <div
      ref={ref}
      className={cn(
        'relative flex h-10 w-10 items-center justify-center rounded-md border border-y border-r border-input text-sm transition-all',
        isActive && 'z-10 ring-2 ring-ring ring-offset-background',
        className,
      )}
      {...props}
    >
      {char}
      {hasFakeCaret && (
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
          <div className="animate-caret-blink h-4 w-px bg-foreground duration-1000" />
        </div>
      )}
    </div>
  );
});
InputOTPSlot.displayName = 'InputOTPSlot';

const InputOTPSeparator = React.forwardRef<
  React.ElementRef<'div'>,
  React.ComponentPropsWithoutRef<'div'>
>(({ ...props }, ref) => (
  <div ref={ref} role="separator" {...props}>
    <Dot />
  </div>
));
InputOTPSeparator.displayName = 'InputOTPSeparator';

export { InputOTP, InputOTPGroup, InputOTPSlot, InputOTPSeparator };
