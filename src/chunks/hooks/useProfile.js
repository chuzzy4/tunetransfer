// src/hooks/useProfile.js
import { useState, useEffect } from "react";

export const useProfile = () => {
  const [user, setUser] = useState(null);
  const [isLoadingProfile, setIsLoadingProfile] = useState(false);
  const [profileError, setProfileError] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token || user) {
      if (!token) {
        setProfileError("No access token found. Please log in again.");
      }
      return;
    }

    setIsLoadingProfile(true);
    setProfileError(null);

    fetch("https://api.spotify.com/v1/me", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(
            response.status === 401
              ? "Invalid or expired token"
              : "Failed to fetch profile"
          );
        }
        return response.json();
      })
      .then((data) => {
        setUser(data);
        setIsLoadingProfile(false);
      })
      .catch((error) => {
        console.error("Error fetching user profile:", error);
        setProfileError(
          error.message || "Failed to load profile. Please try again."
        );
        setIsLoadingProfile(false);
      });
  }, [user]);

  return { user, isLoadingProfile, profileError };
};
