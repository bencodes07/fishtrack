import { useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Signup from "./components/Signup";
import Home from "./components/Home";
import Logout from "./components/Logout";
import Collection from "./components/Collection.jsx";
import NotFound from "./components/NotFound";
import { AuthContextProvider } from "./contexts/AuthContextProvider";
import Login from "./components/Login";
import i18n from "./i18n";
import { ThemeProvider, createTheme } from "@mui/material/styles";

function App() {
  useEffect(() => {
    i18n.changeLanguage(navigator.language);
  }, []);
  const theme = createTheme({
    palette: {
      secondary: {
        main: "#003585",
      },
    },
  });

  return (
    <AuthContextProvider>
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} exact></Route>
            <Route
              path="/collection/:name"
              element={<Collection />}
              exact
            ></Route>
            <Route
              path="/login"
              element={
                <AuthContextProvider>
                  <Login />
                </AuthContextProvider>
              }
              exact
            ></Route>
            <Route path="/signup" element={<Signup />} exact></Route>
            <Route path="/logout" element={<Logout />} exact />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </AuthContextProvider>
  );
}

export default App;
