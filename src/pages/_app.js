import "@/styles/globals.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "react-toastify/dist/ReactToastify.css";
import "react-perfect-scrollbar/dist/css/styles.css";
import { ToastContainer } from "react-toastify";
import AllContexStore from "@/context";

export default function App({ Component, pageProps }) {
  return (
    <AllContexStore>
      <ToastContainer />
      <Component {...pageProps} />
    </AllContexStore>
  );
}
