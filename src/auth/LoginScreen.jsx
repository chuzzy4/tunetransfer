import React from "react";
import { getLoginUrl } from "../api/spotify";

function LoginScreen() {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gradient-to-r from-green-400 to-green-600">
      <div className="relative m-6 p-6 bg-white rounded-lg shadow-md max-w-md w-full">
        <button className="absolute top-2 right-2 text-zinc-500 focus:outline-none">
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M6 18L18 6M6 6l12 12"
            ></path>
          </svg>
        </button>
        <h2 className="text-2xl font-bold mb-2 text-center">Tune Transfer</h2>
        <p className="mb-4 text-center text-zinc-600">
          Backup your Spotify playlists with ease. Login to get started.
        </p>
        <div className="flex justify-center">
          <a href={getLoginUrl()}>
            <button className="bg-green-500 text-white py-2 px-4 rounded-full flex items-center">
              <svg
                className="w-5 h-5 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M5 13l4 4L19 7"
                ></path>
              </svg>
              Login to Spotify
            </button>
          </a>
        </div>
      </div>
    </div>
  );
}

export default LoginScreen;
