import AppNav from "@/app/components/ui/AppNav";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col md:flex-row h-screen">
      <div className="w-full md:w-80">
        <AppNav />
      </div>
        <div className="flex-grow">{children}</div>
    </div>
  );
}
