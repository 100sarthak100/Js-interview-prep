// Given an integer array nums and an integer k, return the kth largest element in the array.

// Note that it is the kth largest element in the sorted order, not the kth distinct element.

// You must solve it in O(n) time complexity.

// Example 1:

// Input: nums = [3,2,1,5,6,4], k = 2
// Output: 5
// Example 2:

// Input: nums = [3,2,3,1,2,4,5,5,6], k = 4
// Output: 4

/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */

/**
 * Time - O(N)
 * Space - O(1)
 */

function partition(nums, l, r) {
    let pIndex = l;
    let pivot = nums[r];

    for(let i=l; i<r; i++) {
        if(nums[i] <= pivot) {
           [nums[i], nums[pIndex]] = [nums[pIndex], nums[i]];
           pIndex += 1;
        }
    }

    [nums[pIndex], nums[r]] = [nums[r], nums[pIndex]];

    return pIndex;
}

function quickSelect(nums, l, r, k) {
    while(l < r) {
        let pivot = partition(nums, l, r)
        if(pivot === k) {
            return nums[k];
        } else if(pivot > k) {
            r = pivot - 1;
        } else {
            l = pivot + 1;
        }
    }

    return nums[k];
}

var findKthLargest = function(nums, k) {
    k = nums.length - k;
    return quickSelect(nums, 0, nums.length - 1, k);
};