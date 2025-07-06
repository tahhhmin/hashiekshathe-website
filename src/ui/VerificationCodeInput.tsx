import React, { useEffect, useRef } from 'react';
import Styles from './VerificationCodeInput.module.css';

interface VerificationCodeInputProps {
  label?: string;
  value: string; // Should be a 6-digit string
  onChange: (value: string) => void;
  helpText?: string;
}

export default function VerificationCodeInput({
  label,
  value = '',
  onChange,
  helpText,
}: VerificationCodeInputProps) {
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]); // ✅ Mutable array of refs

  const focusInput = (index: number) => {
    const input = inputRefs.current[index];
    if (input) {
      input.focus();
      input.select();
    }
  };

  const handleInputChange = (index: number, val: string) => {
    if (!/^\d?$/.test(val)) return;

    const otpArray = value.padEnd(6, ' ').split('');
    otpArray[index] = val;

    const newValue = otpArray.join('').trim();
    onChange(newValue);

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

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pasted = e.clipboardData.getData('Text').trim().slice(0, 6);
    if (!/^\d{1,6}$/.test(pasted)) return;

    const otpArray = Array(6).fill('');
    for (let i = 0; i < pasted.length; i++) {
      otpArray[i] = pasted[i];
    }

    onChange(otpArray.join(''));
    setTimeout(() => focusInput(Math.min(pasted.length, 5)), 0);
  };

  useEffect(() => {
    focusInput(0);
  }, []);

  return (
    <div className={Styles.otpContainer}>
      {label && <label className={Styles.otpLabel}>{label}</label>}

      <div className={Styles.otpInputWrapper}>
        {Array.from({ length: 6 }).map((_, i) => (
          <input
            key={i}
            ref={(el) => {
              inputRefs.current[i] = el;
            }}
            type="text"
            inputMode="numeric"
            autoComplete="one-time-code"
            maxLength={1}
            className={Styles.otpInput}
            value={value[i] || ''}
            onChange={(e) => handleInputChange(i, e.target.value)}
            onKeyDown={(e) => handleKeyDown(e, i)}
            onPaste={handlePaste}
          />
        ))}
      </div>

      {helpText && <p className="muted-text">{helpText}</p>}
    </div>
  );
}
