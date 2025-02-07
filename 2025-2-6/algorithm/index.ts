/**
 * 树
 *
 * 有一个跟节点
 * 每个节点有多个子节点
 * 节点之间通过边链接 没有环
 *
 * 术语
 *
 * 跟节点 root 树的顶部节点
 * 父节点 直接连接到子节点的节点
 * 子节点 直接连接到父节点的节点
 * 叶子节点 leaf 没有子节点的节点
 * 深度 depth 从跟到该节点边的数量
 * 高度 height 从该节点到最远叶子节点边的数量
 *
 * 二叉树的特点
 *
 * 每个节点最多有两个子节点
 * 子节点分为左子节点和右子节点
 * 可以为空
 *
 * 二叉树的类型
 * 完全二叉树：除了最后一层 其他层都是满的
 *
 * 完美二叉树 所有层都是满的
 *
 * 平衡二叉树 左右子树高度差不超过 1
 */

// 实现二叉树

class TreeNode {
  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
  }
}

class BinaryTree {
  constructor() {
    this.root = null;
  }

  insert(value) {
    const newNode = new TreeNode(value);

    // 如果树为空 是根节点的话
    if (!this.root) {
      this.root = newNode;
      return;
    }

    // 使用队列进行层序插入
    const queue = [this.root];

    while (queue.length) {
      const current = queue.shift();

      if (!current.left) {
        current.left = newNode;
        return;
      }
      if (!current.right) {
        current.right = newNode;
        return;
      }

      // 如果都没找到
      queue.push(current.left);
      queue.push(current.right);
    }
  }

  // 前序遍历
  preOrder(node = this.root) {
    if (!node) return [];

    return [node, ...this.preOrder(node.left), ...this.preOrder(node.right)];
  }

  // 中序遍历
  inOrder(node = this.root) {
    if (!node) return [];

    return [
      ...this.inOrder(node.left),
      node.value,
      ...this.inOrder(node.right),
    ];
  }

  // 后序遍历
  postOrder(node = this.root) {
    if (!node) return [];

    return [
      ...this.postOrder(node.left),
      ...this.postOrder(node.right),
      node.value,
    ];
  }

  // 层序遍历
  levelOrder() {
    if (!this.root) return [];

    const result = [];
    const queue = [this.root];

    // 当队列不为空 处理
    while (queue.length) {
      const levelSize = queue.length;
      const level = [];

      for (let i = 0; i < levelSize; i++) {
        const current = queue.shift();

        level.push(current.value);

        if (current.left) {
          queue.push(current.left);
        }

        if (current.right) {
          queue.push(current.right);
        }
      }

      result.push(level);
    }
    return result;
  }
}

const tree = new BinaryTree();
tree.insert(1);
tree.insert(2);
tree.insert(3);
tree.insert(4);
tree.insert(5);
tree.insert(6);
tree.insert(7);

// 测试层序遍历
console.log(tree.levelOrder());

// 二叉搜索树

class BinarySearchTree {
  constructor() {
    this.root = null;
  }

  insert(value) {
    const newNode = new TreeNode(value);

    if (!this.root) {
      this.root = newNode;
      return;
    }

    let current = this.root;
    while (true) {
      // 如果value 小于当前节点 往左走

      if (value < current.value) {
        if (!current.left) {
          current.left = newNode;
          return;
        }
        // 继续循环 不return 直到找到 叶子节点
        current = current.left;
      }

      if (value > current.value) {
        if (!current.right) {
          current.right = newNode;
          return;
        }
        current = current.right;
      }
    }
  }

  search(value) {
    let current = this.root;

    while (current) {
      if (value === current.value) {
        return current;
      }

      if (value < current.value) {
        current = current.left;
      } else {
        current = current.right;
      }
    }

    return null;
  }

  delete(value) {
    const removeNode = (node, value) => {
      if (!node) return null;

      if (value === node.value) {
        // 1.叶子节点

        if (!node.left && !node.right) {
          return null;
        }

        // 2. 只有一个子节点
        // 如果没有左子节点 返回右子节点

        if (!node.left) return node.right;

        if (!node.right) return node.left;

        // 3. 有两个子节点 找到右子树最小的节点

        let tempNode = node.right;
        while (tempNode.left) {
          tempNode = tempNode.left;
        }

        node.value = tempNode.value;

        node.right = removeNode(node.right, tempNode.value);

        return node;
      }

      if (value < node.value) {
        node.left = removeNode(node.left, value);
        return node;
      }

      node.right = removeNode(node.right, value);

      return node;
    };

    this.root = removeNode(this.root, value);
  }

