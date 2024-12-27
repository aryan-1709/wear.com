import React, { useState, useContext, useEffect } from "react";
import { UserContext } from "../Contexts/userContext";
import axios from "axios";

const ContactUs = () => {
  const { userInfo } = useContext(UserContext);
  const [formData, setFormData] = useState({
    subject: "",
    message: "",
    email: "",
    mobile: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [authErrorMessage, setAuthErrorMessage] = useState("");
  const [myQuery, setMyQuery] = useState([]);
  const [showQueries, setShowQueries] = useState(false);

  useEffect(() => {
    if (!userInfo) return;
    setMyQuery(userInfo.support);
  }, [userInfo]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!userInfo) {
      setAuthErrorMessage("You must be logged in to send a message.");
      return;
    }

    setIsSubmitting(true);
    setSuccessMessage("");
    setErrorMessage("");
    setAuthErrorMessage("");

    try {
      let res = await axios.post(
        `${process.env.REACT_APP_SERVER_URL}/user/support`,
        {
          subject: formData.subject,
          message: formData.message,
          email: formData.email,
          mobile: formData.mobile,
          userId: userInfo._id,
        }
      );
      res = res.data;
      if (res.ok) {
        const newQuery = await res.query;
        setSuccessMessage("Your message has been sent successfully!");
        setFormData({
          subject: "",
          message: "",
          email: "",
          mobile: "",
        });
        setMyQuery((prevQueries) => [newQuery, ...prevQueries]);
      } else {
        setErrorMessage(res.msg || "An error occurred. Please try again.");
      }
    } catch (error) {
      setErrorMessage("An error occurred. Please try again.");
      console.log(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleToggleQueries = () => {
    setShowQueries((prev) => !prev);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8">
      <div className="max-w-2xl mx-auto bg-white shadow-lg rounded-lg p-6 sm:p-8 lg:p-10">
        <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">
          Contact Us
        </h1>

        {/* Company Information */}
        <div className="mb-8 text-start space-y-4 bg-gray-100 p-4 sm:p-6 rounded-lg shadow-sm">
          <p className="text-lg font-medium text-gray-800">
            <span className="font-bold text-blue-600 underline">Our Email:</span>{" "}
            av9451174188@gmail.com
          </p>
          <p className="text-lg font-medium text-gray-800">
            <span className="font-bold text-blue-600  underline">Our Mobile:</span>{" "}
            +91-9532983109
          </p>
          <p className="text-lg font-medium text-gray-800">
            <span className="font-bold text-blue-600 underline">Our Address:</span> 2/656,
            Panchwati, Ramnagar, Varanasi, Uttar Pradesh
          </p>
        </div>

        {authErrorMessage && (
          <p className="text-red-600 mb-4 text-center">{authErrorMessage}</p>
        )}

        {/* Contact Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="email"
              className="block text-gray-700 font-semibold mb-2"
            >
              Email Address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label
              htmlFor="mobile"
              className="block text-gray-700 font-semibold mb-2"
            >
              Mobile Number
            </label>
            <input
              type="tel"
              id="mobile"
              name="mobile"
              value={formData.mobile}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label
              htmlFor="subject"
              className="block text-gray-700 font-semibold mb-2"
            >
              Subject
            </label>
            <input
              type="text"
              id="subject"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label
              htmlFor="message"
              className="block text-gray-700 font-semibold mb-2"
            >
              Message
            </label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows="4"
              required
            ></textarea>
          </div>

          <button
            type="submit"
            className={`w-full py-3 px-4 text-white font-semibold bg-blue-500 rounded-lg shadow-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 ${
              isSubmitting || !userInfo ? "opacity-50 cursor-not-allowed" : ""
            }`}
            disabled={isSubmitting || !userInfo}
          >
            {isSubmitting ? "Submitting..." : "Send Message"}
          </button>

          {successMessage && (
            <p className="text-green-600 text-center mt-4">{successMessage}</p>
          )}
          {errorMessage && (
            <p className="text-red-600 text-center mt-4">{errorMessage}</p>
          )}
        </form>

        {/* Toggle Previous Queries */}
        <button
          onClick={handleToggleQueries}
          className="mt-6 w-full py-3 px-4 text-white bg-gray-500 rounded-lg shadow-lg hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50"
        >
          {showQueries ? "Hide Previous Queries" : "View Previous Queries"}
        </button>

        {showQueries && (
          <div className="mt-4 bg-gray-50 p-4 border border-gray-200 rounded-lg">
            <h2 className="text-lg font-semibold text-gray-700 mb-2">
              Your Previous Queries
            </h2>
            {myQuery.length > 0 ? (
              <ul className="space-y-4">
                {myQuery.map((query) => (
                  <li
                    key={query._id}
                    className="p-4 border border-gray-300 rounded-lg shadow-sm bg-white"
                  >
                    <p className="font-bold text-gray-800">{query.subject}</p>
                    <p className="text-gray-600">{query.message}</p>
                    <p
                      className={`text-sm ${
                        query.resolved ? "text-green-600" : "text-red-600"
                      }`}
                    >
                      {query.resolved ? "Resolved" : "Unresolved"}
                    </p>
                    <p className="text-xs text-gray-500">
                      {new Date(query.createdAt).toLocaleString()}
                    </p>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-600">You have no previous queries.</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ContactUs;
