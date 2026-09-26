/* =========================================================
   FOOD MUNCH - ADMIN DASHBOARD
========================================================= */


/* =========================================================
   ADMIN CONFIGURATION
========================================================= */

// Demo admin email
const ADMIN_EMAIL = "admin@foodmunch.com";


/* =========================================================
   DOM ELEMENTS
========================================================= */

const adminUserName =
    document.getElementById("adminUserName");

const adminLogoutButton =
    document.getElementById("adminLogoutButton");

const totalOrdersElement =
    document.getElementById("totalOrders");

const totalRevenueElement =
    document.getElementById("totalRevenue");

const totalCustomersElement =
    document.getElementById("totalCustomers");

const pendingOrdersElement =
    document.getElementById("pendingOrders");

const adminOrderSearch =
    document.getElementById("adminOrderSearch");

const adminStatusFilter =
    document.getElementById("adminStatusFilter");

const adminOrdersContainer =
    document.getElementById(
        "adminOrdersContainer"
    );

const adminNoOrders =
    document.getElementById(
        "adminNoOrders"
    );

const themeButton =
    document.getElementById("themeButton");


/* =========================================================
   GET LOGGED-IN USER
========================================================= */

const currentUser =
    JSON.parse(
        localStorage.getItem(
            "foodMunchLoggedInUser"
        )
    );


/* =========================================================
   CHECK ADMIN LOGIN
========================================================= */

function checkAdminAccess() {

    if (!currentUser) {

        alert(
            "Please login to access the Admin Dashboard."
        );

        window.location.href =
            "login.html";

        return false;
    }


    /*
       Demo admin check.

       Login using:

       Email:
       admin@foodmunch.com
    */

    if (
        currentUser.email.toLowerCase() !==
        ADMIN_EMAIL.toLowerCase()
    ) {

        alert(
            "Access denied. Admin access is required."
        );

        window.location.href =
            "index.html";

        return false;
    }


    return true;
}


/* =========================================================
   DISPLAY ADMIN NAME
========================================================= */

function displayAdminName() {

    if (!adminUserName) {
        return;
    }

    adminUserName.textContent =
        currentUser.name;
}


/* =========================================================
   GET ALL ORDERS
========================================================= */

function getOrders() {

    return JSON.parse(
        localStorage.getItem(
            "foodMunchOrders"
        )
    ) || [];
}


/* =========================================================
   SAVE ORDERS
========================================================= */

function saveOrders(orders) {

    localStorage.setItem(
        "foodMunchOrders",
        JSON.stringify(orders)
    );
}


/* =========================================================
   FORMAT DATE
========================================================= */

function formatDate(dateString) {

    const date =
        new Date(dateString);

    if (
        Number.isNaN(
            date.getTime()
        )
    ) {
        return "Unknown Date";
    }


    return date.toLocaleString(
        "en-IN",
        {
            day: "2-digit",
            month: "short",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit"
        }
    );
}


/* =========================================================
   FORMAT CURRENCY
========================================================= */

function formatCurrency(amount) {

    return "₹" +
        Number(amount || 0)
            .toLocaleString("en-IN");
}


/* =========================================================
   GET UNIQUE CUSTOMERS
========================================================= */

function getUniqueCustomers(orders) {

    const customers = [];

    orders.forEach(
        function (order) {

            const customerKey =
                order.userId ||
                order.customerEmail ||
                order.customerPhone ||
                order.customerName;

            if (
                customerKey &&
                !customers.includes(
                    String(customerKey)
                )
            ) {

                customers.push(
                    String(customerKey)
                );
            }

        }
    );


    return customers;
}


/* =========================================================
   UPDATE DASHBOARD STATISTICS
========================================================= */

