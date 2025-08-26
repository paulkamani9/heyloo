import { LucideProps } from "lucide-react";
import { createElement, ForwardRefExoticComponent, RefAttributes } from "react";

interface HeroItemProps {
  icon: ForwardRefExoticComponent<
    Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>
  >;
  message: string;
}

export const HeroItem = ({ icon, message }: HeroItemProps) => {
  return (
    <div className="p-4 text-white bg-white/5 rounded-lg flex items-center gap-3">
      {createElement(icon, {
        className: "text-pink-200",
      })}
      <span>{message}</span>
    </div>
  );
};
