import { standardSchemaResolver } from '@hookform/resolvers/standard-schema';
import clsx from 'clsx';
import { useForm } from 'react-hook-form';

import { Button } from '@sdk/components/ui/Button/Button';
import { Input } from '@sdk/components/ui/Input/Input';
import { addressSchema } from '@sdk/schemas/address.schema';

import styles from './AddressForm.module.css';
import type { AddressData, AddressFormProps } from './types';

export function AddressForm({ onSubmit, defaultValues, className }: AddressFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AddressData>({
    resolver: standardSchemaResolver(addressSchema),
    mode: 'onSubmit',
    defaultValues: {
      street: '',
      city: '',
      state: '',
      country: '',
      postalCode: '',
      ...defaultValues,
    },
  });

  const onValid = (data: AddressData) => {
    onSubmit?.({ address: data });
  };

  return (
    <form className={clsx(styles.form, className)} onSubmit={handleSubmit(onValid)} noValidate>
      <div className={styles.field}>
        <label className={styles.label} htmlFor="street">
          Street Address
        </label>
        <Input
          id="street"
          autoComplete="street-address"
          error={!!errors.street}
          placeholder="123 Main Street"
          aria-invalid={!!errors.street}
          {...register('street')}
        />
        {errors.street && <p className={styles.error}>{errors.street.message}</p>}
      </div>

      <div className={styles.row}>
        <div className={styles.field}>
          <label className={styles.label} htmlFor="city">
            City
          </label>
          <Input
            id="city"
            autoComplete="address-level2"
            error={!!errors.city}
            placeholder="San Francisco"
            aria-invalid={!!errors.city}
            {...register('city')}
          />
          {errors.city && <p className={styles.error}>{errors.city.message}</p>}
        </div>

        <div className={styles.field}>
          <label className={styles.label} htmlFor="state">
            State / Province
          </label>
          <Input
            id="state"
            autoComplete="address-level1"
            error={!!errors.state}
            placeholder="California"
            aria-invalid={!!errors.state}
            {...register('state')}
          />
          {errors.state && <p className={styles.error}>{errors.state.message}</p>}
        </div>
      </div>

      <div className={styles.row}>
        <div className={styles.field}>
          <label className={styles.label} htmlFor="country">
            Country
          </label>
          <Input
            id="country"
            autoComplete="country-name"
            error={!!errors.country}
            placeholder="United States"
            aria-invalid={!!errors.country}
            {...register('country')}
          />
          {errors.country && <p className={styles.error}>{errors.country.message}</p>}
        </div>

        <div className={styles.field}>
          <label className={styles.label} htmlFor="postalCode">
            Postal Code
          </label>
          <Input
            id="postalCode"
            autoComplete="postal-code"
            error={!!errors.postalCode}
            placeholder="94102"
            aria-invalid={!!errors.postalCode}
            {...register('postalCode')}
          />
          {errors.postalCode && <p className={styles.error}>{errors.postalCode.message}</p>}
        </div>
      </div>

      <Button type="submit" className={styles.submit}>
        Continue
      </Button>
    </form>
  );
}
