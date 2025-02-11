import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { message } from "antd";

const SignUp = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [loading, setLoading] = useState(false);
  const [apiErrorMessage, setApiErrorMessage] = useState("");

  const handleSignup = async (e) => {
    e.preventDefault();

    setNameError("");
    setEmailError("");
    setPasswordError("");
    setApiErrorMessage("");
    let isValid = true;

    if (!name) {
      setNameError("Name is required.");
      isValid = false;
    }

    // Email validation
    if (!email) {
      setEmailError("Email is required.");
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      setEmailError("Email is invalid.");
      isValid = false;
    }

    if (!password) {
      setPasswordError("Password is required.");
      isValid = false;
    }

    if (!isValid) return;

    const obj = { email, password, name };
    setLoading(true);

    try {
      const response = await fetch(
        "https://edgistify-bsgv.onrender.com/api/user-signup",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(obj),
        }
      );

      const data = await response.json();

      if (response.ok) {
        message.success("Signup successful! Please log in.");
        navigate("/");
      } else {
        if (data.message === "Email already exists.") {
          setEmailError("Email already exists. Please use a different email.");
        } else if (data.error === "Name already exists.") {
          setNameError("Name already exists. Please use a different name.");
        } else {
          setApiErrorMessage(data.message || "An unexpected error occurred.");
        }
      }
    } catch (err) {
      console.error(err);
      message.error("An unexpected error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 text-gray-900 flex justify-center">
      <div className="max-w-screen-xl m-0 sm:m-10 bg-white shadow sm:rounded-lg flex justify-center flex-1">
        <div className="lg:w-1/2 xl:w-5/12 p-6 sm:p-12">
          {/* <div>
            <img
              src="https://drive.google.com/uc?export=view&id=1MFiKAExRFF0-2YNpAZzIu1Sh52J8r16v"
              alt="Logo"
              className="w-mx-auto"
            />
          </div> */}
          <div className="mt-12 flex flex-col items-center">
            <div className="w-full flex-1 mt-8">
              <div className="flex flex-col items-center">
                <div className="my-12 border-b text-center">
                  <div className="leading-none px-2 inline-block text-4xl text-gray-600 tracking-wide font-medium bg-white transform translate-y-1/2">
                    Signup Here
                  </div>
                </div>
                <div className="mx-auto max-w-xs">
                  <input
                    className="w-full px-8 py-4 mb-5 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                    type="text"
                    name="name"
                    placeholder="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                  {nameError && (
                    <p className="text-red-500 text-xs">{nameError}</p>
                  )}

                  <input
                    className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                    type="email"
                    name="email"
                    value={email}
                    placeholder="Email"
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                  {emailError && (
                    <p className="text-red-500 text-xs">{emailError}</p>
                  )}

                  <input
                    className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5"
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                  {passwordError && (
                    <p className="text-red-500 text-xs">{passwordError}</p>
                  )}
                  <button
                    onClick={handleSignup}
                    className="mt-5 tracking-wide font-semibold bg-green-400 text-white-500 w-full py-4 rounded-lg hover:bg-green-700 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none"
                    disabled={loading}
                  >
                    {loading ? (
                      <svg
                        className="w-6 h-6 animate-spin mr-2"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M16 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
                        <circle cx="8.5" cy="7" r="4" />
                        <path d="M20 8v6M23 11h-6" />
                      </svg>
                    ) : (
                      <span className="ml-2">Sign Up</span>
                    )}
                  </button>
                  <p class="mt-4 text-sm text-gray-600 text-center">
                    Already have an account?
                    <a
                      class="text-blue-500 hover:underline cursor-pointer ml-1"
                      onClick={() => navigate("/")}
                    >
                      Log in
                    </a>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex-1 bg-green-100 text-center hidden lg:flex">
          <div
            className=" w-full h-full bg-contain bg-center bg-no-repeat"
            style={{
              backgroundImage:
                "url('https://img.freepik.com/free-photo/sign-user-password-privacy-concept_53876-120316.jpg?t=st=1735809295~exp=1735812895~hmac=92f652cbff1dcf74d96b81d271b9804b036e977f0c2abcbcd0bc03b8d790941a&w=900')",
            }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
