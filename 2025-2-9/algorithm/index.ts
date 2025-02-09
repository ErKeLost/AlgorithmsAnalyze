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
