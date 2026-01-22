import { useState } from "react";
import Button from "@/components/Button/Button";
import Toggle from "@/components/Toggle/Toggle";
import SettingRow from "@/components/UI/SettingRow";

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
    // Implementation would go here
  };

  return (
    <div className="text-white">
      <h2 className="text-3xl font-bold mb-6">Security Settings</h2>

      {/* Email Notifications Section */}
      <div className="mb-8">
        <SettingRow
          label="Email Notifications"
          action={
            <Toggle
              checked={emailNotifications}
              onChange={(checked: boolean) => {
                if (!emailVerified) {
                  setShowEmailVerification(true);
                } else {
                  setEmailNotifications(checked);
                }
              }}
            />
          }
        />

        {showEmailVerification && (
          <div className="bg-zinc-800 p-4 rounded-lg mb-4">
            <p className="text-gray-300 mb-4">
              To enable email notifications, please verify your email address.
            </p>
            <div className="flex items-center gap-4">
              <span className="text-gray-400">{email}</span>
              {!emailVerified && (
                <Button
                  variant="secondary"
                  onClick={handleEmailVerification}
                  className="px-6 py-2 text-base"
                >
                  Verify Email
                </Button>
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
        <SettingRow
          label="Mobile Notifications"
          action={
            <Toggle
              checked={mobileNotifications}
              onChange={(checked: boolean) => {
                if (!mobileVerified) {
                  setShowMobileVerification(true);
                } else {
                  setMobileNotifications(checked);
                }
              }}
            />
          }
        />

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
              <Button
                variant="secondary"
                onClick={handleMobileVerification}
                className="px-6 py-2 text-base"
              >
                Verify Mobile
              </Button>
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
        <Button variant="secondary" onClick={handleSaveChanges} size="sm">
          Save Changes
        </Button>
      )}
    </div>
  );
};

export default Notifications;
