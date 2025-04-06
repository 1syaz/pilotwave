import { BsRobot } from "react-icons/bs";

interface ILogoProps {
  textColor?: string;
  iconColor?: string;
}

function Logo({ iconColor = "#ffffff", textColor = "#ffffff" }: ILogoProps) {
  return (
    <div className="flex items-center  gap-2">
      <BsRobot size={25} color={iconColor} />
      <h1 className="text-xl font-bold" style={{ color: textColor }}>
        PilotWave
      </h1>
    </div>
  );
}

export default Logo;
