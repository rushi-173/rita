import { useState, useEffect } from 'react';
import './StoryList.css';

const StoryList = ({ onStorySelect }) => {
  const [userStories, setUserStories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStories = async () => {
      try {
        const response = await fetch('/stories.json');
        const data = await response.json();
        setUserStories(data);
      } catch (error) {
        console.error('Error fetching stories:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStories();
  }, []);

  if (loading) {
    return (
      <div className="story-list-container">
        <div className="story-list-loading">Loading stories...</div>
      </div>
    );
  }

  return (
    <div className="story-list-container">
      <div className="story-list">
        {userStories.map((userStory, index) => (
          <div
            key={userStory.id}
            className="story-item"
            onClick={() => onStorySelect(index)}
          >
            <div className="story-avatar-container">
              <img
                src={userStory.user.avatar}
                alt={userStory.user.username}
                className="story-avatar"
              />
              {userStory.stories.length > 1 && (
                <div className="story-count-indicator">
                  {userStory.stories.length}
                </div>
              )}
            </div>
            <span className="story-username">{userStory.user.username}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StoryList; 