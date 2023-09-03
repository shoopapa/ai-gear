"use client"
// components/ContactForm.js

import React, { useState } from 'react';

const ContactForm = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    subject: '',
    country: 'United States',
    message: '',
    agreeToPrivacyPolicy: false,
  });

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    const inputValue = type === 'checkbox' ? checked : value;

    setFormData({
      ...formData,
      [name]: inputValue,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here, you can implement the logic to send the form data to your backend or support email
    console.log(formData); // For demonstration purposes, log the form data
  };

  return (
    <div className="max-w-4xl mx-auto bg-gray-900 p-6 rounded-lg shadow-md" data-aos="fade-up" data-aos-delay="400">
      <form onSubmit={handleSubmit}>
        <div className="flex flex-wrap -mx-4 mb-4">
          <div className="w-full md:w-1/2 px-4 mb-4">
            <label htmlFor="firstName" className="block text-gray-200 text-sm font-bold mb-1">First Name *</label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              value={formData.firstName}
              onChange={handleInputChange}
              className="w-full border border-gray-300 rounded px-3 py-2 bg-gray-700 text-gray-200 focus:outline-none focus:border-indigo-500"
              required
            />
          </div>
          <div className="w-full md:w-1/2 px-4 mb-4">
            <label htmlFor="lastName" className="block text-gray-200 text-sm font-bold mb-1">Last Name *</label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              value={formData.lastName}
              onChange={handleInputChange}
              className="w-full border border-gray-300 rounded px-3 py-2 bg-gray-700 text-gray-200 focus:outline-none focus:border-indigo-500"
              required
            />
          </div>
        </div>
        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-200 text-sm font-bold mb-1">Email *</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            className="w-full border border-gray-300 rounded px-3 py-2 bg-gray-700 text-gray-200 focus:outline-none focus:border-indigo-500"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="subject" className="block text-gray-200 text-sm font-bold mb-1">Subject *</label>
          <input
            type="text"
            id="subject"
            name="subject"
            value={formData.subject}
            onChange={handleInputChange}
            className="w-full border border-gray-300 rounded px-3 py-2 bg-gray-700 text-gray-200 focus:outline-none focus:border-indigo-500"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="country" className="block text-gray-200 text-sm font-bold mb-1">Country</label>
          <select
            id="country"
            name="country"
            value={formData.country}
            onChange={handleInputChange}
            className="w-full border border-gray-300 rounded px-3 py-2 bg-gray-700 text-gray-200 focus:outline-none focus:border-indigo-500"
          >
            <option value="United States">United States</option>
            {/* Add other country options here */}
          </select>
        </div>
        <div className="mb-4">
          <label htmlFor="message" className="block text-gray-200 text-sm font-bold mb-1">Message</label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleInputChange}
            className="w-full border border-gray-300 rounded px-3 py-2 bg-gray-700 text-gray-200 focus:outline-none focus:border-indigo-500"
            rows="4"
            required
          ></textarea>
        </div>
        <div className="mb-4">
          <label className="block text-gray-200 text-sm font-bold mb-1">
            <input
              type="checkbox"
              id="agreeToPrivacyPolicy"
              name="agreeToPrivacyPolicy"
              checked={formData.agreeToPrivacyPolicy}
              onChange={handleInputChange}
              className="mr-2"
              required
            />
            I agree to the privacy policy
          </label>
        </div>
        <div className="text-center">
          <button
            type="submit"
            className="bg-indigo-500 text-white hover:bg-indigo-600 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Send
          </button>
        </div>
      </form>
    </div>
  );
};

export default ContactForm;
