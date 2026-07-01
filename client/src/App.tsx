import { BrowserRouter } from "react-router-dom";
import { Toaster } from "sonner";

import { AppRoutes } from "@/routes/AppRoutes";

function App() {
  return (
    <BrowserRouter>
      <AppRoutes />
      <Toaster
        theme="dark"
        position="top-right"
        richColors
        closeButton
      />
    </BrowserRouter>
  );
}

export default App;
