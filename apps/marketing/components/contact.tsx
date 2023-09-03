"use client"
import React, { useState } from 'react'

const ContactForm = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    subject: '',
    country: 'United States',
    message: '',
    agreeToPrivacyPolicy: false,
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value, type, checked } = e.target as any
    const inputValue = type === 'checkbox' ? checked : value

    setFormData({
      ...formData,
      [name]: inputValue,
    })
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    console.log(formData) // For demonstration purposes, log the form data
  }

  return (
    <div className="max-w-4xl mx-auto bg p-6" data-aos="fade-up" data-aos-delay="400">
      <form onSubmit={handleSubmit}>
        <div className="flex flex-wrap -mx-4 mb-4">
          <div className="w-full md:w-1/2 px-4 mb-4">
            <label className="block text-gray-200 text-sm font-bold mb-1">First Name *</label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              value={formData.firstName}
              onChange={handleInputChange}
              className="w-full border border-gray-00 rounded px-3 py-2 bg-transparent text-gray-200 focus:outline-none focus:border-indigo-500"
              required
            />
          </div>
          <div className="w-full md:w-1/2 px-4 mb-4">
            <label className="block text-gray-200 text-sm font-bold mb-1">Last Name *</label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              value={formData.lastName}
              onChange={handleInputChange}
              className="w-full border border-gray-00 rounded px-3 py-2 bg-transparent text-gray-200 focus:outline-none focus:border-indigo-500"
              required
            />
          </div>
        </div>
        <div className="mb-4">
          <label className="block text-gray-200 text-sm font-bold mb-1">Email *</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            className="w-full border border-gray-00 rounded px-3 py-2 bg-transparent text-gray-200 focus:outline-none focus:border-indigo-500"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-200 text-sm font-bold mb-1">Subject *</label>
          <input
            type="text"
            id="subject"
            name="subject"
            value={formData.subject}
            onChange={handleInputChange}
            className="w-full border border-gray-500 rounded px-3 py-2 bg-transparent text-gray-200 focus:outline-none focus:border-indigo-500"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-200 text-sm font-bold mb-1">Message</label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleInputChange}
            className="w-full border border-gray-00 rounded px-3 py-2 bg-transparent text-gray-200 focus:outline-none focus:border-indigo-500"
            rows={4}
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
      </form >
    </div >
  )
}

export default ContactForm
