// =====================================================
// FOOD MUNCH - AUTHENTICATION
// =====================================================


// =====================================================
// REGISTER
// =====================================================

const registerForm =
    document.getElementById("registerForm");


if (registerForm) {

    registerForm.addEventListener(
        "submit",
        function (event) {

            event.preventDefault();


            const name =
                document
                    .getElementById("registerName")
                    .value
                    .trim();


            const email =
                document
                    .getElementById("registerEmail")
                    .value
                    .trim()
                    .toLowerCase();


            const password =
                document
                    .getElementById("registerPassword")
                    .value;


            const confirmPassword =
                document
                    .getElementById("confirmPassword")
                    .value;


            // Check password

            if (password !== confirmPassword) {

                alert(
                    "Passwords do not match."
                );

                return;
            }


            // Get existing users

            const users =
                JSON.parse(
                    localStorage.getItem(
                        "foodMunchUsers"
                    )
                ) || [];


            // Check existing email

            const existingUser =
                users.find(
                    function (user) {

                        return (
                            user.email === email
                        );

                    }
                );


            if (existingUser) {

                alert(
                    "An account with this email already exists."
                );

                return;
            }


            // Create new user

            const newUser = {

                id: Date.now(),

                name: name,

                email: email,

                password: password

            };


            users.push(newUser);


            // Save users

            localStorage.setItem(
                "foodMunchUsers",
                JSON.stringify(users)
            );


            alert(
                "Account created successfully!"
            );


            // Go to login

            window.location.href =
                "login.html";

        }
    );

}


// =====================================================
// LOGIN
// =====================================================

const loginForm =
    document.getElementById("loginForm");


if (loginForm) {

    loginForm.addEventListener(
        "submit",
        function (event) {

            event.preventDefault();


            const email =
                document
                    .getElementById("loginEmail")
                    .value
                    .trim()
                    .toLowerCase();


            const password =
                document
                    .getElementById("loginPassword")
                    .value;


            // Get users

            const users =
                JSON.parse(
                    localStorage.getItem(
                        "foodMunchUsers"
                    )
                ) || [];


            // Find user

            const user =
                users.find(
                    function (user) {

                        return (
                            user.email === email &&
                            user.password === password
                        );

                    }
                );


            if (!user) {

                alert(
                    "Invalid email or password."
                );

                return;
            }


            // Save logged-in user

            localStorage.setItem(
                "foodMunchLoggedInUser",
                JSON.stringify({
                    id: user.id,
                    name: user.name,
                    email: user.email
                })
            );


            alert(
                `Welcome ${user.name}!`
            );


            // Go to home

            window.location.href =
                "index.html";

        }
    );

}