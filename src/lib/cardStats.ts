import { BedIcon, CheckIcon, type LucideProps } from "lucide-react";
import type { ForwardRefExoticComponent, RefAttributes } from "react";

type cardStatsType = {
  title: "Total Kamar" | "Kamar Tersedia";
  icon: ForwardRefExoticComponent<
    Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>
  >;
  color: string;
};

export const cardStats: cardStatsType[] = [
  {
    title: "Total Kamar",
    icon: BedIcon,
    color: "bg-blue-200 text-blue-600",
  },
  {
    title: "Kamar Tersedia",
    icon: CheckIcon,
    color: "bg-green-200 text-green-600",
  },
  // {
  //   title: "Total Penyewa",
  //   icon: UserIcon,
  //   color: "bg-orange-200 text-orange-600",
  // },
];
