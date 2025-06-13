import { Switch, Route, Redirect } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Home from "@/pages/home";
import Admin from "@/pages/admin";
import Login from "@/pages/login"; // Import the new Login component
import NotFound from "@/pages/not-found";

// Placeholder for authentication status. This will be replaced with actual logic.
const isAuthenticated = () => {
  // In a real application, this would check for a valid session token or user state.
  // For now, it checks localStorage. You will implement proper authentication in the next steps.
  return localStorage.getItem("loggedIn") === "true";
};

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/login" component={Login} /> {/* Add the login route */}
      <Route path="/admin">
        {isAuthenticated() ? <Admin /> : <Redirect to="/login" />}
      </Route>
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
