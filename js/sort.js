"use strict";

let randomArray = [];
let numbers = [];

let items;
let canvas;

let time = 0;

const init = () => {
  randomArray = [];

  items = document.getElementById("number").value;
  canvas = document.getElementById("canvas");

  canvas.innerHTML = "";

  for (let i = 0; i < items; i++) {
    numbers.push(i + 1);
  }

  for (let a = numbers, j = a.length; j--; ) {
    var random = a.splice(Math.floor(Math.random() * (j + 1)), 1)[0];
    randomArray.push(random);

    let bar = document.createElement("div");

    bar.classList.add("bar");
    bar.style.height = `${random * (100 / items)}%`;

    canvas.appendChild(bar);
    document.getElementById("btnSort").disabled = false;
  }
};

const drawItems = () => {
  canvas.innerHTML = "";

  randomArray.forEach((element) => {
    let bar = document.createElement("div");

    bar.classList.add("bar");
    bar.style.height = `${element * (100 / items)}%`;
    canvas.appendChild(bar);
  });
};

const sleep = (ms) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

Array.prototype.insert = function (index, item) {
  this.splice(index, 0, item);
};

let timer;

const startTimer = () => {
  timer = setInterval(updateTimer, 10);
};

const updateTimer = () => {
  time++;
  if (time % 100 == 0) {
    document.getElementById("time").innerText = `${time / 100}.00s`;
  } else if (time % 10 == 0) {
    document.getElementById("time").innerText = `${time / 100}0s`;
  } else {
    document.getElementById("time").innerText = `${time / 100}s`;
  }
};

const sortItems = () => {
  let delay = document.getElementById("delay").value;

  document.getElementById("btnGenerate").disabled = true;
  document.getElementById("btnSort").disabled = true;

  time = 0;

  startTimer();

  switch (document.getElementById("selectSort").value) {
    case "insert":
      insertSort(delay);
      break;
    case "bubble":
      bubbleSort(delay);
      break;
    case "selection":
      selectionSort(delay);
      break;
    case "shell":
      shellSort(delay);
      break;
    case "bogo":
      bogoSort(delay);
      break;
    case "cocktail":
      cocktailSort(delay);
      break;
    case "gnome":
      gnomeSort(delay);
      break;
    case "oddeven":
      oddEvenSort(delay);
      break;
    case "comb":
      combSort(delay);
      break;
  }
};

const swap = (arr, a, b) => {
  let temp = arr[a];
  arr[a] = arr[b];
  arr[b] = temp;
};

const insertSort = async (delay) => {
  const arr = randomArray;
  let len = arr.length;

  for (let i = 1; i < len; i++) {
    let j = i - 1;
    let k = arr[i];

    while (j >= 0 && arr[j] > k) {
      arr[j + 1] = arr[j];
      j = j - 1;
      await sleep(delay);
    }
    arr[j + 1] = k;
    drawItems();
  }

  drawItems();
  document.getElementById("btnGenerate").disabled = false;
  clearInterval(timer);
};

const bubbleSort = async (delay) => {
  const arr = randomArray;
  let len = arr.length;

  for (let i = 0; i < len; i++) {
    for (let j = 0; j < len - i - 1; j++) {
      if (arr[j] > arr[j + 1]) {
        swap(arr, j, j + 1);
        drawItems();
        await sleep(delay);
      }
    }
  }
  document.getElementById("btnGenerate").disabled = false;
  clearInterval(timer);
};

const selectionSort = async (delay) => {
  const arr = randomArray;
  let len = arr.length;

  for (let i = 0; i < len; i++) {
    let min = i;

    for (let j = i + 1; j < len; j++) {
      if (arr[min] > arr[j]) {
        min = j;
      }
    }

    if (min !== i) {
      swap(arr, i, min);
    }
    drawItems();
    await sleep(delay);
  }

  document.getElementById("btnGenerate").disabled = false;
  clearInterval(timer);
};

const shellSort = async (delay) => {
  const arr = randomArray;
  let inc = arr.length / 2;

  while (inc > 0) {
    for (let i = inc; i < arr.length; i++) {
      let j = i;
      let temp = arr[i];

      while (j >= inc && arr[j - inc] > temp) {
        arr[j] = arr[j - inc];
        j = j - inc;
      }

      arr[j] = temp;
      drawItems();
      await sleep(delay);
    }

    if (inc == 2) {
      inc = 1;
    } else {
      inc = parseInt((inc * 5) / 11);
    }
  }

  document.getElementById("btnGenerate").disabled = false;
  clearInterval(timer);
};

