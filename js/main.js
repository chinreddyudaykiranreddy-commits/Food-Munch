// =====================================================
// FOOD MUNCH - FOOD DATA
// =====================================================

const foods = [

    {
        id: 1,
        name: "Chicken Biryani",
        category: "biryani",
        price: 249,
        rating: 4.8,
        description: "Aromatic basmati rice with delicious chicken.",
        image: "https://images.unsplash.com/photo-1589302168068-964664d93dc0?auto=format&fit=crop&w=800&q=80"
    },

    {
        id: 2,
        name: "Veg Biryani",
        category: "biryani",
        price: 199,
        rating: 4.5,
        description: "Flavorful rice cooked with fresh vegetables.",
        image: "https://images.unsplash.com/photo-1633945274405-b6c8069047b0?auto=format&fit=crop&w=800&q=80"
    },

    {
        id: 3,
        name: "Chicken Burger",
        category: "burger",
        price: 179,
        rating: 4.6,
        description: "Juicy chicken patty with fresh vegetables.",
        image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=800&q=80"
    },

    {
        id: 4,
        name: "Cheese Burger",
        category: "burger",
        price: 159,
        rating: 4.7,
        description: "Classic burger with melted cheese and veggies.",
        image: "https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=800&q=80"
    },

    {
        id: 5,
        name: "Margherita Pizza",
        category: "pizza",
        price: 229,
        rating: 4.5,
        description: "Classic pizza topped with cheese and tomato.",
        image: "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?auto=format&fit=crop&w=800&q=80"
    },

    {
        id: 6,
        name: "Chicken Pizza",
        category: "pizza",
        price: 299,
        rating: 4.8,
        description: "Loaded pizza with chicken and mozzarella cheese.",
        image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=800&q=80"
    },

    {
        id: 7,
        name: "Chocolate Cake",
        category: "dessert",
        price: 149,
        rating: 4.9,
        description: "Rich and delicious chocolate cake.",
        image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=800&q=80"
    },

    {
        id: 8,
        name: "Ice Cream",
        category: "dessert",
        price: 99,
        rating: 4.6,
        description: "Creamy and refreshing vanilla ice cream.",
        image: "https://images.unsplash.com/photo-1563805042-7684c019e1cb?auto=format&fit=crop&w=800&q=80"
    }

];


// =====================================================
// SELECT HTML ELEMENTS
// =====================================================

const foodContainer =
    document.getElementById("foodContainer");

const foodSearch =
    document.getElementById("foodSearch");

const categoryButtons =
    document.querySelectorAll(".category-btn");

const sortFood =
    document.getElementById("sortFood");


// =====================================================
// CURRENT MENU FILTER STATE
// =====================================================

let currentCategory = "all";

let currentSearch = "";

let currentSort = "default";


// =====================================================
// CART HTML ELEMENTS
// =====================================================

const cartButton =
    document.getElementById("cartButton");

const cartCount =
    document.getElementById("cartCount");

const cartOverlay =
    document.getElementById("cartOverlay");

const cartPanel =
    document.getElementById("cartPanel");

const closeCart =
    document.getElementById("closeCart");

const cartItems =
    document.getElementById("cartItems");

const emptyCart =
    document.getElementById("emptyCart");

const cartSummary =
    document.getElementById("cartSummary");

const cartSubtotal =
    document.getElementById("cartSubtotal");

const deliveryCharge =
    document.getElementById("deliveryCharge");

const cartTotal =
    document.getElementById("cartTotal");

const checkoutButton =
    document.getElementById("checkoutButton");

const clearCartButton =
    document.getElementById("clearCartButton");


// =====================================================
// CART DATA - LOCAL STORAGE
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
// SAVE CART
// =====================================================

function saveCart() {

    localStorage.setItem(
        "foodMunchCart",
        JSON.stringify(cart)
    );

}


// =====================================================
// FAVORITES DATA
// =====================================================

let favorites = [];

try {

    const savedFavorites =
        localStorage.getItem(
            "foodMunchFavorites"
        );

    favorites =
        savedFavorites
            ? JSON.parse(savedFavorites)
            : [];

    if (!Array.isArray(favorites)) {

        favorites = [];

    }

} catch (error) {

    console.error(
        "Unable to load favorites:",
        error
    );

    favorites = [];

}


