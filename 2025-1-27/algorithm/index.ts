// 图结构

// 人与人之间的关系网

class Graph {
  // 顶点
  vertices: string[] = [];
  // 邻接表
  adjList: Map<string, string[]> = new Map();

  // 添加定点

  addVertex(v: string) {
    this.vertices.push(v);
    this.adjList.set(v, []);
  }

  // 添加边
  addEdge(v: string, w: string) {
    this.adjList.get(v)?.push(w);
    this.adjList.get(w)?.push(v);
  }

  // 广度优先

  bfs() {
    if (this.vertices.length === 0) return;
    const visited = new Set<string>();
    const queue: string[] = [];
    queue.push(this.vertices[0]);
    visited.add(this.vertices[0]);

    while (queue.length > 0) {
      const vertex = queue.shift() ?? '';
      const neighbors = this.adjList.get(vertex) ?? [];
      // console.log(vertex);

      if (neighbors.length === 0) continue;
      for (const neighbor of neighbors) {
        if (!visited.has(neighbor)) {
          visited.add(neighbor);
          queue.push(neighbor);
        }
      }
    }
  }

  // 深度优先
  dfs() {
    if (this.vertices.length === 0) return;

    const stack: string[] = [];

    stack.push(this.vertices[0]);

    const visited = new Set<string>();
    visited.add(this.vertices[0]);

    while (stack.length > 0) {
      const vertex = stack.pop() ?? '';
      const neighbors = this.adjList.get(vertex) ?? [];
      // console.log(vertex);
      if (neighbors.length === 0) continue;
      for (const neighbor of neighbors) {
        if (!visited.has(neighbor)) {
          visited.add(neighbor);
          stack.push(neighbor);
        }
      }
    }
  }
}

const graph = new Graph();
graph.addVertex("A");
graph.addVertex("B");
graph.addVertex("C");
graph.addVertex("D");
graph.addVertex("E");
graph.addVertex("F");
graph.addVertex("G");
graph.addVertex("H");
graph.addVertex("I");
graph.addEdge("A", "B");
graph.addEdge("A", "C");
graph.addEdge("B", "D");
graph.addEdge("C", "E");
graph.addEdge("D", "F");
graph.addEdge("E", "G");
graph.addEdge("F", "H");
graph.addEdge("E", "I");
graph.addEdge("I", "C");
// console.log(graph);

// 广度优先搜索
// 从指定的第一个节点开始遍历，先访问其所有相邻节点，再访问这些相邻节点的相邻节点
// console.log("广度优先搜索");
graph.bfs();

// 深度优先搜索
// console.log("深度优先搜索");
graph.dfs();


// 循环链表 双向链表

// 1. 定义链表节点
class ListNode {
  val: number;
  next: ListNode | null;

  constructor(val: number) {
    this.val = val;
    this.next = null;
  }
}

// 2. 迭代方法反转链表
function reverseList(head: ListNode | null): ListNode | null {
  let prev = null;
  let curr = head;

  while (curr) {
    // 保存下一个节点
    const next = curr.next;
    // 反转指针
    curr.next = prev;
    // 移动prev和curr
    prev = curr;
    curr = next;
  }

  return prev;
}

// 3. 递归方法反转链表
function reverseListRecursive(head: ListNode | null): ListNode | null {
  // 基本情况：空链表或只有一个节点
  if (!head || !head.next) {
    return head;
  }
  console.log(head);

  // 递归反转剩余部分
  const newHead = reverseListRecursive(head.next);
  // 改变指针方向
  head.next.next = head;
  head.next = null;
  return newHead;
}

// 测试
const list = new ListNode(1);
list.next = new ListNode(2);
list.next.next = new ListNode(3);
list.next.next.next = new ListNode(4);

// 原链表：1 -> 2 -> 3 -> 4
// 反转后：4 -> 3 -> 2 -> 1
reverseListRecursive(list)
// console.log(reverseListRecursive(list));


function printNumber(n: number) {
  // 1. 先打印"前"
  console.log("前：", n);

  // 2. 如果n大于1，继续递归
  if (n > 1) {
    printNumber(n - 1);
  }

  // 3. 再打印"后"
  console.log("后：", n);
}
printNumber(3);


// 排序

// 冒泡排序

function bubbleSort(arr: number[]) {
  for (let i = 0; i < arr.length; i++) {
    for (let j = i; j < arr.length - 1 - i; j++) {
      if (arr[i] > arr[j]) {
        [arr[i], arr[j]] = [arr[j], arr[i]];
      }
    }
  }
  return arr;
}

// console.log(bubbleSort([10, 2, 3, 4, 5]));


