import { useState, useEffect, useRef } from 'react';
import './StoryViewer.css';

const StoryViewer = ({ userStories, initialUserIndex, onClose }) => {
  const [currentUserIndex, setCurrentUserIndex] = useState(initialUserIndex);
  const [currentStoryIndex, setCurrentStoryIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [isPaused, setIsPaused] = useState(false);
  const intervalRef = useRef(null);
  const mediaRef = useRef(null);

  const STORY_DURATION = 5000; // 5 seconds
  const PROGRESS_INTERVAL = 50; // Update progress every 50ms

  const currentUser = userStories[currentUserIndex];
  const currentStory = currentUser?.stories[currentStoryIndex];

  useEffect(() => {
    setCurrentUserIndex(initialUserIndex);
    setCurrentStoryIndex(0);
    setProgress(0);
    setIsLoading(true);
  }, [initialUserIndex]);

  useEffect(() => {
    setProgress(0);
    setIsLoading(true);
  }, [currentUserIndex, currentStoryIndex]);

  useEffect(() => {
    if (!isPaused && !isLoading && currentStory) {
      // For videos, use video duration if available
      const duration = currentStory.type === 'video' && mediaRef.current?.duration 
        ? mediaRef.current.duration * 1000 
        : STORY_DURATION;

      intervalRef.current = setInterval(() => {
        setProgress(prev => {
          const newProgress = prev + (PROGRESS_INTERVAL / duration) * 100;
          if (newProgress >= 100) {
            handleNext();
            return 0;
          }
          return newProgress;
        });
      }, PROGRESS_INTERVAL);
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [currentUserIndex, currentStoryIndex, isPaused, isLoading]);

  const handleNext = () => {
    // Check if there are more stories for current user
    if (currentStoryIndex < currentUser.stories.length - 1) {
      setCurrentStoryIndex(prev => prev + 1);
    } else {
      // Move to next user
      if (currentUserIndex < userStories.length - 1) {
        setCurrentUserIndex(prev => prev + 1);
        setCurrentStoryIndex(0);
      } else {
        // No more stories, close viewer
        onClose();
      }
    }
  };

  const handlePrevious = () => {
    // Check if there are previous stories for current user
    if (currentStoryIndex > 0) {
      setCurrentStoryIndex(prev => prev - 1);
    } else {
      // Move to previous user's last story
      if (currentUserIndex > 0) {
        const prevUserIndex = currentUserIndex - 1;
        setCurrentUserIndex(prevUserIndex);
        setCurrentStoryIndex(userStories[prevUserIndex].stories.length - 1);
      }
    }
  };

  const handleMediaLoad = () => {
    setIsLoading(false);
    if (currentStory?.type === 'video' && mediaRef.current) {
      mediaRef.current.play();
    }
  };

  const handleVideoEnded = () => {
    handleNext();
  };

  const handleLeftTap = () => {
    handlePrevious();
  };

  const handleRightTap = () => {
    handleNext();
  };

  const handleTouchStart = () => {
    setIsPaused(true);
    if (currentStory?.type === 'video' && mediaRef.current) {
      mediaRef.current.pause();
    }
  };

  const handleTouchEnd = () => {
    setIsPaused(false);
    if (currentStory?.type === 'video' && mediaRef.current && !isLoading) {
      mediaRef.current.play();
    }
  };

  if (!userStories || userStories.length === 0 || !currentUser || !currentStory) {
    return null;
  }

  // Create progress bars for current user only (Instagram style)
  const renderProgressBars = () => {
    return currentUser.stories.map((story, storyIdx) => {
      let progressWidth = '0%';
      
      if (storyIdx < currentStoryIndex) {
        progressWidth = '100%';
      } else if (storyIdx === currentStoryIndex) {
        progressWidth = `${progress}%`;
      }

      return (
        <div key={story.id} className="story-progress-bar">
          <div
            className="story-progress-fill"
            style={{ width: progressWidth }}
          />
        </div>
      );
    });
  };

  return (
    <div className="story-viewer">
      <div className="story-header">
        <div className="story-progress-container">
          {renderProgressBars()}
        </div>
        
        <div className="story-user-info">
          <img
            src={currentUser.user.avatar}
            alt={currentUser.user.username}
            className="story-user-avatar"
          />
          <span className="story-user-username">{currentUser.user.username}</span>
          <span className="story-indicator">
            {currentStoryIndex + 1} / {currentUser.stories.length}
          </span>
          <button className="story-close-btn" onClick={onClose}>
            ×
          </button>
        </div>
      </div>

      <div className="story-content">
        {isLoading && (
          <div className="story-loading">
            <div className="story-loading-spinner"></div>
          </div>
        )}
        
        {currentStory.type === 'image' ? (
          <img
            ref={mediaRef}
            src={currentStory.url}
            alt="Story"
            className="story-media story-image"
            onLoad={handleMediaLoad}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
          />
        ) : (
          <video
            ref={mediaRef}
            src={currentStory.url}
            className="story-media story-video"
            onLoadedData={handleMediaLoad}
            onEnded={handleVideoEnded}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
            muted
            playsInline
          />
        )}

        <div className="story-navigation">
          <div 
            className="story-nav-left"
            onClick={handleLeftTap}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
          />
          <div 
            className="story-nav-right"
            onClick={handleRightTap}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
          />
        </div>
      </div>
    </div>
  );
};

export default StoryViewer; 