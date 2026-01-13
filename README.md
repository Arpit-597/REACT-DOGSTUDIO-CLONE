# 🐕 Dog Studio Clone - Interactive 3D Portfolio

A practice project cloning the stunning Dog Studio homepage, featuring immersive Three.js animations, dynamic material transitions, and smooth scroll-triggered effects.

**⚠️ This is a learning project - not affiliated with Dog Studio**

![Dog Studio Clone Preview](https://react-dogstudio-clone.onrender.com/)

## 📋 Project Status

- ✅ **Home Page**: Fully cloned with 3D animations
- ❌ **Footer**: Not implemented
- ❌ **Additional Pages**: Not implemented
- ❌ **Some Animations**: Still need to be added
- 🤝 **Open for Contributions**: Help complete this clone!

## ✨ Features Implemented

- **🎨 Interactive 3D Dog Model**: Fully animated Three.js model with dynamic material transitions
- **🎭 Material Morphing**: Smooth transitions between different matcap materials on hover
- **📱 Responsive Design**: Optimized for all devices and screen sizes
- **🎬 Scroll Animations**: GSAP-powered scroll-triggered animations
- **🎪 Video Integration**: Embedded Vimeo showreel with modal overlay
- **🌟 Modern UI**: Clean, professional design with smooth animations
- **⚡ Performance Optimized**: Built with Vite for lightning-fast loading

## � Features to Implement

- [ ] Footer section
- [ ] Additional portfolio pages
- [ ] More complex scroll animations
- [ ] Mobile menu interactions
- [ ] Loading animations
- [ ] Contact form
- [ ] Project detail pages

## �🚀 Tech Stack

- **Frontend**: React 19, Vite
- **3D Graphics**: Three.js, React Three Fiber, React Three Drei
- **Animations**: GSAP, ScrollTrigger
- **Styling**: CSS3 with custom animations
- **Build Tool**: Vite
- **Deployment**: Render.com (Static Site)

## 📋 Prerequisites

- Node.js (v16 or higher)
- npm or yarn

## 🛠️ Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/Arpit-597/REACT-DOGSTUDIO-CLONE.git
   cd REACT-DOGSTUDIO-CLONE
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Start development server**

   ```bash
   npm run dev
   ```

4. **Open your browser**
   ```
   http://localhost:5173
   ```

## 📜 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build locally
- `npm run lint` - Run ESLint

## 🎯 Usage

### Material Transitions

- Hover over project titles in the portfolio section
- Watch the 3D dog model smoothly transition between different materials
- Each project has its unique visual style

### Scroll Interactions

- Scroll through the page to trigger various animations
- Background image fades out as you scroll down
- 3D model moves and rotates based on scroll position

### Video Showcase

- Click "Our Showreel" to open the video modal
- Features embedded Vimeo player with autoplay

## 🏗️ Build & Deployment

### Local Build

```bash
npm run build
```

### Deploy to Render.com

1. **Connect Repository**

   - Push code to GitHub
   - Connect GitHub repo to Render.com

2. **Configure Build Settings**

   - **Build Command**: `npm run build`
   - **Publish Directory**: `dist`

3. **Deploy**
   - Render automatically builds and deploys on git push

## 📁 Project Structure

```
src/
├── components/
│   └── Dog.jsx          # Main 3D scene component
├── App.jsx              # Main app component
├── App.css              # Global styles
└── main.jsx             # App entry point

public/
├── models/              # 3D model files
├── matcap/              # Material textures
└── *.png/*.jpg          # Images and backgrounds
```

## 🎨 Customization

### Adding New Materials

1. Add matcap texture to `public/matcap/`
2. Import in `Dog.jsx`
3. Add to material array and hover event handlers

### Modifying Animations

- Scroll animations: Edit `useGSAP` hook in `Dog.jsx`
- Material transitions: Modify GSAP timelines in hover handlers

### Styling

- Global styles: `src/App.css`
- Component styles: Inline styles or CSS modules

## 🤝 Contributing

**🎉 Help complete this Dog Studio clone!**

We welcome contributions to make this clone more complete. Here's how you can help:

### Ways to Contribute:

- ✅ Add the missing footer
- ✅ Implement additional scroll animations
- ✅ Add mobile menu functionality
- ✅ Create loading animations
- ✅ Add more interactive elements
- ✅ Improve performance optimizations
- ✅ Add accessibility features

### How to Contribute:

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

### Guidelines:

- Follow the existing code style
- Test your changes thoroughly
- Add comments for complex animations
- Update this README if you add major features

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

**Note**: This is a practice project and not affiliated with Dog Studio. All rights to the original design belong to Dog Studio.

## 🙏 Acknowledgments

- **Dog Studio** - Original design inspiration ([dogstudio.co](https://dogstudio.co))
- **Three.js** - Amazing 3D graphics library
- **GSAP** - Professional animation library
- **React Three Fiber** - React renderer for Three.js
- **Open Source Community** - For the amazing tools and libraries

## 📞 About the Original

**Dog Studio**

- Website: [dogstudio.co](https://dogstudio.co)
- Instagram: [@dogstudio.co](https://instagram.com/dogstudio.co)
- Facebook: [Dog Studio](https://facebook.com/dogstudio)

---

**Built with ❤️ as a learning project using React, Three.js, and GSAP**

**🚀 Star this repo if you find it helpful for learning Three.js and React animations!**