// =====================================================
// SAVE FAVORITES
// =====================================================

function saveFavorites() {

    localStorage.setItem(
        "foodMunchFavorites",
        JSON.stringify(favorites)
    );

}

/* =========================================================
   ADMIN NAVIGATION
========================================================= */

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
// DISPLAY FOODS
// =====================================================

function displayFoods(foodList) {

    if (!foodContainer) {
        return;
    }


    foodContainer.innerHTML = "";


    // ---------------------------------------------
    // NO FOOD FOUND
    // ---------------------------------------------

    if (foodList.length === 0) {

        foodContainer.innerHTML = `

            <div class="no-food">

                <h3>
                    No food found
                </h3>

                <p>
                    Try searching for another food item.
                </p>

            </div>

        `;

        return;
    }


    // ---------------------------------------------
    // CREATE FOOD CARDS
    // ---------------------------------------------

    foodList.forEach(function (food) {

        const foodCard =
            document.createElement("article");

        foodCard.classList.add(
            "food-card"
        );


        foodCard.innerHTML = `

            <div class="food-image-container">

                <img
                    src="${food.image}"
                    alt="${food.name}"
                    class="food-image"
                    loading="lazy"
                >


                <button
                    type="button"
                    class="favorite-button"
                    data-id="${food.id}"
                    aria-label="Add ${food.name} to favorites"
                >
                    ♡
                </button>

            </div>


            <div class="food-content">

                <h3 class="food-title">
                    ${food.name}
                </h3>


                <p class="food-description">
                    ${food.description}
                </p>


                <div class="food-rating">
                    ⭐ ${food.rating}
                </div>


                <div class="food-bottom">

                    <span class="food-price">
                        ₹${food.price}
                    </span>


                    <button
                        type="button"
                        class="add-cart-btn"
                        data-id="${food.id}"
                    >
                        Add to Cart
                    </button>

                </div>

            </div>

        `;


        foodContainer.appendChild(
            foodCard
        );

    });


    // ---------------------------------------------
    // ADD EVENTS AFTER CREATING CARDS
    // ---------------------------------------------

    addCartButtonEvents();

    addFavoriteEvents();

    updateFavoriteButtons();

}


// =====================================================
// APPLY MENU FILTERS + SEARCH + SORT
// =====================================================

function updateFoodDisplay() {

    let filteredFoods = [...foods];


    // ---------------------------------------------
    // CATEGORY FILTER
    // ---------------------------------------------

    if (currentCategory !== "all") {

        filteredFoods =
            filteredFoods.filter(
                function (food) {

                    return (
                        food.category ===
                        currentCategory
                    );

                }
            );

    }


    // ---------------------------------------------
    // SEARCH FILTER
    // ---------------------------------------------

    if (currentSearch !== "") {

        filteredFoods =
            filteredFoods.filter(
                function (food) {

                    const foodName =
                        food.name
                            .toLowerCase();

                    const foodCategory =
                        food.category
                            .toLowerCase();

                    const foodDescription =
                        food.description
                            .toLowerCase();

                    return (
                        foodName.includes(
                            currentSearch
                        )

                        ||

                        foodCategory.includes(
                            currentSearch
                        )

                        ||

                        foodDescription.includes(
                            currentSearch
                        )
                    );

                }
            );

    }


    // ---------------------------------------------
    // SORT FOOD
    // ---------------------------------------------

    if (currentSort === "low") {

        filteredFoods.sort(
            function (a, b) {

                return (
                    a.price -
                    b.price
                );

            }
        );

    }


    if (currentSort === "high") {

        filteredFoods.sort(
            function (a, b) {

                return (
                    b.price -
                    a.price
                );

            }
        );

    }


    if (currentSort === "rating") {

        filteredFoods.sort(
            function (a, b) {

                return (
                    b.rating -
                    a.rating
                );

            }
        );

    }


    // ---------------------------------------------
    // DISPLAY FINAL RESULT
    // ---------------------------------------------

    displayFoods(
        filteredFoods
    );

}


// =====================================================
// CATEGORY FILTER
// =====================================================

