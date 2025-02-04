// 有序括号

function isValid(s: string): boolean {
  const stack = [];

  const map = new Map([
    [
      '{', '}'
    ],
    [
      '[', ']'
    ],
    [
      '(', ')'
    ]
  ])

  for (let i = 0; i < s.length; i++) {
    if (map.has(s[i])) {
      stack.push(s[i])
    } else {
      if (stack.length <= 0) {
        return false
      }
      if (map.get(stack.pop()) !== s[i]) {
        return false
      }
    }
  }

  return stack.length === 0
}


console.log(isValid("{()}"))

// LRU 缓存结构

// 要查找最快的 key 和 删除 和 插入 都要保证 o1
// 那么就是 链表和哈希表

class Node2 {
  key: any;
  value: any;
  next: null;
  prev: null;
  constructor(key, value) {
    this.key = key
    this.value = value
    this.next = null
    this.prev = null
  }
}

class LRUCache {
  capacity: any;
  map: Map<any, any>;
  head: Node2 | null;
  tail: Node2 | null;
  constructor(capacity) {
    this.capacity = capacity
    this.map = new Map()

    this.head = new Node2(0, 0);
    this.tail = new Node2(0, 0);
    this.head.next = this.tail
    this.tail.prev = this.head
  }

  get(key) {
    if (this.map.has(key)) {
      const node = this.map.get(key)

      this.moveToHead(node)

      return node.value
    }

    return -1
  }

  put(key, value) {
    // 1. 如果 key 存在要更新值
    if (this.map.has(key)) {
      const node = this.map.get(key)
      node.value = value
      this.moveToHead(value)
    }
    // 2. 如果 key 不存在 那么就要创建节点 然后还要 move 到头部
    if (!this.map.has(key)) {
      const newNode = new Node2(key, value)
      this.map.set(key, newNode)
      this.moveToHead(newNode)
    }
    // 3. put 超出容量 那么就要把 tail.prev 干掉
    if (this.map.size > this.capacity) {
      const tail = this.removeTail();
      this.map.delete(tail.key)
    }
  }

  addToHead(node) {
    // 确保 node 是 Node 实例
    if (!(node instanceof Node2)) {
      node = new Node2(node.key, node.value);
    }

    node.next = this.head.next;
    node.prev = this.head;
    this.head.next.prev = node;
    this.head.next = node;
  }

  removeTail() {
    const node = this.tail.prev
    this.removeNode(node)
    return node
  }

  removeNode(node) {
    // 增加安全检查
    if (node && node.prev && node.next) {
      node.prev.next = node.next;
      node.next.prev = node.prev;
    }
  }

  moveToHead(node) {
    this.removeNode(node)
    this.addToHead(node)
  }
}

// 容量为 2 的 LRU 缓存

const lrn = new LRUCache(2)
lrn.put(2, 1)
lrn.put(2, 2)
lrn.put(1, 1)
lrn.put(4, 1)
console.log(
  lrn.get(2)
);

console.log(lrn);


class NodeList2 {
  constructor(val) {
    this.val = val
    this.next = null
  }
}

const list2 = new NodeList2(1);
list2.next = new NodeList2(2);
list2.next.next = new NodeList2(3);
list2.next.next.next = new NodeList2(4);


function removeElements(list, val) {
  const res = removeNode(list, val)
  console.log(res);
}

function removeNode(list, val) {
  let current = list
  while (current.next) {
    if (current.next.val === val) {
      current.next = current.next.next
    } else {
      current = current.next
    }
  }
  return list
}

removeElements(list2, 2)


function removeDuplicates(nums) {
  if (!nums.length) return 0

  let slow = 0

  for (let fast = 1; fast < nums.length; fast++) {
    if (nums[fast] !== nums[slow]) {
      slow++

      nums[slow] = nums[fast]
    }
  }

  return slow + 1
}
const nums = [0, 0, 1, 2, 5, 5, 6, 6]
console.log(nums);
console.log(removeDuplicates(nums))
console.log(nums);



function findMinArrowShots(points) {
  if (!points.length) return 0

  points.sort((a, b) => a[1] - b[1])
  console.log(points);

  // 每次按照 最后一个坐标的结束位置射箭 保证

  let arrows = 1;
  let end = points[0][1]

  for (let i = 1; i < points.length; i++) {
    // 如果当前气球开始位置 大于上一支箭的结束位置 那么就要一个新的箭

    if (points[i][0] > end) {
      arrows++
      end = points[i][1]
    }
  }
  return arrows
}

const arrows = findMinArrowShots([[10, 16], [2, 8], [1, 6], [7, 12]])
console.log(arrows);



function rotate(nums, k) {
  // 处理 k 大于 数组长度的情况
  k = k % nums.length
  const n = nums.length;
  const result = new Array(n);
  for (let i = 0; i < n; i++) {
    result[(i + k) % n] = nums[i];
  }

  // 把结果复制回原数组
  for (let i = 0; i < n; i++) {
    nums[i] = result[i];
  }

  return nums
}

const res = rotate([1, 2, 3, 4, 5, 6, 7], 3)
console.log(res);


// . 下一个排列 算法

function nextPermutation(nums) {
  const n = nums.length
  
}


// 动态规划

// 斐波那契数列

function fib(n) {
  if (n <= 1) return n
  return fib(n - 1) + fib(n - 2)
}

console.log(fib(10));

function fib2(n) {
  const dp = [0, 1]
  for (let i = 2; i <= n; i++) {
    dp[i] = dp[i - 1] + dp[i - 2]
  }
  return dp[n]
}

console.log(fib2(100));

// 状态转移方程

function fib3(n) {
  let prev = 0, curr = 1

  for(let i = 2; i <=n; i++) {
    const newValue = prev + curr
    prev = curr
    curr = newValue
  }
  return curr
}

console.log(fib3(10));



function jump(n) {
  if (n <= 1) return 1

  return jump(n - 1) + jump(n - 2)
}

console.log(jump(4));

// 状态转移方程

function jump2(n) {
  const dp = [1, 1]
  for (let i = 2; i <= n; i++) {
    dp[i] = dp[i - 1] + dp[i - 2]
  }
  return dp[n]
}


// 记忆化递归

function jump3(n, memo = {}) {
  if (n <= 1) return 1
  if (memo[n]) return memo[n]

  memo[n] = jump3(n - 1, memo) + jump3(n - 2, memo)
  return memo[n]
}

// 压缩

function jump4(n) {
  let prev = 1, curr = 1

  for (let i = 2; i <= n; i++) {
    const newValue = prev + curr
    prev = curr
    curr = newValue
  }
  return curr
}

console.log(jump4(4));


// 买卖股票最佳时机


// 最大子数组和