  print() {
    const printNode = (node, prefix = "", isLeft = true) => {
      if (!node) return;

      console.log(prefix + (isLeft ? "├── " : "└── ") + node.value);

      printNode(node.left, prefix + (isLeft ? "│   " : "    "), true);
      printNode(node.right, prefix + (isLeft ? "│   " : "    "), false);
    };

    if (this.root) {
      console.log(this.root.value);
      printNode(this.root.left, "", true);
      printNode(this.root.right, "", false);
    }
  }

  // 反转二叉树
  invertTree() {
    const invert = (node) => {
      if (!node) return null;

      // 保存左右子树的引用
      const left = node.left;
      const right = node.right;

      node.left = invert(right);
      node.right = invert(left);

      return node;
    };
    const node = invert(this.root);
    return node;
  }
}

const bst = new BinarySearchTree();

// 插入一些节点
bst.insert(4);
bst.insert(2);
bst.insert(7);
bst.insert(1);
bst.insert(3);
bst.insert(6);
bst.insert(9);

bst.print();

bst.invertTree();

bst.print();

// 设计链表 leetcode #707

class Node2 {
  constructor(value) {
    this.value = value;
    this.next = null;
  }
}

class MyLinkedList {
  constructor() {
    this.head = null;
    this.size = 0;
  }

  get(index: number): number {
    let current = this.head;
    let count = 0;
    while (current) {
      current = current.next;
      if (count === index) {
        return current.value;
      }
    }

    return -1;
  }

  addAtHead(val: number): void {
    const newNode = new Node2(val);

    if (!this.head) {
      this.head = newNode;
      this.size++;
      return;
    }
    const current = this.head;
    this.head = newNode;
    newNode.next = current;
    this.size++;

    // newNode.next = this.head;
    // this.head = newNode;
  }

  addAtTail(val: number): void {
    const newNode = new Node2(val);
    if (!this.head) {
      this.head = newNode;
      this.size++;
      return;
    }

    let current = this.head;
    while (current.next) {
      current = current.next;
    }
    current.next = newNode;
    this.size++;
  }

  addAtIndex(index: number, val: number): void {
    if (index < 0 || index > this.size) {
      throw new Error("append 索引越界");
    }

    if (index === 0) {
      this.addAtHead(val);
      return;
    }

    const newNode = new Node2(val);

    let current = this.head;

    let prev = null;

    let count = 0;
    while (count < index) {
      prev = current;
      current = current.next;
      count++;
    }

    prev.next = newNode;
    newNode.next = current;
    this.size++;
  }

  deleteAtIndex(index: number): void {
    if (index < 0 || index >= this.size) {
      throw new Error("删除索引越界");
    }

    let current = this.head;
    if (index === 0) {
      this.head = current.next;
    } else {
      let prev = null;
      let count = 0;
      while (count < index) {
        prev = current;
        current = current.next;
        count++;
      }
      prev.next = current.next;
    }
    this.size--;
  }
}

var reverseList = function (head) {
  let prev = null;
  let curr = head;

  while (curr) {
    let next = curr.next;

    curr.next = prev;

    prev = curr;
    curr = next;
  }

  return prev;
};

var reverseBetween = function (head, left, right) {
  if (!head || !head.next) return head;

  //为了统一处理 “如果 left=1（反转从头节点开始）该怎么办？” 这种特殊情况，我们通常会先 添加一个虚拟头节点 dummy，
  // 让它指向真正的头节点。这样，无论 left 是否为1，都能用统一的方式处理。

  const dummy = new Node2(0);
  dummy.next = head;

  // 第一步 找到反转区间的前一个节点 pre
  // 走 left - 1 步，因为 pre 要停在 left - 1 个节点位置
  let pre = dummy;
  // 走到 left 节点
  for (let i = 0; i < left - 1; i++) {
    pre = pre.next;
  }

  // 第二步 开始反转区间
  let curr = pre.next;
  let prev = null; // 用来反转指针的

  // 循环次数：right - left + 1（就是要反转的节点数）
  for (let i = 0; i < right - left + 1; i++) {
    let next = curr.next; // 保存当前节点的下一个节点
    curr.next = prev; // 改变指向，让 curr 指向 prev
    prev = curr; // prev 前移到 curr
    curr = next; // curr 前移到 next
  }

  // 第三步：连接反转后的部分
  //，现在 prev 指向了反转后的“区间第一节点”
  //，而 pre.next 指向反转前区间的“第一节点”，它现在成了区间的最后一个节点

  // pre.next 是反转前的 left 节点，反转后它跑到区间尾部，所以它的 next 应该连接区间后面的节点 curr
  pre.next.next = curr;
  // pre.next 本来是指向原先的 left 节点，现在要让它指向反转后的第一节点 prev
  pre.next = prev;

  return dummy.next;
};