categoryButtons.forEach(
    function (button) {

        button.addEventListener(
            "click",
            function () {


                // Remove active from all buttons

                categoryButtons.forEach(
                    function (btn) {

                        btn.classList.remove(
                            "active"
                        );

                    }
                );


                // Add active to clicked button

                button.classList.add(
                    "active"
                );


                // Get category

                currentCategory =
                    button.dataset.category;


                // Update food list

                updateFoodDisplay();

            }
        );

    }
);


// =====================================================
// SEARCH FUNCTION
// =====================================================

if (foodSearch) {

    foodSearch.addEventListener(
        "input",
        function () {

            currentSearch =
                foodSearch.value
                    .toLowerCase()
                    .trim();


            updateFoodDisplay();

        }
    );

}


// =====================================================
// SORT FUNCTION
// =====================================================

if (sortFood) {

    sortFood.addEventListener(
        "change",
        function () {

            currentSort =
                sortFood.value;


            updateFoodDisplay();

        }
    );

}


// =====================================================
// ADD TO CART
// =====================================================

function addToCart(foodId) {

    const selectedFood =
        foods.find(
            function (food) {

                return (
                    food.id ===
                    foodId
                );

            }
        );


    if (!selectedFood) {

        return;

    }


    const existingItem =
        cart.find(
            function (item) {

                return (
                    item.id ===
                    foodId
                );

            }
        );


    if (existingItem) {

        existingItem.quantity += 1;

    } else {

        cart.push({

            ...selectedFood,

            quantity: 1

        });

    }


    saveCart();

    updateCart();


    alert(
        `${selectedFood.name} added to cart!`
    );

}


// =====================================================
// CART BUTTON EVENTS
// =====================================================

function addCartButtonEvents() {

    const cartButtons =
        document.querySelectorAll(
            ".add-cart-btn"
        );


    cartButtons.forEach(
        function (button) {

            button.addEventListener(
                "click",
                function () {

                    const foodId =
                        Number(
                            button.dataset.id
                        );


                    addToCart(
                        foodId
                    );

                }
            );

        }
    );

}


// =====================================================
// UPDATE CART
// =====================================================

function updateCart() {

    if (!cartItems) {
        return;
    }


    cartItems.innerHTML = "";


    // ---------------------------------------------
    // CART COUNT
    // ---------------------------------------------

    const totalQuantity =
        cart.reduce(
            function (
                total,
                item
            ) {

                return (
                    total +
                    item.quantity
                );

            },
            0
        );


    if (cartCount) {

        cartCount.textContent =
            totalQuantity;

    }


    // ---------------------------------------------
    // EMPTY CART
    // ---------------------------------------------

    if (cart.length === 0) {

        if (emptyCart) {

            emptyCart.style.display =
                "block";

        }


        if (cartSummary) {

            cartSummary.style.display =
                "none";

        }

        return;

    }


    if (emptyCart) {

        emptyCart.style.display =
            "none";

    }


    if (cartSummary) {

        cartSummary.style.display =
            "block";

    }


    // ---------------------------------------------
    // DISPLAY CART ITEMS
    // ---------------------------------------------

    cart.forEach(
        function (item) {

            const cartItem =
                document.createElement(
                    "div"
                );

            cartItem.classList.add(
                "cart-item"
            );


            cartItem.innerHTML = `

                <img
                    src="${item.image}"
                    alt="${item.name}"
                    class="cart-item-image"
                >


                <div class="cart-item-content">

                    <h3>
                        ${item.name}
                    </h3>


                    <p class="cart-item-price">
                        ₹${item.price}
                    </p>


                    <div class="quantity-controls">


                        <button
                            type="button"
                            class="quantity-btn decrease-btn"
                            data-id="${item.id}"
                        >
                            −
                        </button>


                        <span>
                            ${item.quantity}
                        </span>


                        <button
                            type="button"
                            class="quantity-btn increase-btn"
                            data-id="${item.id}"
                        >
                            +
                        </button>

                    </div>


                    <button
                        type="button"
                        class="remove-item"
                        data-id="${item.id}"
                    >
                        Remove
                    </button>

                </div>

            `;


            cartItems.appendChild(
                cartItem
            );

        }
    );


    addQuantityEvents();

    calculateCartTotal();

}


