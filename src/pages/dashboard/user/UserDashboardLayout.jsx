// import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import GalliHeader from "../../../components/header";
import { UserSideBar } from "./UserSideBar";

export const UserDashboardLayout = () => {
  const [title, setTitle] = useState("");
  const tourStep = useSelector((state) => state.authToken.createTourStep);

  const location = useLocation();
  useEffect(() => {
    switch (location.pathname) {
      case "/user":
        setTitle("Tours Joined");
        break;
      case "/user/joined-tours":
        setTitle("Tours Joined");
        break;
      case "/user/profile":
        setTitle("Profile Information");
        break;
      default:
        setTitle("Dashboard");
        break;
    }
  }, [location.pathname]);
  return (
    <>
      <div className="max-w-[1440px] bg-[#F6F4F4] h-[100%] mx-auto shadow-card">
        <div className="z-20 sticky top-0">
          {" "}
          {/* <Navbar title={titleApp} /> */}
          <GalliHeader />
        </div>
        <div className="flex flex-col  lg:grid lg:grid-cols-7 gap-10 md:m-10 sm:mt-0 ">
          <div className="  pb-5 bg-grey-white  lg:block col-span-2  border-[#000]  sticky">
            <div className="hidden lg:block ">
              <UserSideBar />
            </div>
          </div>
          <div className=" col-span-5 sm:px-0 px-5">
            <div className="sm:border sm:bg-white rounded-lg sm:shadow-md sm:px-5 py-3 sm:py-5">
              <div className="flex justify-between items-center  mb-6">
                <h1 className=" text-xl capitalize sm:text-2xl font-bold text-black-ercas">
                  {title}
                </h1>
                {title.toLowerCase() === "create tour" && (
                  <button
                    disabled
                    className="py-2 px-5 rounded-full border bg-orange-500 text-sm font-bold text-white "
                  >
                    Step {tourStep} of 2
                  </button>
                )}
              </div>
              <Outlet />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
