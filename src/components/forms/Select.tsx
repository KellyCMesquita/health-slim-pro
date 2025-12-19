/**
 * Select Component
 * Componente de select reutilizável
 */

"use client";

import { SelectHTMLAttributes, forwardRef } from 'react';
import { ChevronDown, AlertCircle } from 'lucide-react';

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  options: Array<{ value: string; label: string }>;
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ label, error, options, className = '', ...props }, ref) => {
    return (
      <div className="w-full">
        {label && (
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {label}
          </label>
        )}
        
        <div className="relative">
          <select
            ref={ref}
            className={`
              w-full px-4 py-3 pr-10 border rounded-lg appearance-none
              focus:ring-2 focus:ring-blue-500 focus:border-transparent
              disabled:bg-gray-50 disabled:text-gray-500
              ${error ? 'border-red-500' : 'border-gray-300'}
              ${className}
            `}
            {...props}
          >
            {options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          
          <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
        </div>

        {error && (
          <div className="mt-2 flex items-center gap-2 text-sm text-red-600">
            <AlertCircle className="w-4 h-4" />
            <span>{error}</span>
          </div>
        )}
      </div>
    );
  }
);

Select.displayName = 'Select';
