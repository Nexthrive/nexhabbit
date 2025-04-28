import { useState, useRef, useEffect } from "react";
import { Eye, EyeOff } from "lucide-react";
import gsap from "gsap";

export default function Auth() {
  // Form state
  const [isLogin, setIsLogin] = useState(true);

  // Login form state
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [showLoginPassword, setShowLoginPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  // Signup form state
  const [signupEmail, setSignupEmail] = useState("");
  const [signupUsername, setSignupUsername] = useState("");
  const [signupPassword, setSignupPassword] = useState("");
  const [showSignupPassword, setShowSignupPassword] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Refs
  const panelRef = useRef(null);
  const loginRef = useRef(null);
  const signupRef = useRef(null);

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    console.log("Login submitted", { loginEmail, loginPassword, rememberMe });
  };

  const handleSignupSubmit = (e) => {
    e.preventDefault();
    console.log("Signup submitted", {
      signupEmail,
      signupUsername,
      signupPassword,
      confirmPassword,
    });
  };

  const toggleForm = () => {
    if (isLogin) {
      // Switching to signup
      gsap.to(panelRef.current, {
        x: "-100%",
        duration: 0.8,
        ease: "power3.inOut",
      });
    } else {
      // Switching back to login
      gsap.to(panelRef.current, {
        x: "0%",
        duration: 0.8,
        ease: "power3.inOut",
      });
    }
    setIsLogin(!isLogin);
  };

  useEffect(() => {
    // Initial setup
    gsap.set(panelRef.current, { x: "0%" });
    gsap.set(signupRef.current, { x: "100%" });
  }, []);

  return (
    <div className="relative flex min-h-screen w-full overflow-hidden bg-white">
      {/* Login Form (always on left) */}
      <div
        ref={loginRef}
        className="w-1/2 flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 py-24"
      >
        <div className="w-full max-w-md">
          <div className="mb-10">
            <h1 className="text-nexgrey-100 font-light tracking-[8px]">
              N E X H A B I T
            </h1>
          </div>

          <div className="mb-12">
            <h2 className="text-5xl font-semibold text-black tracking-[-1.5px]">
              Hello, <br />
              <span className="relative">Welcome Back!</span>
            </h2>
            <p className="text-gray-500 mt-2">
              Please login with your personal info
            </p>
          </div>

          <form onSubmit={handleLoginSubmit} className="space-y-4">
            <input
              type="email"
              value={loginEmail}
              onChange={(e) => setLoginEmail(e.target.value)}
              placeholder="email@example.com"
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />

            <div className="relative">
              <input
                type={showLoginPassword ? "text" : "password"}
                value={loginPassword}
                onChange={(e) => setLoginPassword(e.target.value)}
                placeholder="Password"
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
              <button
                type="button"
                onClick={() => setShowLoginPassword(!showLoginPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
              >
                {showLoginPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>

            <div className="flex items-center">
              <input
                id="remember-me"
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="h-4 w-4 text-nexgrey-100 border-gray-300 rounded"
              />
              <label
                htmlFor="remember-me"
                className="ml-2 text-sm text-gray-600"
              >
                Remember me
              </label>
            </div>

            <button
              type="submit"
              className="w-32 py-3 px-4 bg-nexgrey-100 text-white rounded-lg hover:bg-gray-700 mt-10"
            >
              Sign in
            </button>
          </form>
        </div>
      </div>

      {/* Grey Panel (slides left/right) */}
      <div
        ref={panelRef}
        className="absolute top-0 right-0 w-1/2 h-full bg-nexgrey-100 z-10"
      >
        <div className="h-full flex flex-col items-center justify-center text-white p-8 text-center">
          {isLogin ? (
            <>
              <h2 className="text-3xl font-bold mb-4">New Here?</h2>
              <p className="mb-8">
                Sign up and discover a new world of possibilities
              </p>
              <button
                onClick={toggleForm}
                className="px-8 py-2 border-2 border-white rounded-full hover:bg-white hover:text-nexgrey-100 transition"
              >
                Sign Up
              </button>
            </>
          ) : (
            <>
              <h2 className="text-3xl font-bold mb-4">Welcome Back!</h2>
              <p className="mb-8">
                To keep connected with us please login with your personal info
              </p>
              <button
                onClick={toggleForm}
                className="px-8 py-2 border-2 border-white rounded-full hover:bg-white hover:text-nexgrey-100 transition"
              >
                Sign In
              </button>
            </>
          )}
        </div>
      </div>

      {/* Signup Form (hidden behind grey panel initially) */}
      <div
        ref={signupRef}
        className="absolute top-0 right-0 w-1/2 h-full flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 py-24 z-0"
      >
        <div className="w-full max-w-md">
          <div className="mb-10">
            <h1 className="text-nexgrey-100 font-light tracking-[8px]">
              N E X H A B I T
            </h1>
          </div>

          <div className="mb-12">
            <h2 className="text-5xl font-semibold text-black tracking-[-1.5px]">
              Create
              <span className="relative"> Account</span>
            </h2>
            <p className="text-gray-500 mt-2">
              Let's get you started with your new account
            </p>
          </div>

          <form onSubmit={handleSignupSubmit} className="space-y-4">
            <input
              type="email"
              value={signupEmail}
              onChange={(e) => setSignupEmail(e.target.value)}
              placeholder="Email"
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />

            <input
              type="text"
              value={signupUsername}
              onChange={(e) => setSignupUsername(e.target.value)}
              placeholder="Username"
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />

            <div className="relative">
              <input
                type={showSignupPassword ? "text" : "password"}
                value={signupPassword}
                onChange={(e) => setSignupPassword(e.target.value)}
                placeholder="Password"
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
              <button
                type="button"
                onClick={() => setShowSignupPassword(!showSignupPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
              >
                {showSignupPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>

            <div className="relative">
              <input
                type={showConfirmPassword ? "text" : "password"}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm Password"
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
              >
                {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>

            <button
              type="submit"
              className="w-32 py-3 px-4 bg-nexgrey-100 text-white rounded-lg hover:bg-gray-700 mt-10"
            >
              Sign up
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
