// 算法集训 100 道热门题

// 两数之和 twoSum

function twoSum(nums, target) {
  const map = new Map()

  for (let i = 0; i < nums.length; i++) {
    const currentNum = nums[i]

    const complement = target - currentNum
    if (map.has(complement)) {
      return [map.get(complement), i]
    }

    map.set(currentNum, i)
  }
}

const res = twoSum([3, 3], 6)
console.log(res);


// 字母异位词分组

function groupAnagrams(strs) {
  const map = new Map()

  for (const str of strs) {
    const sorted = str.split('').sort().join('')
    if (!map.has(sorted)) {
      map.set(sorted, []);
    }
    // 将原字符串加入对应的组
    map.get(sorted).push(str);
  }
  console.log(map);

  return Array.from(map.values());
}

const input1 = ["eat", "tea", "tan", "ate", "nat", "bat"];
const res2 = groupAnagrams(input1)
console.log(res2);

// 最长连续序列

function longestConsecutive(nums) {
  const numSet = new Set(nums)

  let maxLength = 0;

  for (const num of numSet) {
    // 先找起点 找不到就跳过
    if (numSet.has(num - 1)) {
      continue;
    }

    // 找到起点了 当前length 就是 1
    let currentLength = 1;
    let currentNum = num

    while (numSet.has(currentNum + 1)) {
      currentNum += 1;
      currentLength += 1
    }
    maxLength = Math.max(maxLength, currentLength)
  }

  return maxLength
}

// 移动 0

function moveZeroes(nums) {
  let insertPos = 0;
  for (let i = 0; i < nums.length; i++) {
    if (nums[i] !== 0) {
      nums[insertPos] = nums[i]
      insertPos++
    }
  }

  for (let i = insertPos; i < nums.length; i++) {
    nums[i] = 0
  }
}

const arr1 = [0, 1, 0, 3, 12];
moveZeroes(arr1)
console.log(arr1);


function threeSum(nums) {
  const res = []

  nums.sort((a, b) => a - b)

  // 固定第一个数字 双指针查找另外两个
  for (let i = 0; i < nums.length; i++) {
    if (nums[i] > 0) break
    // 当前数字与前一个数字相同也不行
    if (i > 0 && nums[i] === nums[i - 1]) continue

    let left = i + 1;
    let right = nums.length - 1;

    while (left < right) {
      const sum = nums[i] + nums[left] + nums[right];

      if (sum === 0) {
        res.push([nums[i], nums[left], nums[right]]);

        // 去重：移动左右指针以跳过重复数字
        while (left < right && nums[left] === nums[left + 1]) {
          left++;
        }
        while (left < right && nums[right] === nums[right - 1]) {
          right--;
        }

        left++;
        right--;
      } else if (sum < 0) {
        left++; // 增加和
      } else {
        right--; // 减小和
      }
    }
  }

  return res
}

const nums1 = [-1, 0, 1, 2, -1, -4];
console.log(threeSum(nums1));


// 二叉树

class TreeNode {
  constructor(val, left = null, right = null) {
    this.val = val
    this.left = left
    this.right = right
  }
}

// BST tree 

class BinarySearchTree {
  constructor() {
    this.root = null
  }

  insert(val) {
    const newNode = new TreeNode(val)
    if (this.root === null) {
      this.root = newNode
      return
    }

    let current = this.root

    while (true) {
      if (val < current.val) {
        if (current.left === null) {
          current.left = newNode
          return
        }
        current = current.left
      } else {
        if (current.right === null) {
          current.right = newNode
          return
        }
        current = current.right
      }
    }
  }

  search(val) {
    let current = this.root;
    while (current) {
      if (val === current.val) return true
      val < current.val ? current = current.left : current = current.right
    }
    return false
  }

  inorderTraversal(node = this.root, result = []) {

    if (node !== null) {
      this.inorderTraversal(node.left, result)
      result.push(node.val)
      this.inorderTraversal(node.right, result)
    }
    return result
  }

  preorderTraversal(node = this.root, result = []) {
    if (node !== null) {
      result.push(node.val);
      this.preorderTraversal(node.left, result);
      this.preorderTraversal(node.right, result);
    }
    return result;
  }


  postorderTraversal(node = this.root, result = []) {
    if (node !== null) {
      this.postorderTraversal(node.left, result);
      this.postorderTraversal(node.right, result);
      result.push(node.val);
    }
    return result;
  }

  levelOrderTraversal() {
    const result = [];
    if (!this.root) return result;
    const queue = [this.root];
    while (queue.length) {
      const current = queue.shift();
      result.push(current.val);
      if (current.left) queue.push(current.left);
      if (current.right) queue.push(current.right);
    }
    return result;
  }

  height(node = this.root) {
    if (node === null) return 0;
    return Math.max(this.height(node.left), this.height(node.right)) + 1;
  }

  delete(val) {
    this.root = this._deleteRec(this.root, val);
  }

  _deleteRec(root, val) {
    if (!root) return root;
    if (val < root.val) {
      root.left = this._deleteRec(root.left, val);
    } else if (val > root.val) {
      root.right = this._deleteRec(root.right, val);
    } else {
      // 找到待删除节点
      if (root.left === null) return root.right;
      if (root.right === null) return root.left;
      // 有两个子节点：寻找右子树中最小的节点（中序后继）
      let temp = root.right;
      while (temp.left) {
        temp = temp.left;
      }
      // 用后继节点的值替换当前节点的值
      root.val = temp.val;
      // 删除右侧的后继节点
      root.right = this._deleteRec(root.right, temp.val);
    }
    return root;
  }

