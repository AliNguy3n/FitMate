import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function Notification({ message, type = 'info', isVisible, onClose, duration = 5000 }) {
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (isVisible) {
      setIsAnimating(true);

      // Auto-close after duration
      const timer = setTimeout(() => {
        handleClose();
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [isVisible, duration]);

  const handleClose = () => {
    setIsAnimating(false);
    setTimeout(() => {
      onClose();
    }, 300); // Wait for animation to complete
  };

  if (!isVisible) return null;

  const getTypeStyles = () => {
    switch (type) {
      case 'success':
        return {
          bg: 'bg-green-500',
          border: 'border-green-600',
          text: 'text-white',
          icon: 'check-circle',
          iconColor: 'text-green-100'
        };
      case 'error':
        return {
          bg: 'bg-red-500',
          border: 'border-red-600',
          text: 'text-white',
          icon: 'times-circle',
          iconColor: 'text-red-100'
        };
      case 'warning':
        return {
          bg: 'bg-yellow-500',
          border: 'border-yellow-600',
          text: 'text-white',
          icon: 'exclamation-triangle',
          iconColor: 'text-yellow-100'
        };
      case 'info':
      default:
        return {
          bg: 'bg-blue-500',
          border: 'border-blue-600',
          text: 'text-white',
          icon: 'info-circle',
          iconColor: 'text-blue-100'
        };
    }
  };

  const styles = getTypeStyles();

  return (
    <div
      className={`fixed top-4 right-4 z-50 transform transition-all duration-300 ease-in-out ${
        isAnimating
          ? 'translate-x-0 opacity-100 scale-100'
          : 'translate-x-full opacity-0 scale-95'
      }`}
    >
      <div className={`${styles.bg} ${styles.border} ${styles.text} border-l-4 rounded-lg shadow-lg min-w-80 max-w-md`}>
        <div className="flex items-center p-4">
          {/* Icon */}
          <div className={`flex-shrink-0 ${styles.iconColor}`}>
            <FontAwesomeIcon icon={['fas', styles.icon]} size="lg" />
          </div>

          {/* Message */}
          <div className="ml-3 flex-1">
            <p className="text-sm font-medium">{message}</p>
          </div>

          {/* Close Button */}
          <button
            onClick={handleClose}
            className={`flex-shrink-0 ml-4 ${styles.iconColor} hover:opacity-75 transition-opacity`}
          >
            <FontAwesomeIcon icon={['fas', 'times']} size="sm" />
          </button>
        </div>

        {/* Progress Bar */}
        <div className="h-1 bg-black bg-opacity-20 overflow-hidden">
          <div
            className="h-full bg-white bg-opacity-30 transition-all linear"
            style={{
              width: '100%',
              animation: `shrink ${duration}ms linear forwards`
            }}
          />
        </div>
      </div>

      <style jsx="true">{`
        @keyframes shrink {
          from {
            width: 100%;
          }
          to {
            width: 0%;
          }
        }
      `}</style>
    </div>
  );
}

// Notification Hook for easier usage
export function useNotification() {
  const [notifications, setNotifications] = useState([]);

  const showNotification = (message, type = 'info', duration = 5000) => {
    const id = Date.now();
    const newNotification = {
      id,
      message,
      type,
      duration,
      isVisible: true
    };

    setNotifications(prev => [...prev, newNotification]);
  };

  const hideNotification = (id) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  const NotificationContainer = () => (
    <div className="fixed top-0 right-0 z-50 space-y-2 p-4">
      {notifications.map((notification) => (
        <Notification
          key={notification.id}
          message={notification.message}
          type={notification.type}
          isVisible={notification.isVisible}
          duration={notification.duration}
          onClose={() => hideNotification(notification.id)}
        />
      ))}
    </div>
  );

  return {
    showNotification,
    hideNotification,
    NotificationContainer
  };
}

export default Notification;