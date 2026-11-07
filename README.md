# 🍔 Food Munch – Food Ordering Web Application

Food Munch is a responsive frontend food-ordering demo built using HTML, CSS and Vanilla JavaScript. It provides an interactive experience for browsing food items, managing a shopping cart, placing simulated orders and tracking order status.

## ✨ Key Features

- **Food Menu:** Browse food items with search, category filters and sorting by price or rating.
- **Shopping Cart:** Add items, update quantities, remove products and calculate order totals.
- **User Authentication:** Demo registration and login functionality.
- **Checkout:** Enter customer and delivery details and place simulated orders.
- **Order History:** View, search and filter previous orders.
- **Order Tracking:** Track order status and view delivery progress.
- **Reorder & Cancellation:** Reorder items or cancel eligible orders.
- **Admin Dashboard:** Review customer orders and update order statuses.
- **Responsive Design:** Supports different screen sizes.
- **Dark Mode:** Available on supported pages.

## 🛠️ Technologies Used

| Technology | Purpose |
|---|---|
| HTML5 | Application structure |
| CSS3 | Styling and responsive design |
| JavaScript | Application functionality and interactions |
| localStorage | Browser-based data storage |
| Unsplash | Food images |
| Google Fonts | Poppins typography |

## 📂 Project Structure

```text
Food-Munch/
├── admin.html
├── checkout.html
├── index.html
├── login.html
├── order-history.html
├── register.html
├── track-order.html
├── css/
│   └── style.css
└── js/
    ├── admin.js
    ├── auth.js
    ├── checkout.js
    ├── main.js
    ├── order-history.js
    └── track-order.js
```

## 🚀 Getting Started

No package installation or build process is required.

### Option 1: VS Code Live Server

1. Clone or download the repository.
2. Open the project folder in VS Code.
3. Open `index.html`.
4. Right-click and select **Open with Live Server**.

### Option 2: Python HTTP Server

Run this command from the project root:

```bash
py -m http.server 8000
```

Open the application at:

http://localhost:8000

## 🧪 How to Test the Application

1. Register a new demo account.
2. Log in using your account.
3. Browse food items and use search and category filters.
4. Add items to the cart and update quantities.
5. Proceed to checkout and enter delivery details.
6. Place a demo order.
7. Open Order History to track, reorder or cancel eligible orders.
8. Try the Admin Dashboard to update order statuses.

## ⚙️ Admin Dashboard

The demo checks whether the signed-in account email is `admin@foodmunch.com`.

Register using that email and a password you choose, then log in and open the Admin Dashboard.

**Note:** This is only a frontend demo access check, not secure production authorization.

## ⚠️ Limitations

- User accounts, cart and orders are stored in browser `localStorage`.
- Data is not synchronized across browsers or devices.
- Passwords are stored as plain text in browser storage.
- Checkout does not process real payments.
- Order tracking is simulated; no real delivery service is connected.
- Food images and Google Fonts require an internet connection.

This project is intended for learning and demonstration, not production use.

## 🔮 Future Enhancements

- Integrate a Python/Django backend.
- Add database support using MySQL.
- Implement secure authentication.
- Integrate a real payment gateway.
- Connect a real order and delivery management system.

## 👨‍💻 Developer

**Uday Kiran Reddy**

MCA Graduate | Full Stack Development Learner

- GitHub: https://github.com/chinreddyudaykiranreddy-commits
- LinkedIn: https://www.linkedin.com/in/chinreddyudaykiranreddy
