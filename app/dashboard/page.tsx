"use client";

import ProtectedRoute from "@/app/components/ProtectedRoute";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";

const Dashboard = () => {
  const { user, logOut } = useAuth();
  const router = useRouter();

  return (
    <ProtectedRoute>
      <div className="flex flex-col md:flex-row space-x-2">
        <div className="w-full">
          <div className="flex md:min-h-screen items-center py-2 bg-yellow-200">
            <div className="mx-auto mt-24 overflow-y-hidden px-12 py-24 text-gray-600 ">
              <h2 className="mb-4 text-2xl font-semibold">
                You are logged in!
              </h2>

              <div className="mb-8 flex items-center justify-center">
                <button
                  onClick={() => {
                    logOut();
                    router.push("/");
                  }}
                  className="rounded-md bg-green-600 px-10 py-3 text-white shadow-sm hover:bg-green-700"
                >
                  Logout
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
};

export default Dashboard;
