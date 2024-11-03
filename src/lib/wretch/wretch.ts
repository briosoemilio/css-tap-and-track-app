import _wretch from "wretch";
import { queryString } from "./middlewares/queryString";
import { API_BASE_URL } from "../constants";
import { catcher } from "./catcher/catcher";

const wretch = () => {
  const middlewares = [queryString()];
  console.log("API_BASE_URL : ", API_BASE_URL);

  return _wretch(API_BASE_URL)
    .middlewares(middlewares)
    .catcher(401, catcher)
    .catcherFallback((err) => {
      throw err;
    });
};

export default wretch;
