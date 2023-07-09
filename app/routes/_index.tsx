import { V2_MetaFunction } from "@remix-run/node";
import { Link } from "@remix-run/react";

export const meta: V2_MetaFunction = () => {
  return [
    { title: "Crypto App" },
    { name: "description", content: "Welcome to Crypto App" },
  ];
};

export default function Index() {

  return (
    <div className="h-screen bg-slate-700 flex justify-center items-center">
      <button className="btn btn-primary text-2xl text-white">
        <Link to="/coins">Display Coins data</Link>
      </button>
    </div>
  );
}
