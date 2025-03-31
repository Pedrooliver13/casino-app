// Packages
import { ReactElement, useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useFormContext } from 'react-hook-form';

// Components
import { useTheme } from '@/components/themes/theme-provider';

interface TenantImageProps {
  className?: string;
}

const useImageCheck = (url: string) => {
  const [isValid, setIsValid] = useState(false);

  useEffect(() => {
    if (!url) return;

    const img = new Image();
    img.onload = () => setIsValid(true);
    img.onerror = () => setIsValid(false);
    img.src = url;
  }, [url]);

  return isValid;
};

export const TenantImage = (props: TenantImageProps): ReactElement => {
  const { theme } = useTheme();
  const { watch } = useFormContext();
  const [seachParams] = useSearchParams();

  const currentTheme = theme === 'system' ? 'dark' : theme;
  const tenantValue = seachParams.get('tenant') ?? watch('tenant');
  
  const imageURL = `https://casino-service-tenant-images.s3.us-east-1.amazonaws.com/${tenantValue}/logo/logo-${currentTheme}.png`;

  const isValid = useImageCheck(imageURL);

  return (
    <>
      {isValid && (
        <img
          src={imageURL}
          alt="Logo do casino"
          className={`${props.className} translate-y-4 animate-[fadeIn_0.5s_ease-out_forwards] opacity-0 data-[valid=false]:hidden`}
        />
      )}
    </>
  );
};
