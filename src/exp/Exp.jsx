import React, { useState } from 'react';

const Exp = () => {
  const [image, setImage] = useState(null);
  const [croppedImage, setCroppedImage] = useState(null);
  const [crop, setCrop] = useState({ x: 0, y: 0, width: 100, height: 100 });
  const [resizingHandle, setResizingHandle] = useState(null);
  const [dragStart, setDragStart] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = () => {
      setImage(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleCropChange = (e) => {
    const { name, value } = e.target;
    setCrop({ ...crop, [name]: parseInt(value, 10) });
  };

  const handleMouseDown = (e, handle) => {
    e.preventDefault();
    setResizingHandle(handle);
    setDragStart({ x: e.clientX, y: e.clientY });
  };

  const handleMouseMove = (e) => {
    if (!resizingHandle) return;

    const deltaX = e.clientX - dragStart.x;
    const deltaY = e.clientY - dragStart.y;

    let newWidth = crop.width;
    let newHeight = crop.height;
    let newX = crop.x;
    let newY = crop.y;

    switch (resizingHandle) {
      case 'topLeft':
        newWidth -= deltaX;
        newHeight -= deltaY;
        newX += deltaX;
        newY += deltaY;
        break;
      case 'topRight':
        newWidth += deltaX;
        newHeight -= deltaY;
        newY += deltaY;
        break;
      case 'bottomLeft':
        newWidth -= deltaX;
        newHeight += deltaY;
        newX += deltaX;
        break;
      case 'bottomRight':
        newWidth += deltaX;
        newHeight += deltaY;
        break;
      default:
        break;
    }

    if (newWidth > 0 && newX >= 0 && newX + newWidth <= image.width) {
      setCrop({ ...crop, x: newX, width: newWidth });
    }

    if (newHeight > 0 && newY >= 0 && newY + newHeight <= image.height) {
      setCrop({ ...crop, y: newY, height: newHeight });
    }

    setDragStart({ x: e.clientX, y: e.clientY });
  };

  const handleMouseUp = () => {
    setResizingHandle(null);
    setDragStart(null);
  };

  const cropImage = () => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const img = new Image();
    img.src = image;
    img.onload = () => {
      canvas.width = crop.width;
      canvas.height = crop.height;
      ctx.drawImage(img, crop.x, crop.y, crop.width, crop.height, 0, 0, crop.width, crop.height);
      const croppedImageUrl = canvas.toDataURL();
      setCroppedImage(croppedImageUrl);
    };
  };

  return (
    <div>
      <input type="file" onChange={handleImageChange} />
      {image && (
        <div>
          <div
            style={{
              position: 'relative',
              display: 'inline-block',
            }}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
          >
            <img src={image} alt="Original" style={{ maxWidth: '100%', maxHeight: '400px' }} />
            <div
              style={{
                position: 'absolute',
                border: '2px dashed red',
                pointerEvents: 'none',
                left: crop.x,
                top: crop.y,
                width: crop.width,
                height: crop.height,
              }}
            >
              <div
                style={{
                  position: 'absolute',
                  width: '10px',
                  height: '10px',
                  backgroundColor: 'red',
                  cursor: 'nwse-resize',
                  top: '-5px',
                  left: '-5px',
                }}
                onMouseDown={(e) => handleMouseDown(e, 'topLeft')}
              ></div>
              <div
                style={{
                  position: 'absolute',
                  width: '10px',
                  height: '10px',
                  backgroundColor: 'red',
                  cursor: 'nesw-resize',
                  top: '-5px',
                  right: '-5px',
                }}
                onMouseDown={(e) => handleMouseDown(e, 'topRight')}
              ></div>
              <div
                style={{
                  position: 'absolute',
                  width: '10px',
                  height: '10px',
                  backgroundColor: 'red',
                  cursor: 'nesw-resize',
                  bottom: '-5px',
                  left: '-5px',
                }}
                onMouseDown={(e) => handleMouseDown(e, 'bottomLeft')}
              ></div>
              <div
                style={{
                  position: 'absolute',
                  width: '10px',
                  height: '10px',
                  backgroundColor: 'red',
                  cursor: 'nwse-resize',
                  bottom: '-5px',
                  right: '-5px',
                }}
                onMouseDown={(e) => handleMouseDown(e, 'bottomRight')}
              ></div>
            </div>
          </div>
          <div>
            <label>
              X:
              <input type="number" name="x" value={crop.x} onChange={handleCropChange} />
            </label>
            <label>
              Y:
              <input type="number" name="y" value={crop.y} onChange={handleCropChange} />
            </label>
            <label>
              Width:
              <input type="number" name="width" value={crop.width} onChange={handleCropChange} />
            </label>
            <label>
              Height:
              <input type="number" name="height" value={crop.height} onChange={handleCropChange} />
            </label>
            <button onClick={cropImage}>Crop Image</button>
          </div>
          {croppedImage && <img src={croppedImage} alt="Cropped" />}
        </div>
      )}
    </div>
  );
};

export default Exp;
