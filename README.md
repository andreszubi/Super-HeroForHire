# 🦸 Super-HeroForHire

**Connecting busy professionals with trusted service providers, one click at a time.**

---

## 👥 Authors

**Andres Zubizarreta** & **Tatiana Toledo**

---

## 📖 Description

In today's fast-paced world, time is our most valuable asset. **Super-HeroForHire** was born from a simple yet powerful idea: to revolutionize how people find and connect with service professionals, eliminating the need for time-consuming searches and unnecessary commutes.

Our platform bridges the gap between busy individuals who need help and skilled professionals ready to provide exceptional services. Whether you're looking for a babysitter, a personal trainer, a hairstylist, or any other professional service, Super-HeroForHire makes it effortless to find the perfect match right in your neighborhood.

### 🎯 Our Mission

We empower professionals to showcase their services and expand their clientele while helping clients save precious time by connecting them with trusted local service providers. No more endless searching, no more commuting—just seamless connections that make life easier.

---

## ✨ Features

### For Clients
- 🚀 **Quick & Easy Search** - Find professionals by service type in seconds
- 📍 **Location-Based Matching** - Discover professionals in your city and postal code
- 💰 **Transparent Pricing** - View hourly rates before booking
- 📸 **Visual Profiles** - See professional photos and information at a glance
- ✏️ **Profile Management** - Edit or delete your profile anytime
- 📱 **Fully Responsive** - Access the platform seamlessly on any device

### For Professionals
- 🎨 **Showcase Your Services** - Create an attractive profile highlighting your expertise
- 💼 **Set Your Rates** - Display your hourly pricing clearly
- 📊 **Expand Your Clientele** - Connect with clients actively seeking your services
- 🖼️ **Professional Presence** - Upload photos to build trust with potential clients
- 🔧 **Easy Profile Management** - Update your information whenever needed

---

## 🎨 Design & User Experience

### Modern Liquid Glass Theme
Our platform features a stunning **liquid glass aesthetic** with:
- ✨ **Glassmorphism Effects** - Beautiful frosted glass cards with backdrop blur
- 🌈 **Rainbow Glow Animations** - Dynamic, eye-catching visual effects throughout
- 💫 **Smooth Animations** - Engaging hover effects and transitions
- 📱 **Fully Responsive** - Optimized for all screen sizes and zoom levels

### Key Design Elements
- **Liquid Glass Cards** - All cards feature a premium glass effect with rainbow glow
- **Animated Profile Pictures** - Profile images have stunning animated rainbow borders
- **Modern Input Fields** - Form inputs feature bubble-like outlines with glowy liquid glass effects
- **Social Media Integration** - Beautiful footer with links to Instagram, Facebook, X, TikTok, and YouTube
- **Dynamic Navigation** - Sophisticated navbar with animated gradients and shimmer effects

---

## 🛠️ Tech Stack

### Backend
- **Node.js** - JavaScript runtime environment
- **Express.js** - Web application framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB object modeling

### Authentication & Sessions
- **express-session** - Session management middleware
- **connect-mongo** - MongoDB session store
- **bcryptjs** - Password hashing

### Frontend
- **EJS (Embedded JavaScript)** - Templating engine
- **express-ejs-layouts** - Layout support for EJS
- **CSS3** - Advanced styling with:
  - Flexbox & Grid layouts
  - CSS custom properties (variables)
  - Backdrop filters for glassmorphism
  - Keyframe animations
  - Media queries for responsiveness

### File Upload & Storage
- **Cloudinary** - Cloud-based image management
- **multer** - File upload middleware
- **multer-storage-cloudinary** - Cloudinary storage engine

### Utilities
- **method-override** - HTTP verb support (PUT, DELETE)
- **morgan** - HTTP request logger
- **dotenv** - Environment variable management
- **cookie-parser** - Cookie parsing middleware
- **serve-favicon** - Favicon serving

### Development Tools
- **nodemon** - Development server with auto-reload

### Deployment
- **Heroku** - Cloud platform for hosting
- **MongoDB Atlas** - Cloud database hosting (or local MongoDB)

---

## 📋 User Stories

