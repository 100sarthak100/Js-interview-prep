/**
 * 
 * Priority Queue is a commonly used data structure in algorithm 
 * problem. Especially useful for Top K problem with a huge amount 
 * of input data, since it could avoid sorting 
 * the whole but keep a fixed-length sorted portion of it.} index 
 */


const leftChild = (index) => index * 2 + 1;
const rightChild = (index) => index * 2 + 2;
const parent = (index) => Math.floor((index - 1) / 2);

// complete the implementation
class PriorityQueue {
  /**
   * @param {(a: any, b: any) => -1 | 0 | 1} compare - 
   * compare function, similar to parameter of Array.prototype.sort
   */
  constructor(compare = (a, b) => a - b) {
    this.compare = (a, b) => compare(a, b) > 0;
    this.heap = [];
  }

  /**
   * return {number} amount of items
   */
  size() {
    return this.heap.length;
  }

  /**
   * returns the head element
   */
  peek() {
    return this.heap[0];
  }

  /**
   * @param {any} element - new element to add
   */
  add(element) {
   this.heap.push(element);
   if(this.heap.length > 1) {
     this.moveUp(this.heap.length - 1);
   }
  }

  moveUp(index) {
    if(index === 0) {
      return;
    }

    const parentIdx = parent(index);
    if(this.compare(this.heap[parentIdx], this.heap[index])) {
      this.swap(index, parentIdx);
      this.moveUp(parentIdx);
    }
  }

  /**
   * remove the head element
   * @return {any} the head element
   */
  poll() {
    const root = this.heap.shift();

    this.heap.unshift(this.heap[this.heap.length - 1]);
    this.heap.pop();

    this.heapify(0);

    return root;
  }

  heapify(index) {
    const childIdx = this.getChildIdx(index);

    if(index !== childIdx) {
      this.swap(childIdx, index);
      this.heapify(childIdx);
    }
  }

  getChildIdx(index) {
    const left = leftChild(index);
    const right = rightChild(index);

    if(left < this.heap.length && this.compare(this.heap[index], this.heap[left])) {
      index = left;
    }

    if(right < this.heap.length && this.compare(this.heap[index], this.heap[right])) {
      index = right;
    }

    return index;
  }

  swap(i, j) {
    [this.heap[i], this.heap[j]] = [this.heap[j], this.heap[i]];
  }
}