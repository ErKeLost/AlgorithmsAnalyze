## 数据结构

什么是数据结构与算法

- 数据结构

数据结构 就是存放数据的不同容器, 就像现实生活中的

1. 数组 一排固定大小的格子

2. 栈 一摞盘子

3. 队列 排队买票

4. 树 家谱

5. 图 模块以来图 地铁线路图

## 算法

算法就是解决问题的方法和步骤 就是操作数据结构的房啊

简单来说：
数据结构：是存放数据的容器
算法：是操作这些数据的方法
就像：
数据结构 = 工具箱（用来存工具）
算法 = 使用工具的方法（如何使用工具）

算法就是接受一个有限的指令集，每条指令不依赖于任何语言

然后我们可以接受一些 输入 比如一些数据结构

然后产生输出

在一定 有限的步骤之后终止

1. 线性结构

数组结构是一种线性结构 有限序列

1. 内存存储方式

```ts
// 数组连续的内存

let arr = [1, 2, 3, 4, 5];

// 链表 非连续的内存空间 通过引用链接

class ListNode {
  constructor(val) {
    this.val = val;
    this.next = null;
  }
}
```

```ts
// 十进制转2进制

function decimalToBinary(nums) {
  return num.toString(2);
}

function decimalToBinary2(nums) {
  if (num === 0) return "0";

  let binary = "";

  let num = nums;

  while (num > 0) {
    binary = (num % 2) + binary;

    num = Math.floor(num / 2);
  }

  return binary;
}
```

<!-- // 经典面试题 --> 有效括号 在于一一对应 相同类型的括号

<!-- 开始学队列结构 -->

```ts
class Queue {
  constructor() {
    this.data = [];
  }

  enqueue(el) {
    this.data.push(el);
  }

  dequeue(el) {
    this.data.shift(el);
  }

  peek() {
    return this.data[0];
  }

  isEmpty() {
    return !!this.data.length;
  }

  size() {
    return this.data.length;
  }
}
```

<!-- 击鼓传花 -->

```ts
function hotPotato(list, num) {
  if (num < 2) {
    throw error("num must be than 2");
  }

  const queue = new Queue();

  const eliminatedList = [];

  // for循环 线加进去

  while (queue.size > 1) {
    for (let i = 0; i < num; i++) {
      queue.enqueue(queue.dequeue());
    }

    eliminatedList.push(queue.dequeue());
  }

  return {
    eliminatedList: eliminatedList,
    winner: queue.dequeue(),
  };
}
```

约瑟夫环问题

```ts
function josephusCircle(n, m) {
  const queue = new Queue();

  for (let i = 0; i < n; i++) {
    queue.enqueue(i);
  }

  while (queue.size > 1) {
    for (let i = 1; i < m; i++) {
      queue.enqueue(queue.dequeue());
    }

    queue.dequeue();
  }

  return queue.dequeue()!;
}
```

## 链表结构 linkedList

链表类似火车结构

```ts
class Node<T> {
  value: T;
  next: Node<T> | null;
}

// 创建 linkedList
class LinkedList<T> {
  head: Node<T> | null = null;
  get length() {
    let count = 0;
    let current = this.head;
    while (current) {
      count++;
      current = current.next;
    }
    return count;
  }
  append(value: T) {
    const node = new Node(value);
    if (!this.head) {
      this.head = node;
      return;
    }

    let current = this.head;

    while (current.next) {
      current = current.next;
    }

    current.next = node;
  }

  traverse() {
    let current = this.head;
    while (current) {
      console.log(current.value);
      current = current.next;
    }
  }

  insert(position: number, value: T) {
    if (position < 0 || position > this.length) {
      throw new Error("Invalid position");
    }

    const newNode = new Node(value);

    if (position === 0) {
      // 插入到头部 这个是指向原来的头部
      newNode.next = this.head;
      this.head = newNode;
    } else {
      let current = this.head;
      let previous = null;
      let index = 0;
      while (index < position) {
        previous = current;
        current = current.next;
        index++;
      }
      newNode.next = current;
      previous.next = newNode;
    }
  }

  removeAt(position: number) {
    if (position < 0 || position >= this.length) {
      throw new Error("Invalid position");
    }

    if (position === 0) {
      this.head = this.head!.next;
    } else {
      // let current = this.head;
      // let previous = null;
      // let index = 0;
      // while (index < position) {
      //   previous = current;
      //   current = current!.next;
      //   index++;
      // }
      const previous = this.getNode(position - 1);

      previous!.next = previous!.next!.next;
    }
  }

  private getNode(position: number) {
    if (position < 0 || position >= this.length) {
      throw new Error("Invalid position");
    }

    let current = this.head;
    let index = 0;
    while (index < position) {
      current = current!.next;
      index++;
    }
    return current;
  }

  update(position: number, value: T) {
    const node = this.getNode(position);
    node!.value = value;
  }

  indexOf(value: T) {
    let current = this.head;
    let index = 0;
    while (current) {
      if (current.value === value) {
        return index;
      }
      current = current.next;
      index++;
    }
    return -1;
  }
}
```
