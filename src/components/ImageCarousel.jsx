import React, { useState, useRef, useEffect } from "react";
import { garden, room, hut } from "../assets";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft, faChevronRight, faTimes } from "@fortawesome/free-solid-svg-icons";

const ImageCarousel = () => {
  const images = [room, hut, garden, room, hut, garden];
  const [currentIndex, setCurrentIndex] = useState(0);
  const [visibleCount, setVisibleCount] = useState(getVisibleCount());
  const [fullscreenIndex, setFullscreenIndex] = useState(null);

  // Update visibleCount on resize
  function getVisibleCount() {
    if (typeof window !== "undefined") {
      if (window.innerWidth >= 1024) return 3;
      if (window.innerWidth >= 768) return 2;
    }
    return 1;
  }

  useEffect(() => {
    const handleResize = () => {
      setVisibleCount(getVisibleCount());
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Clamp currentIndex if screen size changes
  useEffect(() => {
    const maxStart = Math.max(0, images.length - visibleCount);
    if (currentIndex > maxStart) {
      setCurrentIndex(maxStart);
    }
  }, [visibleCount, currentIndex, images.length]);

  const nextSlide = () => {
    setCurrentIndex((prev) =>
      Math.min(prev + 1, images.length - visibleCount)
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => Math.max(prev - 1, 0));
  };

  // Swipe support
  const touchStartX = useRef(null);
  const touchEndX = useRef(null);

  const handleTouchStart = (e) => {
    touchStartX.current = e.changedTouches[0].clientX;
  };

  const handleTouchEnd = (e) => {
    touchEndX.current = e.changedTouches[0].clientX;
    const deltaX = touchStartX.current - touchEndX.current;
    if (deltaX > 50) nextSlide();
    else if (deltaX < -50) prevSlide();
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-12">
      <h2 className="text-2xl font-bold mb-6 text-center text-[#481317]">Gallery</h2>

      <div className="flex items-center justify-center gap-4">
        <button
          onClick={prevSlide}
          disabled={currentIndex === 0}
          className="p-3 bg-white rounded-full shadow hover:bg-gray-100 disabled:opacity-50"
        >
          <FontAwesomeIcon icon={faChevronLeft} />
        </button>

        <div
          className="overflow-hidden w-full"
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          <div
            className="flex transition-transform duration-500 ease-in-out"
            style={{
              width: `${(images.length) * (100 / visibleCount)}%`,
              transform: `translateX(-${(100 / images.length) * currentIndex}%)`,
            }}
          >
            {images.map((img, index) => (
              <div
                key={index}
                className="px-2"
                style={{ width: `${100 / images.length}%` }}
              >
                <div
                  className="h-[250px] bg-cover bg-center rounded-lg shadow-md cursor-pointer"
                  style={{ backgroundImage: `url(${img})` }}
                  onClick={() => setFullscreenIndex(index)}
                ></div>
              </div>
            ))}
          </div>
        </div>

        <button
          onClick={nextSlide}
          disabled={currentIndex + visibleCount >= images.length}
          className="p-3 bg-white rounded-full shadow hover:bg-gray-100 disabled:opacity-50"
        >
          <FontAwesomeIcon icon={faChevronRight} />
        </button>
      </div>

      {/* Fullscreen Modal */}
      {fullscreenIndex !== null && (
        <div className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center">
          <button
            className="absolute top-4 right-6 text-white text-3xl"
            onClick={() => setFullscreenIndex(null)}
          >
            <FontAwesomeIcon icon={faTimes} />
          </button>

          <button
            className="absolute left-4 text-white text-3xl"
            onClick={() => setFullscreenIndex((prev) => Math.max(prev - 1, 0))}
            disabled={fullscreenIndex === 0}
          >
            <FontAwesomeIcon icon={faChevronLeft} />
          </button>

          <img
            src={images[fullscreenIndex]}
            alt="Fullscreen View"
            className="max-w-full max-h-full object-contain"
          />

          <button
            className="absolute right-4 text-white text-3xl"
            onClick={() =>
              setFullscreenIndex((prev) =>
                Math.min(prev + 1, images.length - 1)
              )
            }
            disabled={fullscreenIndex === images.length - 1}
          >
            <FontAwesomeIcon icon={faChevronRight} />
          </button>
        </div>
      )}
    </div>
  );
};

export default ImageCarousel;
