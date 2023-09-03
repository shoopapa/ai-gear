// SupportPage.js

import React from 'react';

const SupportPage = () => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <header className="bg-blue-500 py-4">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-extrabold text-white">AI Gear Support</h1>
        </div>
      </header>

      {/* Page Content */}
      <div className="flex-grow">
        <div className="py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold text-gray-900">Contact Support</h2>
            <p className="mt-2 text-md text-gray-600">
              If you have any questions or need assistance, please don't hesitate to contact us.
            </p>
            <div className="mt-6">
              <p className="text-lg font-medium text-gray-900">Email Support</p>
              <p className="mt-1 text-md text-gray-600">
                You can reach out to us at{' '}
                <a href="mailto:joe@ai-gear.com" className="text-blue-500 hover:underline">
                  joe@ai-gear.com
                </a>
                .
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-blue-500 py-4">
        <div className="max-w-3xl mx-auto text-center text-white">
          &copy; {new Date().getFullYear()} AI Gear. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

export default SupportPage;
