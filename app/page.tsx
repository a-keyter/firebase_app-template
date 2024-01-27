import WebNav from "./components/WebNav";

export default function Home() {
  return (
    <div className="w-full px-2 flex flex-col items-center">
      <div className="md:w-[800px]">
        <WebNav />
      </div>
      <div className="w-[80%] bg-slate-200 h-96">Hero Section</div>
    </div>
  );
}