// =====================================================
// QUANTITY EVENTS
// =====================================================

function addQuantityEvents() {

    const increaseButtons =
        document.querySelectorAll(
            ".increase-btn"
        );

    const decreaseButtons =
        document.querySelectorAll(
            ".decrease-btn"
        );

    const removeButtons =
        document.querySelectorAll(
            ".remove-item"
        );


    // ---------------------------------------------
    // INCREASE
    // ---------------------------------------------

    increaseButtons.forEach(
        function (button) {

            button.addEventListener(
                "click",
                function () {

                    const foodId =
                        Number(
                            button.dataset.id
                        );


                    increaseQuantity(
                        foodId
                    );

                }
            );

        }
    );


    // ---------------------------------------------
    // DECREASE
    // ---------------------------------------------

    decreaseButtons.forEach(
        function (button) {

            button.addEventListener(
                "click",
                function () {

                    const foodId =
                        Number(
                            button.dataset.id
                        );


                    decreaseQuantity(
                        foodId
                    );

                }
            );

        }
    );


    // ---------------------------------------------
    // REMOVE
    // ---------------------------------------------

    removeButtons.forEach(
        function (button) {

            button.addEventListener(
                "click",
                function () {

                    const foodId =
                        Number(
                            button.dataset.id
                        );


                    removeFromCart(
                        foodId
                    );

                }
            );

        }
    );

}


// =====================================================
// INCREASE QUANTITY
// =====================================================

function increaseQuantity(foodId) {

    const item =
        cart.find(
            function (item) {

                return (
                    item.id ===
                    foodId
                );

            }
        );


    if (item) {

        item.quantity += 1;

    }


    saveCart();

    updateCart();

}


// =====================================================
// DECREASE QUANTITY
// =====================================================

function decreaseQuantity(foodId) {

    const item =
        cart.find(
            function (item) {

                return (
                    item.id ===
                    foodId
                );

            }
        );


    if (!item) {

        return;

    }


    item.quantity -= 1;


    if (item.quantity <= 0) {

        cart =
            cart.filter(
                function (item) {

                    return (
                        item.id !==
                        foodId
                    );

                }
            );

    }


    saveCart();

    updateCart();

}


// =====================================================
// REMOVE ITEM
// =====================================================

function removeFromCart(foodId) {

    cart =
        cart.filter(
            function (item) {

                return (
                    item.id !==
                    foodId
                );

            }
        );


    saveCart();

    updateCart();

}


// =====================================================
// CALCULATE CART TOTAL
// =====================================================

function calculateCartTotal() {

    const subtotal =
        cart.reduce(
            function (
                total,
                item
            ) {

                return (
                    total +
                    item.price *
                    item.quantity
                );

            },
            0
        );


    const delivery =
        subtotal >= 500
            ? 0
            : 40;


    const total =
        subtotal +
        delivery;


    if (cartSubtotal) {

        cartSubtotal.textContent =
            `₹${subtotal}`;

    }


    if (deliveryCharge) {

        deliveryCharge.textContent =
            `₹${delivery}`;

    }


    if (cartTotal) {

        cartTotal.textContent =
            `₹${total}`;

    }

}


// =====================================================
// OPEN CART
// =====================================================

function openCart() {

    if (cartOverlay) {

        cartOverlay.classList.add(
            "active"
        );

    }


    if (cartPanel) {

        cartPanel.classList.add(
            "active"
        );

    }


    document.body.style.overflow =
        "hidden";

}


// =====================================================
// CLOSE CART
// =====================================================

function closeCartPanel() {

    if (cartOverlay) {

        cartOverlay.classList.remove(
            "active"
        );

    }


    if (cartPanel) {

        cartPanel.classList.remove(
            "active"
        );

    }


    document.body.style.overflow =
        "";

}


// =====================================================
// CART OPEN EVENT
// =====================================================

if (cartButton) {

    cartButton.addEventListener(
        "click",
        function () {

            openCart();

        }
    );

}


// =====================================================
// CART CLOSE EVENTS
// =====================================================

if (closeCart) {

    closeCart.addEventListener(
        "click",
        function () {

            closeCartPanel();

        }
    );

}


