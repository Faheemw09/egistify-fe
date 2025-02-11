import { Route, Routes } from "react-router-dom";
import SignUp from "../auth/Signup";
import Signin from "../auth/Signin";

import Homepage from "../pages/Homepage";
import Cart from "../pages/cart";
import PrivateRoute from "./PrivateRoute";

const AllRoutes = () => {
  return (
    <div>
      <Routes>
        <Route path="/signup" element={<SignUp />}></Route>
        <Route path="/" element={<Signin />}></Route>
        <Route
          path="/home"
          element={
            <PrivateRoute>
              <Homepage />
            </PrivateRoute>
          }
        ></Route>

        <Route
          path="/cart"
          element={
            <PrivateRoute>
              <Cart />
            </PrivateRoute>
          }
        ></Route>
      </Routes>
    </div>
  );
};
export default AllRoutes;
