import './styles.css';

import { fibonacci } from "./utils.js";

const fibInput = document.querySelector("#fib-input");
const fibOutput = document.querySelector("#fib-output");
const calculateMain = document.querySelector("#calculate-main");
const calculateWorker = document.querySelector("#calculate-worker");
const randomBtn = document.querySelector("#random-btn");
const randomOutput = document.querySelector("#random-output");

const worker = new Worker(new URL("worker.js", import.meta.url), {
  type: "module",
});

calculateMain.addEventListener("click", () => {
  const num = Number(fibInput.value);

  // The next line never executes because this entire function is one task
  // only the last value for fibOutput.innerText is considered
  // explanation: https://www.youtube.com/watch?v=cCOL7MC4Pl0
  fibOutput.innerText = "Calculating";

  const result = fibonacci(num - 1);
  fibOutput.innerText = result;
});

calculateWorker.addEventListener("click", () => {
  const num = Number(fibInput.value);
  fibOutput.innerText = "Calculating";
  worker.postMessage(num - 1);
});

worker.addEventListener("message", (msg) => {
  const result = msg.data;
  fibOutput.innerText = result;
});

randomBtn.addEventListener("click", () => {
  randomOutput.textContent = Math.random();
});
