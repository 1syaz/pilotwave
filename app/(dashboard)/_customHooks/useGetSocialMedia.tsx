import { FaInstagram, FaLinkedin, FaXTwitter } from "react-icons/fa6";
import { SlSocialFacebook } from "react-icons/sl";

interface IUseGetSocialMedia {
  platform: string;
}

export function useGetSocialMedia({ platform }: IUseGetSocialMedia) {
  const icon =
    platform === "x" ? (
      <FaXTwitter size={12} />
    ) : platform === "instagram" ? (
      <FaInstagram size={15} />
    ) : platform === "facebook" ? (
      <SlSocialFacebook size={13} />
    ) : (
      <FaLinkedin size={15} />
    );

  const color =
    platform === "x"
      ? "text-black bg-black/20"
      : platform === "facebook"
      ? "text-facebook bg-facebook-light"
      : platform === "instagram"
      ? "text-instagram bg-instagram-light"
      : "text-linkedin bg-linkedin-light";

  return { icon, color };
}
