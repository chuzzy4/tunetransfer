// src/components/PlaylistScreen/Profile/ProfileView.jsx
import React from "react";
import { AlertCircle } from "lucide-react";
import { LiaExternalLinkSquareAltSolid } from "react-icons/lia";

const ProfileView = ({ user, isLoadingProfile, profileError }) => {
  return (
    <div className="flex justify-center">
      <div className="bg-white rounded-xl border border-gray-200 p-6 lg:p-8 w-full max-w-md">
        {isLoadingProfile ? (
          <div className="text-center py-8">
            <div className="w-12 h-12 border-2 border-[#1db954] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-gray-500">Loading profile...</p>
          </div>
        ) : profileError ? (
          <div className="text-center py-8">
            <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
            <p className="text-red-500 mb-4 text-sm">{profileError}</p>
            <button
              onClick={() => {
                localStorage.removeItem("token");
                window.location.href = "/login";
              }}
              className="bg-[#1db954] hover:bg-[#1ed760] text-white px-6 py-3 rounded-lg font-medium w-full"
            >
              Re-authenticate
            </button>
          </div>
        ) : user ? (
          <>
            <div className="text-center">
              <img
                src={
                  user.images?.[0]?.url ||
                  "https://via.placeholder.com/128/1db954/ffffff?text=U"
                }
                alt={user.display_name}
                className="w-24 h-24 lg:w-32 lg:h-32 rounded-full mx-auto mb-6 object-cover border-4 border-white shadow-lg"
                onError={(e) => {
                  e.target.src =
                    "https://via.placeholder.com/128/1db954/ffffff?text=U";
                }}
              />
              <h2 className="text-xl lg:text-2xl font-bold text-gray-900 mb-2">
                {user.display_name}
              </h2>
              {user.email && (
                <p className="text-gray-600 mb-4 text-sm">{user.email}</p>
              )}
            </div>

            <div className="space-y-3 mb-6">
              {user.country && (
                <div className="flex justify-between py-2 border-b border-gray-100">
                  <span className="text-gray-600">Country</span>
                  <span className="font-medium">{user.country}</span>
                </div>
              )}
              {user.followers?.total !== undefined && (
                <div className="flex justify-center items-center gap-2 py-2 border-b border-gray-100">
                  <span className="text-gray-600">Followers</span>
                  <span className="font-medium">
                    {user.followers.total.toLocaleString()}
                  </span>
                </div>
              )}
              {user.product && (
                <div className="flex justify-between py-2 border-b border-gray-100">
                  <span className="text-gray-600">Account</span>
                  <span className="font-medium capitalize">{user.product}</span>
                </div>
              )}
            </div>

            <a
              href={user.external_urls?.spotify}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#1db954] hover:bg-[#1ed760] text-white px-6 py-3 rounded-lg font-medium flex items-center justify-center gap-2 w-full transition-colors"
            >
              View on Spotify
              <LiaExternalLinkSquareAltSolid className="w-4 h-4" />
            </a>
          </>
        ) : (
          <div className="text-center py-8">
            <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
            <p className="text-red-500 mb-4">Failed to load profile</p>
            <button
              onClick={() => {
                localStorage.removeItem("token");
                window.location.href = "/login";
              }}
              className="bg-[#1db954] hover:bg-[#1ed760] text-white px-6 py-3 rounded-lg font-medium w-full"
            >
              Re-authenticate
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfileView;
