/* eslint-disable no-unused-vars */
/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react-hooks/exhaustive-deps */
import { Carousel } from "react-responsive-carousel";
import Footer from "../../components/footer";
import GalliHeader from "../../components/header";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { useNavigate, useParams } from "react-router-dom";
import { IoBedOutline, IoBusOutline } from "react-icons/io5";
import { FaAngleRight, FaClock, FaLocationDot, FaUsers } from "react-icons/fa6";
import { GoArrowRight } from "react-icons/go";
import { MdOutlineBrunchDining, MdOutlineLocalActivity } from "react-icons/md";
import { BsTaxiFront } from "react-icons/bs";
import {
  useGetSinglePublicTourQuery,
  useUserJoinTourMutation,
} from "../../redux/api/Services";
import FullPageLoader from "../../components/FullPageLoader";
import {
  formatDate,
  formatDatesIntoNoOfDays,
  formatPrice,
} from "../../utils/Formats";
import { useEffect, useMemo, useState } from "react";
import { ClipLoader } from "react-spinners";
import { toast } from "react-toastify";
import { IteneryCard } from "../dashboard/creator/EditTour";
import { useDispatch, useSelector } from "react-redux";
import { refetchUserJoinedTours } from "../../redux/slices/authToken";
import { FaArrowRight, FaCameraRetro, FaRegCalendarAlt } from "react-icons/fa";
import Stepper from "../../components/stepper";
import { usePaystackPayment } from "react-paystack";
import { useStepper } from "../../hooks/stepper";

const itineries = [
  {
    title: "Eleko Beach",
    description:
      "Eleko Beach is a popular destination located in the Lekki Peninsula area of Lagos, Nigeria. Known for its serene environment and clean sandy shores, Eleko Beach offers a peaceful retreat from the bustling city life of Lagos. The beach is lined with palm trees and features several locally-owned beach huts and restaurants, providing visitors with a variety of food and drink options. It's an ideal spot for swimming, sunbathing, and enjoying beach games. The laid-back atmosphere makes it perfect for families, groups of friends, and anyone looking to relax by the Atlantic Ocean. Eleko Beach is also known for hosting local events and offering activities like horseback riding and surfing, making it a vibrant spot for both relaxation and recreation.",
    startDate: new Date(),
    endDate: new Date(),
    images: ["eleko1.jpg", "eleko2.jpg", "eleko3.jpeg", "eleko4.jpg"],
  },
  {
    title: "Eleko Beach",
    description:
      "Eleko Beach is a popular destination located in the Lekki Peninsula area of Lagos, Nigeria. Known for its serene environment and clean sandy shores, Eleko Beach offers a peaceful retreat from the bustling city life of Lagos. The beach is lined with palm trees and features several locally-owned beach huts and restaurants, providing visitors with a variety of food and drink options. It's an ideal spot for swimming, sunbathing, and enjoying beach games. The laid-back atmosphere makes it perfect for families, groups of friends, and anyone looking to relax by the Atlantic Ocean. Eleko Beach is also known for hosting local events and offering activities like horseback riding and surfing, making it a vibrant spot for both relaxation and recreation.",
    startDate: new Date(),
    endDate: new Date(),
    images: ["eleko1.jpg", "eleko2.jpg", "eleko3.jpeg", "eleko4.jpg"],
  },
  {
    title: "Eleko Beach",
    description:
      "Eleko Beach is a popular destination located in the Lekki Peninsula area of Lagos, Nigeria. Known for its serene environment and clean sandy shores, Eleko Beach offers a peaceful retreat from the bustling city life of Lagos. The beach is lined with palm trees and features several locally-owned beach huts and restaurants, providing visitors with a variety of food and drink options. It's an ideal spot for swimming, sunbathing, and enjoying beach games. The laid-back atmosphere makes it perfect for families, groups of friends, and anyone looking to relax by the Atlantic Ocean. Eleko Beach is also known for hosting local events and offering activities like horseback riding and surfing, making it a vibrant spot for both relaxation and recreation.",
    startDate: new Date(),
    endDate: new Date(),
    images: ["eleko1.jpg", "eleko2.jpg", "eleko3.jpeg", "eleko4.jpg"],
  },
];

/**
 * Generates a unique string from timestamp
 * @param {string} prefix
 * @returns {string}
 */
const generateReference = (prefix) => {
  let date = new Date();
  return (prefix ? prefix + "_" : "") + date.getTime().toString();
};

const SingleTourDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isAuth = useSelector((state) => state.authToken.isAuth);
  const { data, isLoading, error } = useGetSinglePublicTourQuery({ id });
  const [
    userJoinTour,
    { data: status, isLoading: joining, error: error_joining },
  ] = useUserJoinTourMutation();
  console.log(data);
  console.log(error);

  const { currentStepperIndex, goToStep } = useStepper({
    dataArray: itineries,
  });

  const [loadingReservation, setLoadingReservation] = useState(false);

  const paymentRef = useMemo(() => generateReference(), []);

  const handleJoinTour = () => {
    if (isAuth) {
      initializePayment(() => userJoinTour({ id }), onClose);
    } else {
      navigate(
        `/auth/sign-in/user?callbackUrl=/explore/tour/${data?.data?.tour._id}`
      );
    }
    // userJoinTour({ id });
  };

  const initializePayment = usePaystackPayment({
    publicKey: "pk_test_7d68c6067a2cce231cd58725ee78f8c7e41b51d2",
    email: "mo.xodeeq@gmail.com",
    firstname: "Babatunde",
    lastname: "Adenowo",
    phone: "08182027680",
    amount: Number(data?.data?.tour?.price) * 100,
    currency: "NGN",
    label: data?.data?.tour?.title,
    reference: paymentRef,
  });

  const onClose = () => {
    // setPaymentRef(generateReference());
    toast.error("Payment unsuccessful");
    setLoadingReservation(false);
  };

  useEffect(() => {
    console.log(status);
    console.log(error_joining);
    if (status?.status === "success") {
      // toast.success(data.message);
      toast.success(
        "Tour joined successfully! Kindly check your mail for payment link"
      );
      navigate("/user/joined-tours");
      dispatch(refetchUserJoinedTours());
    }
    if (status?.status === "error") {
      toast.error(status?.message);
    }
    if (error_joining) {
      toast.error(error_joining?.data + ": " + "Please login");
      navigate("/auth/sign-in/user");
    }
  }, [status, error_joining]);
  return (
    <>
      {isLoading ? (
        <FullPageLoader />
      ) : (
        <div>
          <GalliHeader />
          <div className="container mx-auto space-y-8 mt-6 sm:mt-10">
            <div className="shadow-lg px-2">
              <Carousel
                autoPlay
                showArrows
                swipeable={true}
                infiniteLoop
                useKeyboardArrows
                showThumbs={false}
                emulateTouch
                autoFocus
                width={"100%"}
                stopOnHover={false}
                animationHandler="fade"
                centerMode
                centerSlidePercentage={33.33}
              >
                {data?.data?.tour?.tourImagesData?.map((item) => (
                  <div
                    key={item._id}
                    className="h-[200px] sm:h-[400px] shadow-lg mb-2 bg-slate-600 rounded-lg overflow-hidden "
                  >
                    <img
                      src={item.url}
                      className="object-cover w-full h-full"
                      alt={item._id}
                    />
                  </div>
                ))}
              </Carousel>
            </div>

            <div className="w-full space-y-8 px-4 bg-white lg:grid lg:grid-cols-10 lg:gap-x-24 lg:space-y-0">
              <div className="lg:col-span-6">
                <div className="p-4 space-y-1">
                  <h2 className="font-bold text-lg lg:text-xl">
                    {data?.data?.tour?.title}
                  </h2>
                  <p className="text-xs text-gray-500">
                    Hosted by{" "}
                    <span className="font-semibold">
                      {data?.data?.tour?.companyName || "NA"}
                    </span>
                  </p>
                  {/* <span className="text-sm text-gray-600">
                    Starting at{" "}
                    {data?.data?.tour?.currency === "NGN" ? "₦" : "$"}
                    {formatPrice(data?.data?.tour?.price)}
                  </span> */}
                </div>

                <div className="flex gap-4 px-4 py-1 text-xs lg:text-sm">
                  <div className="flex gap-2 items-center">
                    <FaClock className="text-red-500" />
                    <span className="text-gray-700">
                      {formatDatesIntoNoOfDays(
                        data?.data?.tour?.startDate,
                        data?.data?.tour?.endDate
                      )}{" "}
                      days
                    </span>
                  </div>

                  <div className="flex gap-2 items-center">
                    <FaUsers className="text-red-500" />
                    <span className="text-gray-700">
                      {data?.data?.tour?.numOfRegMembers} of{" "}
                      {data?.data?.tour?.maxCapacity} registered
                    </span>
                  </div>

                  <div className="flex gap-2 items-center">
                    <FaLocationDot className="text-red-500" />
                    <span className="text-gray-700">
                      {data?.data?.tour?.location}
                    </span>
                  </div>
                </div>

                <div className="p-4">
                  <p className="">{data?.data?.tour?.description}</p>
                </div>

                <div className="bg-white p-4 rounded-sm space-y-5">
                  <h3 className="font-bold lg:text-xl">What's included</h3>

                  <div className="flex gap-x-8 gap-y-4 flex-wrap items-center">
                    <div className="flex items-center gap-2 text-xs text-gray-800 text-opacity-85 lg:gap-3 lg:text-sm">
                      <IoBedOutline className="text-red-500 lg:w-6 lg:h-6" />
                      <span>Accommodation</span>
                    </div>

                    <div className="flex items-center gap-2 text-xs text-gray-800 text-opacity-85 lg:gap-3 lg:text-sm">
                      <MdOutlineLocalActivity className="text-red-500 lg:w-6 lg:h-6" />
                      <span>Activities & Events</span>
                    </div>

                    <div className="flex items-center gap-2 text-xs text-gray-800 text-opacity-85 lg:gap-3 lg:text-sm">
                      <MdOutlineBrunchDining className="text-red-500 lg:w-6 lg:h-6" />
                      <span>Food & Beverages</span>
                    </div>

                    <div className="flex items-center gap-2 text-xs text-gray-800 text-opacity-85 lg:gap-3 lg:text-sm">
                      <IoBusOutline className="text-red-500 lg:w-6 lg:h-6" />
                      <span>Transportation</span>
                    </div>

                    <div className="flex items-center gap-2 text-xs text-gray-800 text-opacity-85 lg:gap-3 lg:text-sm">
                      <FaCameraRetro className="text-red-500 lg:w-6 lg:h-6" />
                      <span>Photos & Videos</span>
                    </div>

                    <div className="flex items-center gap-2 text-xs text-gray-800 text-opacity-85 lg:gap-3 lg:text-sm">
                      <BsTaxiFront className="text-red-500 lg:w-6 lg:h-6" />
                      <span>Local Cab</span>
                    </div>
                  </div>
                </div>

                {/* <div className="p-4 space-y-5">
                  <h3>Itinerary</h3>

                  <div className="space-y-4">
                    <Stepper currentStep={1} numberOfSteps={itineries.length} />

                    <Carousel
                      key={itineries[1].title}
                      autoPlay
                      showArrows
                      swipeable={true}
                      infiniteLoop
                      useKeyboardArrows
                      showThumbs={false}
                      emulateTouch
                      autoFocus
                      width={"100%"}
                      stopOnHover={false}
                      animationHandler="fade"
                      centerMode
                      centerSlidePercentage={100}
                    >
                      {itineries[1].images.map((imageUrl, i) => (
                        <div
                          key={imageUrl}
                          className="h-[200px] sm:h-[400px] shadow-lg mb-2 bg-slate-600 rounded-lg overflow-hidden "
                        >
                          <img
                            src={`/assets/images/${imageUrl}`}
                            className="object-cover w-full h-full"
                            alt={`Image ${i + 1} of ${itineries[1].title}`}
                          />
                        </div>
                      ))}
                    </Carousel>
                  </div>
                </div> */}
              </div>

              <div className="lg:col-span-4 lg:space-y-4">
                <div className="p-4 bg-blue-200 h-min">
                  <div className="p-2 flex items-center gap-2 lg:p-4">
                    <FaRegCalendarAlt className="" />

                    <p className="flex gap-1 items-center">
                      <span className="">
                        {formatDate(data?.data?.tour?.startDate)}
                      </span>
                      {/* <FaArrowRight className="stroke-1" /> */}
                      <GoArrowRight />
                      <span className="">
                        {formatDate(data?.data?.tour?.endDate)}
                      </span>
                    </p>
                    {/* <h2 className="text-white font-bold lg:text-lg">
                      {data?.data?.tour?.title}
                    </h2> */}
                  </div>
                  <div className="text-sm text-gray-600 bg-white p-2 lg:p-4">
                    <p>Trip cost</p>
                    <p className="text-2xl font-bold">
                      {data?.data?.tour?.currency === "NGN" ? "₦" : "$"}
                      {formatPrice(data?.data?.tour?.price)}
                    </p>
                  </div>

                  <button
                    onClick={handleJoinTour}
                    className="w-full text-center p-4 bg-yellow-500 text-white font-semibold mt-8 flex items-center justify-between gap-4 transition-all duration-300 hover:bg-opacity-85"
                  >
                    <span>Reserve Package</span>
                    {joining ? (
                      <ClipLoader size={16} color="#fff" />
                    ) : (
                      <FaAngleRight />
                    )}
                  </button>
                </div>

                {/* <div className="space-y-4 p-4">
                  <h3 className="font-bold text-xl">Trip Information</h3>
                  <p className="font-semibold text-gray-500">
                    Date:{" "}
                    <span className="font-normal">
                      {formatDate(data?.data?.tour?.startDate)} -{" "}
                      {formatDate(data?.data?.tour?.endDate)}
                    </span>
                  </p>
                  <p className="font-semibold text-gray-500">
                    Location:{" "}
                    <span className="font-normal">
                      {data?.data?.tour?.location}
                    </span>
                  </p>
                  <p className="font-semibold text-gray-500">
                    Creator:{" "}
                    <span className="font-normal">
                      {data?.data?.tour?.companyName || "NA"}
                    </span>
                  </p>
                  <p className="font-semibold text-gray-500">
                    Maximum capacity:{" "}
                    <span className="font-normal">
                      {data?.data?.tour?.maxCapacity}
                    </span>
                  </p>
                  <p className="font-semibold text-gray-500">
                    Registered members:{" "}
                    <span className="font-normal">
                      {data?.data?.tour?.numOfRegMembers}
                    </span>
                  </p>
                </div> */}
              </div>
            </div>
          </div>
          <Footer />
        </div>
      )}
    </>
  );
};

export default SingleTourDetails;
