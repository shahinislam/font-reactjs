import React from "react";
import Navbar from "./Navbar";
import { Outlet } from "react-router-dom";

export default function Layout() {
  return (
    <>
      <Navbar />
      <section className="max-w-screen-xl mx-auto">
        <Outlet />
      </section>
    </>
  );
}
