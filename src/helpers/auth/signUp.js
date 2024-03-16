export const signUpValidation = (name, email) => {
  if (!name) {
    return {
      status: false,
      message: "Name is required",
    };
  }

  if (!email) {
    return {
      status: false,
      message: "Email is required",
    };
  }

  if (!email.includes("@")) {
    return {
      status: false,
      message: "Email is invalid",
    };
  }

  return {
    status: true,
  };
};
