import React from 'react'
import Styles from './Button.module.css'
import { CircleArrowRight } from 'lucide-react';

type ButtonVariant = 'primary' | 'secondary' | 'outlined' | 'icon' | 'action' | 'danger';

interface ButtonProps {
    variant?: ButtonVariant;
    label?: string;          
    showIcon?: boolean;
    icon?: React.ElementType;
    disabled?: boolean;
    type?: 'button' | 'submit' | 'reset';
    onClick?: () => void;
}

export default function Button({
    variant = 'primary',
    label,
    showIcon,
    icon: Icon,
    type,
    disabled,
    onClick
}: ButtonProps) {

    const IconToRender = Icon || CircleArrowRight;
    const buttonClassName = `${Styles.button} ${Styles[variant] || ''}`;

    return (
        <button
        className={buttonClassName}
        onClick={onClick}
        disabled={disabled}
        type={type || 'button'}
        aria-label={!label && showIcon ? 'button icon' : undefined}>
        {label && <span>{label}</span>}
        {showIcon && <IconToRender className={Styles.buttonIcon} size={24} />}
        </button>
    )
}
