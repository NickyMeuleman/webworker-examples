<script setup>
import { onMounted, onUnmounted, ref } from "vue";
import { fibonacci } from "./utils.js";

let worker;
let inputNum = ref(42);
let fibResult = ref("None yet");
let randomNum = ref("None yet");

onMounted(() => {
  worker = new Worker(new URL("./worker.js", import.meta.url), {
    type: "module",
  });
  worker.addEventListener("message", (msg) => {
    fibResult.value = msg.data;
  });
});

onUnmounted(() => worker.terminate());

function getRandomNum() {
  randomNum.value = Math.random();
}

function calculateMain() {
  // The next line never executes because this entire function is one task
  // only the last value for the textcontent of the place fibResult goes is considered
  // explanation: https://www.youtube.com/watch?v=cCOL7MC4Pl0
  fibResult.value = "Calculating";
  const result = fibonacci(inputNum.value - 1);
  fibResult.value = result;
}

function calculateWorker() {
  fibResult.value = "Calculating";
  worker.postMessage(inputNum.value - 1);
}
</script>

<template>
  <h2>Calculate the N-th Fibonnaci number</h2>
  <label for="fib-input"> N-th </label>
  <input id="fib-input" type="number" v-model.number="inputNum" min="0" />
  <button @click="calculateMain">Calculate on the main thread</button>
  <button @click="calculateWorker">Calculate in a web worker</button>
  <p>
    Answer:
    <output>{{ fibResult }}</output>
  </p>
  <h2>Generate a number while calculating</h2>
  <button @click="getRandomNum">Generate random number</button>
  <output>{{ randomNum }}</output>
  <div class="lorem-container">
    <h2>Select text while calculating</h2>
    <p>
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam veritatis
      officia odio similique culpa laboriosam ipsa quia nesciunt aspernatur
      quisquam quam vitae voluptas omnis, blanditiis necessitatibus cupiditate
      libero dicta, excepturi deleniti mollitia consectetur labore iusto dolor
      vero. Consectetur, repellat vitae, pariatur doloribus asperiores ipsum
      harum quo ab esse minima accusamus.
    </p>
    <p>
      Voluptatum vel, qui suscipit atque delectus ipsa sit. Eveniet non minima
      asperiores fugit veniam repellat quo? Dignissimos modi aperiam suscipit
      enim commodi. Exercitationem, officia consectetur corrupti facilis neque
      quos incidunt nemo illo earum dignissimos sed vel odio assumenda, impedit
      ullam nulla repellendus eos blanditiis quisquam placeat dolorem! Tempore,
      ex cum.
    </p>
    <p>
      Amet tenetur, mollitia dolor quo quisquam perspiciatis odit ex
      voluptatibus cupiditate, nisi quis porro qui optio dolorem atque
      reiciendis soluta accusantium tempore earum molestiae? Nam, pariatur
      quaerat porro eos temporibus ratione cumque blanditiis commodi obcaecati
      nisi earum magni labore at, aliquid nihil nobis debitis quisquam, dicta
      exercitationem quasi sint quas?
    </p>
  </div>
</template>

<style>
@import "./assets/base.css";

.lorem-container {
  max-width: 60ch;
}
</style>
