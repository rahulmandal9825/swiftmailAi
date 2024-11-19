import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import LinkAccount from "~/components/LinkAccount";

export default async function Home() {


  return (
 <>
      <LinkAccount/>
       <SignedIn>
        {/* Mount the UserButton component */}
        <UserButton />
      </SignedIn>
      <SignedOut>
        {/* Signed out users get sign in button */}
        <SignInButton />
      </SignedOut>
 </>
  );
}
