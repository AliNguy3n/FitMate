import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import dealsData from "../data/deals.json";

function Announcement({ autoPlay = true, interval = 2000 }) {
  const [deals, setDeals] = useState(dealsData);

  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % deals.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? deals.length - 1 : prevIndex - 1
    );
  };

  useEffect(() => {
    if (autoPlay) {
      const autoSlide = setInterval(handleNext, interval);
      return () => clearInterval(autoSlide);
    }
  }, [currentIndex, interval, autoPlay]);

  return (
    <>
      <div className="announcement-bar d-flex flex-row justify-content-center gap-2 py-2">
        <button onClick={handlePrev}>
          <FontAwesomeIcon icon={["fas", "angles-left"]} />
        </button>
        <div className="deals">
          <a href={deals[currentIndex].link}>{deals[currentIndex].title}</a>
        </div>
        <button onClick={handleNext}>
          <FontAwesomeIcon icon={["fas", "angles-right"]} />
        </button>
      </div>
    </>
  );
}

export default Announcement;
