import React, { forwardRef } from 'react';
import DatePicker from 'react-datepicker';
import { ptBR } from 'date-fns/locale';
import { Calendar } from 'lucide-react';
import 'react-datepicker/dist/react-datepicker.css';
import './datepicker.css';

const CustomDatePicker = ({ label, value, onChange, placeholder, required, disabled, className }) => {
  const CustomInput = forwardRef(({ value, onClick }, ref) => (
    <div className="relative">
      {/* Ícone movido para o lado esquerdo */}
      <Calendar 
        className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 cursor-pointer" 
        size={18} 
        onClick={onClick}
      />
      <input
        className={`w-full pl-10 pr-3 py-3 rounded-md bg-gray-900 border border-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cuencos-purple ${className}`}
        onClick={onClick}
        ref={ref}
        value={value}
        readOnly
        placeholder={placeholder || "Selecione uma data"}
      />
    </div>
  ));

  return (
    <div className="space-y-1">
      {label && (
        <label className="block text-sm font-medium text-gray-200">
          {label} {required && <span className="text-red-500">*</span>}
        </label>
      )}
      <DatePicker
        selected={value ? new Date(value) : null}
        onChange={onChange}
        customInput={<CustomInput />}
        locale={ptBR}
        dateFormat="dd/MM/yyyy"
        disabled={disabled}
        showYearDropdown
        yearDropdownItemNumber={10}
        scrollableYearDropdown
        popperClassName="custom-popper"
        calendarClassName="custom-calendar"
      />
    </div>
  );
};

export default CustomDatePicker;
