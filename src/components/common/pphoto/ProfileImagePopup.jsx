import { useEffect, useState } from "react";
import "./ProfileImagePopup.css";
import Button from "../button/Button";
import { updateProfilePhoto } from "../../../services/userService";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { updateUser } from "../../../redux/slices/userSlice";

export default function ProfileImagePopup({
  imageFile,
  showModal,
  setShowModal,
  changeImage,
  userId
}) {
  const dispatch = useDispatch();
  const [selectedFile, setSelectedFile] = useState(null);
  const [preview, setPreview] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (imageFile) {
      setPreview(URL.createObjectURL(imageFile));
      setSelectedFile(imageFile);
    }
  }, [imageFile]);

  const handleCancel = () => {
    if (preview) URL.revokeObjectURL(preview);

    setSelectedFile(null);
    setPreview("");
    setShowModal(false);
  };

  const handleUpload = async () => {
    try {
      setLoading(true);
      const formData = new FormData();
      formData.append("userId", userId);
      formData.append("avatar", imageFile);
      const response = await updateProfilePhoto(formData);
      setLoading(false);
      if( response.success ) {
        toast.success("Profile photo updated successfully");
        dispatch(updateUser({
          avatar: response.avatar
        }));
        setShowModal(false);
      } else {
        toast.error("Failed to update profile photo");
      }
    } catch (error) {
      setLoading(false);
      toast.error("Failed to update profile photo");
    }
  };

  return (
    <>
      {showModal && (
        <div className="image-modal-overlay">
          <div className="image-modal">
            <h3>Preview Profile Image</h3>

            <img src={preview} alt="Preview" className="preview-image" />

            <div className="modal-actions">
              <div className="modal-actions-row">
                <Button loading={loading} onClick={handleUpload}>
                  Upload
                </Button>
                <Button disabled={loading} onClick={changeImage}>
                  Change
                </Button>
              </div>

              <Button disabled={loading} onClick={handleCancel}>
                Cancel
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}