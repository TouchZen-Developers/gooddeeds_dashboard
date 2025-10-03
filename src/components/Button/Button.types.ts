export type ButtonSize = 'sm' | 'md' | 'lg';
export type ButtonVariant = 'filled' | 'outlined' | 'ghost';
export type ButtonState = 'default' | 'hover' | 'disabled' | 'loading';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  iconLeft?: React.ReactNode;
  iconRight?: React.ReactNode;
  disabled?: boolean;
  loading?: boolean;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  className?: string;
  style?: React.CSSProperties;
}