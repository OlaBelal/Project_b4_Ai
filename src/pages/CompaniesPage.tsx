import React, { useState } from "react";
import coverImage from "../assets/images/Tirhalcover.jpg"; 
import profileImage from "../assets/images/tirhalLogo.jpg"; 
import "@fortawesome/fontawesome-free/css/all.min.css"; 
import { X } from "lucide-react"; // Import the X icon for closing the modal

// Import the 11 images
import photo1 from "../assets/images/tirhalasewa.jpg";
import photo2 from "../assets/images/tirhalasewa2.jpg";
import photo3 from "../assets/images/tirhalaswan3.jpg";
import photo4 from "../assets/images/tirhaldahab.jpg";
import photo5 from "../assets/images/tirhalaswan2.jpg";
import photo6 from "../assets/images/tirhaldahab3.jpg";
import photo7 from "../assets/images/tirhaldahab4.jpg";
import photo8 from "../assets/images/tirhaltravel.jpg";
import photo9 from "../assets/images/tirhaltravel2.jpg";
import photo10 from "../assets/images/tirhaltravel3.jpg";
import photo11 from "../assets/images/tirhaltravel4.jpg";
import photo12 from "../assets/images/tirhaltravel5.jpg";

const CompaniesPage = () => {
  const rating = 4.6; // Example rating value
  const [activeTab, setActiveTab] = useState("Posts"); // State to track active tab
  const [showWorkingTimesModal, setShowWorkingTimesModal] = useState(false); // State to toggle working times modal
  const [isFollowing, setIsFollowing] = useState(false); // State to track follow status

  // Define working hours for each day
  const workingHours = [
    { day: "Monday", hours: "9:00 AM - 11:00 PM" },
    { day: "Tuesday", hours: "9:00 AM - 11:00 PM" },
    { day: "Wednesday", hours: "9:00 AM - 11:00 PM" },
    { day: "Thursday", hours: "9:00 AM - 11:00 PM" },
    { day: "Friday", hours: "CLOSED" },
    { day: "Saturday", hours: "9:00 AM - 11:00 PM" },
    { day: "Sunday", hours: "9:00 AM - 11:00 PM" },
  ];

  // Updated reviews data
  const reviews = [
    {
      id: 1,
      name: "Ahmed Mohamed",
      role: "Travel Enthusiast",
      image: "https://images.pexels.com/photos/697509/pexels-photo-697509.jpeg?cs=srgb&dl=pexels-andrewperformance1-697509.jpg&fm=jpg",
      rating: 4.9,
      text: "Tirhal made my trip to Aswan unforgettable! The guides were friendly, and the itinerary was well-planned. I especially loved the Nile cruise and the visit to Abu Simbel.",
    },
    {
      id: 2,
      name: "Layla Hassan",
      role: "History Buff",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80",
      rating: 4.5,
      text: "The historical tours were amazing! The guides were very knowledgeable about ancient Egyptian history. The only downside was the heat, but Tirhal provided plenty of water and breaks.",
    },
    {
      id: 3,
      name: "Omar Ali",
      role: "Adventure Seeker",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80",
      rating: 3.8,
      text: "The desert safari in Dahab was incredible! The quad biking and stargazing at night were highlights of my trip. Tirhal's team was professional and made sure we had a great time.",
    },
    {
      id: 4,
      name: "Nada Samir",
      role: "Photography Lover",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80",
      rating: 4.5,
      text: "As a photographer, I was blown away by the stunning locations Tirhal took us to. The sunrise at the White Desert was a dream come true. Highly recommend their photography-friendly tours!",
    },
    {
      id: 5,
      name: "Youssef Khalil",
      role: "Family Traveler",
      image: "https://t3.ftcdn.net/jpg/06/99/46/60/360_F_699466075_DaPTBNlNQTOwwjkOiFEoOvzDV0ByXR9E.jpg",
      rating: 4.7,
      text: "We traveled with our kids, and Tirhal made sure everything was family-friendly. The kids loved the camel rides, and we enjoyed the cultural experiences. Great service!",
    },
  ];

  // Sample posts with images
  const posts = [
    {
      id: 1,
      userName: "Tirhal",
      userProfile: profileImage,
      time: "3 hours ago",
      text: "Exploring the beauty of Aswan! 🌅 Don't miss out on our Nile cruise packages. Book now!",
      image: "https://www.kemet.travel/wp-content/uploads/2024/12/WhatsApp-Image-2024-12-02-at-14.11.21_0a961478.jpg",
    },
    {
      id: 2,
      userName: "Tirhal",
      userProfile: profileImage,
      time: "1 day ago",
      text: "The White Desert is a must-visit! 🏜️ Check out our latest tour packages for an unforgettable adventure.",
      image: "https://lp-cms-production.imgix.net/2023-06/shutterstockRF89650903.jpg?w=1920&h=640&fit=crop&crop=faces%2Cedges&auto=format&q=75",
    },
    {
      id: 3,
      userName: "Tirhal",
      userProfile: profileImage,
      time: "2 days ago",
      text: "Sunset in Dahab is magical! 🌄 Join us for a desert safari and experience the beauty of Sinai.",
      image: "https://www.ootlah.com/wp-content/uploads/2021/06/Dahab.jpg",
    },
  ];

  // Similar Companies Data
  const similarCompanies = [
    {
      id: 1,
      name: "Egypt Tours",
      email: "egypttours@example.com",
      image: "https://images.unsplash.com/photo-1503220317375-aaad61436b1b?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80",
    },
    {
      id: 2,
      name: "Nile Adventures",
      email: "nileadventures@example.com",
      image: "https://images.unsplash.com/photo-1503220317375-aaad61436b1b?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80",
    },
    {
      id: 3,
      name: "Desert Explorers",
      email: "desertexplorers@example.com",
      image: "https://images.unsplash.com/photo-1503220317375-aaad61436b1b?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80",
    },
  ];

  // Upcoming Travels Data
  const upcomingTravels = [
    {
      id: 1,
      location: "Aswan, Egypt",
      date: "2024-04-15",
      daysLeft: 12,
      image: "https://www.kemet.travel/wp-content/uploads/2024/12/WhatsApp-Image-2024-12-02-at-14.11.21_0a961478.jpg",
    },
    {
      id: 2,
      location: "Dahab, Egypt",
      date: "2024-05-01",
      daysLeft: 29,
      image: "https://www.ootlah.com/wp-content/uploads/2021/06/Dahab.jpg",
    },
    {
      id: 3,
      location: "White Desert, Egypt",
      date: "2024-06-10",
      daysLeft: 68,
      image: "https://lp-cms-production.imgix.net/2023-06/shutterstockRF89650903.jpg?w=1920&h=640&fit=crop&crop=faces%2Cedges&auto=format&q=75",
    },
  ];

  // Function to format date as "Apr 13"
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
  };

  // Function to check if the business is currently open
  const isOpenNow = () => {
    const now = new Date();
    const hours = now.getHours();
    const minutes = now.getMinutes();
    const currentTime = hours + minutes / 60;

    // Define working hours (e.g., 9 AM to 11 PM)
    const openingTime = 9; // 9 AM
    const closingTime = 23; // 11 PM

    return currentTime >= openingTime && currentTime < closingTime;
  };

  // Function to render stars based on the rating
  const renderStars = (rating: number) => {
    const fullStars = Math.floor(rating); // Number of full stars
    const partialStar = rating - fullStars; // Decimal part for the partial star
    const emptyStars = 5 - Math.ceil(rating); // Number of empty stars

    return (
      <div className="flex items-center">
        {/* Full Stars */}
        {[...Array(fullStars)].map((_, i) => (
          <span key={`full-${i}`} className="text-yellow-500">
            <i className="fas fa-star"></i>
          </span>
        ))}

        {/* Partial Star */}
        {partialStar > 0 && (
          <span className="text-yellow-500" style={{ position: "relative" }}>
            <i className="far fa-star" style={{ opacity: 1 }}></i>
            <i
              className="fas fa-star"
              style={{
                position: "absolute",
                left: 0,
                width: `${partialStar * 100}%`,
                overflow: "hidden",
              }}
            ></i>
          </span>
        )}

        {/* Empty Stars */}
        {[...Array(emptyStars)].map((_, i) => (
          <span key={`empty-${i}`} className="text-yellow-500">
            <i className="far fa-star"></i>
          </span>
        ))}

        {/* Rating Number */}
        <span className="ml-2 text-gray-600">{rating}</span>
      </div>
    );
  };

  // Function to render content based on the active tab
  const renderContent = () => {
    switch (activeTab) {
      case "Posts":
        return (
          <div className="bg-white p-5 rounded-lg shadow-md mb-5">
            {posts.map((post) => (
              <div key={post.id} className="mb-6">
                <div className="flex items-center mb-3">
                  <img
                    src={post.userProfile}
                    alt={post.userName}
                    className="w-10 h-10 rounded-full mr-3"
                  />
                  <div>
                    <h3 className="font-semibold">{post.userName}</h3>
                    <p className="text-sm text-gray-600">{post.time}</p>
                  </div>
                </div>
                <p className="text-gray-800 mb-3">{post.text}</p>
                <img
                  src={post.image}
                  alt="Post"
                  className="w-full h-64 object-cover rounded-lg"
                />
              </div>
            ))}
          </div>
        );
      case "Description":
        return (
          <div className="bg-white p-5 rounded-lg shadow-md mb-5">
            <p className="text-gray-800">
              Tirhal is a leading travel company in Egypt, dedicated to providing unforgettable travel experiences. 
              Whether you're exploring the ancient wonders of Luxor and Aswan, enjoying the serene beaches of Dahab, 
              or embarking on a desert safari in the White Desert, Tirhal ensures every moment is magical. 
              Our expert guides, well-planned itineraries, and commitment to customer satisfaction make us the top choice 
              for travelers seeking adventure, culture, and relaxation. Join us and discover the beauty of Egypt with Tirhal!
            </p>
          </div>
        );
      case "All Trips":
        return (
          <div className="bg-white p-5 rounded-lg shadow-md mb-5">
            <p className="text-gray-800">
              This section lists all the trips offered by the company.
            </p>
          </div>
        );
      case "Photos":
        return (
          <div className="bg-white p-5 rounded-lg shadow-md mb-5">
            <div className="grid grid-cols-3 gap-4">
              {[photo1, photo2, photo3, photo4, photo5, photo6, photo7, photo8, photo9, photo10, photo11, photo12].map((photo, index) => (
                <img
                  key={index}
                  src={photo}
                  alt={`Photo ${index + 1}`}
                  className="w-full h-48 object-cover rounded-lg"
                />
              ))}
            </div>
          </div>
        );
      case "Review":
        return (
          <div className="bg-white p-5 rounded-lg shadow-md mb-5">
            <h2 className="text-xl font-bold mb-5">Reviews</h2>
            {reviews.map((review) => (
              <div key={review.id} className="mb-6 pb-6 border-b border-gray-200 last:border-b-0">
                <div className="flex items-center mb-3">
                  <img
                    src={review.image}
                    alt={review.name}
                    className="w-10 h-10 rounded-full mr-3"
                  />
                  <div>
                    <h3 className="font-semibold">{review.name}</h3>
                    <p className="text-sm text-gray-600">{review.role}</p>
                    <div className="flex items-center">
                      {renderStars(review.rating)}
                    </div>
                  </div>
                </div>
                <p className="text-gray-800">{review.text}</p>
              </div>
            ))}
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="font-sans max-w-[1400px] mx-auto p-5">
      {/* Shadow Container for Cover and Profile Section */}
      <div className="bg-white rounded-lg shadow-md mb-5 max-w-[1300px] mx-auto pt-12">
        {/* Cover Photo and Profile Section Container */}
        <div className="relative">
          {/* Cover Photo */}
          <div className="h-72 overflow-hidden rounded-t-lg">
            <img
              src={coverImage}
              alt="Cover"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Profile Section */}
          <div className="flex items-center mt-[-75px] px-10 pb-8 z-10 relative">
            {/* Profile Picture */}
            <div className="w-36 h-36 rounded-full overflow-hidden border-4 border-white shadow-md">
              <img
                src={profileImage}
                alt="Profile"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Profile Info */}
            <div className="ml-5 flex-1">
              <div className="flex items-center">
                <h1 className="text-3xl font-bold text-orange-500 mt-20">Tirhal</h1>
                {/* Rating */}
                <div className="ml-3 mt-20">{renderStars(rating)}</div>
              </div>
              <p className="text-lg text-gray-600">Explore the world with us!</p>
            </div>

            {/* WhatsApp, Schedule, and Follow Button */}
            <div className="flex items-center space-x-6 mt-20 ml-10 pr-14 pt-2">
              {/* WhatsApp Logo */}
              <a
                href="https://wa.me/201091640114"
                target="_blank"
                rel="noopener noreferrer"
                className="text-green-500 hover:text-green-600"
              >
                <i className="fab fa-whatsapp text-4xl"></i> 
              </a>
              {/* Follow Button */}
              <button
                onClick={() => setIsFollowing(!isFollowing)}
                className={`border-2 ${
                  isFollowing
                    ? " border-orange-500 text-orange-500 bg-white hover:bg-gray-50" 
                    : "border-orange-500 text-white bg-orange-500 hover:bg-orange-600" 
                } px-10 py-2 rounded-lg transition duration-300 text-md`}
              >
                {isFollowing ? "Following" : "Follow"}
              </button>

            </div>
          </div>
        </div>
      </div>

      {/* Content Section Container */}
      <div className="px-5">
        {/* Content Section */}
        <div className="flex gap-5 mt-5">
          {/* Left Column (Smaller) - Fixed */}
          <div className="flex-1 sticky top-5 h-[calc(100vh-40px)] overflow-y-auto no-scrollbar">
            <div className="bg-white p-5 rounded-lg shadow-md">
              <h2 className="text-xl font-bold mb-3">Intro</h2>
              
              {/* Centered Arabic Slogan */}
              <p className="text-gray-800 text-center font-semibold text-lg py-3 border-b-2">
                بنسعى اننا نخلي السفر تجربة تحب تكررها، وحابين ان كل الناس تعيش الحياة تِرحال. 🐪
              </p>

              {/* Contact Information */}
              <p className="text-black font-semibold flex items-center mt-5  mb-5">
                <i className="fas fa-envelope mr-2 text-orange-500"></i>
                Email: <span className="ml-2">Tirhal.eg@gmail.com</span>
              </p>
              <p className="text-black font-semibold flex items-center  mb-5">
                <i className="fab fa-whatsapp mr-2 text-orange-500"></i>
                <span className="ml-2">010 98815309</span>
              </p>
              <p className="text-black font-semibold flex items-center  mb-5">
                <i className="fas fa-map-marker-alt mr-2 text-orange-500"></i>
                 <span className="ml-2">Tanta, Egypt</span>
              </p>
              <p className="text-black font-semibold flex items-center  mb-5">
                <i className="fas fa-globe mr-2 text-orange-500"></i>
                 <span className="ml-2">tirhal.eg</span>
              </p>

              {/* Open/Closed Now */}
              <div
                className="cursor-pointer mb-5"
                onClick={() => setShowWorkingTimesModal(true)}
              >
                <p
                  className={`font-semibold ${
                    isOpenNow() ? "text-green-500" : "text-red-500"
                  }`}
                >
                  {isOpenNow() ? "Open now" : "Closed now"}
                </p>
              </div>

              {/* Reviews Link */}
              <p
                className="text-black font-semibold mt-3 cursor-pointer hover:text-orange-500"
                onClick={() => setActiveTab("Review")}
              >
                100% recommend (18 Reviews)
              </p>
            </div>
          </div>

          {/* Center Column (Larger) - Fixed Width */}
          <div className="w-[750px]"> {/* Fixed width */}
            {/* Navigation Tabs */}
            <div className="flex justify-between border-b-2 border-gray-200 mb-5">
              <button 
                className={`pb-2 px-4 text-gray-600 font-semibold ${activeTab === "Posts" ? "border-b-2 border-[#DF6951]" : ""}`}
                onClick={() => setActiveTab("Posts")}
              >
                Posts
              </button>
              <button 
                className={`pb-2 px-4 text-gray-600 font-semibold ${activeTab === "Description" ? "border-b-2 border-[#DF6951]" : ""}`}
                onClick={() => setActiveTab("Description")}
              >
                Description
              </button>
              <button 
                className={`pb-2 px-4 text-gray-600 font-semibold ${activeTab === "All Trips" ? "border-b-2 border-[#DF6951]" : ""}`}
                onClick={() => setActiveTab("All Trips")}
              >
                All Trips
              </button>
              <button 
                className={`pb-2 px-4 text-gray-600 font-semibold ${activeTab === "Photos" ? "border-b-2 border-[#DF6951]" : ""}`}
                onClick={() => setActiveTab("Photos")}
              >
                Photos
              </button>
              <button 
                className={`pb-2 px-4 text-gray-600 font-semibold ${activeTab === "Review" ? "border-b-2 border-[#DF6951]" : ""}`}
                onClick={() => setActiveTab("Review")}
              >
                Review
              </button>
            </div>

            {/* Render Content Based on Active Tab */}
            {renderContent()}
          </div>

          {/* Right Column (Smaller) - Fixed */}
          <div className="flex-1 sticky top-5 h-[calc(100vh-40px)] ">
            {/* Similar Companies */}
            <div className="bg-white p-5 rounded-lg shadow-md mb-5">
              <h2 className="text-xl font-bold mb-5 text-orange-500">Similar Companies</h2>
              {similarCompanies.map((company) => (
                <div key={company.id} className="flex items-center mb-4">
                  <img
                    src={company.image}
                    alt={company.name}
                    className="w-10 h-10 rounded-full mr-3"
                  />
                  <div>
                    <h3 className="font-semibold">{company.name}</h3>
                    <p className="text-sm text-gray-600">{company.email}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Upcoming Travels */}
            <div className="bg-white p-5 rounded-lg shadow-md mb-5">
              <h2 className="text-xl font-bold mb-5 text-orange-500">Upcoming Travels</h2>
              {upcomingTravels.map((travel) => (
                <div key={travel.id} className="flex items-center mb-4">
                  <img
                    src={travel.image}
                    alt={travel.location}
                    className="w-10 h-10 rounded-full mr-3"
                  />
                  <div className="flex-1">
                    <h3 className="font-semibold">{travel.location}</h3>
                    <p className="text-sm text-gray-600">{formatDate(travel.date)}</p>
                  </div>
                  <div className="text-sm text-gray-600">
                    {travel.daysLeft} days left
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Working Hours Modal */}
      {showWorkingTimesModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-md w-full">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-900">Working Hours</h2>
                <button 
                  onClick={() => setShowWorkingTimesModal(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <X size={24} />
                </button>
              </div>

              {/* Working Hours List */}
              <div className="space-y-4">
                {workingHours.map((day, index) => (
                  <div key={index} className="flex justify-between">
                    <p className="text-gray-700">{day.day}</p>
                    <p className="text-gray-700">{day.hours}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CompaniesPage;