import './Hero.css'
import thumbnail1 from "../../../../../assets/icons/thumbnails/preview1.jpg";
import thumbnail2 from "../../../../../assets/icons/thumbnails/preview2.jpeg";
import thumbnail3 from "../../../../../assets/icons/thumbnails/preview3.jpg";
import thumbnail4 from "../../../../../assets/icons/thumbnails/preview4.jpg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faImage } from "@fortawesome/free-solid-svg-icons";
import { faVideo } from "@fortawesome/free-solid-svg-icons";
import {
  FaMagic,
  FaCut,
  FaPlay,
  FaImage,
  FaVideo,
  FaUsers,
  FaRocket,
} from "react-icons/fa";
import { IoArrowForward } from "react-icons/io5";
import { useState } from "react";
import { useNavigate } from 'react-router-dom';

const Hero = () => {
  const navigate = useNavigate();
  const [stats, setStats] = useState({
    usersCount: 0,
    imageCount: 0,
    videoCount: 0,
  });
  return (
    <section className="hero">
      <div className="hero-left">
        <div className="hero-badge">✨ Transform Your Imagination</div>
        <h1 className="hero-title">
          Create Amazing
          <br />
          <span>Images & Videos</span>
          <br />
          With AI
        </h1>
        <p className="hero-description">Generate, edit, and enhance stunning visual content in seconds using advanced AI-powered tools.</p>
        <div className="hero-actions">
          <button className="btn-primary" onClick={() => navigate("/features/image/create")}>
            Start Creating <IoArrowForward className="btn-icon" />
          </button>

          <button className="btn-secondary">
            <FaPlay className="btn-icon" /> Watch Demo
          </button>
        </div>

        <div className="hero-stats">
          <div className="hero-stat-item">
            <div className="stat-items-header">
              <FaImage className="stat-icon image-icon" />
              <h3>{stats?.imageCount}</h3>
            </div>
            <p>Images Generated</p>
          </div>

          <div className="hero-stat-item">
            <div className="stat-items-header">
              <FaVideo className="stat-icon video-icon" />
              <h3>{stats?.videoCount}</h3>
            </div>
            <p>Videos Generated</p>
          </div>

          <div className="hero-stat-item">
            <div className="stat-items-header">
              <FaUsers className="stat-icon users-icon" />
              <h3>{stats?.usersCount}</h3>
            </div>
            <p>Active Creators</p>
          </div>

          <div className="hero-stat-item">
            <div className="stat-items-header">
              <FaRocket className="stat-icon uptime-icon" />
              <h3>99.9%</h3>
            </div>
            <p>Platform Uptime</p>
          </div>
        </div>
      </div>
      <div className="hero-right">
        <div className="hero-img-wrapper">
          <div className="feature-card card-1">
            <div className="card-header">
              <div className="card-icon purple">
                <FontAwesomeIcon icon={faImage} />
              </div>
              <div>
                <h4>Text to Image</h4>
                <p>Generate stunning images from text</p>
              </div>
            </div>

            <div className="card-preview">
              <img src={thumbnail1} alt="" />
            </div>
          </div>

          <div className="feature-card card-2">
            <div className="card-header">
              <div className="card-icon blue">
                <FontAwesomeIcon icon={faVideo} />
              </div>
              <div>
                <h4>Text to Video</h4>
                <p>Create videos from your ideas</p>
              </div>
            </div>

            <div className="card-preview">
              <img src={thumbnail2} alt="" />
            </div>
          </div>

          <div className="feature-card card-3">
            <div className="card-header">
              <div className="card-icon green">
                <FaMagic />
              </div>
              <div>
                <h4>Image to Image</h4>
                <p>Transform your images beautifully</p>
              </div>
            </div>

            <div className="card-preview">
              <img src={thumbnail3} alt="" />
            </div>
          </div>

          <div className="feature-card card-4">
            <div className="card-header">
              <div className="card-icon pink">
                <FaCut />
              </div>
              <div>
                <h4>Background Removal</h4>
                <p>Remove background in one click</p>
              </div>
            </div>

            <div className="card-preview">
              <img src={thumbnail4} alt="" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;