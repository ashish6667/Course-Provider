import React, { useEffect, useState } from "react";
import logo from "../images/logo.webp";
import { Link } from "react-router-dom";
import { FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa";
import axios from "axios";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import toast from "react-hot-toast";
const BACKEND_URL =import.meta.env.VITE_BACKEND_URL;
function Home() {
  const [courses, setCourses] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // ✅ Check user login status
  useEffect(() => {
    const token = localStorage.getItem("user");
    setIsLoggedIn(!!token); // Convert to boolean
  }, []);

  // ✅ Fetch courses with error handling
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get(
          `${BACKEND_URL}/course/courses`,
          { withCredentials: true }
        );
        console.log("Courses fetched:", response.data.courses);
        setCourses(response.data.courses || []);
      } catch (error) {
        console.error("Error fetching courses:", error);
        toast.error("Failed to load courses.");
      }
    };
    fetchCourses();
  }, []);

  // ✅ Logout function with localStorage cleanup
  const handleLogout = async () => {
    try {
      const response = await axios.get(`${BACKEND_URL}/user/logout`, {
        withCredentials: true,
      });
      toast.success(response.data.message);
      setIsLoggedIn(false);
      localStorage.removeItem("user"); // Clear token
    } catch (error) {
      console.error("Error in logging out:", error);
      toast.error(error.response?.data?.errors || "Error in logging out");
    }
  };

  // ✅ Slider settings
  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4,
    autoplay: true,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 3, slidesToScroll: 3, dots: true } },
      { breakpoint: 600, settings: { slidesToShow: 2, slidesToScroll: 2 } },
      { breakpoint: 480, settings: { slidesToShow: 1, slidesToScroll: 1 } },
    ],
  };

  return (
    <div className="bg-gradient-to-r from-black to-blue-950 min-h-screen text-white">
      {/* Header */}
      <header className="flex items-center justify-between p-6 container mx-auto">
        <div className="flex items-center space-x-2">
          <img src={logo} alt="CourseHaven" className="w-10 h-10 rounded-full" />
          <h1 className="text-2xl text-orange-500 font-bold">CourseHaven</h1>
        </div>
        <div className="space-x-4">
          {isLoggedIn ? (
            <button onClick={handleLogout} className="bg-transparent text-white py-2 px-4 border border-white rounded">
              Logout
            </button>
          ) : (
            <>
              <Link to="/login" className="bg-transparent text-white py-2 px-4 border border-white rounded">
                Login
              </Link>
              <Link to="/signup" className="bg-transparent text-white py-2 px-4 border border-white rounded">
                Signup
              </Link>
            </>
          )}
        </div>
      </header>

      {/* Main Section */}
      <section className="text-center py-10">
        <h1 className="text-4xl font-semibold text-orange-500">CourseHaven</h1>
        <p className="text-gray-500 mt-2">Sharpen your skills with courses crafted by experts.</p>
        <div className="space-x-4 mt-6">
          <Link to="/courses" className="bg-green-500 text-white py-3 px-6 rounded font-semibold hover:bg-white hover:text-black duration-300">
            Explore Courses
          </Link>
          <Link to="https://www.tpointtech.com/" className="bg-white text-black py-3 px-6 rounded font-semibold hover:bg-green-500 hover:text-white duration-300">
            Course Videos
          </Link>
        </div>
      </section>

      {/* Course Slider */}
      <section className="container mx-auto py-6">
        <Slider {...settings}>
          {courses.length > 0 ? (
            courses.map((course) => (
              <div key={course._id} className="p-2">
                <div className="relative flex-shrink-0 w-92 transition-transform duration-300 transform hover:scale-105">
                  <div className="bg-gray-900 rounded-lg overflow-hidden">
                    <img className="h-32 w-full object-contain" src={course.image?.url} alt={course.title} />
                    <div className="p-6 text-center">
                      <h2 className="text-xl font-bold text-white">{course.title}</h2>
                      <button className="mt-4 bg-orange-500 text-white py-2 px-4 rounded-full hover:bg-blue-500 duration-300">
                        Enroll Now
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-400">No courses available</p>
          )}
        </Slider>
      </section>

      <hr />

      {/* Footer */}
      <footer className="my-8 container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="flex flex-col items-center md:items-start">
            <div className="flex items-center space-x-2">
              <img src={logo} alt="CourseHaven" className="w-10 h-10 rounded-full" />
              <h1 className="text-2xl text-orange-500 font-bold">CourseHaven</h1>
            </div>
            <p className="mt-3">Follow us</p>
            <div className="flex space-x-4 mt-2">
              <a href="#"><FaFacebook className="text-2xl hover:text-blue-400 duration-300" /></a>
              <a href="#"><FaInstagram className="text-2xl hover:text-pink-600 duration-300" /></a>
              <a href="#"><FaTwitter className="text-2xl hover:text-blue-600 duration-300" /></a>
            </div>
          </div>
          <div className="flex flex-col items-center">
            <h3 className="text-lg font-semibold mb-2">Connects</h3>
            <ul className="space-y-2 text-gray-400">
              <li className="hover:text-white cursor-pointer">YouTube - Learn Coding</li>
              <li className="hover:text-white cursor-pointer">Telegram - Learn Coding</li>
              <li className="hover:text-white cursor-pointer">GitHub - Learn Coding</li>
            </ul>
          </div>
          <div className="flex flex-col items-center">
            <h3 className="text-lg font-semibold mb-2">&copy; 2025 CourseHaven</h3>
            <ul className="space-y-2 text-gray-400">
              <li className="hover:text-white cursor-pointer">Terms & Conditions</li>
              <li className="hover:text-white cursor-pointer">Privacy Policy</li>
              <li className="hover:text-white cursor-pointer">Refund & Cancellation</li>
            </ul>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Home;
