import { Button } from "./ui/button";

function HeroSection() {
  return (
    <section className="lg:mt-[60px] mt-[53px]  text-foreground bg-background-secondary w-full sm:px-10 px-4 py-20">
      <div className="w-full lg:max-w-[80rem] max-w-[40rem] grid lg:grid-cols-2 grid-cols-1 mx-auto gap-5 ">
        {/* left-section */}
        <section className="flex flex-col gap-8 lg:text-start  sm:text-center text-start   ">
          <div className="flex flex-col gap-5">
            <h1 className="md:text-6xl sm:text-5xl text-4xl font-bold">
              Manage All Your <br />
              <span className="text-primary">Social Media in One Place</span>
            </h1>
            <p className="md:text-xl sm:text-lg text-md text-foreground/80">
              Post, respond, and analyze all your social media platforms from a
              single dashboard. Save time and boost engagement with PostMaster.
            </p>
          </div>
          <div className="w-full flex flex-col gap-3">
            <Button size="lg" className="w-full h-[50px] text-lg">
              Get Started For Free
            </Button>
            <p className="text-foreground/60 text-sm">
              Start with our free plan. No credit card required.
            </p>
          </div>
        </section>
        {/* right-section */}
        <div className="">rigth</div>
      </div>
    </section>
  );
}

export default HeroSection;