  inorder() {
    const result = []
    const stack = []
    let current = this.root

    if (!this.root) return result

    while (current || stack.length) {
      while (current) {
        stack.push(current)
        current = current.left
      }
      current = stack.pop()
      result.push(current.val)

      current = current.right
    }

    return result
  }
}

const bst = new BinarySearchTree();
// biome-ignore lint/complexity/noForEach: <explanation>
[10, 5, 15, 3, 7, 12, 18].forEach(val => bst.insert(val));
console.log(bst);
console.log(bst.inorder());

// 图

class graph {
  constructor() {
    this.adjacencyList = new Map()
  }

  addVertex(vertex) {
    if (!this.addVertex.has(vertex)) {
      this.addVertex.set(vertex, [])
    }
  }
  // v 起点 w 终点 undirected 是否为无相边
  addEdge(v, w) {
    this.addVertex(v)
    this.addVertex(w)
    this.adjacencyList.get(v)!.push(w)
    if (undirected) {
      this.adjacencyList.get(w)!.push(v)
    }
  }

  // 广度优先搜索 bfs
  bfs(start) {
    const visited = new Set()
    const queue = [start]
    const result = []

    while (queue.length) {
      const vertex = queue.shift()
      if (!visited.has(vertex)) {
        visited.add(vertex)
        result.push(vertex)

        const neighbors = this.adjacencyList.get(vertex)
        if (neighbors) {
          for (const neighbor of neighbors) {
            if (!visited.has(neighbor)) {
              queue.push(neighbor)
            }
          }
        }
      }
    }
    return result
  }

  dfs(start) {
    const visited = new Set()
    const result = []
    const dfsRecursive = vertex => {
      if (visited.has(vertex)) return 
      visited.add(vertex)
      result.push(vertex)

      const neighbors = this.adjacencyList.get(vertex)

      if (neighbors) {
        for (const neighbor of neighbors) {
          if (!visited.has(neighbor)) {
            dfsRecursive(neighbor)
          }
        }
      }
    }
    dfsRecursive(start)

    return result
  }
}

// 二叉树最大深度

function maxDeep(root) {
  if (!root) return 0
  const left = maxDeep(root.left)
  const right = maxDeep(root.right)

  return Math.max(left, right) + 1
}


// 反转二叉树
function invertTree(root) {
  // 递归终止：如果节点为空，则直接返回null
  if (root === null) {
    return null;
  }
  
  // 以下代码用于交换当前节点的左右子树
  const temp = root.left;  // 保存左子树，方便后续赋值
  root.left = root.right;  // 将右子树赋给左子树
  root.right = temp;       // 将原左子树赋给右子树
  
  // 递归调用：对左右子树继续进行翻转
  invertTree(root.left);   // 翻转当前节点的左子树
  invertTree(root.right);  // 翻转当前节点的右子树
  
  // 返回翻转后的当前节点
  return root;
}

// 对称二叉树

function isSymmetric(root) {
  if (!root) return true
  return isMirror(root.left, root.right)
}

function isMirror(left, right) {
  if (left && right) return true
  if (left || right) return false
  return left.val === right && isMirror(left.left, right.right) && isMirror(left.right, right.left)
}

// 二叉树的直径
function diameterOfBinaryTree(root) {
  let maxDiameter = 0;  // 用于保存全局最大的直径

  /**
   * 辅助函数，计算以 node 作为根的树的深度
   * @param {TreeNode|null} node 当前节点
   * @return {number} 当前节点的深度（从 node 到最深叶子的边数）
   */
  function depth(node) {
    if (node === null) return 0;  // 空节点的深度为 0

    // 分别递归计算左右子树的深度
    const left = depth(node.left);
    const right = depth(node.right);

    // 更新全局直径：
    // 当前节点的直径候选值是左子树深度加上右子树深度
    maxDiameter = Math.max(maxDiameter, left + right);

    // 返回当前节点的深度：左右子树中较大的一个 + 1（当前节点与子节点之间的一条边）
    return Math.max(left, right) + 1;
  }

  depth(root);
  return maxDiameter;
}

// 层序遍历

function levelOrder(root) {
  const result = [];
  if (!root) return result;
  const queue = [root];

  // 当队列不为空时，表示还有层需要遍历
  while (queue.length > 0) {
    const levelSize = queue.length; // 当前层节点数
    const levelNodes = [];          // 保存当前层所有节点的值

    // 遍历当前层所有节点
    for (let i = 0; i < levelSize; i++) {
      const current = queue.shift();
      levelNodes.push(current.val);

      // 如果有左子节点，则加入队列
      if (current.left) {
        queue.push(current.left);
      }

      // 如果有右子节点，则加入队列
      if (current.right) {
        queue.push(current.right);
      }
    }

    // 将当前层的节点值添加到结果中
    result.push(levelNodes);
  }

  return result;
}

// 有序数组转换成平衡二叉搜索树
function sortedArrayToBST(nums: number[]): TreeNode | null {
  if (nums.length === 0) {
    return null;
  }
  
  // 选择中间元素作为根节点
  const mid = Math.floor(nums.length / 2);
  const root = new TreeNode(nums[mid]);
  
  // 递归构造左子树、右子树
  root.left = sortedArrayToBST(nums.slice(0, mid));
  root.right = sortedArrayToBST(nums.slice(mid + 1));
  
  return root;
}
