import axiosInstance from "./api";

const refreshAccessToken = async () => {
  const refreshToken = localStorage.getItem("refreshToken");
  const response = await axiosInstance.post("/auth/refresh-token", {
    refreshToken,
  });
  return response.data; // { token: 'newAccessToken', refreshToken: 'newRefreshToken' }
};

export default {
  refreshAccessToken,
};
