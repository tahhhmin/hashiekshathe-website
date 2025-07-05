import React, { useEffect, useRef } from 'react';
import Styles from './VerificationCodeInput.module.css';

interface VerificationCodeInputProps {
  label?: string;
  value: string; // Expected to be 6 characters
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  helpText?: string;
}

export default function VerificationCodeInput({
  label,
  value = '',
  onChange,
  helpText,
}: VerificationCodeInputProps) {
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const focusInput = (index: number) => {
    const input = inputRefs.current[index];
    if (input) {
      input.focus();
      input.select();
    }
  };

  const handleInputChange = (index: number, val: string) => {
    if (!/^[0-9]?$/.test(val)) return;

    const newOtp = value.split('');
    newOtp[index] = val;
    onChange({ target: { value: newOtp.join('') } } as React.ChangeEvent<HTMLInputElement>);

    if (val && index < 5) {
      focusInput(index + 1);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
    if (e.key === 'Backspace') {
      if (!value[index] && index > 0) {
        focusInput(index - 1);
      }
    } else if (e.key === 'ArrowLeft' && index > 0) {
      focusInput(index - 1);
    } else if (e.key === 'ArrowRight' && index < 5) {
      focusInput(index + 1);
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLDivElement>) => {
    const pasted = e.clipboardData.getData('Text').trim().slice(0, 6);
    if (!/^\d+$/.test(pasted)) return;

    const newOtp = Array(6).fill('');
    for (let i = 0; i < 6; i++) {
      newOtp[i] = pasted[i] || '';
    }

    onChange({ target: { value: newOtp.join('') } } as React.ChangeEvent<HTMLInputElement>);

    const focusIndex = Math.min(pasted.length, 5);
    focusInput(focusIndex);
  };

  useEffect(() => {
    focusInput(0);
  }, []);

  return (
    <div className={Styles.otpContainer}>
      {label && <label className={Styles.otpLabel}>{label}</label>}

      <div className={Styles.otpInputWrapper} onPaste={handlePaste}>
        {Array.from({ length: 6 }).map((_, i) => (
          <input
            key={i}
            ref={(el) => (inputRefs.current[i] = el)}
            type="text"
            inputMode="numeric"
            autoComplete="one-time-code"
            maxLength={1}
            className={`${Styles.otpInput}`}
            value={value[i] || ''}
            onChange={(e) => handleInputChange(i, e.target.value)}
            onKeyDown={(e) => handleKeyDown(e, i)}
          />
        ))}
      </div>

      {helpText && <p className='muted-text'>{helpText}</p>}
    </div>
  );
}
