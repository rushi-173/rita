# Instagram Stories - React App

A mobile-first Instagram Stories clone built with React and Vite. This application replicates the core Instagram Stories experience with user-grouped stories, auto-advance functionality, manual navigation, and support for both images and videos.

## 🚀 Features

### Core Functionality

- **User-Grouped Stories**: Stories are organized by users, each user can have multiple stories
- **Auto-Advance**: Stories automatically progress after 5 seconds (or video duration)
- **Manual Navigation**: Tap left/right sides to navigate between stories
- **Touch Interactions**: Hold to pause, release to resume
- **Progress Indicators**: Visual progress bars showing current story position
- **Loading States**: Smooth loading animations for images and videos

### Media Support

- **Images**: Full support for image stories with proper loading states
- **Videos**: Auto-playing videos with muted playback for mobile compatibility
- **Mixed Content**: Users can have both images and videos in their story collection

### Mobile Optimizations

- **Touch-First Design**: Optimized for mobile touch interactions
- **Responsive Layout**: Adapts to different screen sizes
- **Safe Area Support**: Handles device notches and safe areas
- **Performance**: Efficient rendering and smooth animations

## 🎯 User Experience

### Story List

- Horizontal scrollable list of user avatars
- Instagram-style gradient borders around avatars
- Story count indicators for users with multiple stories
- Smooth scroll behavior without visible scrollbars

### Story Viewer

- Full-screen immersive experience
- Progress bars showing current user's stories only
- User information display with story counter (e.g., "2/3")
- Smooth transitions between stories and users

### Navigation Behavior

1. **Right Tap/Swipe**: Next story → Next user → Close viewer
2. **Left Tap/Swipe**: Previous story → Previous user's last story
3. **Auto-advance**: After timer completion or video end
4. **Touch & Hold**: Pause progress and videos

## 🛠️ Tech Stack

- **React 19.1.0** - UI framework
- **Vite 6.3.5** - Build tool and dev server
- **Vanilla CSS** - Styling (no external UI libraries)
- **ES6+ JavaScript** - Modern JavaScript features

## 📦 Installation & Setup

### Prerequisites

- Node.js (version 16 or higher)
- npm or yarn package manager

### Local Development Setup

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd rita
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Start development server**

   ```bash
   npm run dev
   ```

   The app will be available at `http://localhost:5173` (or next available port)

4. **Build for production**

   ```bash
   npm run build
   ```

5. **Preview production build**
   ```bash
   npm run preview
   ```

### Available Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build for production
- `npm run preview` - Preview production build locally
- `npm run lint` - Run ESLint for code quality checks

## 📁 Project Structure

```
rita/
├── public/
│   ├── stories.json          # Sample story data
│   └── vite.svg
├── src/
│   ├── components/
│   │   ├── StoryList.jsx     # Horizontal story list component
│   │   ├── StoryList.css     # Story list styles
│   │   ├── StoryViewer.jsx   # Full-screen story viewer
│   │   └── StoryViewer.css   # Story viewer styles
│   ├── App.jsx               # Main application component
│   ├── App.css               # App-level styles
│   ├── index.css             # Global styles
│   └── main.jsx              # Application entry point
├── index.html                # HTML template
├── package.json              # Dependencies and scripts
└── README.md                 # Project documentation
```

## 📊 Data Structure

### Stories JSON Format

```json
[
  {
    "id": 1,
    "user": {
      "username": "john_doe",
      "avatar": "https://example.com/avatar.jpg"
    },
    "stories": [
      {
        "id": "story_1_1",
        "type": "image",
        "url": "https://example.com/image.jpg",
        "timestamp": "2024-01-15T10:30:00Z"
      },
      {
        "id": "story_1_2",
        "type": "video",
        "url": "https://example.com/video.mp4",
        "timestamp": "2024-01-15T10:35:00Z"
      }
    ]
  }
]
```

### Supported Media Types

- **Images**: JPG, PNG, WebP, GIF
- **Videos**: MP4, WebM (with proper codec support)

## 🎨 Customization

### Styling

- All styles are in vanilla CSS for easy customization
- CSS custom properties for consistent theming
- Mobile-first responsive design approach

### Configuration

- Story duration: Modify `STORY_DURATION` in `StoryViewer.jsx`
- Progress update interval: Adjust `PROGRESS_INTERVAL`
- Media URLs: Update `public/stories.json` with your content

## 🔧 Development Guidelines

### Code Style

- ESLint configuration included for code quality
- React hooks for state management
- Functional components with modern React patterns

### Performance Considerations

- Lazy loading for media content
- Efficient re-renders with proper dependency arrays
- Optimized touch event handling

### Browser Support

- Modern browsers with ES6+ support
- Mobile Safari and Chrome optimized
- Progressive Web App ready

## 🚀 Deployment

### Vercel (Recommended)

```bash
npm run build
# Deploy dist/ folder to Vercel
```

### Netlify

```bash
npm run build
# Deploy dist/ folder to Netlify
```

### GitHub Pages

```bash
npm run build
# Deploy dist/ folder to gh-pages branch
```

## 🐛 Troubleshooting

### Common Issues

1. **Videos not playing on mobile**

   - Ensure videos are muted (required for autoplay)
   - Check video codec compatibility

2. **Touch events not working**

   - Verify touch event handlers are properly bound
   - Check for CSS pointer-events interference

3. **Stories not loading**
   - Verify `public/stories.json` is accessible
   - Check browser console for fetch errors

### Development Tips

- Use browser dev tools mobile simulation for testing
- Check network tab for media loading issues
- Monitor console for React warnings

## 📱 Mobile Testing

For best results, test on actual mobile devices:

- iOS Safari
- Android Chrome
- Various screen sizes and orientations

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly on mobile devices
5. Submit a pull request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🙏 Acknowledgments

- Instagram for the original Stories UX inspiration
- Unsplash for sample images
- Google for sample video content

---

**Built with ❤️ using React and Vite**
