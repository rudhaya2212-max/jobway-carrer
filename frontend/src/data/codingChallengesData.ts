import { CodeChallenge } from '../types';

export const CODING_CHALLENGES: CodeChallenge[] = [
  {
    id: 'two-sum',
    title: 'Two Sum & Target Index Matcher',
    difficulty: 'Easy',
    category: 'Algorithms & Data Structures',
    description: `Given an array of integers \`nums\` and an integer \`target\`, return the indices of the two numbers such that they add up to \`target\`.

You may assume that each input would have exactly one solution, and you may not use the same element twice.

### Example 1:
\`\`\`
Input: nums = [2, 7, 11, 15], target = 9
Output: [0, 1]
Explanation: Because nums[0] + nums[1] == 9, we return [0, 1].
\`\`\`

### Constraints:
* \`2 <= nums.length <= 10^4\`
* \`-10^9 <= nums[i] <= 10^9\`
* Only one valid answer exists.`,
    starterCode: {
      javascript: `/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
function twoSum(nums, target) {
  // Write your code here
  const map = new Map();
  for (let i = 0; i < nums.length; i++) {
    const complement = target - nums[i];
    if (map.has(complement)) {
      return [map.get(complement), i];
    }
    map.set(nums[i], i);
  }
  return [];
}
`,
      python: `def two_sum(nums, target):
    # Write your solution here
    seen = {}
    for i, num in enumerate(nums):
        diff = target - num
        if diff in seen:
            return [seen[diff], i]
        seen[num] = i
    return []
`
    },
    testCases: [
      { input: 'nums = [2, 7, 11, 15], target = 9', expectedOutput: '[0, 1]' },
      { input: 'nums = [3, 2, 4], target = 6', expectedOutput: '[1, 2]' },
      { input: 'nums = [3, 3], target = 6', expectedOutput: '[0, 1]' },
      { input: 'nums = [1, 5, 8, 3], target = 11', expectedOutput: '[2, 3]', isHidden: true }
    ],
    hints: [
      "Think about what information you need as you iterate through the list. Can you look up whether a number's complement has already been seen in O(1) time?",
      "Instead of checking every pair with nested loops (which takes O(N²) time), consider storing each visited element and its index in a hash map.",
      "Calculate `complement = target - current_number`. If `complement` exists in your hash table, you have found the matching indices!"
    ],
    remedialDrill: [
      {
        question: "What is the average time complexity of looking up a key in a Hash Map?",
        options: ["O(1) Constant Time", "O(N) Linear Time", "O(log N) Logarithmic Time", "O(N²) Quadratic Time"],
        answerIndex: 0,
        explanation: "Hash maps compute a hash of the key to index directly into a bucket, giving O(1) average lookup time."
      },
      {
        question: "If target is 10 and current element is 4, what is the required complement?",
        options: ["14", "6", "-6", "40"],
        answerIndex: 1,
        explanation: "The complement is calculated as target - current (10 - 4 = 6)."
      },
      {
        question: "Why is a nested loop (brute force) suboptimal for large arrays?",
        options: [
          "It uses O(N) extra space",
          "It compares every pair resulting in O(N²) time complexity",
          "It mutates the original array",
          "It cannot find negative numbers"
        ],
        answerIndex: 1,
        explanation: "Double nested loops compare each item with all others, resulting in N*(N-1)/2 operations, which scales poorly."
      }
    ]
  },
  {
    id: 'valid-parentheses',
    title: 'Valid Parentheses & Bracket Matching',
    difficulty: 'Easy',
    category: 'Stacks & Parsers',
    description: `Given a string \`s\` containing just the characters \`'('\`, \`')'\`, \`'{'\`, \`'}'\`, \`'['\` and \`']'\`, determine if the input string is valid.

An input string is valid if:
1. Open brackets must be closed by the same type of brackets.
2. Open brackets must be closed in the correct order.
3. Every close bracket has a corresponding open bracket of the same type.

### Example:
\`\`\`
Input: s = "()[]{}"
Output: true

Input: s = "(]"
Output: false
\`\`\``,
    starterCode: {
      javascript: `/**
 * @param {string} s
 * @return {boolean}
 */
function isValid(s) {
  const stack = [];
  const map = { ')': '(', '}': '{', ']': '[' };
  
  for (const char of s) {
    if (char in map) {
      if (stack.length === 0 || stack.pop() !== map[char]) {
        return false;
      }
    } else {
      stack.push(char);
    }
  }
  return stack.length === 0;
}
`,
      python: `def is_valid(s: str) -> bool:
    stack = []
    pairs = {')': '(', '}': '{', ']': '['}
    for char in s:
        if char in pairs:
            if not stack or stack.pop() != pairs[char]:
                return False
        else:
            stack.append(char)
    return len(stack) == 0
`
    },
    testCases: [
      { input: 's = "()"', expectedOutput: 'true' },
      { input: 's = "()[]{}"', expectedOutput: 'true' },
      { input: 's = "(]"', expectedOutput: 'false' },
      { input: 's = "([)]"', expectedOutput: 'false', isHidden: true }
    ],
    hints: [
      "Which data structure follows the Last-In, First-Out (LIFO) property suitable for nested hierarchies?",
      "Whenever you encounter an opening bracket, push it. When you encounter a closing bracket, check if it matches the top of your stack.",
      "Remember edge cases: What if the string starts with a closing bracket? What if unclosed opening brackets remain at the end?"
    ],
    remedialDrill: [
      {
        question: "Which data structure is ideal for tracking nested closing delimiters?",
        options: ["FIFO Queue", "LIFO Stack", "Binary Search Tree", "Linked List"],
        answerIndex: 1,
        explanation: "A Stack provides Last-In-First-Out (LIFO) order, which directly mirrors nested grammatical syntax."
      },
      {
        question: "If the input string is '(((' and loop finishes, why is it invalid?",
        options: ["Stack is empty", "Stack is not empty (length > 0)", "Syntax error", "Stack overflow"],
        answerIndex: 1,
        explanation: "Unmatched opening brackets remain in the stack, so stack.length !== 0 means it is invalid."
      },
      {
        question: "What is the time and space complexity of the stack-based parentheses validator?",
        options: ["O(N) Time, O(N) Space", "O(N²) Time, O(1) Space", "O(1) Time, O(N) Space", "O(N log N) Time, O(N) Space"],
        answerIndex: 0,
        explanation: "Single pass through the string of length N gives O(N) time and worst-case O(N) space."
      }
    ]
  },
  {
    id: 'lru-cache',
    title: 'LRU Cache Design & Eviction Strategy',
    difficulty: 'Medium',
    category: 'System Design & Data Structures',
    description: `Design a data structure that follows the constraints of a **Least Recently Used (LRU) cache**.

Implement the \`LRUCache\` class:
* \`LRUCache(int capacity)\` Initialize the LRU cache with positive size capacity.
* \`int get(int key)\` Return the value of the key if it exists, otherwise return -1.
* \`void put(int key, int value)\` Update value if key exists, otherwise add key-value pair. If capacity is exceeded, evict the least recently used key.

Both \`get\` and \`put\` must run in **O(1)** average time complexity.`,
    starterCode: {
      javascript: `class LRUCache {
  /**
   * @param {number} capacity
   */
  constructor(capacity) {
    this.capacity = capacity;
    this.cache = new Map(); // JavaScript Map maintains insertion order
  }

  /** 
   * @param {number} key
   * @return {number}
   */
  get(key) {
    if (!this.cache.has(key)) return -1;
    const val = this.cache.get(key);
    this.cache.delete(key);
    this.cache.set(key, val);
    return val;
  }

  /** 
   * @param {number} key 
   * @param {number} value
   * @return {void}
   */
  put(key, value) {
    if (this.cache.has(key)) {
      this.cache.delete(key);
    } else if (this.cache.size >= this.capacity) {
      const oldestKey = this.cache.keys().next().value;
      this.cache.delete(oldestKey);
    }
    this.cache.set(key, value);
  }
}
`,
      python: `class LRUCache:
    def __init__(self, capacity: int):
        self.capacity = capacity
        self.cache = {} # In Python 3.7+, dict preserves insertion order

    def get(self, key: int) -> int:
        if key not in self.cache:
            return -1
        val = self.cache.pop(key)
        self.cache[key] = val
        return val

    def put(self, key: int, value: int) -> None:
        if key in self.cache:
            self.cache.pop(key)
        elif len(self.cache) >= self.capacity:
            oldest = next(iter(self.cache))
            del self.cache[oldest]
        self.cache[key] = value
`
    },
    testCases: [
      { input: 'put(1, 1), put(2, 2), get(1)', expectedOutput: '1' },
      { input: 'put(3, 3) [evicts 2], get(2)', expectedOutput: '-1' },
      { input: 'put(4, 4) [evicts 1], get(1)', expectedOutput: '-1', isHidden: true }
    ],
    hints: [
      "To achieve O(1) for both lookup and eviction/ordering, what combination of data structures is classically used?",
      "A Hash Map provides O(1) key lookup, while a Doubly Linked List allows O(1) removal and re-insertion at the head.",
      "When an item is accessed via `get` or updated via `put`, move its node to the most recently used (MRU) position."
    ],
    remedialDrill: [
      {
        question: "Why can't an array alone achieve O(1) LRU eviction?",
        options: [
          "Arrays cannot store numbers",
          "Shifting elements on removal or insertion takes O(N) time",
          "Arrays are immutable",
          "Arrays have no indices"
        ],
        answerIndex: 1,
        explanation: "Removing or updating elements in an array requires shifting remaining elements in O(N) time."
      },
      {
        question: "What is the benefit of a Doubly Linked List over a Singly Linked List in LRU Cache?",
        options: [
          "It uses less memory",
          "Nodes can delete themselves in O(1) time using node.prev and node.next pointers",
          "It sorts automatically",
          "It allows binary search"
        ],
        answerIndex: 1,
        explanation: "Having a pointer to both previous and next nodes enables instantaneous O(1) node detachment."
      },
      {
        question: "In what modern production infrastructure is LRU eviction most commonly deployed?",
        options: ["Redis cache servers & CPU L1/L2 caches", "Git commits", "Relational database foreign keys", "CSS flexbox engine"],
        answerIndex: 0,
        explanation: "Redis memory eviction policies and hardware CPU memory caches use LRU variants to keep frequently accessed data hot."
      }
    ]
  }
];

