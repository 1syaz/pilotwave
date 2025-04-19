"use client";

import { useEffect, useState } from "react";
import PageWrapper from "../_components/PageWrapper";

function Page() {
  const [isConnectedAlready, setIsConnectedAlready] = useState<boolean>(false);

  useEffect(() => {
    const checkLinkedInToken = async () => {
      const response = await fetch("/api/auth/linkedin/token-check");
      const data = await response.json();

      if (data.loggedIn) {
        setIsConnectedAlready(true);
      } else {
        setIsConnectedAlready(false);
      }
    };

    checkLinkedInToken();
  }, []);

  const handleLinkedinConnect = async () => {
    const redirectUri = process.env.REDIRECT_URI;
    const clientId = process.env.LINKEDIN_CLIENT_ID;
    const scope = "w_member_social openid profile email";

    const authUrl = `https://www.linkedin.com/oauth/v2/authorization?response_type=code&client_id=${clientId}&redirect_uri=${encodeURIComponent(
      redirectUri!
    )}&scope=${encodeURIComponent(scope)}`;

    window.location.href = authUrl;
  };

  return (
    <PageWrapper>
      <h1>Profile</h1>
      {isConnectedAlready ? (
        <p>Already connected</p>
      ) : (
        <button className="bg-red-400" onClick={handleLinkedinConnect}>
          Linkedin
        </button>
      )}
    </PageWrapper>
  );
}

export default Page;
