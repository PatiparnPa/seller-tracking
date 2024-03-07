import { AppBar } from "./AppBar";
import liff from '@line/liff';
import { useEffect, useState } from "react";

type Profile = {
  userId: string;
  displayName: string;
  pictureUrl: string | undefined;
};

export const TestLogin = () => {
  const [userProfile, setUserProfile] = useState<Profile | null>(null);
  const [idToken, setIdToken] = useState<string | null>(null);

  const logout = () => {
  liff.logout();
   window.location.reload();
  };

  useEffect(() => {
    // Initialize LIFF after the component is mounted
    liff.init({ liffId: '2000210581-wLmA5Enp' })
      .then(() => {
        console.log("LIFF is initialized.");
        const IdToken = liff.getIDToken();
        setIdToken(IdToken);
        // Fetch user profile after LIFF is initialized
        liff.getProfile()
          .then((profile) => {
            console.log("User Profile:", profile);
            setUserProfile({
              userId: profile.userId,
              displayName: profile.displayName,
              pictureUrl: profile.pictureUrl || '',
            });
          })
          .catch((error) => {
            console.error('Error fetching user profile:', error);
          });
      })
      .catch((error) => {
        console.error('LIFF initialization failed', error);
      });
  }, []);

  const handleLoginClick = async () => {
    try {
      // Log in using LIFF
      await liff.login();
    } catch (error) {
      console.error('Error logging in:', error);
    }
  };

  return (
    <>
      <AppBar />
      <div className="store-setting-container">
        <h1>Test Line Login</h1>
        {userProfile ? (
          <div className="user-profile">
            {userProfile.pictureUrl && (
              <img src={userProfile.pictureUrl} alt="User Profile" />
            )}
            <p>User ID: {userProfile.userId}</p>
            <p>Display Name: {userProfile.displayName}</p>
            <p>Id Token: {idToken}</p>
            <button onClick={() => logout()}>Log out</button>
            <button onClick={handleLoginClick}>Login with LINE</button>
          </div>
        ) : (
          <button onClick={handleLoginClick}>Login with LINE</button>
        )}
      </div>
    </>
  );
};

