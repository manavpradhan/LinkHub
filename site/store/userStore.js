import { create } from "zustand";

const userStore = (set, get) => ({
  user_id: "",
  user_email: "",
  user_handle: "",
  user_logged: false,
  user_token: "",
  expiry: Date.now() + 3 * 24 * 60 * 60 * 1000,

  setUserInfo: (user, token) => {
    set(() => ({ user_id: user._id }));
    set(() => ({ user_handle: user.userHandle }));
    set(() => ({ user_email: user.email }));
    set(() => ({ user_token: token }));
    set(() => ({ user_logged: true }));
  },

  saveUserInfo: (user, token) => {
    // set(user);
    localStorage.setItem("user-info", JSON.stringify(user));
    localStorage.setItem("user-token", token);
  },

  loadUser: () => {
    const savedState = localStorage.getItem("user-info");
    if (savedState) {
      return JSON.parse(savedState);
    }
    return {};
  },

  resetUser: () => {
    set({
      user_id: "",
      user_email: "",
      user_handle: "",
      user_logged: false,
      user_token: "",
    });
    localStorage.removeItem("user-info");
    localStorage.removeItem("user-token");
  },
});

const useUserStore = create(userStore);

// const useUserStore = create(
//   persist(userStore, {
//     name: "user-store",
//     storage: createJSONStorage(() => localStorage),
//   })
// );

export default useUserStore;
