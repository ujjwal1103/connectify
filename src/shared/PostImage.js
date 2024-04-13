import React, { useState, useEffect } from "react";

const PostImage = ({ src, alt, onClick, className, style = {} }) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    return () => {
      setLoading(true);
    };
  }, [src]);

  const handleImageLoaded = () => {
    setLoading(false);
  };

  const handleImageError = () => {
    setLoading(false);
    setError(true);
  };

  return (
    <>
      {loading && (
        <div
          className={"rounded-md bg-red-800 h-full w-96 animate-pulse"}
        ></div>
      )}
      {error && <div className={className}>Error: Unable to load image</div>}

      <img
        key={src}
        src={src}
        alt={src}
        className={className}
        style={style}
        loading="lazy"
        onClick={onClick}
        onLoadedData={handleImageLoaded}
        onLoad={handleImageLoaded}
        onError={handleImageError}
      />
    </>
  );
};

export default PostImage;
