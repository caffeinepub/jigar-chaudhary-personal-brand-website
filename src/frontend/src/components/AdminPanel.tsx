import { useQueryClient } from "@tanstack/react-query";
import {
  BookOpen,
  Eye,
  EyeOff,
  Loader2,
  Lock,
  LogIn,
  LogOut,
  RefreshCw,
  Trash2,
  Users,
} from "lucide-react";
import type React from "react";
import { useEffect, useState } from "react";
import { useActor } from "../hooks/useActor";
import { useInternetIdentity } from "../hooks/useInternetIdentity";
import {
  useDeleteRegistration,
  useDeleteSubmission,
  useGetAllRegistrations,
  useGetAllSubmissions,
} from "../hooks/useQueries";

const ADMIN_PASSWORD = "Jigar@2025";

function LoginStep({ onLoggedIn }: { onLoggedIn: () => void }) {
  const { login, loginStatus, identity } = useInternetIdentity();
  const isLoggingIn = loginStatus === "logging-in";

  useEffect(() => {
    if (identity) {
      onLoggedIn();
    }
  }, [identity, onLoggedIn]);

  return (
    <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center p-4">
      <div className="bg-[#111] border border-[#222] rounded-2xl p-8 w-full max-w-md">
        <div className="flex flex-col items-center mb-8">
          <div className="w-16 h-16 rounded-full bg-orange-500/10 flex items-center justify-center mb-4">
            <LogIn className="w-8 h-8 text-orange-500" />
          </div>
          <h1 className="text-2xl font-bold text-white">Admin Login</h1>
          <p className="text-gray-400 text-sm mt-1 text-center">
            Sign in with your identity to access the admin panel
          </p>
        </div>
        <button
          type="button"
          onClick={() => login()}
          disabled={isLoggingIn}
          className="w-full bg-orange-500 hover:bg-orange-600 disabled:opacity-50 text-white font-semibold py-3 rounded-xl transition-colors flex items-center justify-center gap-2"
        >
          {isLoggingIn ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              Signing in...
            </>
          ) : (
            <>
              <LogIn className="w-5 h-5" />
              Sign In
            </>
          )}
        </button>
      </div>
    </div>
  );
}

function PasswordGate({ onAuthenticated }: { onAuthenticated: () => void }) {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isChecking, setIsChecking] = useState(false);

  const handleSubmit = () => {
    if (!password) return;
    setIsChecking(true);
    setError("");
    setTimeout(() => {
      if (password === ADMIN_PASSWORD) {
        onAuthenticated();
      } else {
        setError("Incorrect password. Please try again.");
        setIsChecking(false);
      }
    }, 400);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") handleSubmit();
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center p-4">
      <div className="bg-[#111] border border-[#222] rounded-2xl p-8 w-full max-w-md">
        <div className="flex flex-col items-center mb-8">
          <div className="w-16 h-16 rounded-full bg-orange-500/10 flex items-center justify-center mb-4">
            <Lock className="w-8 h-8 text-orange-500" />
          </div>
          <h1 className="text-2xl font-bold text-white">Admin Access</h1>
          <p className="text-gray-400 text-sm mt-1">
            Enter password to continue
          </p>
        </div>
        <div className="space-y-4">
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Enter admin password"
              className="w-full bg-[#1a1a1a] border border-[#333] rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-orange-500 pr-12"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
            >
              {showPassword ? (
                <EyeOff className="w-5 h-5" />
              ) : (
                <Eye className="w-5 h-5" />
              )}
            </button>
          </div>
          {error && <p className="text-red-400 text-sm">{error}</p>}
          <button
            type="button"
            onClick={handleSubmit}
            disabled={isChecking || !password}
            className="w-full bg-orange-500 hover:bg-orange-600 disabled:opacity-50 text-white font-semibold py-3 rounded-xl transition-colors"
          >
            {isChecking ? "Verifying..." : "Access Admin Panel"}
          </button>
        </div>
      </div>
    </div>
  );
}

