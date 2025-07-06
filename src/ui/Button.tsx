import React from 'react';
import Styles from './Button.module.css';
import { CircleArrowRight } from 'lucide-react';

type ButtonVariant =
  | 'primary'
  | 'secondary'
  | 'outlined'
  | 'icon'
  | 'action'
  | 'danger'
  | 'submit'; // ✅ Style only

interface ButtonProps {
  variant?: ButtonVariant;
  label?: string;
  showIcon?: boolean;
  icon?: React.ElementType;
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset'; // Controls form behavior
  onClick?: () => void;
}

export default function Button({
  variant = 'primary',
  label,
  showIcon,
  icon: Icon,
  type = 'button', // ✅ Default is now 'button', so no accidental submits
  disabled,
  onClick,
}: ButtonProps) {
  const IconToRender = Icon || CircleArrowRight;
  const buttonClassName = `${Styles.button} ${Styles[variant] || ''}`;

  return (
    <button
      className={buttonClassName}
      onClick={onClick}
      disabled={disabled}
      type={type}
      aria-label={!label && showIcon ? 'button icon' : undefined}
    >
      {label && <span>{label}</span>}
      {showIcon && <IconToRender className={Styles.buttonIcon} size={24} />}
    </button>
  );
}
