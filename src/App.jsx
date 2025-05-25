import { useState, useEffect } from 'react'
import StoryList from './components/StoryList'
import StoryViewer from './components/StoryViewer'
import './App.css'

function App() {
  const [userStories, setUserStories] = useState([])
  const [selectedUserIndex, setSelectedUserIndex] = useState(null)
  const [isViewerOpen, setIsViewerOpen] = useState(false)

  useEffect(() => {
    const fetchStories = async () => {
      try {
        const response = await fetch('/stories.json')
        const data = await response.json()
        setUserStories(data)
      } catch (error) {
        console.error('Error fetching stories:', error)
      }
    }

    fetchStories()
  }, [])

  const handleStorySelect = (userIndex) => {
    setSelectedUserIndex(userIndex)
    setIsViewerOpen(true)
    document.body.classList.add('story-viewer-open')
  }

  const handleCloseViewer = () => {
    setIsViewerOpen(false)
    setSelectedUserIndex(null)
    document.body.classList.remove('story-viewer-open')
  }

  return (
    <div className="app">
      <header className="app-header">
        <h1>Instagram Stories</h1>
      </header>
      
      <main className="app-main">
        <StoryList onStorySelect={handleStorySelect} />
      </main>

      {isViewerOpen && selectedUserIndex !== null && (
        <StoryViewer
          userStories={userStories}
          initialUserIndex={selectedUserIndex}
          onClose={handleCloseViewer}
        />
      )}
    </div>
  )
}

export default App
