/**
 * Template
 */

// Time - O(log n)

var searchInsert = function(nums, target) {
    let l = 0;
    let r = nums.length;

    while(l < r) {
        let m = l + Math.floor((r - l)/2);

        if(nums[m] === target) {
            return m;
        } else if(nums[m] > target) {
            r = m;
        } else {
            l = m + 1;
        }
    }

    return l;
};


/**
 * Capicity to ship package with D days
 */

/**
 * @param {number[]} weights
 * @param {number} days
 * @return {number}
 */
function getMax(weights) {
    let maxVal = 0;

    for(let w of weights) {
        maxVal = Math.max(maxVal, w);
    }

    return maxVal;
}

function getSum(weights) {
    let sum = 0;

    for(let w of weights) {
        sum += w
    }

    return sum;
}

function isValid(capacity, weights, days) {
    let d = 1;
    let total = 0;

    for(let w of weights) {
        total += w;

        if(total > capacity) {
            total = w;
            d += 1;

            if(d > days) {
                return false;
            }
        }
    }

    return true;
}

var shipWithinDays = function(weights, days) {
    let l = getMax(weights);
    let r = getSum(weights)

    while(l < r) {
        let m = l + Math.floor((r - l)/2);

        if(isValid(m, weights, days)) {
            r = m;
        } else {
            l = m + 1;
        }
    }

    return l;
};