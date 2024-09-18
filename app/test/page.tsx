import React from "react";

export default function Page() {
  //Validate Parentheses
  const isValidateParentheses = (s: string) => {
    const stack = [];
    const map: any = {
      "}": "{",
      "]": "[",
      ")": "(",
    };
    for (const c of s) {
      if (!(c in map)) {
        stack.push(c);
        continue;
      }
      if (stack[stack.length - 1] === map[c]) {
        stack.pop();
        continue;
      }
      return false;
    }
    return stack.length === 0;
  };

  isValidateParentheses("]");

  //Two Integer Sum
  const twoSum = (nums: number[], target: number) => {
    return nums.reduce(
      (result, num, index) => {
        const numberDesc = target - num;
        const indexNumberDesc = nums.slice(index + 1).indexOf(numberDesc);
        if (indexNumberDesc >= 0) {
          return [index, indexNumberDesc + index + 1];
        }
        return result;
      },
      [-1, -1]
    );
  };

  twoSum([5, 5, 2, 5], 10);

  //Buy and Sell Crypto
  const maxProfit = (prices: number[]) => {
    return prices.reduce((result, item, index) => {
      prices.slice(index + 1).forEach((num) => {
        const desc = num - item;
        if (desc > 0 && desc > result) {
          result = desc;
        }
      });
      return result;
    }, 0);
  };

  maxProfit([10, 1, 5, 6, 7, 1]);

  //Binary Search

  const search = (nums: number[], target: number) => {
    let l = 0;
    let r = nums.length - 1;
    while (l <= r) {
      const m = Math.floor((l + r) / 2);
      if (target < nums[m]) {
        r = m - 1;
      } else if (target > nums[m]) {
        l = m + 1;
      } else {
        return m;
      }
    }
    return -1;
  };

  search([-1, 2, 3], 3);

  //Reverse a Linked List

  class ListNode {
    val: number;
    next: ListNode | null;

    constructor(val: number = 0, next: ListNode | null = null) {
      this.val = val;
      this.next = next;
    }
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const reverseList = (head: ListNode | null): ListNode | null => {
    let prev: ListNode | null = null;
    let current: ListNode | null = head;
    while (current) {
      const nextTemp: ListNode | null = current.next;
      current.next = prev;

      prev = current;
      current = nextTemp;
    }

    return prev;
  };

  //Merge Two Sorted Linked Lists
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const mergeTwoLists = (list1: ListNode | null, list2: ListNode | null) => {
    const dummy = { val: 0, next: null };
    let mergeList: ListNode | null = dummy;

    while (list1 && list2) {
      if (list1.val <= list2.val) {
        mergeList.next = list1;
        list1 = list1.next;
      } else {
        mergeList.next = list2;
        list2 = list2.next;
      }
      mergeList = mergeList.next;
    }

    if (list1) {
      mergeList.next = list1;
    }
    if (list2) {
      mergeList.next = list2;
    }
    return dummy.next;
  };

  //Linked List Cycle Detection
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const hasCycle = (head: ListNode) => {
    let fast = head;
    let slow: ListNode = head;
    while (fast.next !== null && fast.next.next !== null && slow.next) {
      fast = fast.next.next;
      slow = slow.next;
      if (fast === slow) {
        return true;
      }
    }
    return false;
  };

  //Invert a Binary Tree

  class TreeNode {
    val: number;
    left: TreeNode | null;
    right: TreeNode | null;

    constructor(
      val = 0,
      left: TreeNode | null = null,
      right: TreeNode | null = null
    ) {
      this.val = val;
      this.left = left;
      this.right = right;
    }
  }

  //Invert a Binary Tree

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const invertTree: (root: TreeNode | null) => TreeNode | null = (root) => {
    if (root === null) return null;

    const node = new TreeNode(root.val);
    node.left = invertTree(root.right);
    node.right = invertTree(root.left);
    return node;
  };

  //Depth of Binary Tree
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const maxDepth: (root: TreeNode | null) => number = (root) => {
    if (root === null) {
      return 0;
    }
    return 1 + Math.max(maxDepth(root.left), maxDepth(root.right));
  };

  //Binary Tree Diameter

  const dfs: (root: TreeNode | null, res: number[]) => number = (root, res) => {
    if (root === null) {
      return 0;
    }
    const left = dfs(root.left, res);
    const right = dfs(root.right, res);
    // console.log(res[0], left, right, root.val);
    res[0] = Math.max(res[0], left + right);
    return 1 + Math.max(left, right);
  };
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const diameterOfBinaryTree: (root: TreeNode | null) => number = (root) => {
    const res: number[] = [0];
    dfs(root, res);
    // console.log(res[0], "result");
    return res[0];
  };

  // Tạo các nút
  const node4: TreeNode = new TreeNode(4);
  const node5: TreeNode = new TreeNode(5);
  const node2: TreeNode = new TreeNode(2, node4, node5);

  const node6: TreeNode = new TreeNode(6);
  const node7: TreeNode = new TreeNode(7);
  const node3: TreeNode = new TreeNode(3, node6, node7);

  // Tạo nút gốc
  const root: TreeNode = new TreeNode(1, node2, node3);
  const root0: TreeNode = new TreeNode(1, node2, node3);

  // Cây giá trị sẽ trông như sau:
  //        1
  //      /   \
  //     2     3
  //    / \   / \
  //   4   5 6   7

  diameterOfBinaryTree(root);

  //Balanced Binary Tree
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const balancedBinary: (root: TreeNode | null) => number[] = (root) => {
    if (!root) {
      return [1, 0];
    }
    const left = balancedBinary(root.left);
    const right = balancedBinary(root.right);
    // console.log(left, right, root.val);
    const res =
      left[0] === 1 && right[0] === 1 && Math.abs(left[1] - right[1]) <= 1
        ? 1
        : 0;
    return [res, 1 + Math.max(left[1], right[1])];
  };
  const isBalanced: (root: TreeNode | null) => boolean = (root) => {
    const res = balancedBinary(root)[0];
    // console.log(res, "result");
    return res === 1;
  };

  isBalanced(root);

  //Same Binary Tree
  const isSameTree: (p: TreeNode | null, q: TreeNode | null) => boolean = (
    p,
    q
  ) => {
    if (!p && !q) {
      return true;
    }
    if (p && q && p.val === q.val) {
      const left = isSameTree(p.left, q.left);
      const right = isSameTree(p.right, q.right);
      return left && right;
    }
    return false;
  };

  isSameTree(root, root0);

  //Top K Elements in List
  const topKFrequent = (nums: number[], k: number) => {
    const object = nums.reduce((result: any, index) => {
      result[index] = (result[index] ?? 0) + 1;
      return result;
    }, {});
    const array: [string, number][] = Object.entries(object);
    array.sort((a, b) => b[1] - a[1]);
    return array.splice(0, k).reduce((result: number[], num) => {
      result.push(Number(num[0]));
      return result;
    }, []);
  };

  topKFrequent([1, 2, 2, 3, 3], 2);

  //Duplicate Integer
  const hasDuplicate = (nums: number[]) => {
    const uniqueSet = Array.from(new Set(nums));
    return uniqueSet.length !== nums.length;
  };
  hasDuplicate([1, 1, 2, 3]);

  //Is Anagram
  const isAnagram = (s: string, t: string) => {
    if (s.length !== t.length) {
      return false;
    }
    const objectS: any = {};
    const objectT: any = {};
    for (let i = 0; i < s.length; i++) {
      objectS[s[i]] = (objectS[s[i]] ?? 0) + 1;
      objectT[t[i]] = (objectT[t[i]] ?? 0) + 1;
    }
    let res = true;
    Object.entries(objectS).forEach((value: any) => {
      if (value[1] !== objectT[value[0]] || !objectT[value[0]]) {
        res = false;
      }
    });
    return res;
  };

  isAnagram("racecar", "arracet");

  //Anagram Groups
  const groupAnagrams = (strs: string[]) => {
    const ans: any = {};
    for (const s of strs) {
      const count = Array(26).fill(0);
      for (const c of s) {
        count[c.charCodeAt(0) - "a".charCodeAt(0)]++;
      }
      const key = count.join("#");
      if (!ans[key]) {
        ans[key] = [];
      }
      ans[key].push(s);
      // console.log(s, count, key);
    }
    return Object.values(ans);
  };

  groupAnagrams(["act", "pots", "tops", "cat", "stop", "hat"]);

  return <div>123</div>;
}
