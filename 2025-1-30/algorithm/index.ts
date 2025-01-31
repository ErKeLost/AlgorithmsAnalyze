const arr2 = [1, 2, 3, 4, 5, 0, 6, -1]

const target = 5

function twoSum(nums: number[], target: number): number[] | null | Map<Symbol, number[]> {
  let a = nums[1]
  const map = new Map()
  for (let i = 0; i < nums.length; i++) {
    // for (let j = i + 1; j < nums.length; j++) {
    //   if (nums[i] + nums[j] === target) {
    //     map.set(Symbol("找到了"), [i, j])
    //   }
    // }
    if (nums[i] + a === target) {
      map.set(Symbol("找到了"), [i, a])
    } else {
      a = nums[i]
    }
  }
  return map
};

console.log(twoSum(arr2, target));

const nums1 = [1, 2, 3, 0, 0, 0]
const m = 3
const nums2 = [2, 5, 6]
const n = 3
function merge2(nums1: number[], m: number, nums2: number[], n: number): void {
  for (let i = 0; i < n; i++) {
    nums1[m + i] = nums2[i]
  }
  nums1.sort((a, b) => a - b)
};

// merge2(nums1, m, nums2, n)
// console.log(nums1);

function merge3(nums1: number[], m: number, nums2: number[], n: number): void {
  // 用双指针，从后往前遍历
  // 第一步 p1 指向 nums1 的最后一个有效数字
  // 第二步 p2 指向 nums2 的最后一个有效数字
  // 第三部 p 指向合并后的数组的最后位置
  let p1 = m - 1
  let p2 = n - 1
  let p = m + n - 1

  while (p2 >= 0) {
    // 当 p1 < 0 时，说明 nums1 的有效数字已经用完
    // 或者 nums2 当前数字大于 nums1 当前数字
    if (p1 < 0 || nums2[p2] >= nums1[p1]) {
      nums1[p] = nums2[p2];
      p2--;
    } else {
      nums1[p] = nums1[p1];
      p1--;
    }
    p--;
  }
}

// const nums1 = [1, 2, 3, 0, 0, 0]
// const m = 3
// const nums2 = [2, 5, 6]
// const n = 3

merge3(nums1, m, nums2, n)


function removeElement(nums: number | string[], val: number): number {
  let k = 0;

  for (let i = 0; i < nums.length; i++) {
    if (nums[i] !== val) {
      nums[k] = nums[i];
      k++;
    }
  }

  // 把后面的元素设为undefined或其他值
  for (let i = k; i < nums.length; i++) {
    nums[i] = "_";
  }

  return k;
}
const nums = [3, 2, 2, 3]
const val = 3
console.log(removeElement(nums, val));
console.log(nums);



class ListNode {
  val: number
  next: ListNode | null
  constructor(val?: number, next?: ListNode | null) {
    this.val = val ?? 0
    this.next = next ?? null
  }
}

const node = new ListNode(2, new ListNode(4, new ListNode(3)))
const node2 = new ListNode(5, new ListNode(6, new ListNode(4)))


function addTwoNumbers(l1: ListNode | null, l2: ListNode | null): ListNode | null {
  const dummyHead = new ListNode()
  let current = dummyHead

  // 进位
  let carry = 0

  while (l1 || l2 || carry) {
    const val1 = l1 ? l1.val : 0

    const val2 = l2 ? l2.val : 0

    // 计算与进位

    const sum = val1 + val2 + carry

    carry = Math.floor(sum / 10)

    const newVal = sum % 10

    current.next = new ListNode(newVal)

    current = current.next

    l1 = l1 ? l1.next : null
    l2 = l2 ? l2.next : null
  }

  return dummyHead.next
};

console.log(addTwoNumbers(node, node2));



function threeSum(nums: number[]): number[][] {
  const sortNums = nums.sort((a, b) => a - b)
  let result: number[][] = []
  for (let i = 0; i < sortNums.length; i++) {
    if (sortNums[i] > 0) break
    if (i > 0 && sortNums[i] === sortNums[i - 1]) continue

    let left = i + 1
    let right = sortNums.length - 1

    while (left < right) {
      const sum = sortNums[i] + sortNums[left] + sortNums[right]
      if (sum === 0) {
        result.push([sortNums[i], sortNums[left], sortNums[right]])
        while (sortNums[left] === sortNums[left + 1]) left++
        while (sortNums[right] === sortNums[right - 1]) right--
        left++
        right--
      } else if (sum < 0) {
        left++
      } else {
        right--
      }
    }
  }

  return result
};

const num = [-1, 0, 1, 2, 2, -1, -4]
console.log(threeSum(num));


function lengthOfLongestSubstring(s: string): number {
  let left = 0
  let right = 0
  let maxLength = 0
  const set = new Set()
  while (right < s.length) {
    if (!set.has(s[right])) {
      set.add(s[right])
      right++
      maxLength = Math.max(maxLength, right - left)
    } else {
      set.delete(s[left])
      left++
    }
    // console.log(set);
  }
  return maxLength
};

console.log(lengthOfLongestSubstring("abcabcbb"));


