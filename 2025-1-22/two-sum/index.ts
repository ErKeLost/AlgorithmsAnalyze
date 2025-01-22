/**
 * 
 * 方法一 暴力解
 */

const twoSumBruteForce = (nums: number[], target: number) => {
  for (let i = 0; i < nums.length; i++) {
    for (let j = i + 1; j < nums.length; j++) {
      if (nums[i] + nums[j] === target) {
        return [i, j]
      }
    }
  }
}

console.log(twoSumBruteForce([2, 7, 11, 15], 18)); // [0,1]

/**
 * 暴力解法分析：
 * 时间复杂度：O(n²) - 需要两层循环
 * 空间复杂度：O(1) - 只需要常数级额外空间
 * 缺点：当数组较大时，性能很差
 */

/**
 * 方法二 哈希表
 */

const twoSumHashTable = (nums: number[], target: number) => {
  const map = new Map()

  for (let i = 0; i < nums.length; i++) {
    const currentNum = nums[i]

    const complement = target - currentNum

    if (map.has(complement)) {
      return [map.get(complement), i]
    }

    map.set(currentNum, i)
  }

  return []
}

console.log(twoSumHashTable([2, 7, 11, 15], 18)); // [0,1]


/**
 * 3. 详细解释哈希表解法
 * 让我们用一个具体例子来说明算法的执行过程：
 * 输入：nums = [2, 7, 11, 15], target = 9
 * 
 */

// nums = [2, 7, 11, 15], target = 9

 // 第1步：i = 0
// currentNum = 2
// complement = 9 - 2 = 7
// map 为空，没有找到 7
// 将 2 存入 map: { 2 => 0 }

 // 第2步：i = 1
// currentNum = 7
// complement = 9 - 7 = 2
// map 中有 2！找到答案
// 返回[map.get(2), 1] 即[0, 1]


// 4. 为什么使用 Map？
// JavaScript 中的 Map 对象有以下优点：
// 查找速度快（O(1)时间复杂度）
// 使用方便，有专门的 get、set、has 等方法
// 可以用任何类型作为键（虽然这题只用到了数字作为键）

