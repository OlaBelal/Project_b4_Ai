import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { X } from "lucide-react";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { companies } from "../types";

interface Review {
  id: number;
  name: string;
  role: string;
  image: string;
  rating: number;
  text: string;
  date: string;
  avatar: string;
}

interface NewReview {
  name: string;
  text: string;
  rating: number;
  avatar?: string;
}

const CompaniesPage = () => {
  const { companyId } = useParams<{ companyId: string }>();
  const company = companies.find(c => c.id.toString() === companyId);
  
  if (!company) {
    return <div>Company not found</div>;
  }

  const [activeTab, setActiveTab] = useState("Posts");
  const [showWorkingTimesModal, setShowWorkingTimesModal] = useState(false);
  const [isFollowing, setIsFollowing] = useState(false);
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [newReview, setNewReview] = useState<NewReview>({
    name: "",
    text: "",
    rating: 0,
    avatar: "https://randomuser.me/api/portraits/lego/1.jpg"
  });
  const [reviews, setReviews] = useState<Review[]>([...company.reviews]);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
  };

  const isOpenNow = () => {
    const now = new Date();
    const hours = now.getHours();
    const minutes = now.getMinutes();
    const currentTime = hours + minutes / 60;

    const today = new Date().toLocaleDateString("en-US", { weekday: "long" });
    const todayHours = company.workingHours.find(wh => wh.day === today);
    
    if (!todayHours || todayHours.hours === "CLOSED") return false;
    if (todayHours.hours === "24/7") return true;
    
    const [openTime, closeTime] = todayHours.hours.split(" - ");
    const openingHour = parseInt(openTime.split(":")[0]);
    const closingHour = parseInt(closeTime.split(":")[0]);
    
    return currentTime >= openingHour && currentTime < closingHour;
  };

  const renderStars = (rating: number) => {
    const fullStars = Math.floor(rating);
    const partialStar = rating - fullStars;
    const emptyStars = 5 - Math.ceil(rating);

    return (
      <div className="flex items-center">
        {[...Array(fullStars)].map((_, i) => (
          <span key={`full-${i}`} className="text-yellow-500">
            <i className="fas fa-star"></i>
          </span>
        ))}

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

        {[...Array(emptyStars)].map((_, i) => (
          <span key={`empty-${i}`} className="text-yellow-500">
            <i className="far fa-star"></i>
          </span>
        ))}

        <span className="ml-2 text-gray-600">{rating.toFixed(1)}</span>
      </div>
    );
  };

  const handleSubmitReview = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const completeReview: Review = {
      id: reviews.length + 1,
      name: newReview.name,
      text: newReview.text,
      rating: newReview.rating,
      date: new Date().toLocaleDateString("en-US", { 
        month: "short", 
        day: "numeric", 
        year: "numeric" 
      }),
      avatar: newReview.avatar || "https://randomuser.me/api/portraits/lego/1.jpg",
      role: "Customer",
      image: ""
    };

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      
      setReviews([completeReview, ...reviews]);
      
      setNewReview({
        name: "",
        text: "",
        rating: 0,
        avatar: "https://randomuser.me/api/portraits/lego/1.jpg"
      });
      setShowReviewForm(false);
    } catch (error) {
      console.error('Error submitting review:', error);
    }
  };

  const handleRatingSelect = (rating: number) => {
    setNewReview({ ...newReview, rating });
  };

  const renderContent = () => {
    switch (activeTab) {
      case "Posts":
        return (
          <div className="bg-white p-5 rounded-lg shadow-md mb-5">
            {company.posts.map((post) => (
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
                {post.image && (
                  <img
                    src={post.image}
                    alt="Post"
                    className="w-full h-64 object-cover rounded-lg"
                  />
                )}
              </div>
            ))}
          </div>
        );
      case "Description":
        return (
          <div className="bg-white p-5 rounded-lg shadow-md mb-5">
            <p className="text-gray-800">{company.description}</p>
          </div>
        );
      case "Photos":
        return (
          <div className="bg-white p-5 rounded-lg shadow-md mb-5">
            <div className="grid grid-cols-3 gap-4">
              {company.photos.map((photo, index) => (
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
            <div className="flex justify-between items-center mb-5">
              <h2 className="text-xl font-bold">Reviews ({reviews.length})</h2>
              <button
                onClick={() => setShowReviewForm(true)}
                className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg transition duration-300"
              >
                Add Review
              </button>
            </div>

            {showReviewForm && (
              <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                <div className="bg-white rounded-xl shadow-2xl max-w-md w-full">
                  <div className="p-6">
                    <div className="flex justify-between items-center mb-6">
                      <h2 className="text-2xl font-bold text-gray-900">Write a Review</h2>
                      <button 
                        onClick={() => setShowReviewForm(false)}
                        className="text-gray-500 hover:text-gray-700"
                      >
                        <X size={24} />
                      </button>
                    </div>

                    <form onSubmit={handleSubmitReview}>
                      <div className="mb-4">
                        <label className="block text-gray-700 mb-2">Your Name</label>
                        <input
                          type="text"
                          value={newReview.name}
                          onChange={(e) => setNewReview({ ...newReview, name: e.target.value })}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                          required
                        />
                      </div>

                      <div className="mb-4">
                        <label className="block text-gray-700 mb-2">Your Rating</label>
                        <div className="flex">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <button
                              key={star}
                              type="button"
                              onClick={() => handleRatingSelect(star)}
                              className="text-2xl mr-2 focus:outline-none"
                            >
                              {star <= newReview.rating ? (
                                <i className="fas fa-star text-yellow-500"></i>
                              ) : (
                                <i className="far fa-star text-yellow-500"></i>
                              )}
                            </button>
                          ))}
                        </div>
                      </div>

                      <div className="mb-4">
                        <label className="block text-gray-700 mb-2">Your Review</label>
                        <textarea
                          value={newReview.text}
                          onChange={(e) => setNewReview({ ...newReview, text: e.target.value })}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                          rows={4}
                          required
                        ></textarea>
                      </div>

                      <button
                        type="submit"
                        className="w-full bg-orange-500 hover:bg-orange-600 text-white py-2 rounded-lg transition duration-300"
                      >
                        Submit Review
                      </button>
                    </form>
                  </div>
                </div>
              </div>
            )}

            {reviews.length === 0 ? (
              <div className="text-center py-10">
                <p className="text-gray-500">No reviews yet. Be the first to review!</p>
              </div>
            ) : (
              reviews.map((review) => (
                <div key={review.id} className="mb-6 pb-6 border-b border-gray-200 last:border-b-0">
                  <div className="flex items-center mb-3">
                    <img
                      src={review.avatar}
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
                  <p className="text-sm text-gray-500 mt-2">{review.date}</p>
                </div>
              ))
            )}
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="font-sans max-w-[1400px] mx-auto p-5">
      <div className="bg-white rounded-lg shadow-md mb-5 max-w-[1300px] mx-auto pt-12">
        <div className="relative">
          <div className="h-72 overflow-hidden rounded-t-lg">
            <img
              src={company.coverImage}
              alt="Cover"
              className="w-full h-full object-cover"
            />
          </div>

          <div className="flex items-center mt-[-75px] px-10 pb-8 z-10 relative">
            <div className="w-36 h-36 rounded-full overflow-hidden border-4 border-white shadow-md">
              <img
                src={company.profileImage}
                alt="Profile"
                className="w-full h-full object-cover"
              />
            </div>

            <div className="ml-5 flex-1">
              <div className="flex items-center">
                <h1 className="text-3xl font-bold text-orange-500 mt-20">{company.name}</h1>
                <div className="ml-3 mt-20">{renderStars(company.rating)}</div>
              </div>
              <p className="text-lg text-gray-600">{company.slogan}</p>
            </div>

            <div className="flex items-center space-x-6 mt-20 ml-10 pr-14 pt-2">
              <a
                href={`https://wa.me/${company.phone.replace(/[^0-9]/g, '')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-green-500 hover:text-green-600"
              >
                <i className="fab fa-whatsapp text-4xl"></i> 
              </a>
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

      <div className="px-5">
        <div className="flex gap-5 mt-5">
          <div className="flex-1 sticky top-5 h-[calc(100vh-40px)] overflow-y-auto no-scrollbar">
            <div className="bg-white p-5 rounded-lg shadow-md">
              <h2 className="text-xl font-bold mb-3">Intro</h2>
              
              <p className="text-gray-800 text-center font-semibold text-lg py-3 border-b-2">
                {company.slogan}
              </p>

              <p className="text-black font-semibold flex items-center mt-5 mb-5">
                <i className="fas fa-envelope mr-2 text-orange-500"></i>
                Email: <span className="ml-2">{company.email}</span>
              </p>
              <p className="text-black font-semibold flex items-center mb-5">
                <i className="fab fa-whatsapp mr-2 text-orange-500"></i>
                <span className="ml-2">{company.phone}</span>
              </p>
              <p className="text-black font-semibold flex items-center mb-5">
                <i className="fas fa-map-marker-alt mr-2 text-orange-500"></i>
                <span className="ml-2">{company.location}</span>
              </p>
              <p className="text-black font-semibold flex items-center mb-5">
                <i className="fas fa-globe mr-2 text-orange-500"></i>
                <span className="ml-2">{company.website}</span>
              </p>

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

              <p
                className="text-black font-semibold mt-3 cursor-pointer hover:text-orange-500"
                onClick={() => setActiveTab("Review")}
              >
                {reviews.length} Reviews
              </p>
            </div>
          </div>

          <div className="w-[750px]">
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
                className={`pb-2 px-4 text-gray-600 font-semibold ${activeTab === "Trips" ? "border-b-2 border-[#DF6951]" : ""}`}
                onClick={() => setActiveTab("Trips")}
              >
                Trips
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

            {renderContent()}
          </div>

          <div className="flex-1 sticky top-5 h-[calc(100vh-40px)]">
            <div className="bg-white p-5 rounded-lg shadow-md mb-5">
              <h2 className="text-xl font-bold mb-5 text-orange-500">Similar Companies</h2>
              {company.similarCompanies.map((comp) => (
                <div key={comp.id} className="flex items-center mb-4">
                  <img
                    src={comp.image}
                    alt={comp.name}
                    className="w-10 h-10 rounded-full mr-3"
                  />
                  <div>
                    <h3 className="font-semibold">{comp.name}</h3>
                    <p className="text-sm text-gray-600">{comp.email}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-white p-5 rounded-lg shadow-md mb-5">
              <h2 className="text-xl font-bold mb-5 text-orange-500">Upcoming Travels</h2>
              {company.upcomingTravels.map((travel) => (
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

              <div className="space-y-4">
                {company.workingHours.map((day, index) => (
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