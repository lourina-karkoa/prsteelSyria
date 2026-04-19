import React, { ReactNode } from 'react'
interface Props {
  badge?: string;
  title: string;
  description?: string;
  icon?: ReactNode;
}
export default function TitleCommon({badge, title, description, icon }: Props) {
    
  return (
    <div className="w-full flex flex-col items-center md:items-start">
      {badge && (
        <div className="mb-6 inline-flex md:text-sm text-xs items-center gap-2
         rounded-full border bg-background/80 px-4 py-2  font-bold shadow-sm backdrop-blur">
          {icon}
          {badge}
        </div>
      )}

      <h1 className=" text-2xl md:text-4xl lg:text-6xl font-black leading-[1.05] tracking-tight">
        {title}
      </h1>

      {description && (
        <p className="mt-2 md:mt-4 text-sm md:text-base lg:text-lg text-center md:text-start lg:leading-8 text-foreground/75">
          {description}
        </p>
      )}
    </div>
  );
}
    