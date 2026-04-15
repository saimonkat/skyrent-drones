import { standardSchemaResolver } from '@hookform/resolvers/standard-schema';
import clsx from 'clsx';
import { useForm } from 'react-hook-form';

import { Button } from '@sdk/components/ui/Button/Button';
import { Input } from '@sdk/components/ui/Input/Input';
import { addressSchema } from '@sdk/schemas/address.schema';

import type { AddressData, AddressFormProps } from '@sdk/types';
import styles from './AddressForm.module.css';

export function AddressForm({
  onSubmit,
  defaultValues,
  submitButton = 'Continue',
  className,
}: AddressFormProps) {
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
    <form
      className={clsx(styles.form, className)}
      onSubmit={handleSubmit(onValid)}
      noValidate
      data-qa="address-form"
    >
      <div className={styles.field}>
        <label className={styles.label} htmlFor="street">
          Street Address
        </label>
        <Input
          autoFocus
          id="street"
          autoComplete="street-address"
          error={!!errors.street}
          placeholder="123 Main Street"
          aria-invalid={!!errors.street}
          aria-describedby={errors.street ? 'street-error' : undefined}
          {...register('street')}
        />
        {errors.street && (
          <p id="street-error" className={styles.error} role="alert">
            {errors.street.message}
          </p>
        )}
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
            aria-describedby={errors.city ? 'city-error' : undefined}
            {...register('city')}
          />
          {errors.city && (
            <p id="city-error" className={styles.error} role="alert">
              {errors.city.message}
            </p>
          )}
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
            aria-describedby={errors.state ? 'state-error' : undefined}
            {...register('state')}
          />
          {errors.state && (
            <p id="state-error" className={styles.error} role="alert">
              {errors.state.message}
            </p>
          )}
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
            aria-describedby={errors.country ? 'country-error' : undefined}
            {...register('country')}
          />
          {errors.country && (
            <p id="country-error" className={styles.error} role="alert">
              {errors.country.message}
            </p>
          )}
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
            aria-describedby={errors.postalCode ? 'postalCode-error' : undefined}
            {...register('postalCode')}
          />
          {errors.postalCode && (
            <p id="postalCode-error" className={styles.error} role="alert">
              {errors.postalCode.message}
            </p>
          )}
        </div>
      </div>

      <Button type="submit" className={styles.submit} data-qa="address-submit-button">
        {submitButton}
      </Button>
    </form>
  );
}
