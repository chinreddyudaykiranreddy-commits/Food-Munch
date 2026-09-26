
// =====================================================
// FOOD MUNCH - TRACK ORDER
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
        "Please login to track your order."
    );

    window.location.href =
        "login.html";

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
// GET SELECTED ORDER
// =====================================================

const trackingOrder =
    localStorage.getItem(
        "foodMunchTrackingOrder"
    );


if (!trackingOrder) {

    alert(
        "No order selected."
    );

    window.location.href =
        "order-history.html";

}


// =====================================================
// LOAD ORDER
// =====================================================

let selectedOrder = null;

try {

    selectedOrder =
        JSON.parse(
            trackingOrder
        );

} catch (error) {

    console.error(
        "Unable to read tracking order:",
        error
    );

    localStorage.removeItem(
        "foodMunchTrackingOrder"
    );

    window.location.href =
        "order-history.html";

}


// =====================================================
// DOM ELEMENTS
// =====================================================

const container =
    document.getElementById(
        "trackOrderContainer"
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
// DISPLAY USER
// =====================================================

if (
    currentUser &&
    navUserName
) {

    navUserName.textContent =
        `Hello, ${currentUser.name}`;

}


// =====================================================
// GET LATEST ORDER FROM LOCAL STORAGE
// =====================================================

function getLatestOrder() {

    const savedOrders =
        localStorage.getItem(
            "foodMunchOrders"
        );


    if (!savedOrders) {

        return null;

    }


    try {

        const orders =
            JSON.parse(
                savedOrders
            );


        if (!Array.isArray(orders)) {

            return null;

        }


        return orders.find(
            function (order) {

                return (
                    String(
                        order.orderId
                    ) ===
                    String(
                        selectedOrder.orderId
                    )
                    &&
                    String(
                        order.userId
                    ) ===
                    String(
                        currentUser.id
                    )
                );

            }
        ) || null;


    } catch (error) {

        console.error(
            "Unable to load latest order:",
            error
        );

        return null;

    }

}


// =====================================================
// FORMAT DATE
// =====================================================

function formatDate(dateValue) {

    const date =
        new Date(
            dateValue
        );


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
// CREATE TIMELINE
// =====================================================

function createTimeline(status) {

    const statuses = [

        "Order Placed",

        "Preparing",

        "Out for Delivery",

        "Delivered"

    ];


    const currentIndex =
        statuses.indexOf(
            status
        );


    // =================================================
    // CANCELLED
    // =================================================

    if (
        status ===
        "Cancelled"
    ) {

        return `

            <div class="tracking-cancelled">

                <div class="tracking-cancelled-icon">
                    ✕
                </div>


                <h3>
                    Order Cancelled
                </h3>


                <p>
                    This order has been cancelled.
                </p>

            </div>

        `;

    }


    // =================================================
    // TIMELINE
    // =================================================

    let html = `

        <div class="tracking-timeline">

    `;


    statuses.forEach(
        function (
            timelineStatus,
            index
        ) {

            let stepClass =
                "";


            if (
                index <
                currentIndex
            ) {

                stepClass =
                    "completed";

            }


            if (
                index ===
                currentIndex
            ) {

                stepClass =
                    "active";

            }


            html += `

                <div
                    class="tracking-step ${stepClass}"
                >

                    <div class="tracking-icon">

                        ${
                            index <
                            currentIndex

                                ? "✓"

                                : index ===
                                  currentIndex

                                    ? "●"

                                    : "○"
                        }

                    </div>


                    <div class="tracking-step-content">

                        <strong>
                            ${timelineStatus}
                        </strong>


                        ${
                            index ===
                            currentIndex

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


    html += `

        </div>

    `;


    return html;

}


// =====================================================
// DISPLAY ORDER
// =====================================================

function displayTrackingOrder() {

    if (
        !container ||
        !selectedOrder
    ) {

        return;

    }


    // =================================================
    // GET LATEST ORDER
    // =================================================

    const latestOrder =
        getLatestOrder();


    if (!latestOrder) {

        container.innerHTML = `

            <div class="tracking-card">

                <h2>
                    Order Not Found
                </h2>


                <p>
                    We could not find this order.
                </p>


                <br>


                <a
                    href="order-history.html"
                    class="tracking-back-button"
                >
                    ← Back to My Orders
                </a>

            </div>

        `;

        return;

    }


    // =================================================
    // UPDATE SELECTED ORDER
    // =================================================

    selectedOrder =
        latestOrder;


    // =================================================
    // CREATE ITEMS
    // =================================================

    let itemsHTML =
        "";


    if (
        Array.isArray(
            selectedOrder.items
        )
    ) {

        selectedOrder.items.forEach(
            function (item) {

                itemsHTML += `

                    <div class="tracking-item">

                        <img
                            src="${item.image}"
                            alt="${item.name}"
                        >


                        <div>

                            <h4>
                                ${item.name}
                            </h4>


                            <p>
                                ₹${item.price}
                                ×
                                ${item.quantity}
                            </p>

                        </div>

                    </div>

                `;

            }
        );

    }


    // =================================================
    // DISPLAY
    // =================================================

    container.innerHTML = `

        <div class="tracking-card">


            <!-- =====================================
                 HEADER
            ====================================== -->

            <div class="tracking-header">

                <div>

                    <p>
                        Order ID
                    </p>


                    <h1>
                        ${selectedOrder.orderId}
                    </h1>

                </div>


                <div class="order-status">

                    ${selectedOrder.status}

                </div>

            </div>


            <!-- =====================================
                 ORDER DATE
            ====================================== -->

            <div class="tracking-date">

                Order placed on

                <strong>

                    ${formatDate(
                        selectedOrder.orderDate
                    )}

                </strong>

            </div>


            <!-- =====================================
                 TIMELINE
            ====================================== -->

            ${createTimeline(
                selectedOrder.status
            )}


            <!-- =====================================
                 ORDER ITEMS
            ====================================== -->

            <div class="tracking-section">

                <h2>
                    Order Items
                </h2>


                <div class="tracking-items">

                    ${itemsHTML}

                </div>

            </div>


            <!-- =====================================
                 DELIVERY DETAILS
            ====================================== -->

            <div class="tracking-section">

                <h2>
                    Delivery Details
                </h2>


                <p>

                    <strong>
                        Name:
                    </strong>

                    ${selectedOrder.customerName}

                </p>


                <p>

                    <strong>
                        Phone:
                    </strong>

                    ${selectedOrder.customerPhone}

                </p>


                <p>

                    <strong>
                        Address:
                    </strong>

                    ${selectedOrder.address},
                    ${selectedOrder.city} -
                    ${selectedOrder.pincode}

                </p>


                <p>

                    <strong>
                        Payment:
                    </strong>

                    ${selectedOrder.paymentMethod}

                </p>

            </div>


            <!-- =====================================
                 TOTAL
            ====================================== -->

            <div class="tracking-total">

                <span>
                    Total Amount
                </span>


                <strong>
                    ₹${selectedOrder.total}
                </strong>

            </div>


            <!-- =====================================
                 ACTION
            ====================================== -->

            <div class="tracking-actions">

                <a
                    href="order-history.html"
                    class="tracking-back-button"
                >
                    ← Back to My Orders
                </a>

            </div>


        </div>

    `;

}


// =====================================================
// LOGOUT
// =====================================================

if (logoutButton) {

    logoutButton.addEventListener(
        "click",
        function () {

            const confirmLogout =
                confirm(
                    "Are you sure you want to logout?"
                );


            if (!confirmLogout) {

                return;

            }


            localStorage.removeItem(
                "foodMunchLoggedInUser"
            );


            localStorage.removeItem(
                "foodMunchTrackingOrder"
            );


            alert(
                "You have been logged out successfully."
            );


            window.location.href =
                "login.html";

        }
    );

}


// =====================================================
// INITIALIZE
// =====================================================

displayTrackingOrder();


// =====================================================
// AUTO REFRESH TRACKING
// =====================================================

setInterval(
    function () {

        displayTrackingOrder();

    },
    10000
);
