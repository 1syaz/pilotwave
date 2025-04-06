import React from "react";
import { IoArrowUpOutline } from "react-icons/io5";

interface IDashboardStatCardProps {
  heading: string;
  value: string;
  rate: string;
}

function DashboardStatCard({ heading, rate, value }: IDashboardStatCardProps) {
  return (
    <div className=" rounded-xl bg-white  shadow-sm border border-foreground/2 shadow-gray-400/30 p-4 flex flex-col gap-2">
      <h3 className="text-foreground/60 text-sm">{heading}</h3>
      <div className="flex md:flex-row flex-col  md:items-end items-start justify-between gap-1">
        <h1 className="md:text-2xl text-lg font-bold">{value}</h1>
        <span className="flex items-center gap-1 text-green md:text-sm text-xs">
          <IoArrowUpOutline />
          {rate}
        </span>
      </div>
    </div>
  );
}

export default DashboardStatCard;
