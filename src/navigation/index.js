/* eslint-disable no-undef */
import production from "./production";
import staging from "./staging";

const currentNavigation =
  process.env.NODE_ENV === "production" ? production : staging;

export default currentNavigation;
