import getCurrentUser from "@app/actions/getCurrentUser";
import SingOut from "@app/components/button/singOut";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import QrCode from "./components/QrCode";
export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);

  if (!session) return redirect("/");
  
  const User = await getCurrentUser();
  return (
    <main className="w-full h-full flex flex-row">
      <div className="max-w-2xl w-[350px] h-full bg-zinc-800 p-5 flex flex-col items-center text-white shadow-xl justify-between">
        <div>
          <div>
            <QrCode />  
          </div>
          <h1>Informações:</h1>
          <h1>Name: {User?.name}</h1>
          <h1>Email: {User?.email}</h1>
        </div>
        <SingOut />
      </div>
      {children}
    </main>
  );
}
