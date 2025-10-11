import type { ButtonHTMLAttributes, DetailedHTMLProps } from 'react';

type BtnProps = DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> & {
  variant?: 'primary' | 'secondary';
};

export default function Button({ variant = 'primary', style, ...props }: BtnProps) {
  const base = {
    padding: '6px 10px',
    borderRadius: '6px',
    border: '1px solid #ccc',
    cursor: 'pointer',
    background: variant === 'primary' ? '#2563eb' : '#f3f4f6',
    color: variant === 'primary' ? '#fff' : '#111',
  } as const;
  return <button {...props} style={{ ...base, ...style }} />;
}