
// Given an array of strings words and an integer k, return the k most frequent strings.

// Return the answer sorted by the frequency from highest to lowest. Sort the words with the same frequency by their lexicographical order.

 

// Example 1:

// Input: words = ["i","love","leetcode","i","love","coding"], k = 2
// Output: ["i","love"]
// Explanation: "i" and "love" are the two most frequent words.
// Note that "i" comes before "love" due to a lower alphabetical order.

/**
 * @param {string[]} words
 * @param {number} k
 * @return {string[]}
 */

/**
 * Time - O(NLOGN)
 * Space - O(Maxfreq)
 */

var topKFrequent = function(words, k) {
    let freqMap = {};
    let bucket = [];
    let result = [];

    for(let word of words) {
        freqMap[word] = (freqMap[word] || 0) + 1;
    }
    
    for(let key in freqMap) {
        let idx = freqMap[key];
        let word = key;

        if(Array.isArray(bucket[idx])) {
            bucket[idx].push(word)
            bucket[idx].sort((a, b) => {
                return a.localeCompare(b);
            })
        } else [
            bucket[idx] = [word] 
        ]
    }

    for(let i=bucket.length - 1; i>0; i--) {
        if(bucket[i]) {
            result.push(...bucket[i])
        }

        if(result.length >= k) {
            break;
        }
    }

    return result.slice(0, k);
};

/**
 * Time - O(NLOGN)
 * Space - O(N)
 */


/**
 * @param {string[]} words
 * @param {number} k
 * @return {string[]}
 */
var topKFrequent = function(words, k) {
    let hash = {};
    for (let word of words) {
        hash[word] = hash[word]+1||1;
    }
    let result = Object.keys(hash).sort((a,b)=>{
            let countCompare = hash[b] - hash[a];
            if (countCompare == 0) return a.localeCompare(b);
            else return countCompare;
        }   
    );
    return result.slice(0, k);
};