function BookingsTab({ isAuthenticated }: { isAuthenticated: boolean }) {
  const {
    data: submissions,
    isLoading,
    error,
    refetch,
  } = useGetAllSubmissions({ enabled: isAuthenticated });
  const deleteSubmission = useDeleteSubmission();

  const handleDelete = async (id: bigint) => {
    if (confirm("Are you sure you want to delete this submission?")) {
      await deleteSubmission.mutateAsync(id);
    }
  };

  if (error) {
    return (
      <div className="text-center py-12">
        <p className="text-red-400 mb-2">Failed to load bookings.</p>
        <p className="text-gray-500 text-sm mb-4">
          An error occurred while fetching data. Please try again.
        </p>
        <button
          type="button"
          onClick={() => refetch()}
          className="text-orange-500 hover:text-orange-400 text-sm underline"
        >
          Try again
        </button>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-white">
          Booking Submissions ({submissions?.length ?? 0})
        </h2>
        <button
          type="button"
          onClick={() => refetch()}
          className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
        >
          <RefreshCw className="w-4 h-4" />
          Refresh
        </button>
      </div>
      {isLoading ? (
        <div className="flex items-center justify-center py-12 gap-3 text-gray-400">
          <Loader2 className="w-5 h-5 animate-spin" />
          Loading submissions...
        </div>
      ) : submissions?.length === 0 ? (
        <div className="text-center py-12 text-gray-400">
          No submissions yet.
        </div>
      ) : (
        <>
          {/* Desktop Table */}
          <div className="hidden md:block overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-[#222]">
                  <th className="text-left py-3 px-4 text-gray-400 font-medium">
                    Name
                  </th>
                  <th className="text-left py-3 px-4 text-gray-400 font-medium">
                    Email
                  </th>
                  <th className="text-left py-3 px-4 text-gray-400 font-medium">
                    Phone
                  </th>
                  <th className="text-left py-3 px-4 text-gray-400 font-medium">
                    Organization
                  </th>
                  <th className="text-left py-3 px-4 text-gray-400 font-medium">
                    Event Type
                  </th>
                  <th className="text-left py-3 px-4 text-gray-400 font-medium">
                    Date
                  </th>
                  <th className="text-left py-3 px-4 text-gray-400 font-medium">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {submissions?.map((s) => (
                  <tr
                    key={s.id.toString()}
                    className="border-b border-[#1a1a1a] hover:bg-[#1a1a1a] transition-colors"
                  >
                    <td className="py-3 px-4 text-white">{s.name}</td>
                    <td className="py-3 px-4 text-gray-300">{s.email}</td>
                    <td className="py-3 px-4 text-gray-300">{s.phone}</td>
                    <td className="py-3 px-4 text-gray-300">
                      {s.organization}
                    </td>
                    <td className="py-3 px-4 text-gray-300">{s.eventType}</td>
                    <td className="py-3 px-4 text-gray-400">
                      {new Date(
                        Number(s.timestamp) / 1_000_000,
                      ).toLocaleDateString()}
                    </td>
                    <td className="py-3 px-4">
                      <button
                        type="button"
                        onClick={() => handleDelete(s.id)}
                        disabled={deleteSubmission.isPending}
                        className="text-red-400 hover:text-red-300 transition-colors disabled:opacity-50"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {/* Mobile Cards */}
          <div className="md:hidden space-y-4">
            {submissions?.map((s) => (
              <div
                key={s.id.toString()}
                className="bg-[#1a1a1a] rounded-xl p-4 space-y-2"
              >
                <div className="flex justify-between items-start">
                  <span className="font-semibold text-white">{s.name}</span>
                  <button
                    type="button"
                    onClick={() => handleDelete(s.id)}
                    disabled={deleteSubmission.isPending}
                    className="text-red-400 hover:text-red-300 disabled:opacity-50"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
                <p className="text-gray-300 text-sm">{s.email}</p>
                <p className="text-gray-300 text-sm">{s.phone}</p>
                <p className="text-gray-400 text-sm">
                  {s.organization} · {s.eventType}
                </p>
                <p className="text-gray-500 text-xs">
                  {new Date(
                    Number(s.timestamp) / 1_000_000,
                  ).toLocaleDateString()}
                </p>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

function RegistrationsTab({ isAuthenticated }: { isAuthenticated: boolean }) {
  const {
    data: registrations,
    isLoading,
    error,
    refetch,
  } = useGetAllRegistrations({ enabled: isAuthenticated });
  const deleteRegistration = useDeleteRegistration();

  const handleDelete = async (id: bigint) => {
    if (confirm("Are you sure you want to delete this registration?")) {
      await deleteRegistration.mutateAsync(id);
    }
  };

  if (error) {
    return (
      <div className="text-center py-12">
        <p className="text-red-400 mb-2">Failed to load registrations.</p>
        <p className="text-gray-500 text-sm mb-4">
          An error occurred while fetching data. Please try again.
        </p>
        <button
          type="button"
          onClick={() => refetch()}
          className="text-orange-500 hover:text-orange-400 text-sm underline"
        >
          Try again
        </button>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-white">
          Event Registrations ({registrations?.length ?? 0})
        </h2>
        <button
          type="button"
          onClick={() => refetch()}
          className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
        >
          <RefreshCw className="w-4 h-4" />
          Refresh
        </button>
      </div>
      {isLoading ? (
        <div className="flex items-center justify-center py-12 gap-3 text-gray-400">
          <Loader2 className="w-5 h-5 animate-spin" />
          Loading registrations...
        </div>
      ) : registrations?.length === 0 ? (
        <div className="text-center py-12 text-gray-400">
          No registrations yet.
        </div>
      ) : (
        <>
          {/* Desktop Table */}
          <div className="hidden md:block overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-[#222]">
                  <th className="text-left py-3 px-4 text-gray-400 font-medium">
                    Name
                  </th>
                  <th className="text-left py-3 px-4 text-gray-400 font-medium">
                    Email
                  </th>
                  <th className="text-left py-3 px-4 text-gray-400 font-medium">
                    Phone
                  </th>
                  <th className="text-left py-3 px-4 text-gray-400 font-medium">
                    College/Profession
                  </th>
                  <th className="text-left py-3 px-4 text-gray-400 font-medium">
                    Date
                  </th>
                  <th className="text-left py-3 px-4 text-gray-400 font-medium">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {registrations?.map((r) => (
                  <tr
                    key={r.id.toString()}
                    className="border-b border-[#1a1a1a] hover:bg-[#1a1a1a] transition-colors"
                  >
                    <td className="py-3 px-4 text-white">{r.name}</td>
                    <td className="py-3 px-4 text-gray-300">{r.email}</td>
                    <td className="py-3 px-4 text-gray-300">{r.phone}</td>
                    <td className="py-3 px-4 text-gray-300">
                      {r.collegeProfession}
                    </td>
                    <td className="py-3 px-4 text-gray-400">
                      {new Date(
                        Number(r.timestamp) / 1_000_000,
                      ).toLocaleDateString()}
                    </td>
                    <td className="py-3 px-4">
                      <button
                        type="button"
                        onClick={() => handleDelete(r.id)}
                        disabled={deleteRegistration.isPending}
                        className="text-red-400 hover:text-red-300 transition-colors disabled:opacity-50"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {/* Mobile Cards */}
          <div className="md:hidden space-y-4">
            {registrations?.map((r) => (
              <div
                key={r.id.toString()}
                className="bg-[#1a1a1a] rounded-xl p-4 space-y-2"
              >
                <div className="flex justify-between items-start">
                  <span className="font-semibold text-white">{r.name}</span>
                  <button
                    type="button"
                    onClick={() => handleDelete(r.id)}
                    disabled={deleteRegistration.isPending}
                    className="text-red-400 hover:text-red-300 disabled:opacity-50"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
                <p className="text-gray-300 text-sm">{r.email}</p>
                <p className="text-gray-300 text-sm">{r.phone}</p>
                <p className="text-gray-400 text-sm">{r.collegeProfession}</p>
                <p className="text-gray-500 text-xs">
                  {new Date(
                    Number(r.timestamp) / 1_000_000,
                  ).toLocaleDateString()}
                </p>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

type AdminStep = "login" | "password" | "panel";

// Waiting screen shown while the authenticated actor is being initialized
function ActorLoadingScreen() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center p-4">
      <div className="bg-[#111] border border-[#222] rounded-2xl p-8 w-full max-w-md text-center">
        <Loader2 className="w-10 h-10 animate-spin text-orange-500 mx-auto mb-4" />
        <h2 className="text-white font-semibold text-lg">
          Initializing secure session…
        </h2>
        <p className="text-gray-400 text-sm mt-2">
          Setting up your authenticated connection. This only takes a moment.
        </p>
      </div>
    </div>
  );
}

export default function AdminPanel() {
  const [step, setStep] = useState<AdminStep>("login");
  const [activeTab, setActiveTab] = useState<"bookings" | "registrations">(
    "bookings",
  );
  const { identity, clear } = useInternetIdentity();
  const { isFetching: actorFetching } = useActor();
  const queryClient = useQueryClient();

  // If identity is already available on mount, skip login step
  useEffect(() => {
    if (identity && step === "login") {
      setStep("password");
    }
  }, [identity, step]);

  // When transitioning to the panel, clear any stale/errored query cache
  // so queries fire fresh with the authenticated actor
  const handleEnterPanel = () => {
    queryClient.removeQueries({ queryKey: ["submissions"] });
    queryClient.removeQueries({ queryKey: ["registrations"] });
    setStep("panel");
  };

  const handleLogout = async () => {
    await clear();
    queryClient.clear();
    setStep("login");
  };

  // isAuthenticated means: logged in with II AND passed the password gate AND actor is ready
  const isAuthenticated = !!identity && step === "panel" && !actorFetching;

  if (step === "login") {
    return <LoginStep onLoggedIn={() => setStep("password")} />;
  }

  if (step === "password") {
    return <PasswordGate onAuthenticated={handleEnterPanel} />;
  }

  // Show a loading screen while the authenticated actor is being built
  // (isFetching is true right after identity becomes available)
  if (actorFetching) {
    return <ActorLoadingScreen />;
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white">Admin Panel</h1>
            <p className="text-gray-400 mt-1">
              Manage bookings and registrations
            </p>
          </div>
          <button
            type="button"
            onClick={handleLogout}
            className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors text-sm"
          >
            <LogOut className="w-4 h-4" />
            Logout
          </button>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-8 border-b border-[#222]">
          <button
            type="button"
            onClick={() => setActiveTab("bookings")}
            className={`flex items-center gap-2 px-4 py-3 text-sm font-medium transition-colors border-b-2 -mb-px ${
              activeTab === "bookings"
                ? "border-orange-500 text-orange-500"
                : "border-transparent text-gray-400 hover:text-white"
            }`}
          >
            <BookOpen className="w-4 h-4" />
            Bookings
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("registrations")}
            className={`flex items-center gap-2 px-4 py-3 text-sm font-medium transition-colors border-b-2 -mb-px ${
              activeTab === "registrations"
                ? "border-orange-500 text-orange-500"
                : "border-transparent text-gray-400 hover:text-white"
            }`}
          >
            <Users className="w-4 h-4" />
            Registrations
          </button>
        </div>

        {/* Tab Content */}
        <div className="bg-[#111] border border-[#222] rounded-2xl p-6">
          {activeTab === "bookings" ? (
            <BookingsTab isAuthenticated={isAuthenticated} />
          ) : (
            <RegistrationsTab isAuthenticated={isAuthenticated} />
          )}
        </div>
      </div>
    </div>
  );
}
