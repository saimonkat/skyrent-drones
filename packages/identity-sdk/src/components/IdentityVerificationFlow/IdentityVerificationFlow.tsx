import clsx from 'clsx';

import ArrowLeftIcon from '@sdk/assets/arrow-left.svg?react';
import { AddressForm } from '@sdk/components/AddressForm/AddressForm';
import { PhoneInput } from '@sdk/components/PhoneInput/PhoneInput';
import { SelfieCapture } from '@sdk/components/SelfieCapture/SelfieCapture';
import { IdentityVerificationProvider } from '@sdk/context/IdentityVerificationProvider';
import { useIdentityVerification } from '@sdk/context/useIdentityVerification';
import { getIdentityData } from '@sdk/core/getIdentityData';
import type {
  AddressFormResult,
  IdentityVerificationFlowProps,
  PhoneInputResult,
  SelfieCaptureResult,
} from '@sdk/types';

import styles from './IdentityVerificationFlow.module.css';
import { StepIndicator } from './components/StepIndicator/StepIndicator';
import { STEP_LABELS, STEP_TITLES } from './constants';

export function IdentityVerificationFlow(props: IdentityVerificationFlowProps) {
  return (
    <IdentityVerificationProvider>
      <FlowContent {...props} />
    </IdentityVerificationProvider>
  );
}

function FlowContent({ onComplete, onFail, className }: IdentityVerificationFlowProps) {
  const ctx = useIdentityVerification();

  const handleSelfieCapture = (result: SelfieCaptureResult) => {
    ctx.setSelfie(result);
    ctx.nextStep();
  };

  const handlePhoneSubmit = (result: PhoneInputResult) => {
    ctx.setPhone(result);
    ctx.nextStep();
  };

  const handleAddressSubmit = (result: AddressFormResult) => {
    if (!ctx.selfie || !ctx.phone) {
      return;
    }

    ctx.setAddress(result);

    const verificationResult = getIdentityData({
      selfieUrl: ctx.selfie.selfieUrl,
      phone: ctx.phone.phone,
      address: result.address,
    });

    if (verificationResult.status === 'verified') {
      onComplete?.(verificationResult);
    } else {
      onFail?.(verificationResult);
    }
  };

  const renderStep = () => {
    switch (ctx.currentStep) {
      case 0:
        return <SelfieCapture onCapture={handleSelfieCapture} />;
      case 1:
        return <PhoneInput onSubmit={handlePhoneSubmit} defaultPhone={ctx.phone?.phone} />;
      case 2:
        return (
          <AddressForm
            onSubmit={handleAddressSubmit}
            defaultValues={ctx.address?.address}
            submitButton="Verify"
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className={clsx(styles.container, className)}>
      <div className={styles.header}>
        {ctx.currentStep > 1 && (
          <button
            type="button"
            className={styles.backButton}
            onClick={ctx.prevStep}
            aria-label="Go back"
          >
            <ArrowLeftIcon aria-hidden="true" />
          </button>
        )}
        <h2 className={styles.title}>{STEP_TITLES[ctx.currentStep]}</h2>
      </div>
      <StepIndicator currentStep={ctx.currentStep} labels={STEP_LABELS} />
      <div className={styles.stepContent}>{renderStep()}</div>
    </div>
  );
}
