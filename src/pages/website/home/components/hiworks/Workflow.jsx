import {
  IoCloudUploadOutline,
  IoChatbubbleEllipsesOutline,
  IoSparklesOutline,
  IoShareSocialOutline,
} from "react-icons/io5";
import { motion } from "framer-motion";
import "./Workflow.css";

const steps = [
  {
    id: 101,
    icon: <IoCloudUploadOutline />,
    title: "Upload",
    description: "Upload an image or video",
    optional: true,
  },
  {
    id: 102,
    icon: <IoChatbubbleEllipsesOutline />,
    title: "Write Prompt",
    description: "Describe what you want to create",
  },
  {
    id: 103,
    icon: <IoSparklesOutline />,
    title: "Generate",
    description: "Let AI bring your ideas to life",
  },
  {
    id: 104,
    icon: <IoShareSocialOutline />,
    title: "Download / Share",
    description: "Save or share your creation",
  },
];

const Workflow = () => {
  return (
    <section className="workflow-section glass" style={{ marginTop: "5rem" }}>
      <div className="workflow-container">
        <div className="workflow-content">
          <span className="workflow-badge">✨ How It Works</span>

          <h2>
            AI-Powered
            <br />
            <span>Workflow</span>
          </h2>

          <p>
            Our advanced AI processes your content step-by-step to deliver
            perfect results.
          </p>
        </div>

        <div className="workflow-steps">
          {steps.map((step, index) => (
            <motion.div
              className="workflow-step"
              key={step.id}
              initial={{
                opacity: 0,
                rotate: -8,
                scale: 0.9,
              }}

              whileInView={{
                opacity: 1,
                rotate: 0,
                scale: 1,
              }}
            >
              <div className="workflow-circle">{step.icon}</div>

              <h4>
                {step.title}
                {step.optional && (
                  <span className="how-it-works__optional">Optional</span>
                )}
              </h4>

              <p>{step.description}</p>

              {index !== steps.length - 1 && (
                <div className="workflow-line"></div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Workflow;