import {
  signOut,
  auth,
} from "../firebase/firebase.config";

export const handleLogout = (navigate) => {
  signOut(auth)
    .then(() => {
      navigate("/");
    })
    .catch((err) => console.error(err));
};