if (cartOverlay) {

    cartOverlay.addEventListener(
        "click",
        function () {

            closeCartPanel();

        }
    );

}


// =====================================================
// CLEAR CART
// =====================================================

if (clearCartButton) {

    clearCartButton.addEventListener(
        "click",
        function () {


            if (cart.length === 0) {

                return;

            }


            const confirmClear =
                confirm(
                    "Are you sure you want to clear your cart?"
                );


            if (confirmClear) {

                cart = [];

                saveCart();

                updateCart();

            }

        }
    );

}


// =====================================================
// CHECKOUT
// =====================================================

if (checkoutButton) {

    checkoutButton.addEventListener(
        "click",
        function () {


            // -----------------------------------------
            // CHECK LOGIN
            // -----------------------------------------

            const loggedInUser =
                localStorage.getItem(
                    "foodMunchLoggedInUser"
                );


            // -----------------------------------------
            // CHECK EMPTY CART
            // -----------------------------------------

            if (cart.length === 0) {

                alert(
                    "Your cart is empty."
                );

                return;

            }


            // -----------------------------------------
            // USER NOT LOGGED IN
            // -----------------------------------------

            if (!loggedInUser) {

                const loginRequired =
                    confirm(
                        "Please login before checkout. Do you want to login now?"
                    );


                if (loginRequired) {

                    window.location.href =
                        "login.html";

                }

                return;

            }


            // -----------------------------------------
            // USER LOGGED IN
            // -----------------------------------------

            window.location.href =
                "checkout.html";

        }
    );

}


// =====================================================
// FAVORITE BUTTON EVENTS
// =====================================================

function addFavoriteEvents() {

    const favoriteButtons =
        document.querySelectorAll(
            ".favorite-button"
        );


    favoriteButtons.forEach(
        function (button) {

            button.addEventListener(
                "click",
                function () {

                    const foodId =
                        Number(
                            button.dataset.id
                        );


                    // ---------------------------------
                    // REMOVE FROM FAVORITES
                    // ---------------------------------

                    if (
                        favorites.includes(
                            foodId
                        )
                    ) {

                        favorites =
                            favorites.filter(
                                function (id) {

                                    return (
                                        id !==
                                        foodId
                                    );

                                }
                            );

                    }

                    // ---------------------------------
                    // ADD TO FAVORITES
                    // ---------------------------------

                    else {

                        favorites.push(
                            foodId
                        );

                    }


                    saveFavorites();

                    updateFavoriteButtons();

                }
            );

        }
    );

}


// =====================================================
// UPDATE FAVORITE BUTTONS
// =====================================================

function updateFavoriteButtons() {

    const favoriteButtons =
        document.querySelectorAll(
            ".favorite-button"
        );


    favoriteButtons.forEach(
        function (button) {

            const foodId =
                Number(
                    button.dataset.id
                );


            if (
                favorites.includes(
                    foodId
                )
            ) {

                button.textContent =
                    "♥";

                button.classList.add(
                    "active"
                );

                button.setAttribute(
                    "aria-label",
                    "Remove from favorites"
                );

            } else {

                button.textContent =
                    "♡";

                button.classList.remove(
                    "active"
                );

                button.setAttribute(
                    "aria-label",
                    "Add to favorites"
                );

            }

        }
    );

}


// =====================================================
// USER AUTHENTICATION ELEMENTS
// =====================================================

const loginNavItem =
    document.getElementById(
        "loginNavItem"
    );

const registerNavItem =
    document.getElementById(
        "registerNavItem"
    );

const userNavItem =
    document.getElementById(
        "userNavItem"
    );

