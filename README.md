# Ware-Wise – E-Commerce Platform 🛍️

Welcome to **Ware-Wise**! A modern, full-stack clothing e-commerce platform built to deliver a seamless shopping experience with secure authentication, payment integration, and a powerful admin dashboard.

## 🌐 Live Demo
You can view the live application here: **[Live Demo](#)** _(Add your deployment link)_

---

## 🌟 Platform Sections

* **Home**: Hero section with featured collections and call-to-action
* **Shop**: Browse products with filtering and search functionality
* **Product Details**: Detailed view with image gallery, size selection, and add-to-cart
* **Cart**: Shopping cart with quantity management and price calculations
* **Checkout**: Secure checkout process with Stripe payment integration
* **User Authentication**: Login and registration with JWT-based authentication
* **Admin Dashboard**: Comprehensive admin panel for inventory and order management
* **Order Tracking**: Real-time order status updates for customers

---

## ⚡ Features

* **User Features**:
  - Browse and search clothing products
  - Add items to cart with size and quantity selection
  - Secure user authentication and authorization
  - Stripe payment gateway integration
  - Order history and tracking
  - Responsive design for all devices

* **Admin Features**:
  - Role-based access control
  - Product management (Add, Edit, Delete)
  - Image upload with Cloudinary integration
  - Order tracking and status updates
  - Inventory management dashboard

* **Technical Highlights**:
  - RESTful API architecture
  - JWT token-based authentication
  - Secure password hashing
  - Cloud-based image storage
  - Real-time data updates

---

## 🛠 Technologies Used

### Frontend
* **React.js** – Component-based UI library
* **Tailwind CSS** – Utility-first CSS framework for responsive design
* **React Router** – Client-side routing
* **Axios** – HTTP client for API requests

### Backend
* **Node.js** – JavaScript runtime environment
* **Express.js** – Web application framework
* **MongoDB** – NoSQL database for data storage
* **Mongoose** – ODM for MongoDB

### Additional Tools
* **JWT** – Secure authentication tokens
* **Stripe API** – Payment processing
* **Cloudinary** – Cloud-based image management
* **bcrypt** – Password hashing

---

## 📁 Project Structure
```
warewise/
├── client/               # Frontend React application
│   ├── src/
│   │   ├── components/  # Reusable components
│   │   ├── pages/       # Page components
│   │   ├── context/     # Context API for state management
│   │   └── utils/       # Utility functions
│   └── public/
├── server/              # Backend Express application
│   ├── controllers/     # Route controllers
│   ├── models/          # MongoDB models
│   ├── routes/          # API routes
│   ├── middleware/      # Custom middleware
│   └── config/          # Configuration files
└── README.md
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or Atlas)
- npm or yarn
- Stripe account for payment integration
- Cloudinary account for image uploads

### Installation

1. **Clone the repository**
```bash
   git clone https://github.com/chamithsandeepa/warewise.git
   cd warewise
```

2. **Install dependencies**
   
   For backend:
```bash
   cd server
   npm install
```
   
   For frontend:
```bash
   cd client
   npm install
```

3. **Set up environment variables**
   
   Create a `.env` file in the `server` directory:
```env
   PORT=5000
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret_key
   STRIPE_SECRET_KEY=your_stripe_secret_key
   CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
   CLOUDINARY_API_KEY=your_cloudinary_api_key
   CLOUDINARY_API_SECRET=your_cloudinary_api_secret
```

4. **Run the application**
   
   Start backend server:
```bash
   cd server
   npm start
```
   
   Start frontend (in a new terminal):
```bash
   cd client
   npm start
```

5. **Access the application**
   - Frontend: `http://localhost:3000`
   - Backend API: `http://localhost:5000`

---

## 📡 API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login

### Products
- `GET /api/products` - Get all products
- `GET /api/products/:id` - Get single product
- `POST /api/products` - Create product (Admin)
- `PUT /api/products/:id` - Update product (Admin)
- `DELETE /api/products/:id` - Delete product (Admin)

### Cart
- `GET /api/cart` - Get user cart
- `POST /api/cart` - Add to cart
- `PUT /api/cart/:id` - Update cart item
- `DELETE /api/cart/:id` - Remove from cart

### Orders
- `POST /api/orders` - Create order
- `GET /api/orders` - Get user orders
- `GET /api/orders/:id` - Get order details
- `PUT /api/orders/:id` - Update order status (Admin)

---

## 🎯 Future Enhancements

- [ ] Product reviews and ratings
- [ ] Wishlist functionality
- [ ] Email notifications for orders
- [ ] Advanced filtering and sorting
- [ ] Coupon and discount codes
- [ ] Multi-language support
- [ ] Social media integration
- [ ] Analytics dashboard for admin

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 📬 Contact

* **Developer**: Chamith Sandeepa
* **Email**: your.email@example.com _(Add your email)_
* **LinkedIn**: [LinkedIn Profile](#) _(Add your LinkedIn)_
* **GitHub**: [@chamithsandeepa](https://github.com/chamithsandeepa)
* **Portfolio**: [Your Portfolio](#) _(Add your portfolio link)_

---

## 🙏 Acknowledgments

* Stripe for payment processing
* Cloudinary for image management
* MongoDB Atlas for database hosting
* React and Node.js communities

---

**Made with ❤️ by Chamith Sandeepa**

⭐ Star this repository if you find it helpful!
