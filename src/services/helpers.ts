export const getErrorMessage = (err: any) => {
  if (err instanceof Error) {
    const errMessage = JSON.parse(err.message);
    return errMessage?.message || "An unknown error occurred.";
  } else {
    return JSON.stringify(err);
  }
};
