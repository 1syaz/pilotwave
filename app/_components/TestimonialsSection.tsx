import SectionHeader from "./SectionHeader";
import image1 from "@/public/testimonials/image1.jpeg";
import image2 from "@/public/testimonials/image2.jpeg";
import image3 from "@/public/testimonials/image3.jpeg";
import TestimonialCard from "./TestimonialCard";

function TestimonialsSection() {
  const testimonials = [
    {
      review:
        "PostMaster has completely transformed our social media strategy. We've saved 15 hours a week and increased engagement by 40% in just two months.",
      name: "Sarah Johnson",
      position: "Marketing Director, Vertex Design",
      image: image1,
    },
    {
      review:
        "Being able to respond to all comments from one dashboard has improved our customer response time dramatically. Our followers notice and appreciate it!",
      name: "Michael Chen",
      position: "Social Media Manager, GreenLeaf Foods",
      image: image3,
    },
    {
      review:
        "As a small business owner managing everything myself, PostMaster has been a game-changer. It's like having a social media team at a fraction of the cost.",
      name: "Olivia Martinez",
      position: "MFounder & CEO, Bloom Boutique",
      image: image2,
    },
  ];

  return (
    <section
      id="testimonials"
      className="scroll-mt-15  text-foreground flex flex-col gap-12  bg-white w-full sm:px-10 px-4 py-16 "
    >
      <SectionHeader
        description="Hear from the professionals who have transformed their social media workflow with PostMaster."
        title="Testimonials"
        heading="Loved by Social Media Managers"
      />
      <div className=" w-full lg:max-w-[80rem] mx-auto grid lg:grid-cols-3 grid-cols-1 gap-10 px-4">
        {testimonials.map((testimonial, index) => (
          <TestimonialCard key={index} {...testimonial} />
        ))}
      </div>
    </section>
  );
}

export default TestimonialsSection;
