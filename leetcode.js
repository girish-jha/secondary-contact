var majorityElement = function (nums) {
    var map = {};
    var threshold = Math.ceil(nums.length / 2)
    for (var i = 0; i < nums.length; i++) {

        var value = nums[i];
        map[value] = map[value] ? ++map[value] : 1;
        if (map[value] >= threshold)
            return value;
    }
};

/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
var searchRange = function (nums, target) {
    const mid = binarySearch(nums, target, 0, nums.length - 1)
    let startIndex = mid, endIndex = mid;
    if (mid == -1)
        return [-1, -1]
    const isIncrement = nums[mid + 1] == target;
    if (isIncrement)

        for (; endIndex < nums.length; endIndex++) {
            const element = nums[endIndex];
            if (element !== target)
                break


        }
    return [startIndex, endIndex - 1]
};
/**
 * @param {number[]} nums
 * @param {number} target
 * @param {number} start
 * @param {number} end
 * @return {number}
 */
function binarySearch(nums, target, start, end) {
    if (start > end)
        return -1;
    var mid = Math.floor((start + end) / 2)
    // console.log("🚀 ~ file: leetcode.js:43 ~ binarySearch ~ mid:", mid, start, end)
    if (nums[mid] == target)
        return mid;
    if (nums[mid] > target)
        return binarySearch(nums, target, start, mid - 1)
    return binarySearch(nums, target, mid + 1, end)
}
var result = searchRange([5, 7, 7, 8, 8, 10], 8)


/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
var twoSum = function (nums, target) {
    const map = {};
    for (const item of nums) {
        map[item] = target - item;


    }


};

function maxProfit(prices) {
    let globalProfit = 0;
    // minBuyPrice is set to Infinity because we can guarantee the first element will be set to the buy price 
    let minBuyPrice = Infinity;

    for (let i = 0; i < prices.length; i++) {
        if (minBuyPrice > prices[i]) {
            minBuyPrice = prices[i];
        }

        const currentProfit = prices[i] - minBuyPrice;
        console.log("🚀 ~ file: leetcode.js:83 ~ maxProfit ~ currentProfit:", currentProfit)

        if (currentProfit > globalProfit) {
            globalProfit = currentProfit;
        }
    }

    return globalProfit;
}

console.log(maxProfit([7, 1, 5, 3, 6, 4]))

// var result = majorityElement([3, 2, 3])
// console.log("🚀 ~ file: leetcode.js:12 ~ result:", result)