function updateStatistics() {

    const orders =
        getOrders();


    /* Total Orders */

    if (totalOrdersElement) {

        totalOrdersElement.textContent =
            orders.length;
    }


    /* Total Revenue */

    const totalRevenue =
        orders.reduce(
            function (total, order) {

                if (
                    order.status ===
                    "Cancelled"
                ) {
                    return total;
                }

                return total +
                    Number(
                        order.total || 0
                    );

            },
            0
        );


    if (totalRevenueElement) {

        totalRevenueElement.textContent =
            formatCurrency(
                totalRevenue
            );
    }


    /* Total Customers */

    const customers =
        getUniqueCustomers(
            orders
        );


    if (totalCustomersElement) {

        totalCustomersElement.textContent =
            customers.length;
    }


    /* Pending Orders */

    const pendingOrders =
        orders.filter(
            function (order) {

                return (
                    order.status !==
                    "Delivered" &&
                    order.status !==
                    "Cancelled"
                );

            }
        );


    if (pendingOrdersElement) {

        pendingOrdersElement.textContent =
            pendingOrders.length;
    }

}


/* =========================================================
   GET STATUS CLASS
========================================================= */

function getStatusClass(status) {

    switch (status) {

        case "Order Placed":
            return "admin-status-placed";

        case "Preparing":
            return "admin-status-preparing";

        case "Out for Delivery":
            return "admin-status-delivery";

        case "Delivered":
            return "admin-status-delivered";

        case "Cancelled":
            return "admin-status-cancelled";

        default:
            return "admin-status-placed";
    }
}


/* =========================================================
   CREATE STATUS OPTIONS
========================================================= */

function createStatusOptions(
    currentStatus
) {

    const statuses = [
        "Order Placed",
        "Preparing",
        "Out for Delivery",
        "Delivered",
        "Cancelled"
    ];


    return statuses.map(
        function (status) {

            return `
                <option
                    value="${status}"
                    ${
                        status ===
                        currentStatus
                            ? "selected"
                            : ""
                    }
                >
                    ${status}
                </option>
            `;

        }
    ).join("");
}


/* =========================================================
   CREATE ORDER ITEMS
========================================================= */

function createOrderItems(order) {

    if (
        !order.items ||
        order.items.length === 0
    ) {

        return `
            <p>
                No item information available.
            </p>
        `;
    }


    return order.items.map(
        function (item) {

            return `
                <div
                    class="admin-order-item"
                >

                    <img
                        src="${item.image}"
                        alt="${item.name}"
                    >

                    <div
                        class="admin-order-item-details"
                    >

                        <h4>
                            ${item.name}
                        </h4>

                        <p>
                            Quantity:
                            ${item.quantity}
                            ×
                            ${formatCurrency(
                                item.price
                            )}
                        </p>

                    </div>

                </div>
            `;

        }
    ).join("");
}


/* =========================================================
   CREATE ORDER CARD
========================================================= */

