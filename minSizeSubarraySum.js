/**
 * 
 *  Given an array of positive integers nums and a positive integer target, return the minimal length of a 
    subarray
    whose sum is greater than or equal to target. If there is no such subarray, return 0 instead.

    Example 1:

    Input: target = 7, nums = [2,3,1,2,4,3]
    Output: 2
    Explanation: The subarray [4,3] has the minimal length under the problem constraint.
*/

// Sliding window (2 pointers)
/**
 * @param {number} target
 * @param {number[]} nums
 * @return {number}
 */
var minSubArrayLen = function (target, nums) {
    let i = 0;
    let ans = Number.MAX_VALUE;
    let sum = 0;

    for (let j = 0; j < nums.length; j++) {
        sum += nums[j];
        while (sum >= target) {
            ans = Math.min(ans, j - i + 1);
            sum -= nums[i];
            i += 1;
        }
    }

    return ans !== Number.MAX_VALUE ? ans : 0;
};