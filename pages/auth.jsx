import AuthForm from "../components/auth/auth-form";
import { getSession } from "next-auth/react";

function AuthPage() {
  return <AuthForm />;
}
export async function getServerSideProps(ctx) {
  const session = await getSession({ req: ctx.req });

  if (session) {
    return {
      redirect: {
        destination: "/profile",
        permanent: false,
      },
    };
  } else {
    return {
      props: {
        session: null,
      },
    };
  }
}
export default AuthPage;