const bogoSort = async (delay) => {
  do {
    let currentIndex = randomArray.length;
    let randomIndex;

    while (0 !== currentIndex) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      swap(randomArray, currentIndex, randomIndex);
    }
    drawItems();
    await sleep(delay);
  } while (!bogoSorted());

  document.getElementById("btnGenerate").disabled = false;
  clearInterval(timer);
};

const bogoSorted = () => {
  for (let i = 0; i < randomArray.length - 1; i++) {
    if (randomArray[i] > randomArray[i + 1]) {
      return false;
    }
  }
  return true;
};

const cocktailSort = async (delay) => {
  const nums = randomArray;
  let is_Sorted = true;

  while (is_Sorted) {
    for (let i = 0; i < nums.length - 1; i++) {
      if (nums[i] > nums[i + 1]) {
        let temp = nums[i];
        nums[i] = nums[i + 1];
        nums[i + 1] = temp;
        is_Sorted = true;
        drawItems();
        await sleep(delay);
      }
    }

    if (!is_Sorted) break;

    is_Sorted = false;

    for (let j = nums.length - 1; j > 0; j--) {
      if (nums[j - 1] > nums[j]) {
        let temp = nums[j];
        nums[j] = nums[j - 1];
        nums[j - 1] = temp;
        is_Sorted = true;

        drawItems();
        await sleep(delay);
      }
    }
  }
  document.getElementById("btnGenerate").disabled = false;
  clearInterval(timer);
};

const gnomeSort = async (delay) => {
  let a = randomArray;
  async function moveBack(i) {
    for (; i > 0 && a[i - 1] > a[i]; i--) {
      var t = a[i];
      a[i] = a[i - 1];
      a[i - 1] = t;
      drawItems();
    }
  }
  for (var i = 1; i < a.length; i++) {
    if (a[i - 1] > a[i]) moveBack(i);
    drawItems();
    await sleep(delay);
  }
  document.getElementById("btnGenerate").disabled = false;
  clearInterval(timer);
};

const oddEvenSort = async (delay) => {
  const arr = randomArray;
  let sorted = false;

  while (!sorted) {
    sorted = true;
    for (var i = 1; i < arr.length - 1; i += 2) {
      if (arr[i] > arr[i + 1]) {
        swap(arr, i, i + 1);
        sorted = false;
      }
      drawItems();
      await sleep(delay);
    }
    for (i = 0; i < arr.length - 1; i += 2) {
      if (arr[i] > arr[i + 1]) {
        swap(arr, i, i + 1);
        sorted = false;
      }
      drawItems();
      await sleep(delay);
    }
  }
  document.getElementById("btnGenerate").disabled = false;
  clearInterval(timer);
};

const combSort = async (delay) => {
  const arr = randomArray;
  let iteration_count = 0;
  let gap = arr.length - 2;
  let decrease_factor = 1.25;

  const is_array_sorted = (arr) => {
    var sorted = true;
    for (var i = 0; i < arr.length - 1; i++) {
      if (arr[i] > arr[i + 1]) {
        sorted = false;
        break;
      }
    }
    return sorted;
  };

  while (!is_array_sorted(arr)) {
    if (iteration_count > 0)
      gap = gap == 1 ? gap : Math.floor(gap / decrease_factor);

    var front = 0;
    var back = gap;
    while (back <= arr.length - 1) {
      if (arr[front] > arr[back]) {
        var temp = arr[front];
        arr[front] = arr[back];
        arr[back] = temp;
        drawItems();
        await sleep(delay);
      }

      front += 1;
      back += 1;
    }
    iteration_count += 1;
  }
  document.getElementById("btnGenerate").disabled = false;
  clearInterval(timer);
};

const heapSort = (delay) => {
  let arrLength;

  const maxHeap = (input, i) => {
    const left = 2 * i + 1;
    const right = 2 * i + 2;
    let max = i;

    if (left < arrLength && input[left] > input[max]) {
      max = left;
    }

    if (right < arrLength && input[right] > input[max]) {
      max = right;
    }

    if (max != i) {
      swap(input, i, max);
      maxHeap(input, max);
    }
  };

  const Sort = async (delay) => {
    arrLength = randomArray.length;

    for (let i = Math.floor(arrLength / 2); i >= 0; i -= 1) {
      maxHeap(randomArray, i);
      drawItems();
      await sleep(delay);
    }

    for (let j = randomArray.length - 1; j > 0; j--) {
      swap(randomArray, 0, j);
      arrLength--;

      maxHeap(randomArray, 0);
      drawItems();
      await sleep(delay);
    }

    document.getElementById("btnGenerate").disabled = false;
    clearInterval(timer);
  };

  Sort(delay);
};