function createOrderCard(order) {

    const statusClass =
        getStatusClass(
            order.status
        );


    const orderItems =
        createOrderItems(
            order
        );


    return `
        <div
            class="admin-order-card"
            data-order-id="${order.orderId}"
        >

            <!-- Order Header -->

            <div
                class="admin-order-header"
            >

                <div>

                    <div
                        class="admin-order-id"
                    >
                        ${order.orderId}
                    </div>

                    <div
                        class="admin-order-date"
                    >
                        ${formatDate(
                            order.orderDate
                        )}
                    </div>

                </div>


                <span
                    class="
                        admin-status-badge
                        ${statusClass}
                    "
                >
                    ${order.status}
                </span>

            </div>


            <!-- Customer Details -->

            <div
                class="admin-customer-details"
            >

                <div
                    class="admin-customer-item"
                >

                    <span>
                        Customer
                    </span>

                    <strong>
                        ${order.customerName}
                    </strong>

                </div>


                <div
                    class="admin-customer-item"
                >

                    <span>
                        Email
                    </span>

                    <strong>
                        ${order.customerEmail}
                    </strong>

                </div>


                <div
                    class="admin-customer-item"
                >

                    <span>
                        Phone
                    </span>

                    <strong>
                        ${order.customerPhone}
                    </strong>

                </div>


                <div
                    class="admin-customer-item"
                >

                    <span>
                        Address
                    </span>

                    <strong>
                        ${order.address}
                    </strong>

                </div>


                <div
                    class="admin-customer-item"
                >

                    <span>
                        City
                    </span>

                    <strong>
                        ${order.city}
                    </strong>

                </div>


                <div
                    class="admin-customer-item"
                >

                    <span>
                        Payment
                    </span>

                    <strong>
                        ${order.paymentMethod}
                    </strong>

                </div>

            </div>


            <!-- Order Items -->

            <div
                class="admin-order-items"
            >

                <h3>
                    Order Items
                </h3>

                ${orderItems}

            </div>


            <!-- Order Total -->

            <div
                class="admin-order-total"
            >

                <span>
                    Total Amount
                </span>

                <strong>
                    ${formatCurrency(
                        order.total
                    )}
                </strong>

            </div>


            <!-- Admin Actions -->

            <div
                class="admin-order-actions"
            >

                <select
                    class="admin-status-select"
                    data-order-id="${order.orderId}"
                >

                    ${createStatusOptions(
                        order.status
                    )}

                </select>


                <button
                    type="button"
                    class="admin-update-button"
                    data-order-id="${order.orderId}"
                >
                    Update Status
                </button>


                ${
                    order.status !==
                    "Cancelled" &&
                    order.status !==
                    "Delivered"
                        ? `
                            <button
                                type="button"
                                class="admin-cancel-button"
                                data-order-id="${order.orderId}"
                            >
                                Cancel Order
                            </button>
                        `
                        : ""
                }

            </div>

        </div>
    `;
}


/* =========================================================
   DISPLAY ORDERS
========================================================= */

function displayOrders() {

    const orders =
        getOrders();


    const searchValue =
        adminOrderSearch
            ? adminOrderSearch.value
                .trim()
                .toLowerCase()
            : "";


    const selectedStatus =
        adminStatusFilter
            ? adminStatusFilter.value
            : "all";


    const filteredOrders =
        orders.filter(
            function (order) {

                const orderId =
                    String(
                        order.orderId || ""
                    ).toLowerCase();


                const customerName =
                    String(
                        order.customerName || ""
                    ).toLowerCase();


                const customerEmail =
                    String(
                        order.customerEmail || ""
                    ).toLowerCase();


                const matchesSearch =
                    orderId.includes(
                        searchValue
                    ) ||
                    customerName.includes(
                        searchValue
                    ) ||
                    customerEmail.includes(
                        searchValue
                    );


                const matchesStatus =
                    selectedStatus ===
                    "all"
                        ? true
                        : order.status ===
                          selectedStatus;


                return (
                    matchesSearch &&
                    matchesStatus
                );

            }
        );


    /*
       Show newest orders first
    */

    filteredOrders.sort(
        function (a, b) {

            return (
                new Date(
                    b.orderDate
                ) -
                new Date(
                    a.orderDate
                )
            );

        }
    );


    if (
        filteredOrders.length === 0
    ) {

        adminOrdersContainer.innerHTML =
            "";

        adminNoOrders.classList.add(
            "show"
        );

        return;
    }


    adminNoOrders.classList.remove(
        "show"
    );


    adminOrdersContainer.innerHTML =
        filteredOrders.map(
            function (order) {

                return createOrderCard(
                    order
                );

            }
        ).join("");


    attachOrderEvents();
}


/* =========================================================
   UPDATE ORDER STATUS
========================================================= */

function updateOrderStatus(
    orderId,
    newStatus
) {

    const orders =
        getOrders();


    const orderIndex =
        orders.findIndex(
            function (order) {

                return (
                    order.orderId ===
                    orderId
                );

            }
        );


    if (orderIndex === -1) {

        alert(
            "Order not found."
        );

        return;
    }


    orders[
        orderIndex
    ].status = newStatus;


    /*
       Save the updated status
       to LocalStorage.
    */

    saveOrders(
        orders
    );


    /*
       Refresh dashboard.
    */

    updateStatistics();

    displayOrders();


    alert(
        "Order status updated successfully."
    );
}


