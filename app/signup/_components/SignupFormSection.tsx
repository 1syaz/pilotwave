import GoogleLoginButton from "@/app/_components/GoogleLoginButton";
import SignupForm from "./SignupForm";
import Link from "next/link";

function SignupFormSection() {
  return (
    <section className="p-5 flex flex-col items-center justify-center gap-10 md:py-10 py-20">
      <div className="text-center flex flex-col gap-3">
        <h1 className="text-3xl font-bold">Create Account</h1>
        <p className="font-light">Sign up to get started with PilotWave</p>
      </div>
      <div className="shadow-lg shadow-gray-300/50 w-full max-w-[400px] md:p-8 p-4 flex flex-col gap-4 rounded-lg">
        <SignupForm />
        <div className="flex items-center gap-3">
          <div className="h-[1px] flex-1 bg-foreground/15"></div>
          <span className="text-xs text-foreground/80">Or continue with</span>
          <div className="h-[1px] flex-1 bg-foreground/15"></div>
        </div>
        <GoogleLoginButton />
        <div className="text-xs font-light flex items-center justify-center gap-2 ">
          <h3>Already have an account?</h3>
          <Link href="/login" className="hover:underline text-primary">
            Sign in
          </Link>
        </div>
      </div>
    </section>
  );
}

export default SignupFormSection;
