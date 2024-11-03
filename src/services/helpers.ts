export const getErrorMessage = (err: any) => {
  if (err instanceof Error) {
    const errMessage = JSON.parse(err.message);
    return errMessage?.message;
  } else {
    return JSON.stringify(err);
  }
};
