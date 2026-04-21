import React from "react";
import AppRouter from "./routers/AppRouter.jsx";
import { ActivityProvider } from "./context/ActivityContext.jsx";
import "./App.css";

const App = () => {
  return (
    <ActivityProvider>
      <AppRouter />
    </ActivityProvider>
  );
};

export default App;
