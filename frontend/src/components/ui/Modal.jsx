const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-white/10 backdrop-blur-sm px-2 py-4"
      onClick={handleBackdropClick}
    >
      <div
        className="relative bg-white rounded-2xl shadow-2xl max-w-4xl w-full"
        onClick={(e) => e.stopPropagation()} 
      >
        {children}
      </div>
    </div>
  );
};

export default Modal;
