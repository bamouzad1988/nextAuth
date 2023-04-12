import UserProfile from "../components/profile/user-profile";
import { getSession } from "next-auth/react";

function ProfilePage(props) {
  return <UserProfile />;
}

export async function getServerSideProps(ctx) {
  const session = await getSession({ req: ctx.req });

  if (!session) {
    return {
      redirect: {
        destination: "/auth",
        permanent: false,
      },
    };
  }

  return {
    props: {
      session,
    },
  };
}

export default ProfilePage;
