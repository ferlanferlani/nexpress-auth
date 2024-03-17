export const signUpFormValidation = (
  userName,
  userEmail,
  userPassword,
  userConfirmPassword
) => {
  if (!userName) {
    return {
      status: false,
      errorMessage: "Name is required",
    };
  }

  if (userName.length < 3) {
    return {
      status: false,
      errorMessage: "Name must be at least 3 characters",
    };
  }

  if (!userEmail) {
    return {
      status: false,
      errorMessage: "Email is required",
    };
  }

  if (!userEmail.includes("@")) {
    return {
      status: false,
      errorMessage: "Email is invalid",
    };
  }

  /**************************************************
   * Password Regex
   * this is optional, if you use it, uncomment it
   
  const passwordRegex =
    /^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^&*()_+}{":;'?/>.<,])(?=.*[^\w\d\s]).{8,}$/;

  if (passwordRegex.test(userPassword) === false) {
    return {
      status: false,
      errorMessage:
        "Password must be at least 8 characters and contain at least one uppercase letter, one lowercase letter, one number, and one special character",
    };
  }
   ***************************************************/

  if (userPassword !== userConfirmPassword) {
    return {
      status: false,
      errorMessage: "Passwords don't match",
    };
  }

  if (userPassword.length < 8) {
    return {
      status: false,
      errorMessage: "Password must be at least 8 characters",
    };
  }

  return {
    status: true,
  };
};
