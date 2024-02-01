/**
 * A custom React hook for detecting clicks outside a specified element.
 *
 * @param {React.RefObject} ref - The React ref object that points to the element you want to track clicks outside of.
 * @param {function} callback - The callback function to be called when a click is detected outside the specified element.
 */

import { useEffect } from 'react';

const useClickOutside = (ref, callback) => {
  useEffect(() => {
    const handleClickOutside = (event) => {
      // Check if the clicked element is outside the specified ref
      if (ref.current && !ref.current.contains(event.target)) {
        // Call the provided callback function
        callback();
      }
    };

    // Attach the event listener to the document
    document.addEventListener('mousedown', handleClickOutside);

    // Clean up the event listener on component unmount
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [ref, callback]);
};

// Example usage:
// const dropdownRef = useRef(null);
// useClickOutside(dropdownRef, () => {
//   // Handle the click outside event, e.g., close the dropdown
// });

// You can use this hook to detect clicks outside a specific element, such as a dropdown.
