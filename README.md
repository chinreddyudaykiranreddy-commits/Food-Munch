# Food Munch

Food Munch is a responsive food-ordering demo built with HTML, CSS, and vanilla JavaScript. It includes a food menu, shopping cart, simulated checkout, order history and tracking, and an admin dashboard.

## Features

- Browse a menu of food items; search, filter by category, and sort by price or rating.
- Add items to the cart, update quantities, remove items, and view the order total.
- Register and log in with a demo account.
- Place an order with customer and delivery details.
- Review order history, filter by status, track an order, and reorder or cancel eligible orders.
- Use the admin dashboard to review orders and update their status.
- Responsive styling and dark-mode controls on supported pages.

## Project structure

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

## Run locally

No build step or package installation is required. Run the project through a local static web server:

### With VS Code Live Server

1. Open the project folder in VS Code.
2. If needed, install the **Live Server** extension.
3. Right-click `index.html` and choose **Open with Live Server**.

### With Python

1. Open a terminal in the project root.
2. Start Python's built-in static server:

   ```powershell
   py -m http.server 8000
   ```

3. Visit [http://localhost:8000](http://localhost:8000) in your browser.

Keep using the same local-server address while testing. Browser `localStorage` is scoped to the site origin, so data created under one address may not appear under another.

## Try the application

1. Open **Register** and create an account with your name, email, and password.
2. Log in with that account.
3. Browse the menu, add food to the cart, and select **Proceed to Checkout**.
4. Enter the delivery details and place your order.
5. Open **Orders** to search and filter your orders, track an order, reorder, or cancel one that is still in the `Order Placed` state.

Orders begin with the `Order Placed` status. The demo admin can update order statuses to `Preparing`, `Out for Delivery`, `Delivered`, or `Cancelled`.

## Admin dashboard

The dashboard checks whether the signed-in account's email is `admin@foodmunch.com`. To try the demo admin dashboard, register an account with that email and a password you choose, log in, and open **Admin Dashboard** from the home page navigation.

This is a demo-only access check, not secure authorization. Do not use it to protect real data.

## Demo behavior and limitations

- Accounts, cart contents, and orders are stored in the browser's `localStorage`; they are not synchronized between browsers or devices.
- Passwords are stored as plain text in browser storage. This is not appropriate for production.
- Checkout simulates order placement; it does not process real payments or contact a delivery service.
- Food photos are loaded from Unsplash, and the Poppins font is loaded from Google Fonts, so those assets need an internet connection.
- Menu pricing and food items are defined in `js/main.js`.

To start over during testing, clear this site's browser storage using your browser's developer tools. This removes the locally saved demo accounts, cart, and orders.

## Technologies

- HTML5
- CSS3
- Vanilla JavaScript
- Browser `localStorage`
