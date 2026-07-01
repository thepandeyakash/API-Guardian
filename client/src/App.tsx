import { Button }
from "@/components/ui/button";

import {
  QueryClientProvider,
} from "@tanstack/react-query";

import {
  BrowserRouter,
} from "react-router-dom";

import { queryClient }
from "@/lib/queryClient";

function App() {
  return (
    <QueryClientProvider
      client={queryClient}
    >
      <BrowserRouter>
        <div className="h-screen bg-black flex items-center justify-center">
          <Button>
            API Guardian
          </Button>
        </div>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;