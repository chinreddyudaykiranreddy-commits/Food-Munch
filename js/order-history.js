
// =====================================================
// FOOD MUNCH - ORDER HISTORY
// =====================================================



// =====================================================
// GET LOGGED-IN USER
// =====================================================

const loggedInUser =
    localStorage.getItem(
        "foodMunchLoggedInUser"
    );



// =====================================================
// CHECK LOGIN
// =====================================================

if (!loggedInUser) {

    alert(
        "Please login to view your orders."
    );

    window.location.href =
        "login.html";

}


// =====================================================
// SAFE VALUE HELPERS
// =====================================================

function safeText(value, fallback = "N/A") {

    if (value === null || value === undefined || value === "") {

        return fallback;

    }

    return String(value);

}


function safeNumber(value, fallback = 0) {

    const parsed = Number(value);

    return Number.isFinite(parsed)
        ? parsed
        : fallback;

}



// =====================================================
// LOAD USER
// =====================================================

let currentUser = null;

try {

    currentUser =
        JSON.parse(loggedInUser);

} catch (error) {

    console.error(
        "Unable to read user:",
        error
    );

    localStorage.removeItem(
        "foodMunchLoggedInUser"
    );

    window.location.href =
        "login.html";

}



// =====================================================
// DOM ELEMENTS
// =====================================================

const ordersContainer =
    document.getElementById(
        "ordersContainer"
    );


const noOrders =
    document.getElementById(
        "noOrders"
    );


const orderUserName =
    document.getElementById(
        "orderUserName"
    );


const orderUserEmail =
    document.getElementById(
        "orderUserEmail"
    );


const navUserName =
    document.getElementById(
        "navUserName"
    );


const logoutButton =
    document.getElementById(
        "logoutButton"
    );



// =====================================================
// ORDER SEARCH & FILTER ELEMENTS
// =====================================================

const orderSearch =
    document.getElementById(
        "orderSearch"
    );


const orderStatusFilter =
    document.getElementById(
        "orderStatusFilter"
    );



// =====================================================
// DISPLAY USER
// =====================================================

if (currentUser) {

    if (orderUserName) {

        orderUserName.textContent =
            currentUser.name;

    }


    if (orderUserEmail) {

        orderUserEmail.textContent =
            currentUser.email;

    }


    if (navUserName) {

        navUserName.textContent =
            `Hello, ${currentUser.name}`;

    }

}



// =====================================================
// GET ALL ORDERS
// =====================================================

function getOrders() {

    try {

        const savedOrders =
            localStorage.getItem(
                "foodMunchOrders"
            );


        const orders =
            savedOrders
                ? JSON.parse(savedOrders)
                : [];


        if (!Array.isArray(orders)) {

            return [];

        }


        return orders;

    } catch (error) {

        console.error(
            "Unable to load orders:",
            error
        );

        return [];

    }

}



// =====================================================
// GET CURRENT USER ORDERS
// =====================================================

function getUserOrders() {

    const orders =
        getOrders();


    if (!currentUser) {

        return [];

    }


    return orders.filter(
        function (order) {

            return (
                String(
                    order.userId
                ) ===
                String(
                    currentUser.id
                )
            );

        }
    );

}



// =====================================================
// FORMAT DATE
// =====================================================

