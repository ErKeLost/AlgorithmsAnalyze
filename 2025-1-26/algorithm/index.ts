// 反转链表

// 第一种方式: 非递归




function reverseList(head) {
    // 如果当前传入 null 或者只有一个节点的时候不需要反转  
    if (!head || !head.next) return head;

    const stack = [];
    while (head) {
        stack.push(head);
        head = head.next
    }

    const newHead = stack.pop();
    let current = newHead;

    while (stack.length) {
        current.next = stack.pop();
        current = current.next;
    };

    current.next = null;

    return newHead;
}

function reverseList2(head) {
    if (!head || !head.next) return head;
    // 先拿到 head 后面那个节点 存起来一个变量 保证这个变量不会因为我改变了 head
    // 的指向而导致变量被销毁

    let newHead = null


    while (head) {
        const next = head.next;
        head.next = newHead;
        newHead = head;
        head = next;
    }

    return newHead;
}

// 第二种方式: 递归

function reverseList3(head) {
    if (!head || !head.next) return head;

    // 递归
    const newHead = reverseList3(head.next);
    head.next.next = head;
    head.next = null;

    return newHead;
}


// 哈希表 HashTable

// 存储公司员工信息
function hashFunction(key: string, size: number) {
    let hash = 0;
    for (let i = 0; i < key.length; i++) {
        hash += key.charCodeAt(i);
    }
    console.log(hash);

    return hash % size;
}

console.log(hashFunction("apple", 10));
console.log(hashFunction("banana", 10));
console.log(hashFunction("cherry", 10)); 