/**
 * 图和树的区别
 * 
 * 图是由一组顶点和连接这些顶点的边构成
 * - 图可以是有方向的 或者边没有方向的 
 * - 图可以包含环 从某个顶点出发经过若干边又回到该顶点
 * - 图不一定是连通的，可以由多个互不相连的子图构成
 * 
 * tree
 * 树是一种特殊的图
 * - 树是一种连通且无环的图，一旦存在环就不会是树
 * - 根 树会有一个特殊的顶点被称为根节点 树的层级结构从根节点开始
 * - 树的每个节点 除了跟节点 只有一个父节点 可以由多个子节点 形成层次结构
 * 
 * 常见术语
 * 
 * 顶点 图的节点 可以存储数据
 * 边 两个顶点的链接 边可以有方向 有向图 或者无向图
 * 
 * 有向图 每个边都有方向
 * 无向图
 * 
 * 加权图 边带有权重 例如表示举例 成本等
 * 
 * 邻接 两个节点之间如果由边直接连接 就是邻接节点
 */

// 图的常见表示方法

class Graph {
  constructor() {
    this.adjList = new Map()
  }

  /**
 * 添加顶点
 * @param {any} vertex - 顶点，可以是数字、字符串或对象
 */
  addVertex(vertex) {
    if (!this.adjList.has(vertex)) {
      this.adjList.set(vertex, []);
    }
  }

  /**
   * 添加边
   * 对于无向图，添加边时需要在两个顶点的邻接列表中互相添加
   * @param {any} v1 - 顶点1
   * @param {any} v2 - 顶点2
   */

  addEdge(v1, v2) {
    // 如果顶点不存在就先添加顶点
    if (!this.adjList.has(v1)) {
      this.addVertex(v1);
    }
    if (!this.adjList.has(v2)) {
      this.addVertex(v2);
    }
    // 添加 v2 到 v1 的邻接列表
    this.adjList.get(v1).push(v2);
    // 添加 v1 到 v2 的邻接列表，因为是无向图
    this.adjList.get(v2).push(v1);
  }
}


const graph = new Graph();

// 添加顶点（可以直接在添加边时自动添加，这里也可以手动添加）
graph.addVertex('A');
graph.addVertex('B');
graph.addVertex('C');
graph.addVertex('D');
graph.addVertex('E');

// 添加边（构成无向图）
// 例如构造一个简单图：
//     A
//    / \
//   B   C
//    \ /
//     D
//     |
//     E
graph.addEdge('A', 'B');
graph.addEdge('A', 'C');
graph.addEdge('B', 'D');
graph.addEdge('C', 'D');
graph.addEdge('D', 'E');

console.log(graph);


// 动态规划 

/**
 * 什么事动态规划
 * 动态规划是一种通过把原问题分解为相对简单的子问题的方式求解复杂问题的方法，核心思想是
 * 大问题拆成小问题
 * 存储小问题 避免重复计算
 * 通过小问题的解推导大问题
 *
 * 如何判断一个问题是否可以使用动态规划
 * 重叠子问题 问题可以被分解为子问题，子问题会重复出现
 * 最优子结构 问题的最优解包含子问题的最优解
 * 状态转移 能找到子问题之间的关系
 *
 * 什么时候使用动态规划
 *
 * 求最大 最小值
 * 求 可行性
 * 求 方案总数
 * 求组合排列问题
 */

// #700 爬楼梯

function climbStairs(n) {
  if (n <= 2) return n;
  return climbStairs(n - 1) + climbStairs(n - 2)
}

function climbStairs2(n) {

}

