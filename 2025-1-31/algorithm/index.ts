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

  for (let i = 2; i <= n; i++) {
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


// 最长重复子数组
function findLength(nums1, nums2) {
  const m = nums1.length
  const n = nums2.length
  // 创建 dp 数组
  const dp = Array.from({ length: m + 1 }, () => Array(n + 1).fill(0))

  let maxLength = 0;

  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      if (nums1[i - 1] === nums2[j - 1]) {
        dp[i][j] = dp[i - 1][j - 1] + 1;
        maxLength = Math.max(maxLength, dp[i][j]);
      }
    }
  }

  return maxLength
}

const res3 = findLength([1, 2, 3, 2, 1, 4], [3, 2, 1, 4, 7])
console.log(res3);


// 长度最小的子数组

function minSubArrayLen(target, nums) {
  // 定义窗口的左右边界
  let left = 0;
  let right = 0;
  let sum = 0;  // 当前窗口内的和
  let minLen = Infinity;  // 最小长度，初始化为无穷大

  while (right < nums.length) {
    // 1. 扩大窗口
    sum += nums[right];

    // 2. 当和大于等于目标值时，尝试收缩窗口
    while (sum >= target) {
      // 更新最小长度
      minLen = Math.min(minLen, right - left + 1);
      // 收缩窗口
      sum -= nums[left];
      left++;
    }

    right++;
  }

  // 如果minLen仍然是Infinity，说明没找到符合条件的子数组
  return minLen === Infinity ? 0 : minLen;
}


// 分割回文串
function partition(s) {
  const result = [];
  const path = [];

  function isPalindrome(str, left, right) {
    while (left < right) {
      if (str[left] !== str[right]) return false
      left++
      right--
    }
    return true
  }
  function backtrack(startIndex) {
    if (startIndex >= s.length) {
      result.push([...path])
      return;
    }

    for (let i = startIndex; i < s.length; i++) {
      if (isPalindrome(s, startIndex, i)) {
        path.push(s.slice(startIndex, i + 1))
        backtrack(i + 1)
        path.pop()
      }
    }
  }

  backtrack(0)
  return result
}

const res4 = partition("aab")
console.log(res4);



// 找数组最大的第k个元素

function findKthLargest(nums, k) {
  // 冒泡排序
  for (let i = 0; i < nums.length; i++) {
    // 修正1: 使用j++
    // 修正2: j从i+1开始，避免重复比较
    for (let j = i + 1; j < nums.length; j++) {
      // 修正3: 改为降序排序（因为要找第k大）
      if (nums[i] < nums[j]) {  // 注意比较符号改变
        [nums[i], nums[j]] = [nums[j], nums[i]]
      }
    }
  }

  // 修正4: 返回第k大的元素
  return nums
}
const res5 = findKthLargest([3, 2, 1, 5, 6, 4], 2)
console.log(res5);

function findKthLargest2(nums, k) {
  // 将第k大转换为第n-k+1小
  k = nums.length - k + 1;

  return quickSelect(nums, 0, nums.length - 1, k);
}

function quickSelect(nums, left, right, k) {
  // 获取分区点
  const pivotIndex = partition2(nums, left, right);

  // 根据分区点的位置判断
  if (pivotIndex === k - 1) {
    return nums[pivotIndex];
  } else if (pivotIndex > k - 1) {
    return quickSelect(nums, left, pivotIndex - 1, k);
  } else {
    return quickSelect(nums, pivotIndex + 1, right, k);
  }
}

function partition2(nums, left, right) {
  // 随机选择pivot，优化性能
  const randomIndex = left + Math.floor(Math.random() * (right - left + 1));
  [nums[right], nums[randomIndex]] = [nums[randomIndex], nums[right]];

  const pivot = nums[right];
  let i = left;

  for (let j = left; j < right; j++) {
    if (nums[j] < pivot) {
      [nums[i], nums[j]] = [nums[j], nums[i]];
      i++;
    }
  }

  [nums[i], nums[right]] = [nums[right], nums[i]];
  return i;
}

const res6 = findKthLargest2([3, 2, 1, 5, 6, 4], 2)
console.log(res6);


function findLongestSequence(nums) {
  // 1. 创建一个Set，方便快速查找数字
  const numSet = new Set(nums);

  // 2. 记录最长序列的长度
  let maxLength = 0;

  // 3. 遍历每个数字
  for (const num of numSet) {
    // 4. 如果这个数字是序列的开始（它的前面没有数字）
    if (!numSet.has(num - 1)) {
      let currentNum = num;
      let currentLength = 1;

      // 5. 往后找连续的数字
      while (numSet.has(currentNum + 1)) {
        currentNum = currentNum + 1;  // 继续找下一个数
        currentLength = currentLength + 1;  // 长度加1
      }

      // 6. 更新最大长度
      if (currentLength > maxLength) {
        maxLength = currentLength;
      }
    }
  }

  return maxLength;
}


function fib0(n) {
  if (n === 0) return 0;
  if (n === 1) return 1;
  let prev = 0;
  let curr = 1;

  for (let i = 2; i <= n; i++) {
    const newValue = prev + curr
    prev = curr
    curr = newValue
  }
  return curr
}

console.log(fib0(10));
