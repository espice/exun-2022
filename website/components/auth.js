import { useEffect, useContext } from "react";

import axios from "../config/axios";
import Router from "next/router";

import UserContext from "./userContext";

const Auth = ({ children }) => {
  const { setUser, setLoading } = useContext(UserContext);

  useEffect(async () => {
    const res = await axios.get("/auth/me");
    console.log(Router.pathname);
    const path = Router.pathname;
    const success = res.data.success;
    const user = res.data.user;

    if (res.data.success == false && (path != "/" || path != "/auth")) {
      Router.replace("/");
      setLoading(false);
    } else if (
      success &&
      user.role[0] == "customer" &&
      !path.includes("store")
    ) {
      Router.replace("/store");
      setUser(user);
      setLoading(false);
    } else if (
      success &&
      user.role[0] == "oompaloompa" &&
      !user.isManager &&
      !path.includes("oompaloompa")
    ) {
      Router.replace("/oompaloompa");
      setUser(user);
      setLoading(false);
    } else if (
      success &&
      user.role[0] == "oompaloompa" &&
      user.isManager &&
      !path.includes("manager")
    ) {
      Router.replace("/manager");
      setUser(user);
      setLoading(false);
    }
  }, []);

  return <div>{children}</div>;
};

export default Auth;
