import api from "./api";

const authService = {
  register: async userData => {
    try {
      const response = await api.post("/users/register", userData);

      // FIX: Axios returns data inside response.data
      if (response.data.token) {
        localStorage.setItem("token", response.data.token);
      }

      if (response.data.user) {
        localStorage.setItem("user", JSON.stringify(response.data.user));
      }

      return {
        success: true,
        user: response.data.user,
        token: response.data.token,
      };
    } catch (error) {
      return { success: false, error: error.message || "Registration failed" };
    }
  },

  login: async credentials => {
    try {
      const response = await api.post("/users/login", credentials);

      // FIX: Correct token and user extraction
      if (response.data.token) {
        localStorage.setItem("token", response.data.token);
      }

      if (response.data.user) {
        localStorage.setItem("user", JSON.stringify(response.data.user));
      }

      return {
        success: true,
        user: response.data.user,
        token: response.data.token,
      };
    } catch (error) {
      return { success: false, message: error.message || "Login failed." };
    }
  },

  logout: () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.href = "/login";
  },

  getUser: () => {
    const user = localStorage.getItem("user");
    return user ? JSON.parse(user) : null;
  },

  getUserProfile: async () => {
    try {
      const response = await api.get("/users/profile");
      return response.data.user;
    } catch (error) {
      console.error("Error fetching user profile:", error);
      return null;
    }
  },
};

export default authService;