function formatDate(dateValue) {

    const date =
        new Date(dateValue);


    if (
        Number.isNaN(
            date.getTime()
        )
    ) {

        return "Date unavailable";

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



// =====================================================
// ORDER STATUS TIMELINE
// =====================================================

function createOrderTimeline(status) {

    const statuses = [

        "Order Placed",

        "Preparing",

        "Out for Delivery",

        "Delivered"

    ];


    const statusIndex =
        statuses.indexOf(
            status
        );



    // =================================================
    // CANCELLED ORDER
    // =================================================

    if (
        status ===
        "Cancelled"
    ) {

        return `

            <div class="order-timeline cancelled-timeline">

                <div class="timeline-step active cancelled">

                    <div class="timeline-icon">
                        ✕
                    </div>


                    <div class="timeline-content">

                        <strong>
                            Order Cancelled
                        </strong>


                        <span>
                            This order has been cancelled.
                        </span>

                    </div>

                </div>

            </div>

        `;

    }



    // =================================================
    // NORMAL ORDER TIMELINE
    // =================================================

    let timelineHTML = `

        <div class="order-timeline">

    `;


    statuses.forEach(
        function (
            timelineStatus,
            index
        ) {


            let stepClass =
                "";


            // =========================================
            // COMPLETED
            // =========================================

            if (
                index <
                statusIndex
            ) {

                stepClass =
                    "completed";

            }


            // =========================================
            // CURRENT
            // =========================================

            if (
                index ===
                statusIndex
            ) {

                stepClass =
                    "active";

            }


            timelineHTML += `

                <div
                    class="timeline-step ${stepClass}"
                >

                    <div class="timeline-icon">

                        ${
                            index < statusIndex
                                ? "✓"
                                : index === statusIndex
                                    ? "●"
                                    : "○"
                        }

                    </div>


                    <div class="timeline-content">

                        <strong>
                            ${timelineStatus}
                        </strong>


                        ${
                            index === statusIndex
                                ? `

                                    <span>
                                        Current Status
                                    </span>

                                  `
                                : ""
                        }

                    </div>

                </div>

            `;

        }
    );


    timelineHTML += `

        </div>

    `;


    return timelineHTML;

}



// =====================================================
// DISPLAY ORDERS
// =====================================================

function displayOrders() {

    if (
        !ordersContainer ||
        !noOrders
    ) {

        return;

    }



    // =================================================
    // GET CURRENT USER ORDERS
    // =================================================

    const userOrders =
        getUserOrders();



    // =================================================
    // CLEAR OLD ORDERS
    // =================================================

    ordersContainer.innerHTML =
        "";



    // =================================================
    // CHECK IF USER HAS NO ORDERS
    // =================================================

    if (
        userOrders.length ===
        0
    ) {

        noOrders.style.display =
            "block";

        return;

    }


    noOrders.style.display =
        "none";



    // =================================================
    // GET SEARCH VALUE
    // =================================================

    const searchValue =
        orderSearch
            ? orderSearch.value
                .trim()
                .toLowerCase()
            : "";



    // =================================================
    // GET STATUS FILTER
    // =================================================

    const selectedStatus =
        orderStatusFilter
            ? orderStatusFilter.value
            : "all";



    // =================================================
    // FILTER ORDERS
    // =================================================

    const filteredOrders =
        userOrders.filter(
            function (order) {


                // =====================================
                // SEARCH ORDER ID
                // =====================================

                const orderId =
                    String(
                        order.orderId || ""
                    ).toLowerCase();


                const matchesSearch =
                    orderId.includes(
                        searchValue
                    );


                // =====================================
                // STATUS FILTER
                // =====================================

                const matchesStatus =
                    selectedStatus ===
                    "all"

                        ? true

                        : order.status ===
                          selectedStatus;


                // =====================================
                // BOTH CONDITIONS
                // =====================================

                return (
                    matchesSearch &&
                    matchesStatus
                );

            }
        );



    // =================================================
    // NO SEARCH RESULTS
    // =================================================

    if (
        filteredOrders.length ===
        0
    ) {

        ordersContainer.innerHTML = `

            <div class="no-search-results">

                <div class="no-orders-icon">
                    🔍
                </div>

                <h3>
                    No Matching Orders
                </h3>

                <p>
                    No orders match your search or selected status.
                </p>

            </div>

        `;

        return;

    }



    // =================================================
    // LATEST ORDER FIRST
    // =================================================

    filteredOrders
        .slice()
        .reverse()
        .forEach(
            function (order) {

                const orderCard =
                    createOrderCard(
                        order
                    );


                ordersContainer.appendChild(
                    orderCard
                );

            }
        );



    // =================================================
    // ADD ORDER ACTION EVENTS
    // =================================================

    addOrderActionEvents();

}



// =====================================================
// CREATE ORDER CARD
// =====================================================

function createOrderCard(order) {

    const orderCard =
        document.createElement(
            "article"
        );


    orderCard.className =
        "order-card";



    // =================================================
    // CREATE ITEMS HTML
    // =================================================

    let itemsHTML =
        "";


    if (
        Array.isArray(
            order.items
        )
    ) {

        order.items.forEach(
            function (item) {

                itemsHTML += `

                    <div class="order-item">

                        <div class="order-item-image">

                            <img
                                src="${item.image}"
                                alt="${item.name}"
                            >

                        </div>


                        <div class="order-item-details">

                            <h4>
                                ${item.name}
                            </h4>


                            <p>
                                ₹${item.price}
                                ×
                                ${item.quantity}
                            </p>

                        </div>


                        <strong class="order-item-total">

                            ₹${
                                item.price *
                                item.quantity
                            }

                        </strong>

                    </div>

                `;

            }
        );

    }



    // =================================================
    // ORDER CARD
    // =================================================

    const statusLabel = safeText(order.status, "Order Placed");
    const customerName = safeText(order.customerName, "Customer");
    const customerPhone = safeText(order.customerPhone, "Phone not available");
    const deliveryAddress = [
        safeText(order.address, "Address unavailable"),
        safeText(order.city, "City unavailable"),
        safeText(order.pincode, "")
    ].filter(Boolean).join(", ");
    const paymentMethod = safeText(order.paymentMethod, "Cash on Delivery");
    const subtotal = safeNumber(order.subtotal, 0);
    const delivery = safeNumber(order.delivery, 0);
    const total = safeNumber(order.total, subtotal + delivery);

    orderCard.innerHTML = `

        <!-- =========================================
             ORDER HEADER
        ========================================== -->

        <div class="order-card-header">

            <div>

                <p class="order-label">
                    Order ID
                </p>


                <h3>
                    ${safeText(order.orderId, "Unknown")}
                </h3>

            </div>


            <div class="order-status order-status-${statusLabel.toLowerCase().replace(/\s+/g, "-")}">

                ${statusLabel}

            </div>

        </div>



        <!-- =========================================
             ORDER STATUS TIMELINE
        ========================================== -->

        ${createOrderTimeline(statusLabel)}



        <!-- =========================================
             ORDER DATE
        ========================================== -->

        <div class="order-date">

            <span>
                Order Date:
            </span>


            <strong>

                ${formatDate(order.orderDate)}

            </strong>

        </div>



        <!-- =========================================
             ORDER ITEMS
        ========================================== -->

        <div class="order-items">

            ${itemsHTML}

        </div>



        <!-- =========================================
             DELIVERY DETAILS
        ========================================== -->

        <div class="order-delivery-info">

            <h3>
                Delivery Details
            </h3>


            <p>

                <strong>
                    Name:
                </strong>

                ${customerName}

            </p>


            <p>

                <strong>
                    Phone:
                </strong>

                ${customerPhone}

            </p>


            <p>

                <strong>
                    Address:
                </strong>

                ${deliveryAddress}

            </p>


            <p>

                <strong>
                    Payment:
                </strong>

                ${paymentMethod}

            </p>

        </div>



        <!-- =========================================
             ORDER TOTAL
        ========================================== -->

        <div class="order-total-section">

            <div class="order-total-row">

                <span>
                    Subtotal
                </span>


                <span>
                    ₹${subtotal.toLocaleString("en-IN")}
                </span>

            </div>


            <div class="order-total-row">

                <span>
                    Delivery
                </span>


                <span>

                    ${delivery === 0 ? "FREE" : `₹${delivery.toLocaleString("en-IN")}`}

                </span>

            </div>


            <div class="order-total-divider">
            </div>


            <div class="order-total-row final">

                <span>
                    Total
                </span>


                <strong>
                    ₹${total.toLocaleString("en-IN")}
                </strong>

            </div>

        </div>



        <!-- =========================================
             ORDER ACTIONS
        ========================================== -->

        <div class="order-actions">


            <!-- =====================================
                 TRACK ORDER
            ====================================== -->

            <button
                type="button"
                class="track-order-button"
                data-order-id="${
                    safeText(order.orderId, "Unknown")
                }"
            >

                📍 Track Order

            </button>



            <!-- =====================================
                 REORDER
            ====================================== -->

            <button
                type="button"
                class="reorder-button"
                data-order-id="${safeText(order.orderId, "Unknown")}"
            >

                🔄 Reorder

            </button>



            <!-- =====================================
                 CANCEL ORDER
            ====================================== -->

            ${
                statusLabel === "Order Placed"

                    ? `

                        <button
                            type="button"
                            class="cancel-order-button"
                            data-order-id="${
                                safeText(order.orderId, "Unknown")
                            }"
                        >

                            Cancel Order

                        </button>

                      `

                    : ""
            }


        </div>

    `;


    return orderCard;

}



// =====================================================
// ORDER ACTIONS
// =====================================================

function addOrderActionEvents() {


    // =================================================
    // TRACK ORDER BUTTONS
    // =================================================

    const trackButtons =
        document.querySelectorAll(
            ".track-order-button"
        );



    // =================================================
    // REORDER BUTTONS
    // =================================================

    const reorderButtons =
        document.querySelectorAll(
            ".reorder-button"
        );



    // =================================================
    // CANCEL BUTTONS
    // =================================================

    const cancelButtons =
        document.querySelectorAll(
            ".cancel-order-button"
        );



    // =================================================
    // TRACK ORDER
    // =================================================

    trackButtons.forEach(
        function (button) {

            button.addEventListener(
                "click",
                function () {

                    const orderId =
                        button.dataset.orderId;


                    const orders =
                        getOrders();


                    const order =
                        orders.find(
                            function (item) {

                                return (

                                    String(
                                        item.orderId
                                    ) ===
                                    String(
                                        orderId
                                    )

                                    &&

                                    String(
                                        item.userId
                                    ) ===
                                    String(
                                        currentUser.id
                                    )

                                );

                            }
                        );


                    if (!order) {

                        alert(
                            "Order not found."
                        );

                        return;

                    }



                    // =========================================
                    // SAVE SELECTED ORDER
                    // =========================================

                    localStorage.setItem(
                        "foodMunchTrackingOrder",
                        JSON.stringify(
                            order
                        )
                    );



                    // =========================================
                    // OPEN TRACKING PAGE
                    // =========================================

                    window.location.href =
                        "track-order.html";

                }
            );

        }
    );



    // =================================================
    // REORDER
    // =================================================

    reorderButtons.forEach(
        function (button) {

            button.addEventListener(
                "click",
                function () {

                    const orderId =
                        button.dataset.orderId;


                    const orders =
                        getOrders();


                    const order =
                        orders.find(
                            function (item) {

                                return (

                                    String(
                                        item.orderId
                                    ) ===
                                    String(
                                        orderId
                                    )

                                    &&

                                    String(
                                        item.userId
                                    ) ===
                                    String(
                                        currentUser.id
                                    )

                                );

                            }
                        );


                    if (!order) {

                        alert(
                            "Order not found."
                        );

                        return;

                    }



                    // =========================================
                    // CHECK ORDER ITEMS
                    // =========================================

                    if (
                        !Array.isArray(
                            order.items
                        )

                        ||

                        order.items.length ===
                        0
                    ) {

                        alert(
                            "This order has no items."
                        );

                        return;

                    }



                    // =========================================
                    // ADD ORDER ITEMS TO CART
                    // =========================================

                    localStorage.setItem(
                        "foodMunchCart",
                        JSON.stringify(
                            order.items
                        )
                    );


                    alert(
                        "Items added to your cart."
                    );



                    // =========================================
                    // GO TO HOME PAGE
                    // =========================================

                    window.location.href =
                        "index.html";

                }
            );

        }
    );



    // =================================================
    // CANCEL ORDER
    // =================================================

    cancelButtons.forEach(
        function (button) {

            button.addEventListener(
                "click",
                function () {

                    const orderId =
                        button.dataset.orderId;



                    // =========================================
                    // CONFIRM CANCEL
                    // =========================================

                    const confirmCancel =
                        confirm(
                            "Are you sure you want to cancel this order?"
                        );


                    if (!confirmCancel) {

                        return;

                    }



                    const orders =
                        getOrders();



                    // =========================================
                    // UPDATE ORDER
                    // =========================================

                    const updatedOrders =
                        orders.map(
                            function (order) {


                                if (

                                    String(
                                        order.orderId
                                    ) ===
                                    String(
                                        orderId
                                    )

                                    &&

                                    String(
                                        order.userId
                                    ) ===
                                    String(
                                        currentUser.id
                                    )

                                    &&

                                    order.status ===
                                    "Order Placed"

                                ) {

                                    return {

                                        ...order,

                                        status:
                                            "Cancelled"

                                    };

                                }


                                return order;

                            }
                        );



                    // =========================================
                    // SAVE ORDERS
                    // =========================================

                    localStorage.setItem(
                        "foodMunchOrders",
                        JSON.stringify(
                            updatedOrders
                        )
                    );



                    // =========================================
                    // SUCCESS MESSAGE
                    // =========================================

                    alert(
                        "Order cancelled successfully."
                    );



                    // =========================================
                    // REFRESH ORDERS
                    // =========================================

                    displayOrders();

                }
            );

        }
    );

}



// =====================================================
// ORDER SEARCH
// =====================================================

if (orderSearch) {

    orderSearch.addEventListener(
        "input",
        function () {

            displayOrders();

        }
    );

}



// =====================================================
// ADMIN NAVIGATION
// =====================================================

const adminNavItem =
    document.getElementById(
        "adminNavItem"
    );


function updateAdminNavigation() {

    if (!adminNavItem) {

        return;

    }


    let adminUser = null;


    try {

        adminUser =
            JSON.parse(
                localStorage.getItem(
                    "foodMunchLoggedInUser"
                )
            );

    } catch (error) {

        adminUser = null;

    }


    if (
        adminUser &&
        adminUser.email &&
        adminUser.email.toLowerCase() ===
        "admin@foodmunch.com"
    ) {

        adminNavItem.style.display =
            "block";

    } else {

        adminNavItem.style.display =
            "none";

    }

}


updateAdminNavigation();



// =====================================================
// ORDER STATUS FILTER
// =====================================================

if (orderStatusFilter) {

    orderStatusFilter.addEventListener(
        "change",
        function () {

            displayOrders();

        }
    );

}



// =====================================================
// LOGOUT
// =====================================================

if (logoutButton) {

    logoutButton.addEventListener(
        "click",
        function () {


            // =========================================
            // CONFIRM LOGOUT
            // =========================================

            const confirmLogout =
                confirm(
                    "Are you sure you want to logout?"
                );


            if (!confirmLogout) {

                return;

            }



            // =========================================
            // REMOVE LOGIN SESSION
            // =========================================

            localStorage.removeItem(
                "foodMunchLoggedInUser"
            );



            // =========================================
            // REMOVE TRACKING ORDER
            // =========================================

            localStorage.removeItem(
                "foodMunchTrackingOrder"
            );



            // =========================================
            // SUCCESS MESSAGE
            // =========================================

            alert(
                "You have been logged out successfully."
            );



            // =========================================
            // RETURN TO LOGIN
            // =========================================

            window.location.href =
                "login.html";

        }
    );

}



// =====================================================
// INITIALIZE
// =====================================================

displayOrders();



// =====================================================
// AUTO REFRESH ORDER HISTORY
// =====================================================

setInterval(
    function () {

        displayOrders();

    },
    10000
);
