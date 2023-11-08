import { useCallback, useEffect } from 'react';

function useClickOutside(ref, callback) {
  const handleClick = useCallback((e) => {
    if (ref.current && !ref.current.contains(e.target)) {
      callback();
    }
  },[callback]);
  useEffect(() => {
    document.addEventListener('click', handleClick);

    return () => {
      document.removeEventListener('click', handleClick);
    };
  }, [handleClick]);
}

export default useClickOutside;