### As a Client
- ✅ I want a page that helps me find a professional quickly to assist me with tasks at home or avoid commuting, since I have a very tight schedule
- ✅ I want the website login and sign-up to be simple and clean, making it easy to use
- ✅ When I search for a professional, I want quick results that are easy to choose from
- ✅ I want professionals to receive my request as soon as possible and contact me quickly
- ✅ I want to be able to edit my profile as well as delete it as I see fit

### As a Professional
- ✅ I want to create an attractive profile showcasing my services and pricing
- ✅ I want clients to easily find me when searching for my service type
- ✅ I want to manage my profile information and update it whenever needed
- ✅ I want to expand my clientele by connecting with people in my area

---

## 🗂️ Project Structure

```
Super-HeroForHire/
├── config/
│   ├── index.js              # Configuration exports
│   └── session.config.js     # Session configuration
├── db/
│   └── index.js              # MongoDB connection
├── error-handling/
│   └── index.js              # Error handling middleware
├── middleware/
│   ├── client-route-guard.js      # Client authentication guard
│   ├── cloudinary.config.js       # Cloudinary configuration
│   └── professional-route-guard.js # Professional authentication guard
├── models/
│   ├── Client.model.js       # Client schema and model
│   └── Professional.model.js # Professional schema and model
├── public/
│   ├── images/               # Static images
│   ├── js/
│   │   └── script.js         # Client-side JavaScript
│   └── stylesheets/
│       └── style.css         # Main stylesheet
├── routes/
│   ├── client-logged.routes.js  # Client authenticated routes
│   ├── home.routes.js           # Public/home routes
│   └── pro-logged.routes.js     # Professional authenticated routes
├── utils/
│   └── capitalize.js        # Utility functions
├── views/
│   ├── Auth/                # Authentication & profile views
│   ├── error.ejs            # Error page
│   ├── home.ejs             # Home page
│   ├── layout.ejs            # Main layout template
│   └── not-found.ejs        # 404 page
├── app.js                    # Express app configuration
├── server.js                 # Server entry point
└── package.json             # Dependencies and scripts
```

---

## 🗄️ Database Models

### Client Model
```javascript
{
  firstname: String (required),
  lastname: String (required),
  email: String (required, unique, validated),
  password: String (required, hashed),
  city: String (required),
  postalcode: String (required),
  phone: Number (required),
  image: String (Cloudinary URL)
}
```

### Professional Model
```javascript
{
  firstname: String (required),
  lastname: String (required),
  email: String (required, unique, validated),
  password: String (required, hashed),
  city: String (required),
  postalcode: String (required),
  phone: String (required),
  services: String (required),
  price: String (required),
  image: String (Cloudinary URL)
}
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local installation or MongoDB Atlas account)
- Cloudinary account (for image uploads)
- Heroku account (for deployment)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/andreszubi/Super-HeroForHire.git
   cd Super-HeroForHire
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   Create a `.env` file in the root directory:
   ```env
   MONGODB_URI=mongodb://127.0.0.1:27017/Super-HeroForHire
   SESS_SECRET=your-session-secret-here
   CLOUDINARY_NAME=your-cloudinary-name
   CLOUDINARY_KEY=your-cloudinary-key
   CLOUDINARY_SECRET=your-cloudinary-secret
   NODE_ENV=development
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to `http://localhost:3000`

---

## 🌐 Deployment

### Heroku Deployment

1. **Create a Heroku app**
   ```bash
   heroku create your-app-name
   ```

2. **Set environment variables**
   ```bash
   heroku config:set MONGODB_URI=your-mongodb-atlas-uri
   heroku config:set SESS_SECRET=your-production-session-secret
   heroku config:set CLOUDINARY_NAME=your-cloudinary-name
   heroku config:set CLOUDINARY_KEY=your-cloudinary-key
   heroku config:set CLOUDINARY_SECRET=your-cloudinary-secret
   heroku config:set NODE_ENV=production
   ```

3. **Deploy**
   ```bash
   git push heroku main
   ```

### Required Heroku Environment Variables
- `MONGODB_URI` - MongoDB connection string (MongoDB Atlas recommended)
- `SESS_SECRET` - Secret key for session encryption (required in production)
- `CLOUDINARY_NAME` - Your Cloudinary cloud name
- `CLOUDINARY_KEY` - Your Cloudinary API key
- `CLOUDINARY_SECRET` - Your Cloudinary API secret
- `NODE_ENV` - Set to `production` for production deployment

