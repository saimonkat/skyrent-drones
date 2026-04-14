import * as Select from '@radix-ui/react-select';
import { memo, useMemo } from 'react';

import ChevronDownIcon from '@sdk/icons/chevron-down.svg?react';

import styles from './CountryCodeSelect.module.css';
import type { CountryCodeSelectProps } from './types';

export const CountryCodeSelect = memo(function CountryCodeSelect({
  value,
  onChange,
  countries,
}: CountryCodeSelectProps) {
  const selected = useMemo(
    () => countries.find((country) => country.code === value),
    [countries, value],
  );

  return (
    <Select.Root value={value} onValueChange={onChange}>
      <Select.Trigger className={styles.trigger} aria-label="Country code">
        <span className={styles.flag}>{selected?.flag}</span>
        <span className={styles.dialCode}>{selected?.dialCode}</span>
        <Select.Icon className={styles.icon}>
          <ChevronDownIcon aria-hidden="true" />
        </Select.Icon>
      </Select.Trigger>

      <Select.Portal>
        <Select.Content className={styles.content} position="popper" sideOffset={4}>
          <Select.Viewport className={styles.viewport}>
            {countries.map((country) => (
              <Select.Item key={country.code} value={country.code} className={styles.item}>
                <span className={styles.itemFlag}>{country.flag}</span>
                <Select.ItemText>
                  <span className={styles.itemName}>{country.name}</span>
                </Select.ItemText>
                <span className={styles.itemDialCode}>{country.dialCode}</span>
              </Select.Item>
            ))}
          </Select.Viewport>
        </Select.Content>
      </Select.Portal>
    </Select.Root>
  );
});
