import React from 'react';
import './Button.css';
import { ButtonProps } from './Button.types';

const Button: React.FC<ButtonProps> = ({
    children,
    variant = 'filled',
    size = 'md',
    iconLeft,
    iconRight,
    disabled = false,
    loading = false,
    onClick,
    className = '',
    ...props
}) => {
    const handleClick = (e) => {
        if (disabled || loading) return;
        onClick?.(e);
    };

    const buttonClass = `
    btn
    btn--${variant}
    btn--${size}
    ${disabled ? 'btn--disabled' : ''}
    ${loading ? 'btn--loading' : ''}
    ${className}
  `.trim();

    return (
        <button
            className={buttonClass}
            onClick={handleClick}
            disabled={disabled}
            {...props}
        >
            {loading && <span className="btn__spinner">●●●</span>}
            {!loading && iconLeft && <span className="btn__icon btn__icon--left">{iconLeft}</span>}
            <span className="btn__content">{children}</span>
            {!loading && iconRight && <span className="btn__icon btn__icon--right">{iconRight}</span>}
        </button>
    );
};

export default Button;