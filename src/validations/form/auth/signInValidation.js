export const signInValidation = (email, password) => {
  if (!email) {
    return {
      status: false,
      errorMessage: "Email is required",
    };
  }

  if (!password) {
    return {
      status: false,
      errorMessage: "Password is required",
    };
  }

  return {
    status: true,
  };
};
