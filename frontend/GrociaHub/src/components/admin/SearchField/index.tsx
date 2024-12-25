// components/SearchField.tsx
import React, { FC } from 'react';
import { BiSearch } from 'react-icons/bi';

interface SearchFieldProps {
  placeholder?: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
}

const SearchField: FC<SearchFieldProps> = ({ placeholder = "Search...", value, onChange, className }) => {
  return (
    <div className={`position-relative ${className}`}>
      <BiSearch className="position-absolute m-3 end-0 opacity-25" size={20} />
      <input
        type="text"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="outline-none fs-7 w-100 p-custom border rounded input-focus"
      />
    </div>
  );
};

export default SearchField;
