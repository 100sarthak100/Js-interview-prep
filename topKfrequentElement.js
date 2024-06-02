
// Given an integer array nums and an integer k, return the k most 
// frequent elements. You may return the answer in any order.

 

// Example 1:

// Input: nums = [1,1,1,2,2,3], k = 2
// Output: [1,2]
// Example 2:

// Input: nums = [1], k = 1
// Output: [1]

/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number[]}
 */

/**
 * Time - O(N)
 * Space - O(maxFreq)
 */


var topKFrequent = function(nums, k) {
    const freqMap = new Map();
    const bucket = [];
    const result = [];

    for(let num of nums) {
        freqMap.set(num, (freqMap.get(num) || 0) + 1)
    }

    for(let [num, freq] of freqMap) {
        if(Array.isArray(bucket[freq])) {
            bucket[freq].push(num)
        } else {
            bucket[freq] = [num];
        }
    }

    
    for(let i=bucket.length-1; i>=0; i--) {
    	if(bucket[i]) {
      	result.push(...bucket[i]);
      }
      
      if(result.length >= k) {
      	break;
      }
    }

    return result.slice(0, k);
};



/**
 * Alternate solution-
 * with priority queue
 */

/**
 * Time - O(NLOGN)
 * Space - O(N)
 */

/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number[]}
 */
var topKFrequent = function(nums, k) {
    let freqMap = {};
    let result = [];

    // O(N)
    for(let num of nums) {
        freqMap[num] = (freqMap[num] || 0) + 1;
    }

    let pq = new myPriorityQueue();
    // O(log N)
    for(let key in freqMap) {
        pq.enqueue(key, freqMap[key])
    }

    for(let i=0; i<k; i++) {
        result.push(pq.dequeue());
    }

    // Overall (N logN)
    return result;
};

class myPriorityQueue {
    constructor() {
        this._values = [];
    }

    enqueue(val, priority) {
        this._values.push(new Node(val, priority));
        this._traverseUp();
    }

    dequeue() {
        const max = this._values[0];
        const end = this._values.pop();
        if(this._values.length > 0) {
            this._values[0] = end;
            this._traverseDown(0);
        }

        return max.val;
    }

    _traverseUp() {
        let idx = this._values.length - 1;
        let el = this._values[idx];
        
        while(idx > 0) {
            let pIdx = Math.floor((idx-1)/2);
            let pEl = this._values[pIdx];

            if(el.priority <= pEl.priority) {
                break;
            }

            this._values[idx] = pEl;
            this._values[pIdx] = el;
            idx = pIdx;
        }
    }

    _traverseDown(index = 0) {
        const childIdx = this.getChildIdx(index);

        if(index !== childIdx) {
            this._swap(childIdx, index);
            this._traverseDown(childIdx);
        }
    }

    getLeftChildIdx(i) {
        return 2 * i + 1;
    }

    getRightChildIdx(i) {
        return 2 * i + 2;
    }

    getChildIdx(index) {
        const el = this._values[index];
        const left = this.getLeftChildIdx(index);
        const right = this.getRightChildIdx(index);
        let leftChild = null;
        let rightChild = null;
        let swapIdx = null;

        if(left < this._values.length) {
            leftChild = this._values[left];
            if(leftChild.priority > el.priority) {
                swapIdx = left;
            }
        }

        if(right < this._values.length) {
            rightChild = this._values[right];
            if((swapIdx === null && rightChild.priority > el.priority) || 
                (swapIdx !== null && rightChild.priority > leftChild.priority)
            ) {
                swapIdx = right;
            }
        }

        if(swapIdx === null) {
            return index;
        }

        return swapIdx;
    }

    _swap(a, b) {
        [this._values[a], this._values[b]] = [this._values[b], this._values[a]]
    }
}

class Node {
    constructor(val, priority) {
        this.val = val;
        this.priority = priority; 
    }
}

/**
 * Sol 3
 */

/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number[]}
 */
var topKFrequent = function(nums, k) {
    let map = new Map();
    let result = [];

    for(let num of nums) {
        map.set(num, (map.get(num) || 0) + 1);
    }

    const comparator = (a, b) => {
        if(a[1] === b[1]) {
            return a[0] - b[0];
        }

        return a[1] - b[1];
    }

    let pq = new myPriorityQueue(comparator);
    for(let [key, freq] of map) {
        pq.enqueue(key, freq)
    }

    for(let i=0; i<k; i++) {
        const val = pq.dequeue();
        result.push(val?.[0])
    };

    return result;
};

class myPriorityQueue {
    constructor(comparator) {
        this.comparator = (a, b) => comparator(a, b) > 0;
        this.heap = [];
    }

    getParentIdx(i) {
        return Math.floor((i - 1) / 2);
    }

    getLeftChildIdx(i) {
        return 2 * i + 1;
    }

    getRightChildIdx(i) {
        return 2 * i + 2;
    }

    swap(a, b) {
        [this.heap[a], this.heap[b]] = [this.heap[b], this.heap[a]];
    }

    enqueue(val, priority) {
        this.heap.push([val, priority]);
        this.traverseUp(this.heap.length - 1);
    }

    dequeue() {
        const max = this.heap[0];
        const end = this.heap.pop();

        if (this.heap.length > 0) {
            this.heap[0] = end;
            this.traverseDown(0);
        }

        return max;
    }

    getChildIdx(i) {
        const leftIdx = this.getLeftChildIdx(i);
        const rightIdx = this.getRightChildIdx(i);

        if(leftIdx < this.heap.length && this.comparator(this.heap[leftIdx], this.heap[i])) {
            i = leftIdx;
        }

        if(rightIdx < this.heap.length && this.comparator(this.heap[rightIdx], this.heap[i])) {
            i = rightIdx;
        }

        return i;
    }

    traverseDown(idx) {
        const childIdx = this.getChildIdx(idx);

        if(childIdx !== idx) {
            this.swap(childIdx, idx);
            this.traverseDown(childIdx);
        }
    }

    traverseUp(idx) {
        if(idx === 0) return;

        const pIdx = this.getParentIdx(idx);
        if(this.comparator(this.heap[idx], this.heap[pIdx])) {
            this.swap(idx, pIdx);
            this.traverseUp(pIdx)
        }
    }
}
















