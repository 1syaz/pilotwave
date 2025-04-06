import Logo from "@/app/_components/Logo";
import React from "react";
import AuthFeatures from "./AuthFeatures";
import { IconType } from "react-icons";

interface AuthSideInfoProps {
  features: {
    title: string;
    description: string;
    icon: IconType;
  }[];
  heading: string;
  description: string;
}

function AuthSideInfo({ features, description, heading }: AuthSideInfoProps) {
  return (
    <section className="bg-primary flex flex-col items-center justify-center h-full w-full p-5 md:py-10 py-20">
      <div className="flex flex-col gap-10 items-start ">
        <Logo />
        <div className="w-full md:max-w-[500px] max-w-[400px] flex flex-col gap-3">
          <h1 className="xl:text-5xl text-4xl font-extrabold text-white">
            {heading}
          </h1>
          <p className="text-white font-light xl:text-lg text-md">
            {description}
          </p>
        </div>
        <div className="flex flex-col gap-5">
          {features.map((feature, index) => (
            <AuthFeatures key={index} {...feature} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default AuthSideInfo;
