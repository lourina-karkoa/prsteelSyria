import React from 'react'

export default function FormField({ label, error, children }: any) {
 
  return (
    <div className="flex flex-col">
      <label className="mb-0.5 lg:mb-1 text-xs lg:text-sm font-bold translate-y-[-4px]">
        {label}
      </label>

      {children}

      {error && (
        <span className="mt-1 text-xs text-red-500">
          {error.message}
        </span>
      )}
    </div>
  );
}
  
