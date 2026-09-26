# Food Munch

Food Munch is a responsive food-ordering demo built with HTML, CSS, and vanilla JavaScript. It includes a menu, shopping cart, checkout flow, order history and tracking, and an admin dashboard.

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
├── images/
└── js/
    ├── admin.js
    ├── auth.js
    ├── checkout.js
    ├── main.js
    ├── order-history.js
    └── track-order.js
```

## Run locally

No build step or package installation is required.

1. Open the project folder in VS Code.
2. Start a static web server from the project root (for example, using the VS Code Live Server extension).
3. Open the local `index.html` page through that server.

You can also open `index.html` directly in a browser. Using the same local-server URL each time is recommended because browser storage is scoped to the site origin.

## Try the application

1. Open **Register** and create an account with a name, email, and password.
2. Log in with that account.
3. Browse the menu, add food to the cart, and proceed to checkout.
4. Complete the delivery form to place an order.
5. Visit **Orders** to search, filter, track, reorder, or cancel an order that is still in the `Order Placed` state.

Orders begin with the `Order Placed` status. The demo admin can update order statuses to `Preparing`, `Out for Delivery`, `Delivered`, or `Cancelled`.

## Admin dashboard

The dashboard checks the signed-in account's email against `admin@foodmunch.com`. To try the demo admin dashboard, register an account using that email and then log in with the credentials you chose. Open **Admin Dashboard** from the home page navigation.

This is a demo-only access check, not secure authorization. Do not use it to protect real data.

## Demo behavior and limitations

- Accounts, cart contents, and orders are stored in the browser's `localStorage`; they are not synchronized between browsers or devices.
- Passwords are stored as plain text in browser storage. This is not appropriate for production.
- Checkout simulates order placement; it does not process real payments or contact a delivery service.
- Food photos are loaded from Unsplash, and the Poppins font is loaded from Google Fonts, so those assets need an internet connection.
- Menu pricing and food items are defined in `js/main.js`.

## Technologies

- HTML5
- CSS3
- Vanilla JavaScript
- Browser `localStorage`
