export interface AddressData {
  street: string;
  city: string;
  state: string;
  country: string;
  postalCode: string;
}

export interface AddressFormResult {
  address: AddressData;
}

export interface AddressFormProps {
  onSubmit?: (result: AddressFormResult) => void;
  defaultValues?: Partial<AddressData>;
  className?: string;
}
