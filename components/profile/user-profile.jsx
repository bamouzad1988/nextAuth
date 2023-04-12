import ProfileForm from "./profile-form";
import { useSession } from "next-auth/react";
import classes from "./user-profile.module.css";

function UserProfile() {
  const { data: session, status: loading } = useSession();

  const changePasswordHandler = async (passwordData) => {
    const response = await fetch("/api/user/change-password", {
      method: "PATCH",
      body: JSON.stringify(passwordData),
      headers: { "Content-Type": "application/json" },
    });
    const data = await response.json();
    console.log(data);
    // error handling1
  };

  if (loading !== "loading" && !session) {
    window.location.href = "/auth";
  }

  if (loading === "loading") {
    return <p className={classes.profile}>Loading...</p>;
  }

  if (loading === "authenticated" && session) {
    return (
      <section className={classes.profile}>
        <h1>Your User Profile</h1>
        <ProfileForm onChangePassword={changePasswordHandler} />
      </section>
    );
  }
}

export default UserProfile;
