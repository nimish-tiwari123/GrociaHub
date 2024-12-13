import React from 'react';

type ButtonProps = {
  leftIcon?: React.ReactNode;
  btnLabel: string;
  btnStyle?: string;
};

const Button: React.FC<ButtonProps> = ({ leftIcon, btnLabel, btnStyle }) => {
  return (
    <div>
      <button className={`d-flex align-items-center gap-2 ${btnStyle || ''}`}>
        {leftIcon}
        {btnLabel}
      </button>
    </div>
  );
};

export default Button;