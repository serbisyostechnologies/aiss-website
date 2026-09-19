import { useEffect, useState } from "react";
import "./AppFeedbacks.css";
import { FaArrowLeft, FaArrowRight, FaStar } from "react-icons/fa";

const feedbacks = [
  {
    id: 1,
    text: "AI Studio has completely transformed my creative workflow. Incredible results!",
    name: "Sarah Johnson",
    role: "Digital Artist",
    image: "https://i.pravatar.cc/150?img=47",
    rating: 5,
  },
  {
    id: 2,
    text: "The quality and speed are amazing. It's like having a professional team with you.",
    name: "Mike Chen",
    role: "Content Creator",
    image: "https://i.pravatar.cc/150?img=12",
    rating: 5,
  },
  {
    id: 3,
    text: "From images to videos, everything works perfectly. Highly recommended!",
    name: "Emma Davis",
    role: "Photographer",
    image: "https://i.pravatar.cc/150?img=32",
    rating: 5,
  },
  {
    id: 4,
    text: "The AI tools are fast, simple, and the results are incredibly impressive.",
    name: "Daniel Wilson",
    role: "Designer",
    image: "https://i.pravatar.cc/150?img=11",
    rating: 5,
  },
  {
    id: 5,
    text: "A powerful creative platform that makes my daily workflow much easier.",
    name: "Sophia Brown",
    role: "Video Creator",
    image: "https://i.pravatar.cc/150?img=45",
    rating: 5,
  },
];

const TestimonialCard = ({ testimonial }) => {
  return (
    <article className="testimonial-card">
      <p className="testimonial-card__text">{testimonial.text}</p>

      <div className="testimonial-card__footer">
        <img
          src={testimonial.image}
          alt={testimonial.name}
          className="testimonial-card__image"
        />

        <div className="testimonial-card__info">
          <h4>{testimonial.name}</h4>
          <span>{testimonial.role}</span>

          <div className="testimonial-card__rating">
            {Array.from({ length: testimonial.rating }).map((_, index) => (
              <FaStar key={index} />
            ))}
          </div>
        </div>
      </div>
    </article>
  );
};

const AppFeedback = () => {
  const [startIndex, setStartIndex] = useState(0);

  useEffect(() => {
  const interval = setInterval(() => {
    setStartIndex((prev) =>
      prev === feedbacks.length - 1 ? 0 : prev + 1
    );
  }, 4000);

  return () => clearInterval(interval);
}, [feedbacks.length]);

  const visibleTestimonials = Array.from(
    { length: Math.min(3, feedbacks.length) },
    (_, index) => feedbacks[(startIndex + index) % feedbacks.length],
  );

   const goToSlide = (index) => {
    setStartIndex(index);
  };

  return (
    <section className="workflow-section glass" style={{ marginTop: "5rem" }}>
      <div className="workflow-container">
        <div className="workflow-content">
          <span className="workflow-badge">✨ What Creators Say</span>

          <h2 className="inspiring-title">
            Loved by <span>Creators</span>
            <br />
            Worldwide
          </h2>
        </div>

        <div className="testimonials__content">
          <div className="testimonials__cards" key={startIndex}>
            {visibleTestimonials.map((testimonial, index) => (
              <TestimonialCard
                key={`${testimonial.id}-${index}`}
                testimonial={testimonial}
              />
            ))}
          </div>

          <div className="testimonials__dots">
            {feedbacks.map((_, index) => (
              <button
                key={index}
                className={`testimonials__dot ${
                  startIndex === index ? "testimonials__dot--active" : ""
                }`}
                onClick={() => goToSlide(index)}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AppFeedback;