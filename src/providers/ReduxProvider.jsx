import { StrictMode } from "react";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "../redux/store";
import { BrowserRouter } from "react-router-dom";

export default function ReduxProvider({ children }) {
  return (
    <StrictMode>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <BrowserRouter>{children}</BrowserRouter>
        </PersistGate>
      </Provider>
    </StrictMode>
  );
}