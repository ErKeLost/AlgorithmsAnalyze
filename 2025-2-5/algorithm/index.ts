// 链表 所有

/**
 * 链表的基本结构
 * 节点 node 
 * 每个节点通常包含两部分 数据区域, 指针区域 
 * 
 * 数据是存储实际对象的信息
 * 指针是指向下一个节点对象
 * 
 * 头节点 链表中的第一个节点 一般称为头节点 我们通常会保留一个头指针指向它
 * 
 * 尾节点 tail 链表中的最后一个节点 next 指向 null 表示链表结束
 * 
 * 链表与数组的对比 
 * 
 * 1. 内存管理 数据需要一块连续的内存 链表的节点可以分布在内存的任意位置 因为是指针引用
 * 
 * 2. 增删操作 链表在任意位置插入或者删除节点 只需要修改相邻节点的引用 数组需要设计到整个数组元素的整体移动
 * 
 * 3. 随机访问 数组可以通过索引在 o1 内访问元素 链表访问元素需要从头开始寻找 所以是 on
 * 
 * 设计链表的节点 (Node) 的结构
 * 
 * 在 js 中我们可以通过定义一个类来模拟链表节点,每个节点包含数据 data 和 next 指针
 */

class Node2 {
  data: null | any
  next: Node2 | null
  constructor(value) {
    this.data = value
    this.next = null // 指针初始化 指向 null 表示后续还没有节点
  }
}

/**
 * 实现链表类
 * 
 * 初始化将头节点设为 null 记录链表长度
 */

class LinkedList {
  head: Node2 | null
  size: number
  constructor() {
    this.head = null;
    this.size = 0
  }

  /**
   * 在链表头部插入节点
   * 创建新的节点 next 指向当前头节点
   */

  get length() {
    return this.size
  }

  prepend(data: any): void {
    const newNode = new Node2(data);
    newNode.next = this.head;
    this.head = newNode;
    this.size++
  }

  append(data) {
    const node = new Node2(data)
    if (!this.head) {
      this.head = node
    } else {
      let current = this.head
      while (current.next) {
        current = current.next
      }

      current.next = node
    }

    this.size++
  }

  insertAt(data, index) {
    if (index < 0 || index > this.size) {
      throw new Error("插入索引越界")
    }

    if(index === 0) {
      this.prepend(data)
      return 
    }

    const newNode = new Node2(data)
    let current = this.head

    let prev = null

    let count = 0;

    while(count < index) {
      prev = current
      current = current.next
      count++
    }

    prev.next = newNode
    newNode.next = current
    this.size++
  }


  removeAt(index) {
    if (index < 0 || index >= this.size) {
      throw new Error("删除索引越界")
    }

    let current = this.head
    if (index === 0) {
      this.head = current.next
    } else {
      let prev = null
      let count = 0
      while(count < index) {
        prev = current
        current = currnet.next
        count++
      }
      // 将前一个节点的 next 指向当前节点的 next，跳过 current 节点
      prev.next = current.next
    }
    this.size--
    return current.next
  }

  removeValue(data) {
    let current = this.head
    let prev = null

    while (current) {
      if (current.data === data) {
        // 说明删除的是第一个节点
        if (prev === null) {
          this.head = current.next
        } else {
          prev.next = current.next
        }
        this.size--
        return true
      }

      prev = current
      current = current.next
    }
    return false
  }

  indexOf(data) {
    let current = this.head
    let index = 0;
    while(current) {
      if (current.data === data) {
        return index
      }
      current = current.next
      index++
    }

    return -1
  }


  // 反转链表
  /**
   * 利用三个指针 prev current next 依次反转每个节点的指针方向
   */
  reverse() {
    let prev = null
    let current = this.head
    while(current) {
      let next = current.next
      current.next = prev
      prev = current
      current = next
    }
    this.head = prev
  }

  traverse() {
    const array = [];
    let current = this.head
    while (current) {
      array.push(current.data);
      current = current.next;
    }
    return array
  }
}