function longestPalindrome(s) {
  // 如果字符串长度小于2，则直接返回本身
  if (s.length < 2) return s;

  // 记录回文子串的起始位置
  let start = 0;
  // 记录回文子串的最大长度
  let maxLength = 1;

  /**
   * 从中心点向两边扩展来判断回文串
   * @param {number} left  - 左指针
   * @param {number} right - 右指针
   */
  function expandAroundCenter(left, right) {
    // 当 left >= 0 并且 right < s.length 并且左右字符相同，就可以继续扩展
    while (left >= 0 && right < s.length && s[left] === s[right]) {
      // 如果发现比当前记录的回文更长的子串，则更新 start 和 maxLength
      if (right - left + 1 > maxLength) {
        start = left;
        maxLength = right - left + 1;
      }
      left--;
      right++;
    }
  }

  // 遍历字符串中的每个字符
  for (let i = 0; i < s.length; i++) {
    // 扩展奇数长度回文，以当前字符为中心
    expandAroundCenter(i, i);
    // 扩展偶数长度回文，以当前字符和下一个字符之间为中心
    expandAroundCenter(i, i + 1);
  }

  // 根据 start 和 maxLength，截取出最长回文子串
  return s.substring(start, start + maxLength);
}

console.log(longestPalindrome("babad"));



function maxArea(heights) {
  let left = 0;
  let right = heights.length - 1;
  let max = 0;

  while (left < right) {
    // 计算当前面积
    const width = right - left;
    const height = Math.min(heights[left], heights[right]);
    const area = width * height;

    // 更新最大面积
    if (area > max) {
      max = area;
    }

    // 移动指针策略：移动高度较小的一边
    if (heights[left] < heights[right]) {
      left++;
    } else {
      right--;
    }
  }

  return max;
}
console.log(maxArea([1, 8, 6, 2, 5, 4, 8, 3, 7]));


class ListNode2 {
  val: number
  next: ListNode2 | null
  constructor(val = 0, next = null) {
    this.val = val;
    this.next = next;
  }
}

function mergeKLists(lists) {
  if (!lists || lists.length === 0) return null;

  // 分治合并
  return mergeLists(lists, 0, lists.length - 1);
}

/**
 * 分治合并指定范围内的链表
 * @param {ListNode[]} lists - 链表数组
 * @param {number} start - 起始位置
 * @param {number} end - 结束位置
 * @return {ListNode} - 合并后的链表头节点
 */
function mergeLists(lists, start, end) {
  // 如果只剩一个链表，直接返回
  if (start === end) {
    return lists[start];
  }

  // 如果是两个链表，直接合并
  if (start + 1 === end) {
    return mergeTwoLists(lists[start], lists[end]);
  }

  // 计算中间位置
  const mid = start + Math.floor((end - start) / 2);

  // 递归合并左右两部分
  const left = mergeLists(lists, start, mid);
  const right = mergeLists(lists, mid + 1, end);

  // 合并两个有序链表
  return mergeTwoLists(left, right);
}

/**
* 合并两个有序链表
* @param {ListNode} l1 - 第一个链表头节点
* @param {ListNode} l2 - 第二个链表头节点
* @return {ListNode} - 合并后的链表头节点
*/
function mergeTwoLists(l1, l2) {
  // 创建虚拟头节点
  const dummy = new ListNode(0);
  let current = dummy;

  // 同时遍历两个链表
  while (l1 && l2) {
    if (l1.val <= l2.val) {
      current.next = l1;
      l1 = l1.next;
    } else {
      current.next = l2;
      l2 = l2.next;
    }
    current = current.next;
  }

  // 处理剩余节点
  current.next = l1 || l2;

  return dummy.next;
}

console.log(mergeKLists([[1, 4, 5], [1, 3, 4], [2, 6]]));


function minDistance(word1, word2) {
  const n = word1.length;
  const m = word2.length;

  // dp[i][j] 表示：word1 前 i 个字符变成 word2 前 j 个字符所需的最少操作数
  const dp = Array.from({ length: n + 1 }, () => Array(m + 1).fill(0));

  // 初始化：如果 word2 为空，就只能删除 word1 的所有字符，反之亦然
  for (let i = 1; i <= n; i++) {
    dp[i][0] = i;
  }
  for (let j = 1; j <= m; j++) {
    dp[0][j] = j;
  }

  for (let i = 1; i <= n; i++) {
    for (let j = 1; j <= m; j++) {
      if (word1[i - 1] === word2[j - 1]) {
        // 若字符相同，则不用执行增删改操作，故 dp[i][j] = dp[i-1][j-1]
        dp[i][j] = dp[i - 1][j - 1];
      } else {
        // 若字符不同，则取删除、插入、替换三者的最小值加1
        dp[i][j] = Math.min(
          dp[i - 1][j],     // 删除操作
          dp[i][j - 1],     // 插入操作
          dp[i - 1][j - 1]  // 替换操作
        ) + 1;
      }
    }
  }

  return dp[n][m];
}

console.log(minDistance("horse", "ros"));

