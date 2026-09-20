import "./CreateVideo.css";
import usePageTitle from "../../../../../hooks/usePageTitle";
import { useSelector } from "react-redux";
import { useState } from "react";

const CreateVideo = () => {
    usePageTitle("AI Video Creation | AISerbisyosStudio");
    const user = useSelector((state) => state.user.profile);
    const plan = useSelector((state) => state.user.plan);
    const [prompt, setPrompt] = useState("");

}

export default CreateVideo;