const logoutNavItem =
    document.getElementById(
        "logoutNavItem"
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
// CHECK LOGIN STATUS
// =====================================================

function updateAuthenticationUI() {

    const loggedInUser =
        localStorage.getItem(
            "foodMunchLoggedInUser"
        );


    if (loggedInUser) {

        let user;


        try {

            user =
                JSON.parse(
                    loggedInUser
                );

        } catch (error) {

            console.error(
                "Invalid login data:",
                error
            );

            localStorage.removeItem(
                "foodMunchLoggedInUser"
            );

            return;

        }


        // ---------------------------------------------
        // HIDE LOGIN / REGISTER
        // ---------------------------------------------

        if (loginNavItem) {

            loginNavItem.style.display =
                "none";

        }


        if (registerNavItem) {

            registerNavItem.style.display =
                "none";

        }


        // ---------------------------------------------
        // SHOW USER / LOGOUT
        // ---------------------------------------------

        if (userNavItem) {

            userNavItem.style.display =
                "block";

        }


        if (logoutNavItem) {

            logoutNavItem.style.display =
                "block";

        }


        if (navUserName) {

            navUserName.textContent =
                `Hello, ${user.name}`;

        }

    } else {


        // ---------------------------------------------
        // SHOW LOGIN / REGISTER
        // ---------------------------------------------

        if (loginNavItem) {

            loginNavItem.style.display =
                "block";

        }


        if (registerNavItem) {

            registerNavItem.style.display =
                "block";

        }


        // ---------------------------------------------
        // HIDE USER / LOGOUT
        // ---------------------------------------------

        if (userNavItem) {

            userNavItem.style.display =
                "none";

        }


        if (logoutNavItem) {

            logoutNavItem.style.display =
                "none";

        }

    }

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


            alert(
                "You have been logged out successfully."
            );


            updateAuthenticationUI();

            window.location.href =
                "login.html";

        }
    );

}


// =====================================================
// DARK MODE
// =====================================================

const themeButton =
    document.getElementById(
        "themeButton"
    );


function updateThemeButton() {

    if (!themeButton) {
        return;
    }


    const darkMode =
        localStorage.getItem(
            "foodMunchDarkMode"
        );


    if (darkMode === "true") {

        document.body.classList.add(
            "dark-mode"
        );

        themeButton.textContent =
            "☀️";

    } else {

        document.body.classList.remove(
            "dark-mode"
        );

        themeButton.textContent =
            "🌙";

    }

}


if (themeButton) {

    themeButton.addEventListener(
        "click",
        function () {

            const isDark =
                document.body.classList.toggle(
                    "dark-mode"
                );


            localStorage.setItem(
                "foodMunchDarkMode",
                isDark
            );


            updateThemeButton();

        }
    );

}


updateThemeButton();


// =====================================================
// UPDATE THEME BUTTON
// =====================================================

function updateThemeButton() {

    if (!themeButton) {

        return;

    }


    const darkMode =
        localStorage.getItem(
            "foodMunchDarkMode"
        );


    if (darkMode === "true") {

        document.body.classList.add(
            "dark-mode"
        );

        themeButton.textContent =
            "☀️";

        themeButton.setAttribute(
            "aria-label",
            "Switch to light mode"
        );

    } else {

        document.body.classList.remove(
            "dark-mode"
        );

        themeButton.textContent =
            "🌙";

        themeButton.setAttribute(
            "aria-label",
            "Switch to dark mode"
        );

    }

}


// =====================================================
// DARK MODE EVENT
// =====================================================

if (themeButton) {

    themeButton.addEventListener(
        "click",
        function () {


            const isDark =
                document.body.classList.toggle(
                    "dark-mode"
                );


            localStorage.setItem(
                "foodMunchDarkMode",
                isDark
            );


            updateThemeButton();

        }
    );

}


// =====================================================
// MOBILE MENU
// =====================================================

const menuButton =
    document.getElementById(
        "menuButton"
    );

const navMenu =
    document.querySelector(
        ".nav-menu"
    );


if (
    menuButton &&
    navMenu
) {

    menuButton.addEventListener(
        "click",
        function () {

            navMenu.classList.toggle(
                "active"
            );

        }
    );


    // Close mobile menu when link is clicked

    const navLinks =
        navMenu.querySelectorAll(
            ".nav-link"
        );


    navLinks.forEach(
        function (link) {

            link.addEventListener(
                "click",
                function () {

                    navMenu.classList.remove(
                        "active"
                    );

                }
            );

        }
    );

}


// =====================================================
// INITIAL PAGE LOAD
// =====================================================

// Display food

updateFoodDisplay();


// Update cart

updateCart();


// Update authentication

updateAuthenticationUI();


// Update theme

updateThemeButton();


// =====================================================
// FOOD MUNCH MAIN.JS COMPLETE
// =====================================================