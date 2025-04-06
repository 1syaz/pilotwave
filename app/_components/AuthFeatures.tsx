import React from "react";

interface IAuthFeaturesProps {
  title: string;
  description: string;
  icon: React.ElementType;
}

function AuthFeatures({ description, title, icon: Icon }: IAuthFeaturesProps) {
  return (
    <div className="text-white flex items-center gap-4">
      <div className="  h-10 w-10 flex items-center justify-center rounded-full bg-secondary">
        <Icon color="#ffffff" size={17} />
      </div>
      <div>
        <h2 className="font-semibold ">{title}</h2>
        <p className="text-sm font-light">{description}</p>
      </div>
    </div>
  );
}

export default AuthFeatures;
