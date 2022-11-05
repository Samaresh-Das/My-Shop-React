import { Fragment } from "react";
import "./App.css";
import HomePage from "./components/HomePage";
import { Toaster } from "react-hot-toast";
import { useSelector } from "react-redux";
import CartProvider from "./context/CartProvider";

function App() {
  const themeMode = useSelector((state) => state.theme.theme);

  if (themeMode === "light") {
    document.body.style.backgroundColor = "white";
  } else if (themeMode === "dark") {
    document.body.style.backgroundColor = "black";
  }
  return (
    <Fragment>
      <CartProvider>
        <Toaster position="bottom-center" reverseOrder={false} />
        <HomePage />
      </CartProvider>
    </Fragment>
  );
}

export default App;
