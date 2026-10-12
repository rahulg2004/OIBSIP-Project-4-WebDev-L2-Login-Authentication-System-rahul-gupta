/* =========================================
   LOCAL STORAGE FUNCTIONS
========================================= */

function getUsers() {
    const users = localStorage.getItem("users");

    if (!users) {
        return [];
    }

    try {
        return JSON.parse(users);
    } catch (error) {
        return [];
    }
}


function saveUsers(users) {
    localStorage.setItem("users", JSON.stringify(users));
}


/* =========================================
   PASSWORD HASHING
   SHA-256
========================================= */

async function hashPassword(password) {

    const encoder = new TextEncoder();

    const data = encoder.encode(password);

    const hashBuffer = await crypto.subtle.digest(
        "SHA-256",
        data
    );

    const hashArray = Array.from(
        new Uint8Array(hashBuffer)
    );

    return hashArray
        .map(byte => byte.toString(16).padStart(2, "0"))
        .join("");
}


/* =========================================
   EMAIL VALIDATION
========================================= */

function isValidEmail(email) {

    const emailPattern =
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    return emailPattern.test(email);
}


/* =========================================
   PASSWORD VALIDATION
   Minimum 8 characters
   At least 1 number
========================================= */

function isValidPassword(password) {

    return password.length >= 8 &&
           /\d/.test(password);
}


/* =========================================
   MESSAGE FUNCTIONS
========================================= */

function showMessage(element, message, type) {

    if (!element) {
        return;
    }

    element.textContent = message;

    element.className = "message " + type;
}


function clearMessage(element) {

    if (!element) {
        return;
    }

    element.textContent = "";

    element.className = "message";
}


/* =========================================
   ERROR FIELD FUNCTIONS
========================================= */

function setError(elementId, message) {

    const element = document.getElementById(elementId);

    if (element) {
        element.textContent = message;
    }
}


function clearError(elementId) {

    const element = document.getElementById(elementId);

    if (element) {
        element.textContent = "";
    }
}


/* =========================================
   PASSWORD VISIBILITY
========================================= */

function setupPasswordToggle(buttonId, inputId) {

    const button = document.getElementById(buttonId);
    const input = document.getElementById(inputId);

    if (!button || !input) {
        return;
    }

    button.addEventListener("click", function () {

        if (input.type === "password") {

            input.type = "text";
            button.textContent = "🙈";

        } else {

            input.type = "password";
            button.textContent = "👁";
        }
    });
}


/* =========================================
   REGISTRATION
========================================= */

const registerForm = document.getElementById("registerForm");

if (registerForm) {

    registerForm.addEventListener("submit", async function (event) {

        event.preventDefault();

        clearError("usernameError");
        clearError("emailError");
        clearError("passwordError");
        clearError("confirmPasswordError");

        const messageBox =
            document.getElementById("registerMessage");

        clearMessage(messageBox);


        const username =
            document.getElementById("registerUsername")
                .value.trim();

        const email =
            document.getElementById("registerEmail")
                .value.trim();

        const password =
            document.getElementById("registerPassword")
                .value;

        const confirmPassword =
            document.getElementById("confirmPassword")
                .value;


        let isValid = true;


        /* Username validation */

        if (username === "") {

            setError(
                "usernameError",
                "Username is required."
            );

            isValid = false;

        } else if (username.length < 3) {

            setError(
                "usernameError",
                "Username must contain at least 3 characters."
            );

            isValid = false;
        }


        /* Email validation */

        if (email === "") {

            setError(
                "emailError",
                "Email address is required."
            );

            isValid = false;

        } else if (!isValidEmail(email)) {

            setError(
                "emailError",
                "Enter a valid email address."
            );

            isValid = false;
        }


        /* Password validation */

        if (password === "") {

            setError(
                "passwordError",
                "Password is required."
            );

            isValid = false;

        } else if (!isValidPassword(password)) {

            setError(
                "passwordError",
                "Password must be at least 8 characters and contain at least 1 number."
            );

            isValid = false;
        }


        /* Confirm password validation */

        if (confirmPassword === "") {

            setError(
                "confirmPasswordError",
                "Please confirm your password."
            );

            isValid = false;

        } else if (password !== confirmPassword) {

            setError(
                "confirmPasswordError",
                "Passwords do not match."
            );

            isValid = false;
        }


        if (!isValid) {
            return;
        }


        /* Get existing users */

        const users = getUsers();


        /* Duplicate username/email check */

        const duplicateUser = users.some(function (user) {

            return (
                user.username.toLowerCase() === username.toLowerCase() ||
                user.email.toLowerCase() === email.toLowerCase()
            );

        });


        if (duplicateUser) {

            showMessage(
                messageBox,
                "Username or email is already registered.",
                "error"
            );

            return;
        }


        /* Hash password */

        const passwordHash =
            await hashPassword(password);


        /* Create user */

        const newUser = {

            username: username,

            email: email,

            passwordHash: passwordHash

        };


        /* Save user */

        users.push(newUser);

        saveUsers(users);


        /* Success message */

        showMessage(
            messageBox,
            "Registration successful! Redirecting to login...",
            "success"
        );


        /* Clear form */

        registerForm.reset();


        /* Redirect */

        setTimeout(function () {

            window.location.href = "index.html";

        }, 1500);

    });
}


