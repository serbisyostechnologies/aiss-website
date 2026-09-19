import { useState } from "react";
import { motion } from "framer-motion";
import PricingHero from "./PricingHero";
import PricingCards from "./PricingCards";
import FAQ from "./FAQ";
import CTA from "./CTA";
import "./Pricing.css";
import usePageTitle from "../../../hooks/usePageTitle";

const Pricing = () => {
  usePageTitle("Plans | AISerbisyosStudio");
  const [yearly, setYearly] = useState(false);

  return (
    <motion.main
      className="pricing-page"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
    >
      <div className="pricing-container">
        <PricingHero yearly={yearly} setYearly={setYearly} />
        <PricingCards yearly={yearly} />
        <FAQ />
        <CTA />
      </div>
    </motion.main>
  );
};

export default Pricing;