function bubbleSortRecursive(arr: number[], n: number = arr.length): number[] {
  // 基本情况：如果数组长度为1，返回
  if (n === 1) {
    return arr;
  }

  // 一次冒泡，将最大的数移到末尾
  for (let i = 0; i < n - 1; i++) {
    if (arr[i] > arr[i + 1]) {
      // 交换元素
      [arr[i], arr[i + 1]] = [arr[i + 1], arr[i]];
    }
  }

  // 递归处理剩余的n-1个元素
  return bubbleSortRecursive(arr, n - 1);
}

// 测试
const arr = [64, 34, 25, 12, 22, 11, 90];
// console.log("原始数组:", arr);
// console.log("排序后:", bubbleSortRecursive([...arr]));


const arr3 = [1, 3, 4];

// console.log("排序:", [...arr3].sort((a, b) => b - a));

// 选择排序

// 在没有排序的地方找到最大或者最小，然后放到排序好的地方放到起始位置

function selectionSort(arr: number[]) {
  const n = arr.length;
  let minIndex = 0;
  for (let i = 0; i < n; i++) {
    minIndex = i;
    for (let j = i + 1; j < n; j++) {
      if (arr[j] > arr[minIndex]) {
        minIndex = j;
      }
    }
    [arr[i], arr[minIndex]] = [arr[minIndex], arr[i]];
  }
  return arr;
}

// console.log(selectionSort([10, 2, 3, 4, 5]));


// 插入排序

// 将数组分为已排序和未排序两部分，从未排序中取出一个元素，插入到已排序的合适位置

function insertionSort3(arr: number[]) {
  const n = arr.length;
  for (let i = 1; i < n; i++) {
    const key = arr[i];
    let j = i - 1;
    while (j >= 0 && arr[j] > key) {
      arr[j + 1] = arr[j];
      j--;
    }
    arr[j + 1] = key;
  }
  return arr;
}

// console.log(insertionSort([1020, 2, 3, 425, 5]));




// 插入排序的核心思想：
// 1. 把数组分成"已排序"和"未排序"两部分
// 2. 从未排序的部分取一个数，插入到已排序部分的正确位置

// 例如数组：[5, 2, 8, 3, 1]

function insertionSort(arr: number[]) {
  // 第一轮 i=1：
  // 已排序：[5]
  // 未排序：[2, 8, 3, 1]
  // key = 2
  // 2比5小，5往后移，2插入到前面
  // 结果：[2, 5, 8, 3, 1]

  // 第二轮 i=2：
  // 已排序：[2, 5]。
  // 未排序：[8, 3, 1]
  // key = 8
  // 8比5大，不用移动
  // 结果：[2, 5, 8, 3, 1]

  // 第三轮 i=3：
  // 已排序：[2, 5, 8]
  // 未排序：[3, 1]
  // key = 3
  // 3比8小，8往后移
  // 3比5小，5往后移
  // 3比2大，插入到2后面
  // 结果：[2, 3, 5, 8, 1]



  // 例如数组：[5, 2, 8, 3, 1]
  const n = arr.length;
  for (let i = 1; i < n; i++) {
    // 取出未排序部分的第一个数
    const key = arr[i];

    // j指向已排序部分的最后一个位置
    let j = i - 1;

    // 把比key大的数字都往后移
    while (j >= 0 && arr[j] > key) {
      arr[j + 1] = arr[j];
      j--;
    }

    // 找到key的正确位置，插入
    arr[j + 1] = key;

    // console.log(`第${i}轮后:`, arr);
  }
  return arr;
}

// 测试
const arr7 = [5, 2, 8, 3, 1];
// console.log("原始数组:", arr7);
insertionSort(arr7);


// 归并排序

function mergeSort(arr: number[]) {
  if (arr.length <= 1) {
    return arr;
  }

  const mid = Math.floor(arr.length / 2);
  const left = arr.slice(0, mid);
  const right = arr.slice(mid);

  return merge(mergeSort(left), mergeSort(right));
}

function merge(left: number[], right: number[]) {
  const result: number[] = [];
  while (left.length && right.length) {
    if (left[0] < right[0]) {
      result.push(left.shift()!);
    } else {
      result.push(right.shift()!);
    }
  }
  return [...result, ...left, ...right];
}

console.log(mergeSort([5, 2, 8, 3, 1]));


// 快速排序


function quickSort(arr: number[]) {
  if (arr.length <= 1) {
    return arr;
  }

  const pivot = arr[Math.floor(arr.length / 2)];
  const left = arr.filter(x => x < pivot);
  const right = arr.filter(x => x > pivot);

  return [...quickSort(left), pivot, ...quickSort(right)];
}

console.log(quickSort([5, 2, 8, 3, 1]));
