import Image, { StaticImageData } from "next/image";
import TestimonialIcon from "./TestimonialIcon";

interface ITestimonialCardProps {
  review: string;
  name: string;
  position: string;
  image: StaticImageData;
}

function TestimonialCard({
  image,
  name,
  position,
  review,
}: ITestimonialCardProps) {
  return (
    <div className="relative border border-foreground/15 p-6 rounded-lg flex flex-col gap-5">
      <div className="absolute -top-5 -left-5 w-fit p-3 rounded-full bg-background-secondary">
        <TestimonialIcon />
      </div>
      <p className="text-foreground/70 font-medium">{review}</p>
      <div className="flex items-center gap-3">
        <Image
          className="rounded-full object-fit "
          alt="testimonial"
          src={image}
          width={40}
          height={40}
        />
        <div className="flex items-start flex-col">
          <h1 className="font-medium">{name}</h1>
          <p className="text-sm text-foreground/60">{position}</p>
        </div>
      </div>
    </div>
  );
}

export default TestimonialCard;