/* =========================================
   LOGIN
========================================= */

const loginForm = document.getElementById("loginForm");

if (loginForm) {

    loginForm.addEventListener("submit", async function (event) {

        event.preventDefault();

        clearError("loginEmailError");
        clearError("loginPasswordError");

        const messageBox =
            document.getElementById("loginMessage");

        clearMessage(messageBox);


        const loginValue =
            document.getElementById("loginEmail")
                .value.trim();

        const password =
            document.getElementById("loginPassword")
                .value;


        let isValid = true;


        /* Login value validation */

        if (loginValue === "") {

            setError(
                "loginEmailError",
                "Username or email is required."
            );

            isValid = false;
        }


        /* Password validation */

        if (password === "") {

            setError(
                "loginPasswordError",
                "Password is required."
            );

            isValid = false;
        }


        if (!isValid) {
            return;
        }


        /* Get users */

        const users = getUsers();


        /* Find user */

        const user = users.find(function (user) {

            return (
                user.username.toLowerCase() ===
                loginValue.toLowerCase()
            ) ||
            (
                user.email.toLowerCase() ===
                loginValue.toLowerCase()
            );

        });


        /* Hash entered password */

        const enteredPasswordHash =
            await hashPassword(password);


        /* Validate credentials */

        if (
            !user ||
            user.passwordHash !== enteredPasswordHash
        ) {

            showMessage(
                messageBox,
                "Invalid username/email or password.",
                "error"
            );

            return;
        }


        /* Create session */

        const currentUser = {

            username: user.username,

            email: user.email

        };


        localStorage.setItem(
            "currentUser",
            JSON.stringify(currentUser)
        );


        /* Success */

        showMessage(
            messageBox,
            "Login successful! Redirecting...",
            "success"
        );


        /* Redirect */

        setTimeout(function () {

            window.location.href = "dashboard.html";

        }, 800);

    });
}


/* =========================================
   DASHBOARD PROTECTION
========================================= */

const dashboardUsername =
    document.getElementById("dashboardUsername");


if (dashboardUsername) {

    const currentUser =
        localStorage.getItem("currentUser");


    /* No active session */

    if (!currentUser) {

        window.location.href = "index.html";

    } else {

        try {

            const user =
                JSON.parse(currentUser);


            if (!user.username || !user.email) {

                localStorage.removeItem("currentUser");

                window.location.href = "index.html";

            } else {

                document.getElementById(
                    "dashboardUsername"
                ).textContent = user.username;


                document.getElementById(
                    "userUsername"
                ).textContent = user.username;


                document.getElementById(
                    "userEmail"
                ).textContent = user.email;
            }

        } catch (error) {

            localStorage.removeItem("currentUser");

            window.location.href = "index.html";
        }
    }
}


/* =========================================
   LOGOUT
========================================= */

const logoutButton =
    document.getElementById("logoutBtn");


if (logoutButton) {

    logoutButton.addEventListener("click", function () {

        localStorage.removeItem("currentUser");

        window.location.href = "index.html";

    });
}


/* =========================================
   PASSWORD TOGGLES
========================================= */

setupPasswordToggle(
    "toggleLoginPassword",
    "loginPassword"
);

setupPasswordToggle(
    "toggleRegisterPassword",
    "registerPassword"
);

setupPasswordToggle(
    "toggleConfirmPassword",
    "confirmPassword"
);