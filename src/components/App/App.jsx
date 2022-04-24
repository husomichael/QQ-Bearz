import { useEffect } from "react";
import { Container, Box } from "@mui/material";
import {
  HashRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import Nav from "../Nav/Nav";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import AboutPage from "../AboutPage/AboutPage";
import UserPage from "../UserPage/UserPage";
import InfoPage from "../InfoPage/InfoPage";
import LandingPage from "../LandingPage/LandingPage";
import LoginPage from "../LoginPage/LoginPage";
import RegisterPage from "../RegisterPage/RegisterPage";
import Soundboard from "../Soundboard/Soundboard.jsx";
import ArakanDeathCounter from "../ArakanDeathCounter/ArakanDeathCounter.jsx";
import AddCorpsePhoto from "../AddCorpsePhoto/AddCorpsePhoto.jsx";
import UserProfile from "../UserProfile/UserProfile.jsx";
import RequestAccess from "../RequestAccess/RequestAccess.jsx";
import GrantAccess from "../GrantAccess/GrantAccess.jsx";
import SelectedUser from "../SelectedUser/SelectedUser.jsx";
import DeletedSoundboard from "../DeletedSoundboard/DeletedSoundboard.jsx";
import "./App.css";

function App() {
  const dispatch = useDispatch();
  const user = useSelector((store) => store.user);

  useEffect(() => {
    dispatch({ type: "FETCH_USER" });
  }, [dispatch]);

  return (
    <div>
      <Container
        disableGutters="true"
        sx={{
          backgroundColor: "#EEEEEE",
          msOverflowY: "scroll",
          pb: 3,
          minHeight: "100vh",
        }}
      >
        <Router>
          <div>
            <Toaster />
          </div>
          <Nav />
          <Switch>
            {/* Visiting localhost:3000 will redirect to localhost:3000/home */}
            <Redirect exact from="/" to="/home" />

            {/* Visiting localhost:3000/about will show the about page. */}
            <Route
              // shows AboutPage at all times (logged in or not)
              exact
              path="/about"
            >
              <AboutPage />
            </Route>

            {/* For protected routes, the view could show one of several things on the same route.
            Visiting localhost:3000/user will show the UserPage if the user is logged in.
            If the user is not logged in, the ProtectedRoute will show the LoginPage (component).
            Even though it seems like they are different pages, the user is always on localhost:3000/user */}
            <ProtectedRoute
              // logged in shows UserPage else shows LoginPage
              exact
              path="/user"
            >
              <UserPage />
            </ProtectedRoute>

            <ProtectedRoute
              // logged in shows InfoPage else shows LoginPage
              exact
              path="/info"
            >
              <InfoPage />
            </ProtectedRoute>

            <Route exact path="/login">
              {user.id ? (
                // If the user is already logged in,
                // redirect to the /user page
                <Redirect to="/user" />
              ) : (
                // Otherwise, show the login page
                <LoginPage />
              )}
            </Route>

            <Route exact path="/registration">
              {user.id ? (
                // If the user is already logged in,
                // redirect them to the /user page
                <Redirect to="/user" />
              ) : (
                // Otherwise, show the registration page
                <RegisterPage />
              )}
            </Route>

            <Route exact path="/home">
              {user.id ? (
                // If the user is already logged in,
                // redirect them to the /user page
                <Redirect to="/user" />
              ) : (
                // Otherwise, show the Landing page
                <LandingPage />
              )}
            </Route>
            <ProtectedRoute exact path="/soundboard">
              <Soundboard />
            </ProtectedRoute>
            {/* <ProtectedRoute
            exact
            path="/arakandeathcounter"
          >
            <ArakanDeathCounter />
          </ProtectedRoute>
          <ProtectedRoute
            exact
            path="/addcorpsephoto"
          >
            <AddCorpsePhoto />
          </ProtectedRoute> */}
            <ProtectedRoute exact path="/userprofile">
              <UserProfile />
            </ProtectedRoute>
            <ProtectedRoute exact path="/manageaccess">
            {user.access > 2 && <GrantAccess />}
            {user.access < 3 && (
                <Box
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                  sx={{ mt: 10 }}
                >
                  <h1>404</h1>
                </Box>
              )}
            </ProtectedRoute>
            <ProtectedRoute exact path="/requestaccess">
              <RequestAccess />
            </ProtectedRoute>
            <ProtectedRoute exact path="/selecteduser/:id">
            {user.access > 2 && <SelectedUser />}
            {user.access < 3 && (
                <Box
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                  sx={{ mt: 10 }}
                >
                  <h1>404</h1>
                </Box>
              )}
            </ProtectedRoute>
            <ProtectedRoute exact path="/deletedsoundboard">
              {user.access > 2 && <DeletedSoundboard />}
              {user.access < 3 && (
                <Box
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                  sx={{ mt: 10 }}
                >
                  <h1>404</h1>
                </Box>
              )}
            </ProtectedRoute>
            {/* If none of the other routes matched, we will show a 404. */}
            <Route>
              <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                sx={{ mt: 10 }}
              >
                <h1>404</h1>
              </Box>
            </Route>
          </Switch>
        </Router>
      </Container>
    </div>
  );
};

export default App;
