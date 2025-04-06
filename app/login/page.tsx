import { MdScheduleSend } from "react-icons/md";
import AuthSideInfo from "../_components/AuthSideInfo";
import { GrDocumentPerformance } from "react-icons/gr";
import LoginFormSection from "./_component/LoginFormSection";

function page() {
  const authFeaturesLogin = [
    {
      title: "Schedule & Automate",
      description: "Plan your content calendar and automate posts",
      icon: MdScheduleSend,
    },
    {
      title: "Analyze Performance",
      description: "Track engagement and optimize your strategy",
      icon: GrDocumentPerformance,
    },
  ];

  return (
    <div className="grid md:grid-cols-2 grid-cols-1  h-screen ">
      <AuthSideInfo
        features={authFeaturesLogin}
        heading={"Manage All Your Social Media in One Place"}
        description={
          "Login to your account to access your dashboard and continue managing your social media platforms all in one place."
        }
      />
      <LoginFormSection />
    </div>
  );
}

export default page;
