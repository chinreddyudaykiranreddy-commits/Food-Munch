// =====================================================
// FOOD MUNCH - CHECKOUT
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
        "Please login before accessing checkout."
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
        "Unable to read logged-in user:",
        error
    );

    localStorage.removeItem(
        "foodMunchLoggedInUser"
    );

    window.location.href =
        "login.html";
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


    const loggedInUser =
        JSON.parse(
            localStorage.getItem(
                "foodMunchLoggedInUser"
            )
        );


    if (
        loggedInUser &&
        loggedInUser.email &&
        loggedInUser.email.toLowerCase() ===
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
// GET CART
// =====================================================

let cart = [];

try {

    const savedCart =
        localStorage.getItem(
            "foodMunchCart"
        );

    cart = savedCart
        ? JSON.parse(savedCart)
        : [];

    if (!Array.isArray(cart)) {
        cart = [];
    }

} catch (error) {

    console.error(
        "Unable to load cart:",
        error
    );

    cart = [];
}


// =====================================================
// DOM ELEMENTS
// =====================================================

const checkoutForm =
    document.getElementById(
        "checkoutForm"
    );

const checkoutItems =
    document.getElementById(
        "checkoutItems"
    );

const checkoutSubtotal =
    document.getElementById(
        "checkoutSubtotal"
    );

const checkoutDelivery =
    document.getElementById(
        "checkoutDelivery"
    );

const checkoutTotal =
    document.getElementById(
        "checkoutTotal"
    );

const customerName =
    document.getElementById(
        "customerName"
    );

const customerPhone =
    document.getElementById(
        "customerPhone"
    );

const customerEmail =
    document.getElementById(
        "customerEmail"
    );


// =====================================================
// CHECK EMPTY CART
// =====================================================

if (cart.length === 0) {

    alert(
        "Your cart is empty. Please add food before checkout."
    );

    window.location.href =
        "index.html#explore-menu";
}


// =====================================================
// LOAD USER DETAILS
// =====================================================

if (currentUser) {

    customerName.value =
        currentUser.name || "";

    customerEmail.value =
        currentUser.email || "";

}


// =====================================================
// CALCULATE SUBTOTAL
// =====================================================

function calculateSubtotal() {

    return cart.reduce(
        function (total, item) {

            return (
                total +
                (
                    item.price *
                    item.quantity
                )
            );

        },
        0
    );
}


// =====================================================
// CALCULATE DELIVERY
// =====================================================

function calculateDelivery(subtotal) {

    if (subtotal >= 500) {
        return 0;
    }

    return 40;
}


// =====================================================
// DISPLAY CHECKOUT ITEMS
// =====================================================

function displayCheckoutItems() {

    checkoutItems.innerHTML = "";

    cart.forEach(
        function (item) {

            const itemElement =
                document.createElement(
                    "div"
                );

            itemElement.className =
                "checkout-item";

            itemElement.innerHTML = `

                <div class="checkout-item-image">

                    <img
                        src="${item.image}"
                        alt="${item.name}"
                    >

                </div>


                <div class="checkout-item-details">

                    <h3>
                        ${item.name}
                    </h3>

                    <p>
                        ₹${item.price}
                        ×
                        ${item.quantity}
                    </p>

                    <strong>
                        ₹${item.price * item.quantity}
                    </strong>

                </div>

            `;

            checkoutItems.appendChild(
                itemElement
            );

        }
    );
}


// =====================================================
// UPDATE SUMMARY
// =====================================================

function updateCheckoutSummary() {

    const subtotal =
        calculateSubtotal();

    const delivery =
        calculateDelivery(
            subtotal
        );

    const total =
        subtotal + delivery;


    checkoutSubtotal.textContent =
        `₹${subtotal}`;

    checkoutDelivery.textContent =
        delivery === 0
            ? "FREE"
            : `₹${delivery}`;

    checkoutTotal.textContent =
        `₹${total}`;
}


// =====================================================
// PLACE ORDER
// =====================================================

checkoutForm.addEventListener(
    "submit",
    function (event) {

        event.preventDefault();


        if (cart.length === 0) {

            alert(
                "Your cart is empty."
            );

            return;
        }


        const name =
            customerName.value.trim();

        const phone =
            customerPhone.value.trim();

        const email =
            customerEmail.value.trim();

        const address =
            document
                .getElementById(
                    "customerAddress"
                )
                .value
                .trim();

        const city =
            document
                .getElementById(
                    "customerCity"
                )
                .value
                .trim();

        const pincode =
            document
                .getElementById(
                    "customerPincode"
                )
                .value
                .trim();

        const paymentMethod =
            document
                .getElementById(
                    "paymentMethod"
                )
                .value;


        // Validate phone

        if (!/^[0-9]{10}$/.test(phone)) {

            alert(
                "Please enter a valid 10-digit phone number."
            );

            return;
        }


        // Validate pincode

        if (!/^[0-9]{6}$/.test(pincode)) {

            alert(
                "Please enter a valid 6-digit pincode."
            );

            return;
        }


        // Calculate amount

        const subtotal =
            calculateSubtotal();

        const delivery =
            calculateDelivery(
                subtotal
            );

        const total =
            subtotal + delivery;


        // Create order

        const order = {

            orderId:
                "FM" +
                Date.now(),

            userId:
                currentUser.id,

            customerName:
                name,

            customerEmail:
                email,

            customerPhone:
                phone,

            address:
                address,

            city:
                city,

            pincode:
                pincode,

            paymentMethod:
                paymentMethod,

            items:
                cart.map(
                    function (item) {

                        return {

                            id:
                                item.id,

                            name:
                                item.name,

                            price:
                                item.price,

                            quantity:
                                item.quantity,

                            image:
                                item.image

                        };

                    }
                ),

            subtotal:
                subtotal,

            delivery:
                delivery,

            total:
                total,

            status:
                "Order Placed",

            orderDate:
                new Date().toISOString()

        };


        // Get existing orders

        let orders = [];

        try {

            const savedOrders =
                localStorage.getItem(
                    "foodMunchOrders"
                );

            orders =
                savedOrders
                    ? JSON.parse(
                        savedOrders
                    )
                    : [];

            if (!Array.isArray(orders)) {
                orders = [];
            }

        } catch (error) {

            console.error(
                "Unable to load orders:",
                error
            );

            orders = [];
        }


        // Add new order

        orders.push(order);


        // Save orders

        localStorage.setItem(
            "foodMunchOrders",
            JSON.stringify(
                orders
            )
        );


        // Clear cart

        localStorage.removeItem(
            "foodMunchCart"
        );


        // Success message

        alert(
            `Order placed successfully!\n\nOrder ID: ${order.orderId}\nTotal: ₹${total}`
        );


        // Redirect

        window.location.href =
            "order-history.html";

    }
);


// =====================================================
// INITIALIZE
// =====================================================

displayCheckoutItems();

updateCheckoutSummary();