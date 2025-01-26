function twoSum(nums: number[], target: number): number[] {
  for (let i = 0; i < nums.length; i++) {
    for (let j = i + 1; j < nums.length; j++) {
      if (nums[i] + nums[j] === target) {
        return [i, j];
      }
    }
  }
  return [];
}


function twoSum2(nums: number[], target: number): number[] {
  const map = new Map<number, number>();
  for (let i = 0; i < nums.length; i++) {
    const complement = target - nums[i];
    if (map.has(complement)) {
      return [map.get(complement), i];
    }
    map.set(nums[i], i);
  }
  return [];
}

// 算法的本质还是解决问题的方法和思路
// 找到一个数组中最大的值

function findMax(nums: number[]): number {
  for (let i = 0; i < nums.length; i++) {
    let isMax = true;
    for (let j = i + 1; j < nums.length; j++) {
      if (nums[i] < nums[j]) {
        isMax = false;
        break;
      }
    }
    if (isMax) {
      return nums[i];
    }
  }
  return -1;
}

// console.log(findMax([1, 20, 3, 4, 5]));


function findMax2(nums: number[]): number {
  let max = nums[0];
  for (let i = 1; i < nums.length; i++) {
    if (nums[i] > max) {
      max = nums[i];
    }
  }
  return max;
}

// console.log(findMax2([1, 200, 300, 4, 5]));

// o(1) 常数时间复杂度 只执行一次 永远是常数时间 

// o(n) 线性时间复杂度 执行n次  执行时间与输入大小成正比 就是数组有 n 个元素 那么就要执行 n 次

function findMax3(nums) {
  let max = nums[0]

  for (let i = 0; i < nums.length; i++) {
    if (nums[i] > max) {
      max = nums[i]
    }
  }

  return max
}

// 即使执行了 2个 for 循环 但是 他也是 o(n) 时间复杂度 所以整体还是 o(n) 时间复杂度

console.log(findMax3([1, 200, 300, 4, 5]));

// o(n2) 平方时间复杂度 执行时间与输入大小的平方成正比 

// 有两次循环 执行时间是输入大小的平方

function printAllPairs(nums: number[]) {
  for (let i = 0; i < nums.length; i++) {
    for (let j = 0; j < nums.length; j++) {
      // console.log(nums[i], nums[j]);
    }
  }
}
printAllPairs([1, 2, 3, 4, 5])

// o log(n) 对数时间复杂度 执行时间与输入大小的对数成正比 就是每次操作都会将问题规模缩小一半

// 二分查找 就是 o(log(n)) 时间复杂度 典型例子 二分查找


// 算法/操作                 | 时间复杂度
// 数组访问                  | O(1)
// 二分查找                  | O(log n)
// 简单遍历                  | O(n)
// 快速排序(平均)            | O(n log n)
// 归并排序                  | O(n log n)
// 冒泡排序                  | O(n²)
// 深度优先搜索(DFS)         | O(V + E) 顶点+边
// 广度优先搜索(BFS)         | O(V + E) 顶点+边
// 动态规划                  | 通常是O(n²)或O(n³)


// 冒泡排序  时间复杂度是 o(n2)

function bubbleSort(nums: number[]) {
  for (let i = 0; i < nums.length; i++) {
    for (let j = 0; j < nums.length - i - 1; j++) {
      if (nums[j] > nums[j + 1]) {
        [nums[j], nums[j + 1]] = [nums[j + 1], nums[j]]
      }
    }
  }
  return nums
}
console.log(bubbleSort([10, 2, 3, 4, 5]));

// 因为每次排序可以拿到最大值 所以我们 每次就要减少排序的元素 而且本来为了越界就要剪去1 所以

// 第二层循环就是 j < nums.length - i - 1

