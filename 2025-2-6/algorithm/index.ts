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
    this.value = value
    this.left = null
    this.right = null
  }
}

class BinaryTree {
  constructor() {
    this.root = null
  }

  insert(value) {
    const newNode = new TreeNode(value)

    // 如果树为空 是根节点的话
    if (!this.root) {
      this.root = newNode
      return
    }

    // 使用队列进行层序插入
    const queue = [this.root]

    while (queue.length) {
      const current = queue.shift()

      if (!current.left) {
        current.left = newNode
        return;
      }
      if (!current.right) {
        current.right = newNode
        return
      }

      // 如果都没找到 
      queue.push(current.left)
      queue.push(current.right)
    }
  }

  // 前序遍历
  preOrder(node = this.root) {
    if (!node) return []

    return [
      node,
      ...this.preOrder(node.left),
      ...this.preOrder(node.right)
    ]
  }

  // 中序遍历
  inOrder(node = this.root) {
    if (!node) return []

    return [
      ...this.inOrder(node.left),
      node.value,
      ...this.inOrder(node.right)
    ]
  }

  // 后序遍历
  postOrder(node = this.root) {
    if (!node) return []

    return [
      ...this.postOrder(node.left),
      ...this.postOrder(node.right),
      node.value
    ]
  }

  // 层序遍历
  levelOrder() {
    if (!this.root) return []

    const result = []
    const queue = [this.root]

    // 当队列不为空 处理
    while (queue.length) {
      const levelSize = queue.length
      const level = []

      for (let i = 0; i < levelSize; i++) {
        const current = queue.shift()

        level.push(current.value)

        if (current.left) {
          queue.push(current.left)
        }

        if (current.right) {
          queue.push(current.right)
        }
      }

      result.push(level)
    }
    return result
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
    this.root = null
  }

  insert(value) {
    const newNode = new TreeNode(value)

    if (!this.root) {
      this.root = newNode;
      return;
    }

    let current = this.root
    while (true) {
      // 如果value 小于当前节点 往左走

      if (value < current.value) {
        if (!current.left) {
          current.left = newNode
          return
        }
        // 继续循环 不return 直到找到 叶子节点
        current = current.left
      }

      if (value > current.value) {
        if (!current.right) {
          current.right = newNode
          return
        }
        current = current.right
      }
    }
  }

  search(value) {
    let current = this.root

    while (current) {
      if (value === current.value) {
        return current
      }

      if (value < current.value) {
        current = current.left
      } else {
        current = current.right
      }
    }

    return null
  }

  delete(value) {
    const removeNode = (node, value) => {
      if (!node) return null

      if (value === node.value) {
        // 1.叶子节点

        if (!node.left && !node.right) {
          return null
        }

        // 2. 只有一个子节点
        // 如果没有左子节点 返回右子节点

        if (!node.left) return node.right

        if (!node.right) return node.left

        // 3. 有两个子节点 找到右子树最小的节点

        let tempNode = node.right
        while (tempNode.left) {
          tempNode = tempNode.left
        }

        node.value = tempNode.value

        node.right = removeNode(node.right, tempNode.value)

        return node
      }

      if (value < node.value) {
        node.left = removeNode(node.left, value)
        return node

      }

      node.right = removeNode(node.right, value);

      return node;
    }

    this.root = removeNode(this.root, value)
  }


  print() {
    const printNode = (node, prefix = '', isLeft = true) => {
      if (!node) return;

      console.log(
        prefix + (isLeft ? '├── ' : '└── ') + node.value
      );

      printNode(node.left, prefix + (isLeft ? '│   ' : '    '), true);
      printNode(node.right, prefix + (isLeft ? '│   ' : '    '), false);
    };

    if (this.root) {
      console.log(this.root.value);
      printNode(this.root.left, '', true);
      printNode(this.root.right, '', false);
    }
  }

  // 反转二叉树
  invertTree() {
    const invert = (node) => {
      if (!node) return null

      // 保存左右子树的引用
      const left = node.left
      const right = node.right

      node.left = invert(right)
      node.right = invert(left)

      return node
    }
    const node = invert(this.root)
    return node
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