---

## 📱 Routes

### Public Routes
- `GET /` - Home page
- `GET /auth/client/client-login` - Client login page
- `GET /auth/client/client-signup` - Client signup page
- `GET /auth/pro/pro-login` - Professional login page
- `GET /auth/pro/pro-signup` - Professional signup page

### Client Routes (Authenticated)
- `GET /auth/client/client-profile/:id` - View client profile
- `GET /auth/client/client-profile-edit/:id` - Edit client profile
- `PUT /auth/client/client-profile-edit/:id` - Update client profile
- `DELETE /auth/client/client-profile/delete/:id` - Delete client profile
- `GET /auth/client/client-search/:id` - Search for professionals
- `POST /auth/client/client-search` - Process search
- `GET /auth/client/client-results` - View search results
- `GET /auth/client/booking-confirmation` - Booking confirmation page
- `GET /auth/client/logout` - Logout

### Professional Routes (Authenticated)
- `GET /auth/pro/pro-profile/:id` - View professional profile
- `GET /auth/pro/pro-profile-edit/:id` - Edit professional profile
- `PUT /auth/pro/pro-profile-edit/:id` - Update professional profile
- `DELETE /auth/pro/pro-profile/delete/:id` - Delete professional profile
- `GET /auth/pro/logout` - Logout

---

## 🎯 Recent Updates & Improvements

### UI/UX Enhancements
- ✨ **Liquid Glass Theme** - Implemented a modern glassmorphism design throughout the entire application
- 🌈 **Rainbow Glow Effects** - Added animated rainbow gradients to cards, buttons, and profile pictures
- 📱 **Full Responsiveness** - Optimized for all devices and zoom levels (320px to 4K displays)
- 🎨 **Modernized Navigation** - Enhanced navbar with animated gradients and shimmer effects
- 💫 **Interactive Elements** - Improved hover effects and transitions on all interactive components

### Feature Additions
- 📸 **Photo Preview** - Added image preview functionality on signup forms
- 🔍 **Enhanced Search Page** - Modernized search interface with liquid glass dropdown menus
- 📋 **Social Media Footer** - Added beautiful footer with social media links on all pages
- 🎯 **Improved Booking Flow** - Larger, centered booking buttons with enhanced visibility
- 🖼️ **Profile Picture Borders** - Animated rainbow borders around profile pictures

### Technical Improvements
- 🔒 **Enhanced Security** - Improved session management with production-ready configuration
- 🚀 **Deployment Optimization** - Fixed Heroku deployment issues (H10 error)
- 📦 **Code Organization** - Better structured CSS with organized sections and comments
- ⚡ **Performance** - Optimized animations and responsive breakpoints

---

## 🔮 Backlog / Future Features

- 💬 **Messaging System** - Direct communication between clients and professionals
- ⭐ **Rating & Reviews** - Allow clients to rate and review professionals
- 📅 **Booking Calendar** - Schedule appointments with availability management
- 💳 **Payment Integration** - Secure payment processing for bookings
- 🔔 **Notifications** - Real-time notifications for bookings and messages
- 📊 **Analytics Dashboard** - Professional analytics and insights
- 🗺️ **Map Integration** - Visual map showing professional locations
- 🔍 **Advanced Search Filters** - Filter by price range, rating, distance, etc.

---

## 📚 Resources & Links

### Project Management
- **Trello Board**: [View Project Board](https://trello.com/b/mixw5hho/project-2)

### Repository & Deployment
- **GitHub Repository**: [View on GitHub](https://github.com/andreszubi/Super-HeroForHire)
- **Live Application**: [Visit Super-HeroForHire](https://super-hero-for-hire-225682ec7364.herokuapp.com/)

### Presentation
- **Project Slides**: [View Presentation](https://docs.google.com/presentation/d/1GTvOjIYCE_cBeTKB6GGCHHztVFPigvsywyOoOx6LwyM/edit?usp=sharing)

---

## 📄 License

This project is a personal project and is for educational purposes.

---

## 🙏 Acknowledgments

Special thanks to:
- Ironhack Bootcamp for the learning opportunity
- The open-source community for amazing tools and libraries
- All the professionals and clients who inspired this platform

---

**Made with ❤️ by Andres Zubizarreta & Tatiana Toledo**
