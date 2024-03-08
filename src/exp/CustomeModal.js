import { useEffect, useState } from 'react';
import { unstable_usePrompt, useLocation, useNavigate } from 'react-router-dom';

const CustomModal = ({ content, title, isBlocked }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();
  const [lastLocation, setLastLocation] = useState(location);
  const [shouldUnload, setShouldUnload] = useState(false);
  const [confirmedNavigation, setConfirmedNavigation] = useState(false);

  // Use unstable_usePrompt hook
  unstable_usePrompt({
    message: "Are you sure?",
    when: ({ currentLocation, nextLocation }) =>
      isBlocked && !confirmedNavigation &&
      currentLocation.pathname !== nextLocation.pathname,
  });

  const closeModal = () => {
    setIsModalOpen(false);
    setShouldUnload(false);
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const showModal = (nextLocation) => {
    openModal();
    setLastLocation(nextLocation);
  };

  const handleConfirmNavigationClick = () => {
    closeModal();
    setConfirmedNavigation(true);
  };

  // Block react routes
  useEffect(() => {
    if (confirmedNavigation && lastLocation) {
      setShouldUnload(true);
      navigate(lastLocation.pathname);
    }
  }, [confirmedNavigation, lastLocation, navigate]);

  // Block non-react routes
  useEffect(() => {
    const unload = (event) => {
      if (isBlocked && !shouldUnload) {
        event.returnValue = content;
      }
      if (shouldUnload) {
        event.returnValue = "";
      }
    };
    window.addEventListener("beforeunload", unload);

    return () => window.removeEventListener("beforeunload", unload);
  }, [isBlocked, content, shouldUnload]);

  return (
    <>
      {isModalOpen && (
        <div closeModal={closeModal} className="bg-red-400">
          <h1>{title}</h1>
          <p>{content}</p>
          <div>
            <button onClick={closeModal}>Cancel</button>
            <button onClick={handleConfirmNavigationClick}>Leave</button>
          </div>
        </div>
      )}
    </>
  );
};


export default CustomModal;
