class TreeNode {
  constructor(value) {
    this.value = value
    this.left = null
    this.right = null
  }
}

class BST {
  constructor() {
    this.root = null
  }

  insert(value) {
    const newNode = new TreeNode(value)
    if (!this.root) {
      this.root = newNode
      return
    }

    let current = this.root

    while (true) {
      if (value < current.value) {
        if (!current.left) {
          current.left = newNode
          return
        }
        current = current.left;
      } else {
        // 如果右子节点为空，插入新节点
        if (!current.right) {
          current.right = newNode;
          return;
        }
        // 否则继续往右走
        current = current.right;
      }
    }

  }

  inorder() {
    const result = [];

    const traverse = (node) => {
      if (!node) return;
      traverse(node.left);        // 遍历左子树
      result.push(node.value);    // 访问当前节点
      traverse(node.right);       // 遍历右子树
    };

    traverse(this.root);
    return result;
  }
}

const bst = new BST();

// 插入节点
bst.insert(10);
bst.insert(5);
bst.insert(15);
bst.insert(3);
bst.insert(7);

const res = bst.inorder()
console.log(res);

function getMinimumDifference(root) {
  function inOrder() {
    const result = []
    function traverse(root) {
      if (!root) return
      traverse(root.left)
      result.push(root.value)
      traverse(root.right)
    }
    traverse(root)
    return result
  }
  const res = inOrder()

  let min = Infinity
  for (let i = 0; i < res.length; i++) {
    min = Math.min(min, res[i + 1] - res[i])
  }
  return min
}

export { }

// 核心思想 把 有序数组转换成 平衡 bst 的关键是 
// 总是选择中间位置的数作为根节点，这样可以保证左右子树的高度差不超过1

// 比如输入 [-10, -8, 0, 5, 9]
// 平衡的概念是任意节点的左右子树高度差不超过1

