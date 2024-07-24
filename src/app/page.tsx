import Image from "next/image";
import { isTokenExpired } from "../../utils/token";
import getCookies from "./api/cookies/route";
import { redirect } from "next/navigation";
import { ThemeProvider } from "../../providers/ThemeProvider";

export default function Home() {
  const token: any = getCookies();
  if (isTokenExpired(token)) {
    redirect("/sign-in");
  }
  return (
    <main>
      <div>
        <h1>Hi Shreya</h1>
        <p>
          Get started by editing&nbsp;
          <code>src/app/page.tsx</code>
        </p>
      </div>
    </main>
  );
}
