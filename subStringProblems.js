/** 
 * longest substring with exactly k distinct charcaters
*/

function longestKSubstr(s, k) {
    let n = s.length;
    
    if(k > n) {
        return -1;
    }
    
    let start = 0;
    let end = 0;
    
    let counter = 0;
    let charMap = new Array(256);
    charMap.fill(0);
    
    let maxLen = -1;
    
    while(end < n) {
        let pos = s.charCodeAt(end);
        let val = charMap[pos];
        
        if(val === 0) {
            counter++;
        }
        
        charMap[pos] = (charMap[pos] || 0) + 1;
        end++;
        
        while(counter > k) {
            let pos2 = s.charCodeAt(start);
            
            if(charMap[pos2] === 1) {
                counter--;
            }
            
            charMap[pos2] = (charMap[pos2] || 0) - 1;
            start++;
        }
        
        if(counter === k) {
            maxLen = Math.max(maxLen, end - start);
        }
    }
    
    return maxLen;
}

/**
 * longest substring without repeating characters
 */

var lengthOfLongestSubstring = function(s) {
    let n = s.length;

    let left = 0;
    let right = 0;
    let map = {};
    let maxLen = 0;

    while(right < n) {
        if(map[s[right]]) {
            while(map[s[right]]) {
                map[s[left]] = (map[s[left]] ?? 0) - 1;
                left++;
            }

            map[s[right]] = (map[s[right]] ?? 0) + 1;
        } else {
            map[s[right]] = (map[s[right]] ?? 0) + 1;
            maxLen = Math.max(maxLen, right - left + 1);
        }

        right ++;
    }

    return maxLen;
};

/**
 * Longest repeating charcter replacement
 */
const getMaxFreqCount = (charMap) => {
    let maxCount = 0;

    for(let char in charMap) {
        maxCount = Math.max(maxCount, charMap[char]);
    }

    return maxCount;
}

var characterReplacement = function(s, k) {
    if(!s?.length) {
        return 0;
    }

    let n = s.length;

    let charMap = {};

    let i = 0;
    let j = 0;
    let maxLen = 0;

    charMap[s[i]] = 1;

    while(i < n && j < n) {
        let subStrLen = j - i + 1;
        let maxFreqCount = getMaxFreqCount(charMap);

        if(subStrLen - maxFreqCount <= k) {
            maxLen = Math.max(maxLen, subStrLen)

            j++;
            charMap[s[j]] = (charMap[s[j]] ?? 0) + 1;
        } else {
            charMap[s[i]] = (charMap[s[i]] ?? 0) - 1;
            i++;
        }
    }

    return maxLen;
};



/**
 * Minimum window substring
 */
var minWindow = function(s, t) {
    const map = {};
    let begin = 0;
    let end = 0;

    let counter = t.length;
    let minLen = Number.MAX_SAFE_INTEGER;
    let minStart = 0;

    for(let c of t) {
        map[c] = (map[c] ?? 0) + 1;
    }

    while(end < s.length) {
        if(map[s[end]] > 0) {
            counter--;
        }

        map[s[end]] = (map[s[end]] ?? 0) - 1;
        end++;

        while(counter === 0) {
            if(end - begin < minLen) {
                minStart = begin;
                minLen = end - begin;
            }

            map[s[begin]] = (map[s[begin]] ?? 0) + 1;

            if(map[s[begin]] > 0) {
                counter++;
            }

            begin++;
        }
    }

    if(minLen !== Number.MAX_SAFE_INTEGER) {
        return s.substring(minStart, minStart+minLen)
    }

    return "";
 };