import React, { useState } from "react";

const Notifications = () => {
  const [emailVerified, setEmailVerified] = useState(false);
  const [mobileVerified, setMobileVerified] = useState(false);
  const [emailNotifications, setEmailNotifications] = useState(false);
  const [mobileNotifications, setMobileNotifications] = useState(false);
  const [showEmailVerification, setShowEmailVerification] = useState(false);
  const [showMobileVerification, setShowMobileVerification] = useState(false);
  const [email, setEmail] = useState("user@example.com");
  const [mobileNumber, setMobileNumber] = useState("");

  const handleEmailVerification = () => {
    // Simulate email verification
    setEmailVerified(true);
    setShowEmailVerification(false);
  };

  const handleMobileVerification = () => {
    // Simulate mobile verification
    setMobileVerified(true);
    setShowMobileVerification(false);
  };

  const handleSaveChanges = () => {
    // Here you would typically make an API call to save the notification preferences
    console.log("Saving notification preferences...");
  };

  return (
    <div className="text-white text-lg">
      <h2 className="text-2xl font-semibold mb-6">Notification Preferences</h2>

      {/* Email Notifications Section */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-medium">Email Notifications</h3>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={emailNotifications}
              onChange={(e) => {
                if (!emailVerified) {
                  setShowEmailVerification(true);
                } else {
                  setEmailNotifications(e.target.checked);
                }
              }}
              className="sr-only peer"
              aria-label="Toggle email notifications"
            />
            <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-red-600"></div>
          </label>
        </div>

        {showEmailVerification && (
          <div className="bg-zinc-800 p-4 rounded-lg mb-4">
            <p className="text-gray-300 mb-4">
              To enable email notifications, please verify your email address.
            </p>
            <div className="flex items-center gap-4">
              <span className="text-gray-400">{email}</span>
              {!emailVerified && (
                <button
                  onClick={handleEmailVerification}
                  className="bg-zinc-700 text-white font-medium px-6 py-2 text-base rounded border border-zinc-600 tracking-widest hover:bg-zinc-600 transition-colors duration-200"
                >
                  Verify Email
                </button>
              )}
            </div>
          </div>
        )}

        {emailVerified && (
          <div className="text-green-500 text-sm mb-2">✓ Email verified</div>
        )}
      </div>

      {/* Mobile Notifications Section */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-medium">Mobile Notifications</h3>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={mobileNotifications}
              onChange={(e) => {
                if (!mobileVerified) {
                  setShowMobileVerification(true);
                } else {
                  setMobileNotifications(e.target.checked);
                }
              }}
              className="sr-only peer"
              aria-label="Toggle mobile notifications"
            />
            <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-red-600"></div>
          </label>
        </div>

        {showMobileVerification && (
          <div className="bg-zinc-800 p-4 rounded-lg mb-4">
            <p className="text-gray-300 mb-4">
              To enable mobile notifications, please verify your mobile number.
            </p>
            <div className="flex items-center gap-4">
              <input
                type="tel"
                value={mobileNumber}
                onChange={(e) => setMobileNumber(e.target.value)}
                placeholder="Enter your mobile number"
                className="bg-zinc-700 text-white px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-red-500 w-64"
              />
              <button
                onClick={handleMobileVerification}
                className="bg-zinc-700 text-white font-medium px-6 py-2 text-base rounded border border-zinc-600 tracking-widest hover:bg-zinc-600 transition-colors duration-200"
              >
                Verify Mobile
              </button>
            </div>
          </div>
        )}

        {mobileVerified && (
          <div className="text-green-500 text-sm mb-2">
            ✓ Mobile number verified
          </div>
        )}
      </div>

      {/* Save Changes Button */}
      {(emailVerified || mobileVerified) && (
        <button
          onClick={handleSaveChanges}
          className="bg-zinc-700 text-white font-medium px-4 py-1 text-sm rounded border border-zinc-600 tracking-widest hover:bg-zinc-600 transition-colors duration-200"
        >
          Save Changes
        </button>
      )}
    </div>
  );
};

export default Notifications;
