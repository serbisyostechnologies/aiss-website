import AppRoutes from "./routes/index";
import AuthInitializer from "./utils/AuthInitializer";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <>
      <AuthInitializer>
        <AppRoutes />
      </AuthInitializer>
      <ToastContainer
        position="top-right"
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        pauseOnHover
        draggable
        theme="light"
        toastStyle={{
          width: "fit-content",
          maxWidth: "90vw",
          fontFamily: getComputedStyle(
            document.documentElement,
          ).getPropertyValue("--font-primary"),
          fontSize: ".8rem",
        }}
      />
    </>
  );
}

export default App;