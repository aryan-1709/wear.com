import React, { useState, useContext, useEffect } from "react";
import { UserContext } from "../Contexts/userContext";
import axios from "axios"

const ContactUs = () => {
  const { userInfo } = useContext(UserContext);
  const [formData, setFormData] = useState({
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [authErrorMessage, setAuthErrorMessage] = useState("");
  const [myQuery, setMyQuery] = useState([]);
  const [showQueries, setShowQueries] = useState(false);

  useEffect(() => {
    if(!userInfo)
      return;
    setMyQuery(userInfo.support);
  }, [userInfo])

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
      let res = await Promise.all([axios.post(`${process.env.REACT_APP_SERVER_URL}/user/support`, {subject: formData.subject, message: formData.message, userId: userInfo._id })]);
      res = res[0].data;
      if (res.ok) {
        const newQuery = await res.query;
        setSuccessMessage("Your message has been sent successfully!");
        setFormData({
          subject: "",
          message: "",
        });

        setMyQuery((prevQueries) => [newQuery, ...prevQueries]);
      } else {
        const errorData = res;
        setErrorMessage(errorData.msg || "An error occurred. Please try again.");
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
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
      <div className="max-w-md w-full bg-white shadow-md rounded-lg p-8">
        <h1 className="text-2xl font-bold mb-6 text-gray-800">Contact Us</h1>
        {authErrorMessage && <p className="text-red-600 mb-4">{authErrorMessage}</p>}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="subject" className="block text-gray-700 font-semibold mb-1">
              Subject
            </label>
            <input
              type="text"
              id="subject"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div>
            <label htmlFor="message" className="block text-gray-700 font-semibold mb-1">
              Message
            </label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows="4"
              required
            ></textarea>
          </div>
          <button
            type="submit"
            className={`w-full py-2 px-4 text-white bg-blue-500 rounded-md shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 ${
              isSubmitting || !userInfo ? "opacity-50 cursor-not-allowed" : ""
            }`}
            disabled={isSubmitting || !userInfo}
          >
            {isSubmitting ? "Submitting..." : "Send Message"}
          </button>
          {successMessage && <p className="text-green-600">{successMessage}</p>}
          {errorMessage && <p className="text-red-600">{errorMessage}</p>}
        </form>
        <button
          onClick={handleToggleQueries}
          className="mt-6 w-full py-2 px-4 text-white bg-gray-500 rounded-md shadow-md hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50"
        >
          {showQueries ? "Hide Queries" : "Your Queries"}
        </button>
        {showQueries && (
          <div className="mt-4 bg-gray-50 p-4 border border-gray-200 rounded-md">
            <h2 className="text-lg font-semibold text-gray-700 mb-2">Previous Queries</h2>
            {myQuery.length > 0 ? (
              <ul className="space-y-2">
                {myQuery.map((query) => (
                  <li key={query._id} className="p-4 border border-gray-200 rounded-md shadow-sm">
                    <p className="font-bold text-gray-800">{query.subject}</p>
                    <p className="text-gray-600">{query.message}</p>
                    <p className={`text-sm ${query.resolved ? "text-green-600" : "text-red-600"}`}>
                      {query.resolved ? "Resolved" : "Unresolved"}
                    </p>
                    <p className="text-xs text-gray-500">{new Date(query.createdAt).toLocaleString()}</p>
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
