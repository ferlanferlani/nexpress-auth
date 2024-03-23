export const resetPasswordValidation = (userPassword, userConfirmPassword) => {
  if (!userPassword && !userConfirmPassword) {
    return {
      status: false,
      errorMessage: "all fields is required",
    };
  }
  /*
   * Password Regex
   * this is optional, if you use it, uncomment it
   */
  // const passwordRegex =
  //   /^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^&*()_+}{":;'?/>.<,])(?=.*[^\w\d\s]).{8,}$/;

  // if (passwordRegex.test(userPassword) === false) {
  //   return {
  //     status: false,
  //     errorMessage:
  //       "Password must be at least 8 characters and contain at least one uppercase letter, one lowercase letter, one number, and one special character",
  //   };
  // }

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
