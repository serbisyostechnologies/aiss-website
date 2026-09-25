import "./UserProfile.css";
import { User, Trash2, EllipsisVertical, ImageUp } from "lucide-react";
import { getProfile, removeProfilePhoto } from "../../../services/userService";
import { useDispatch } from "react-redux";
import FullScreenLoader from "../../common/floader/FullScreenLoader";
import { useEffect, useRef, useState } from "react";
import Input from "../../common/input/Input";
import Button from "../../common/button/Button";
import ProfileImagePopup from "../../../components/common/pphoto/ProfileImagePopup";
import { toast } from "react-toastify";
import { updateUser } from "../../../redux/slices/userSlice";
import { updatePassword } from "../../../services/authService";
import { sendEmailOtp, sendMobileOtp } from "../../../services/otpService";
import VerifyEmailOtp from "../../common/otp/VerifyEmailOtp";

export default function UserProfile({ user }) {
  const dispatch = useDispatch();
  const [profile, setProfile] = useState(null);
  const [plan, setPlan] = useState({});
  const [usage, setUsage] = useState({});
  const [eloading, setEloading] = useState(false);
  const [ploading, setPloading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [buttonLoading, setButtonLoading] = useState(false);
  const [enableEditing, setEnableEditing] = useState(false);
  const [errors, setErrors] = useState({});
  const [perrors, setPerrors] = useState({});
  const [touched, setTouched] = useState({});
  const [ptouched, setPtouched] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [psubmitted, setPsubmitted] = useState(false);
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [profileImage, setProfileImage] = useState(null);
  const [showMenu, setShowMenu] = useState(false);
  const [showOtp, setShowOtp] = useState(false);
  const [otpFrom, setOtpFrom] = useState(null);
  const fileInputRef = useRef(null);
  const menuRef = useRef(null);
  const [passwords, setPasswords] = useState({
    current: "",
    new: "",
    confirm: "",
  });

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const getUserProfile = async () => {
    try {
      const userId = user._id;
      setLoading(true);
      const response = await getProfile({ userId });
      setLoading(false);
      if (response.success) {
        setProfile(response.profile.user);
        setPlan(response.profile.plan);
        setUsage(response.profile.usage);
      } else {
        setProfile({});
        setPlan({});
        setUsage({});
      }
    } catch (error) {
      setLoading(false);
      setProfile({});
      setPlan({});
      setUsage({});
    }
  };

  useEffect(() => {
    getUserProfile();
  }, []);

  const cancelEdit = () => {
    setEnableEditing(false);
    resetProfileForm();
  };

  const resetProfileForm = () => {
    setSubmitted(false);
    setProfile({
      name: user.name,
      email: user.email,
      mobile: user.mobile,
    });
    setErrors({});
  };

  const resetPasswordForm = () => {
    setPsubmitted(false);
    setPasswords({
      current: "",
      new: "",
      confirm: "",
    });
    setPerrors({});
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setProfile((prev) => ({
      ...prev,
      [name]: value,
    }));

    setErrors((prev) => ({
      ...prev,
      [name]: undefined,
    }));
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;

    setPasswords((prev) => ({
      ...prev,
      [name]: value,
    }));

    setPerrors((prev) => ({
      ...prev,
      [name]: undefined,
    }));
  };

  const handlePasswordBlur = (e) => {
    const { name } = e.target;

    setPtouched((prev) => ({
      ...prev,
      [name]: true,
    }));
  };

  const handleBlur = (e) => {
    const { name } = e.target;

    setTouched((prev) => ({
      ...prev,
      [name]: true,
    }));
  };

  const handleSubmit = (callback) => (e) => {
    e.preventDefault();
    setSubmitted(true);

    const validationErrors = runValidation(profile);
    setErrors(validationErrors || {});

    if (Object.keys(validationErrors).length === 0) {
      callback(profile);
    }
  };

  const runValidation = (currentValues) => {
    const validationErrors = validate(currentValues, t);
    setErrors(validationErrors || {});
    return validationErrors || {};
  };

  const validate = (values, t) => {
    const errors = {};

    const validateEmail = (email) => {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(email);
    };

    if (!values.name.trim()) {
      errors.name = "Please enter your full name";
    }

    if (!values.mobile.trim()) {
      errors.mobile = "Please enter your mobile number";
    } else if (!/^\d{10}$/.test(values.mobile)) {
      errors.mobile = "Please enter 10 digits mobile number";
    } else if (!/^[6-9]\d{9}$/.test(values.mobile)) {
      errors.mobile = "Please enter a mobiel number which starts with 6/7/8/9";
    }

    if (!values.email.trim()) {
      errors.email = "Please enter your email address";
    } else if (!validateEmail(values.email)) {
      errors.email = "Please enter valid email address";
    }
    return errors;
  };

  const validatePasswords = (values, t) => {
    const errors = {};

    if (!values.current.trim()) {
      errors.current = "Please enter your current password";
    }

    if (!values.new.trim()) {
      errors.new = "Please enter new password";
    }

    if (!values.confirm.trim()) {
      errors.confirm = "Please enter new password again";
    }

    if (values.new.trim() !== values.confirm.trim()) {
      errors.new = "";
      errors.confirm = "New password and confirm password not matching";
    }
    return errors;
  };

  const runPasswordValidation = (currentValues) => {
    const validationErrors = validatePasswords(currentValues, t);
    setErrors(validationErrors || {});
    return validationErrors || {};
  };

  const handlePasswordSubmit = (callback) => (e) => {
    e.preventDefault();
    setPsubmitted(true);

    const validationErrors = runPasswordValidation(passwords);
    setPerrors(validationErrors || {});

    if (Object.keys(validationErrors).length === 0) {
      callback(passwords);
    }
  };

  const updateUserProfile = async (data) => {};

  const updateUserPassword = async (data) => {
    try {
      setPloading(true);
      const response = await updatePassword({
        userId: user._id,
        currentPassword: passwords.current,
        newPassword: passwords.new,
      });
      setPloading(false);
      if (response.success) {
        resetPasswordForm();
        toast.success("Password updated successfully");
      } else {
        toast.error("Failed to update password");
      }
    } catch (error) {
      setPloading(false);
      toast.error(error.response?.data?.message || "Failed to update password");
    }
  };

  const showError = (field) => (touched[field] || submitted) && errors[field];
  const showPasswordError = (field) =>
    (ptouched[field] || psubmitted) && perrors[field];

  const sendOtps = () => {};

  const handleIconClick = () => {
    setShowProfileModal(false);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
      fileInputRef.current.click();
    }
  };

  const handleRemovePhoto = async () => {
    try {
      setLoading(true);
      const response = await removeProfilePhoto({ userId: user._id });
      setLoading(false);
      if (response.success) {
        dispatch(
          updateUser({
            avatar: "",
          }),
        );
        toast.success("Profile photo removed successfully");
      } else {
        toast.error("Faile to remove profile photo");
      }
    } catch (error) {
      setLoading(false);
      toast.error("Faile to remove profile photo");
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      setProfileImage(file);
      setShowProfileModal(true);
    }
    e.target.value = "";
  };

  const sendMobileOtpClick = async () => {
    try {
      setOtpFrom("MOBILE");
      setShowOtp(false);
      setLoading(true);
      const mobile = `+91${user.mobile}`;
      const response = await sendMobileOtp({ mobile });
      setLoading(false);
      if (response.success) {
        toast.success("Mobile otp sent successfully");
        setShowOtp(true);
      } else {
        toast.error("Failed to send email otp");
      }
    } catch (error) {
      setLoading(false);
      toast.error("Failed to send email otp");
    }
  }

  const sendEmailOtpClick = async () => {
    try {
      setOtpFrom("EMAIL");
      setShowOtp(false);
      setLoading(true);
      const response = await sendEmailOtp({ email: user.email });
      setLoading(false);
      if (response.success) {
        toast.success("Email otp sent successfully");
        setShowOtp(true);
      } else {
        toast.error("Failed to send email otp");
      }
    } catch (error) {
      setLoading(false);
      toast.error("Failed to send email otp");
    }
  };

  return (
    <>
      <div className="profile__profile">
        <div className="profile-card">
          <div className="profile-avatar-container">
            <div
              className={`profile-avatar ${!user?.avatar ? "profile-avatar-gradient" : ""}`}
            >
              {user?.avatar ? (
                <img
                  src={user.avatar}
                  alt={user.name || "Profile"}
                  className="profile-avatar-image"
                />
              ) : (
                <User size={45} />
              )}
            </div>

            <div className="menu-wrapper">
              <Button
                className="menu-avatar-btn"
                onClick={() => setShowMenu(!showMenu)}
              >
                <EllipsisVertical size={14} />
              </Button>

              {showMenu && (
                <div className="avatar-menu" ref={menuRef}>
                  <button
                    className="avatar-menu-item"
                    onClick={() => {
                      handleIconClick();
                      setShowMenu(false);
                    }}
                  >
                    <ImageUp size={16} />
                    <span>Update Profile Photo</span>
                  </button>

                  {user?.avatar && (
                    <button
                      className="avatar-menu-item danger"
                      onClick={() => {
                        handleRemovePhoto();
                        setShowMenu(false);
                      }}
                    >
                      <Trash2 size={16} />
                      <span>Remove Profile Photo</span>
                    </button>
                  )}
                </div>
              )}
            </div>
          </div>

          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            style={{ display: "none" }}
          />

          <div className="profile-info">
            <span>{profile ? profile.name : ""}</span>
            <p>{profile ? profile.email : ""}</p>
          </div>
        </div>
        <div className="contact__form">
          <Input
            id="name"
            name="name"
            label="Full Name"
            placeholder="Please enter full name"
            value={profile ? profile.name : ""}
            disabled={!enableEditing}
            onChange={handleChange}
            onBlur={handleBlur}
            error={showError("name") ? errors.name : ""}
            style={{ border: 'none' }}
          />

          <Input
            id="email"
            name="email"
            label="Email Address"
            placeholder="Please enter email address"
            value={profile ? profile.email : ""}
            disabled={!enableEditing}
            onChange={handleChange}
            onBlur={handleBlur}
            error={showError("email") ? errors.email : ""}
            sideButton={true}
            sideButtonText={
              user?.isEmailVerified
                ? "Verified"
                : "Verify Email"
            }
            onSideButtonClick={sendEmailOtpClick}
            sideButtonLoading={buttonLoading}
            sideButtonDisabled={enableEditing || user?.isEmailVerified}
            style={{ border: 'none' }}
          />

          <Input
            id="mobile"
            name="mobile"
            label="Mobile Number"
            placeholder="Please enter mobile number"
            value={profile ? profile.mobile : ""}
            disabled={!enableEditing}
            onChange={handleChange}
            onBlur={handleBlur}
            error={showError("mobile") ? errors.mobile : ""}
            sideButton={true}
            sideButtonText={user?.isMobileVerified
                ? "Verified"
                : "Verify Mobile"
              }
            onSideButtonClick={sendMobileOtpClick}
            sideButtonLoading={buttonLoading}
            sideButtonDisabled={enableEditing || user?.isMobileVerified}
            style={{ border: 'none' }}
          />

          <div
            className="btn-group"
            style={{ display: "flex", justifyContent: "end", marginTop: "0rem", gap: "1rem" }}
          >
            {!enableEditing && (
              <Button
                loading={eloading}
                onClick={() => setEnableEditing(true)}
                style={{ width: "49%", flex: "none" }}
              >
                Edit
              </Button>
            )}

            {enableEditing && (
              <>
                <Button
                  loading={eloading}
                  disabled={eloading}
                  style={{ width: "32%", flex: "none" }}
                  onClick={handleSubmit(updateUserProfile)}
                >
                  Save
                </Button>
                <Button
                  disabled={eloading}
                  style={{ width: "32%", flex: "none" }}
                  onClick={() => resetProfileForm()}
                >
                  Reset
                </Button>
                <Button
                  disabled={eloading}
                  onClick={() => cancelEdit()}
                  style={{ width: "32%", flex: "none" }}
                >
                  Cancel
                </Button>
              </>
            )}
          </div>
        </div>
        <div className="contact__form" style={{ marginTop: "2rem" }}>
          <h3>Change Password</h3>
          <div className="password-group">
            <Input
              id="current"
              name="current"
              setShowPassword={setShowCurrent}
              showPassword={showCurrent}
              rightIcon={true}
              type={showCurrent ? "text" : "password"}
              label="Current Password"
              placeholder="Please enter your current password"
              value={passwords.current}
              onChange={handlePasswordChange}
              onBlur={handlePasswordBlur}
              error={showPasswordError("current") ? perrors.current : ""}
              disabled={ploading}
              sideButton={true}
              sideButtonText="Forgot Password"
              onSideButtonClick={sendOtps}
              sideButtonDisabled={ploading}
              style={{ border: 'none' }}
            />
          </div>
          <div className="password-group">
            <Input
              id="new"
              name="new"
              setShowPassword={setShowNew}
              showPassword={showNew}
              rightIcon={true}
              type={showNew ? "text" : "password"}
              label="New Password"
              placeholder="Please enter new password"
              value={passwords.new}
              onChange={handlePasswordChange}
              onBlur={handlePasswordBlur}
              error={showPasswordError("new") ? perrors.new : ""}
              disabled={ploading}
              style={{ border: 'none' }}
            />
          </div>
          <div className="password-group">
            <Input
              id="confirm"
              name="confirm"
              setShowPassword={setShowConfirm}
              showPassword={showConfirm}
              rightIcon={true}
              type={showConfirm ? "text" : "password"}
              label="Confirm Password"
              placeholder="Please enter new password again"
              value={passwords.confirm}
              onChange={handlePasswordChange}
              onBlur={handlePasswordBlur}
              error={showPasswordError("confirm") ? errors.confirm : ""}
              disabled={ploading}
              style={{ border: 'none' }}
            />
          </div>
          <div
            className="btn-group"
            style={{ display: "flex", justifyContent: "end", marginTop: "0rem", gap: "1rem" }}
          >
            <Button
              loading={ploading}
              disabled={ploading}
              style={{ width: "32%", flex: "none" }}
              onClick={handlePasswordSubmit(updateUserPassword)}
            >
              Save
            </Button>
            <Button
              disabled={ploading}
              style={{ width: "32%", flex: "none" }}
              onClick={() => resetPasswordForm()}
            >
              Reset
            </Button>
          </div>
        </div>
      </div>
      {loading && <FullScreenLoader />}
      <ProfileImagePopup
        imageFile={profileImage}
        showModal={showProfileModal}
        setShowModal={setShowProfileModal}
        changeImage={handleIconClick}
        userId={user._id}
      />
      <VerifyEmailOtp
        otpFrom={otpFrom}
        open={showOtp}
        user={user}
        onResend={() => sendEmailOtpClick()}
        onCancel={() => {
          setShowOtp(false);
        }}
      />
    </>
  );
}