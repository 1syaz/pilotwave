import * as postToFacebook from "@/handlers/postToFacebook";
import { postToInstagram } from "@/handlers/postToInstagram";
import { postToLinkedIn } from "@/handlers/postToLinkedin";
import { postToX } from "@/handlers/postToX";

export const platformStrategies = {
  linkedin: postToLinkedIn,
  instagram: postToInstagram,
  facebook: postToFacebook.postToFacebook,
  x: postToX,
};
