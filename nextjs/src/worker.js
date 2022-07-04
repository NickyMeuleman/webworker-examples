import { fibonacci } from "./utils.js";

addEventListener("message", (msg) => {
  const num = msg.data;
  const result = fibonacci(num);
  postMessage(result);
});