/* =========================================================
   CANCEL ORDER
========================================================= */

function cancelOrder(
    orderId
) {

    const confirmation =
        confirm(
            "Are you sure you want to cancel this order?"
        );


    if (!confirmation) {
        return;
    }


    const orders =
        getOrders();


    const orderIndex =
        orders.findIndex(
            function (order) {

                return (
                    order.orderId ===
                    orderId
                );

            }
        );


    if (orderIndex === -1) {

        alert(
            "Order not found."
        );

        return;
    }


    orders[
        orderIndex
    ].status =
        "Cancelled";


    saveOrders(
        orders
    );


    updateStatistics();

    displayOrders();


    alert(
        "Order cancelled successfully."
    );
}


/* =========================================================
   ATTACH ORDER EVENTS
========================================================= */

function attachOrderEvents() {

    /* Update Status Buttons */

    const updateButtons =
        document.querySelectorAll(
            ".admin-update-button"
        );


    updateButtons.forEach(
        function (button) {

            button.addEventListener(
                "click",
                function () {

                    const orderId =
                        this.dataset.orderId;


                    const select =
                        document.querySelector(
                            `.admin-status-select[data-order-id="${orderId}"]`
                        );


                    if (!select) {
                        return;
                    }


                    const newStatus =
                        select.value;


                    updateOrderStatus(
                        orderId,
                        newStatus
                    );

                }
            );

        }
    );


    /* Cancel Buttons */

    const cancelButtons =
        document.querySelectorAll(
            ".admin-cancel-button"
        );


    cancelButtons.forEach(
        function (button) {

            button.addEventListener(
                "click",
                function () {

                    const orderId =
                        this.dataset.orderId;


                    cancelOrder(
                        orderId
                    );

                }
            );

        }
    );

}


/* =========================================================
   SEARCH ORDERS
========================================================= */

if (adminOrderSearch) {

    adminOrderSearch.addEventListener(
        "input",
        function () {

            displayOrders();

        }
    );

}


/* =========================================================
   FILTER ORDERS
========================================================= */

if (adminStatusFilter) {

    adminStatusFilter.addEventListener(
        "change",
        function () {

            displayOrders();

        }
    );

}


/* =========================================================
   LOGOUT
========================================================= */

if (adminLogoutButton) {

    adminLogoutButton.addEventListener(
        "click",
        function () {

            const confirmation =
                confirm(
                    "Are you sure you want to logout?"
                );


            if (!confirmation) {
                return;
            }


            localStorage.removeItem(
                "foodMunchLoggedInUser"
            );


            window.location.href =
                "login.html";

        }
    );

}


/* =========================================================
   DARK MODE
========================================================= */

function loadTheme() {

    const savedTheme =
        localStorage.getItem(
            "foodMunchTheme"
        );


    if (
        savedTheme ===
        "dark"
    ) {

        document.body.classList.add(
            "dark-mode"
        );


        if (themeButton) {

            themeButton.textContent =
                "☀️";
        }

    }

}


if (themeButton) {

    themeButton.addEventListener(
        "click",
        function () {

            document.body.classList.toggle(
                "dark-mode"
            );


            const isDark =
                document.body.classList.contains(
                    "dark-mode"
                );


            localStorage.setItem(
                "foodMunchTheme",
                isDark
                    ? "dark"
                    : "light"
            );


            themeButton.textContent =
                isDark
                    ? "☀️"
                    : "🌙";

        }
    );

}


/* =========================================================
   INITIALIZE ADMIN DASHBOARD
========================================================= */

if (checkAdminAccess()) {

    displayAdminName();

    loadTheme();

    updateStatistics();

    displayOrders();

}