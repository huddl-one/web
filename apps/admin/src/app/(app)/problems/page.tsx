import Problems from "@admin/components/Problems";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";

import { db } from "@huddl/db";
export interface Problem {
  id: number;
  title: string;
  slug: string;
  difficulty: "easy" | "medium" | "hard";
  published: boolean;
  problem_statement: string;
  description: string;
  examples: any[];
  test_cases: any[];
}

const problems: Problem[] = [
  {
    "id": 1,
    "title": "Two Sum",
    "slug": "two-sum",
    "difficulty": "easy",
    "published": true,
    "problem_statement": "https://your-s3-bucket-url/two-sum-problem.mdx",
    "description": "Given an array of integers, return indices of the two numbers such that they add up to a specific target.",
    "examples": [
      {
        "input": [2, 7, 11, 15],
        "target": 9,
        "output": [0, 1]
      }
    ],
    "test_cases": [
      {
        "input": [3, 2, 4],
        "output": [6]
      }
    ]
  },
  {
    "id": 2,
    "title": "Add Two Numbers",
    "slug": "add-two-numbers",
    "difficulty": "medium",
    "published": true,
    "problem_statement": "https://your-s3-bucket-url/add-two-numbers-problem.mdx",
    "description": "You are given two non-empty linked lists representing two non-negative integers. The digits are stored in reverse order, and each of their nodes contains a single digit.",
    "examples": [
      {
        "input": {
          "l1": [2, 4, 3],
          "l2": [5, 6, 4]
        },
        "output": [7, 0, 8]
      }
    ],
    "test_cases": [
      {
        "input": {
          "l1": [5],
          "l2": [5]
        },
        "output": [0, 1, 1]
      }
    ]
  },
  {
    "id": 3,
    "title": "Longest Substring Without Repeating Characters",
    "slug": "longest-substring-without-repeating-characters",
    "difficulty": "medium",
    "published": true,
    "problem_statement": "https://your-s3-bucket-url/longest-substring-problem.mdx",
    "description": "Given a string, find the length of the longest substring without repeating characters.",
    "examples": [
      {
        "input": "abcabcbb",
        "output": 3
      }
    ],
    "test_cases": [
      {
        "input": "pwwkew",
        "output": 3
      }
    ]
  },
  {
    "id": 4,
    "title": "Median of Two Sorted Arrays",
    "slug": "median-of-two-sorted-arrays",
    "difficulty": "hard",
    "published": false,
    "problem_statement": "https://your-s3-bucket-url/median-of-two-sorted-arrays-problem.mdx",
    "description": "There are two sorted arrays nums1 and nums2 of size m and n respectively. Find the median of the two sorted arrays.",
    "examples": [
      {
        "input": {
          "nums1": [1, 3],
          "nums2": [2]
        },
        "output": 2.0
      }
    ],
    "test_cases": [
      {
        "input": {
          "nums1": [1, 2],
          "nums2": [3, 4]
        },
        "output": 2.5
      }
    ]
  },
  {
    "id": 5,
    "title": "Reverse Integer",
    "slug": "reverse-integer",
    "difficulty": "easy",
    "published": true,
    "problem_statement": "https://your-s3-bucket-url/reverse-integer-problem.mdx",
    "description": "Given a 32-bit signed integer, reverse digits of an integer.",
    "examples": [
      {
        "input": 123,
        "output": 321
      }
    ],
    "test_cases": [
      {
        "input": -123,
        "output": -321
      }
    ]
  },
  {
    "id": 6,
    "title": "Palindrome Number",
    "slug": "palindrome-number",
    "difficulty": "easy",
    "published": true,
    "problem_statement": "https://your-s3-bucket-url/palindrome-number-problem.mdx",
    "description": "Determine whether an integer is a palindrome. An integer is a palindrome when it reads the same backward as forward.",
    "examples": [
      {
        "input": 121,
        "output": true
      }
    ],
    "test_cases": [
      {
        "input": -121,
        "output": false
      }
    ]
  },
  {
    "id": 7,
    "title": "Longest Common Prefix",
    "slug": "longest-common-prefix",
    "difficulty": "easy",
    "published": true,
    "problem_statement": "https://your-s3-bucket-url/longest-common-prefix-problem.mdx",
    "description": "Write a function to find the longest common prefix string amongst an array of strings.",
    "examples": [
      {
        "input": ["flower", "flow", "flight"],
        "output": "fl"
      }
    ],
    "test_cases": [
      {
        "input": ["dog", "racecar", "car"],
        "output": ""
      }
    ]
  },
  {
    "id": 8,
    "title": "Valid Parentheses",
    "slug": "valid-parentheses",
    "difficulty": "easy",
    "published": true,
    "problem_statement": "https://your-s3-bucket-url/valid-parentheses-problem.mdx",
    "description": "Given a string containing just the characters '(', ')', '{', '}', '[' and ']', determine if the input string is valid.",
    "examples": [
      {
        "input": "([)]",
        "output": false
      }
    ],
    "test_cases": [
      {
        "input": "{[]}",
        "output": true
      }
    ]
  },
  {
    "id": 9,
    "title": "Merge Two Sorted Lists",
    "slug": "merge-two-sorted-lists",
    "difficulty": "easy",
    "published": true,
    "problem_statement": "https://your-s3-bucket-url/merge-two-sorted-lists-problem.mdx",
    "description": "Merge two sorted linked lists and return it as a new sorted list.",
    "examples": [
      {
        "input": {
          "l1": [1, 2, 4],
          "l2": [1, 3, 4]
        },
        "output": [1, 1, 2, 3, 4, 4]
      }
    ],
    "test_cases": [
      {
        "input": {
          "l1": [],
          "l2": []
        },
        "output": []
      }
    ]
  },
  {
    "id": 10,
    "title": "Maximum Subarray",
    "slug": "maximum-subarray",
    "difficulty": "easy",
    "published": true,
    "problem_statement": "https://your-s3-bucket-url/maximum-subarray-problem.mdx",
    "description": "Find the contiguous subarray (containing at least one number) which has the largest sum and return its sum.",
    "examples": [
      {
        "input": [-2, 1, -3, 4, -1, 2, 1, -5, 4],
        "output": 6
      }
    ],
    "test_cases": [
      {
        "input": [1],
        "output": 1
      }
    ]
  },
  {
    "id": 11,
    "title": "Length of Last Word",
    "slug": "length-of-last-word",
    "difficulty": "easy",
    "published": true,
    "problem_statement": "https://your-s3-bucket-url/length-of-last-word-problem.mdx",
    "description": "Given a string s consisting of some words separated by spaces, return the length of the last word in the string.",
    "examples": [
      {
        "input": "Hello World",
        "output": 5
      }
    ],
    "test_cases": [
      {
        "input": "   fly me   to   the moon  ",
        "output": 4
      }
    ]
  },
  {
    "id": 12,
    "title": "Climbing Stairs",
    "slug": "climbing-stairs",
    "difficulty": "easy",
    "published": true,
    "problem_statement": "https://your-s3-bucket-url/climbing-stairs-problem.mdx",
    "description": "You are climbing a staircase. It takes n steps to reach the top. Each time you can either climb 1 or 2 steps. In how many distinct ways can you climb to the top?",
    "examples": [
      {
        "input": 2,
        "output": 2
      }
    ],
    "test_cases": [
      {
        "input": 3,
        "output": 3
      }
    ]
  },
  {
    "id": 13,
    "title": "Search in Rotated Sorted Array",
    "slug": "search-in-rotated-sorted-array",
    "difficulty": "medium",
    "published": true,
    "problem_statement": "https://your-s3-bucket-url/search-in-rotated-sorted-array-problem.mdx",
    "description": "You are given an integer array nums, sorted in ascending order, which is rotated at some pivot unknown to you. Search for a target value in the array.",
    "examples": [
      {
        "input": {
          "nums": [4, 5, 6, 7, 0, 1, 2],
          "target": 0
        },
        "output": 4
      }
    ],
    "test_cases": [
      {
        "input": {
          "nums": [4, 5, 6, 7, 0, 1, 2],
          "target": 3
        },
        "output": -1
      }
    ]
  },
  {
    "id": 14,
    "title": "Palindrome Linked List",
    "slug": "palindrome-linked-list",
    "difficulty": "easy",
    "published": true,
    "problem_statement": "https://your-s3-bucket-url/palindrome-linked-list-problem.mdx",
    "description": "Given a singly linked list, determine if it is a palindrome.",
    "examples": [
      {
        "input": {
          "val": 1,
          "next": {
            "val": 2,
            "next": {
              "val": 2,
              "next": {
                "val": 1,
                "next": null
              }
            }
          }
        },
        "output": true
      }
    ],
    "test_cases": [
      {
        "input": {
          "val": 1,
          "next": {
            "val": 2,
            "next": null
          }
        },
        "output": false
      }
    ]
  },
  {
    "id": 15,
    "title": "Valid Sudoku",
    "slug": "valid-sudoku",
    "difficulty": "medium",
    "published": true,
    "problem_statement": "https://your-s3-bucket-url/valid-sudoku-problem.mdx",
    "description": "Determine if a 9x9 Sudoku board is valid. Only the filled cells need to be validated according to the following rules:",
    "examples": [
      {
        "input": [
          ["5","3",".",".","7",".",".",".","."],
          ["6",".",".","1","9","5",".",".","."],
          [".","9","8",".",".",".",".","6","."],
          ["8",".",".",".","6",".",".",".","3"],
          ["4",".",".","8",".","3",".",".","1"],
          ["7",".",".",".","2",".",".",".","6"],
          [".","6",".",".",".",".","2","8","."],
          [".",".",".","4","1","9",".",".","5"],
          [".",".",".",".","8",".",".","7","9"]
        ],
        "output": true
      }
    ],
    "test_cases": [
      {
        "input": [
          ["8","3",".",".","7",".",".",".","."],
          ["6",".",".","1","9","5",".",".","."],
          [".","9","8",".",".",".",".","6","."],
          ["8",".",".",".","6",".",".",".","3"],
          ["4",".",".","8",".","3",".",".","1"],
          ["7",".",".",".","2",".",".",".","6"],
          [".","6",".",".",".",".","2","8","."],
          [".",".",".","4","1","9",".",".","5"],
          [".",".",".",".","8",".",".","7","9"]
        ],
        "output": false
      }
    ]
  },
  {
    "id": 16,
    "title": "Maximum Depth of Binary Tree",
    "slug": "maximum-depth-of-binary-tree",
    "difficulty": "easy",
    "published": true,
    "problem_statement": "https://your-s3-bucket-url/maximum-depth-of-binary-tree-problem.mdx",
    "description": "Given a binary tree, find its maximum depth. The maximum depth is the number of nodes along the longest path from the root node down to the farthest leaf node.",
    "examples": [
      {
        "input": {
          "val": 3,
          "left": {
            "val": 9,
            "left": null,
            "right": null
          },
          "right": {
            "val": 20,
            "left": {
              "val": 15,
              "left": null,
              "right": null
            },
            "right": {
              "val": 7,
              "left": null,
              "right": null
            }
          }
        },
        "output": 3
      }
    ],
    "test_cases": [
      {
        "input": {
          "val": 1,
          "left": null,
          "right": null
        },
        "output": 1
      }
    ]
  },
  {
    "id": 17,
    "title": "Add Binary",
    "slug": "add-binary",
    "difficulty": "easy",
    "published": true,
    "problem_statement": "https://your-s3-bucket-url/add-binary-problem.mdx",
    "description": "Given two binary strings, return their sum (also a binary string).",
    "examples": [
      {
        "input": {
          "a": "11",
          "b": "1"
        },
        "output": "100"
      }
    ],
    "test_cases": [
      {
        "input": {
          "a": "1010",
          "b": "1011"
        },
        "output": "10101"
      }
    ]
  },
  {
    "id": 18,
    "title": "Search Insert Position",
    "slug": "search-insert-position",
    "difficulty": "easy",
    "published": true,
    "problem_statement": "https://your-s3-bucket-url/search-insert-position-problem.mdx",
    "description": "Given a sorted array of distinct integers and a target value, return the index if the target is found. If not, return the index where it would be if it were inserted in order.",
    "examples": [
      {
        "input": {
          "nums": [1, 3, 5, 6],
          "target": 5
        },
        "output": 2
      }
    ],
    "test_cases": [
      {
        "input": {
          "nums": [1, 3, 5, 6],
          "target": 2
        },
        "output": 1
      }
    ]
  },
  {
    "id": 19,
    "title": "Rotate Image",
    "slug": "rotate-image",
    "difficulty": "medium",
    "published": true,
    "problem_statement": "https://your-s3-bucket-url/rotate-image-problem.mdx",
    "description": "You are given an n x n 2D matrix representing an image. Rotate the image by 90 degrees (clockwise).",
    "examples": [
      {
        "input": [
          [1, 2, 3],
          [4, 5, 6],
          [7, 8, 9]
        ],
        "output": [
          [7, 4, 1],
          [8, 5, 2],
          [9, 6, 3]
        ]
      }
    ],
    "test_cases": [
      {
        "input": [
          [5, 1, 9, 11],
          [2, 4, 8, 10],
          [13, 3, 6, 7],
          [15, 14, 12, 16]
        ],
        "output": [
          [15, 13, 2, 5],
          [14, 3, 4, 1],
          [12, 6, 8, 9],
          [16, 7, 10, 11]
        ]
      }
    ]
  },
  {
    "id": 20,
    "title": "Plus One",
    "slug": "plus-one",
    "difficulty": "easy",
    "published": true,
    "problem_statement": "https://your-s3-bucket-url/plus-one-problem.mdx",
    "description": "Given a non-empty array of digits representing a non-negative integer, increment one to the integer.",
    "examples": [
      {
        "input": [1, 2, 3],
        "output": [1, 2, 4]
      }
    ],
    "test_cases": [
      {
        "input": [4, 3, 2, 1],
        "output": [4, 3, 2, 2]
      }
    ]
  },
    {
      "id": 21,
      "title": "Valid Anagram",
      "slug": "valid-anagram",
      "difficulty": "easy",
      "published": true,
      "problem_statement": "https://your-s3-bucket-url/valid-anagram-problem.mdx",
      "description": "Given two strings s and t, write a function to determine if t is an anagram of s.",
      "examples": [
        {
          "input": {
            "s": "anagram",
            "t": "nagaram"
          },
          "output": true
        }
      ],
      "test_cases": [
        {
          "input": {
            "s": "rat",
            "t": "car"
          },
          "output": false
        }
      ]
    },
    {
      "id": 22,
      "title": "Merge Intervals",
      "slug": "merge-intervals",
      "difficulty": "medium",
      "published": true,
      "problem_statement": "https://your-s3-bucket-url/merge-intervals-problem.mdx",
      "description": "Given a collection of intervals, merge any overlapping intervals.",
      "examples": [
        {
          "input": [
            [1, 3],
            [2, 6],
            [8, 10],
            [15, 18]
          ],
          "output": [
            [1, 6],
            [8, 10],
            [15, 18]
          ]
        }
      ],
      "test_cases": [
        {
          "input": [
            [1, 4],
            [4, 5]
          ],
          "output": [
            [1, 5]
          ]
        }
      ]
    },
    {
      "id": 23,
      "title": "Maximum Product Subarray",
      "slug": "maximum-product-subarray",
      "difficulty": "medium",
      "published": true,
      "problem_statement": "https://your-s3-bucket-url/maximum-product-subarray-problem.mdx",
      "description": "Find the contiguous subarray within an array (containing at least one number) which has the largest product.",
      "examples": [
        {
          "input": [2, 3, -2, 4],
          "output": 6
        }
      ],
      "test_cases": [
        {
          "input": [-2, 0, -1],
          "output": 0
        }
      ]
    },
    {
      "id": 24,
      "title": "Longest Increasing Subsequence",
      "slug": "longest-increasing-subsequence",
      "difficulty": "medium",
      "published": true,
      "problem_statement": "https://your-s3-bucket-url/longest-increasing-subsequence-problem.mdx",
      "description": "Given an unsorted array of integers, find the length of the longest increasing subsequence.",
      "examples": [
        {
          "input": [10, 9, 2, 5, 3, 7, 101, 18],
          "output": 5
        }
      ],
      "test_cases": [
        {
          "input": [0, 3, 1, 6, 2, 2, 7],
          "output": 4
        }
      ]
    },
    {
      "id": 25,
      "title": "Best Time to Buy and Sell Stock",
      "slug": "best-time-to-buy-and-sell-stock",
      "difficulty": "easy",
      "published": true,
      "problem_statement": "https://your-s3-bucket-url/best-time-to-buy-and-sell-stock-problem.mdx",
      "description": "Say you have an array for which the ith element is the price of a given stock on day i. If you were only permitted to complete at most one transaction, design an algorithm to find the maximum profit.",
      "examples": [
        {
          "input": [7, 1, 5, 3, 6, 4],
          "output": 5
        }
      ],
      "test_cases": [
        {
          "input": [7, 6, 4, 3, 1],
          "output": 0
        }
      ]
    },
    {
      "id": 26,
      "title": "Subsets",
      "slug": "subsets",
      "difficulty": "medium",
      "published": true,
      "problem_statement": "https://your-s3-bucket-url/subsets-problem.mdx",
      "description": "Given a set of distinct integers, return all possible subsets.",
      "examples": [
        {
          "input": [1, 2, 3],
          "output": [
            [],
            [1],
            [2],
            [3],
            [1, 2],
            [1, 3],
            [2, 3],
            [1, 2, 3]
          ]
        }
      ],
      "test_cases": [
        {
          "input": [0],
          "output": [[], [0]]
        }
      ]
    },
    {
      "id": 27,
      "title": "Word Search",
      "slug": "word-search",
      "difficulty": "medium",
      "published": true,
      "problem_statement": "https://your-s3-bucket-url/word-search-problem.mdx",
      "description": "Given a 2D board and a word, determine if it exists in the grid. The word can be constructed from letters of sequentially adjacent cells, where 'adjacent' cells are those horizontally or vertically neighboring.",
      "examples": [
        {
          "input": {
            "board": [
              ['A', 'B', 'C', 'E'],
              ['S', 'F', 'C', 'S'],
              ['A', 'D', 'E', 'E']
            ],
            "word": "ABCCED"
          },
          "output": true
        }
      ],
      "test_cases": [
        {
          "input": {
            "board": [
              ['A', 'B', 'C', 'E'],
              ['S', 'F', 'C', 'S'],
              ['A', 'D', 'E', 'E']
            ],
            "word": "SEE"
          },
          "output": true
        }
      ]
    },
    {
      "id": 28,
      "title": "Counting Bits",
      "slug": "counting-bits",
      "difficulty": "medium",
      "published": true,
      "problem_statement": "https://your-s3-bucket-url/counting-bits-problem.mdx",
      "description": "Given a non-negative integer num, for every number i in the range 0 ≤ i ≤ num, calculate the number of 1's in their binary representation.",
      "examples": [
        {
          "input": 2,
          "output": [0, 1, 1]
        }
      ],
      "test_cases": [
        {
          "input": 5,
          "output": [0, 1, 1, 2, 1, 2]
        }
      ]
    },
    {
      "id": 29,
      "title": "Single Number",
      "slug": "single-number",
      "difficulty": "easy",
      "published": true,
      "problem_statement": "https://your-s3-bucket-url/single-number-problem.mdx",
      "description": "Given a non-empty array of integers, every element appears twice except for one. Find that single one.",
      "examples": [
        {
          "input": [4, 1, 2, 1, 2],
          "output": 4
        }
      ],
      "test_cases": [
        {
          "input": [2, 2, 3, 3, 1],
          "output": 1
        }
      ]
    },
    {
      "id": 30,
      "title": "Longest Palindromic Substring",
      "slug": "longest-palindromic-substring",
      "difficulty": "medium",
      "published": true,
      "problem_statement": "https://your-s3-bucket-url/longest-palindromic-substring-problem.mdx",
      "description": "Given a string s, find the longest palindromic substring in s.",
      "examples": [
        {
          "input": "babad",
          "output": "bab"
        }
      ],
      "test_cases": [
        {
          "input": "cbbd",
          "output": "bb"
        }
      ]
    },
    {
      "id": 31,
      "title": "Construct Binary Tree from Preorder and Inorder Traversal",
      "slug": "construct-binary-tree",
      "difficulty": "medium",
      "published": true,
      "problem_statement": "https://your-s3-bucket-url/construct-binary-tree-problem.mdx",
      "description": "Given preorder and inorder traversal of a tree, construct the binary tree.",
      "examples": [
        {
          "input": {
            "preorder": [3, 9, 20, 15, 7],
            "inorder": [9, 3, 15, 20, 7]
          },
          "output": {
            "val": 3,
            "left": {
              "val": 9,
              "left": null,
              "right": null
            },
            "right": {
              "val": 20,
              "left": {
                "val": 15,
                "left": null,
                "right": null
              },
              "right": {
                "val": 7,
                "left": null,
                "right": null
              }
            }
          }
        }
      ],
      "test_cases": [
        {
          "input": {
            "preorder": [1, 2, 3],
            "inorder": [2, 1, 3]
          },
          "output": {
            "val": 1,
            "left": {
              "val": 2,
              "left": null,
              "right": null
            },
            "right": {
              "val": 3,
              "left": null,
              "right": null
            }
          }
        }
      ]
    },
    {
      "id": 32,
      "title": "Jump Game",
      "slug": "jump-game",
      "difficulty": "medium",
      "published": true,
      "problem_statement": "https://your-s3-bucket-url/jump-game-problem.mdx",
      "description": "Given an array of non-negative integers, you are initially positioned at the first index. Each element in the array represents your maximum jump length. Determine if you can reach the last index.",
      "examples": [
        {
          "input": [2, 3, 1, 1, 4],
          "output": true
        }
      ],
      "test_cases": [
        {
          "input": [3, 2, 1, 0, 4],
          "output": false
        }
      ]
    },
    {
      "id": 33,
      "title": "Symmetric Tree",
      "slug": "symmetric-tree",
      "difficulty": "easy",
      "published": true,
      "problem_statement": "https://your-s3-bucket-url/symmetric-tree-problem.mdx",
      "description": "Given a binary tree, check whether it is a mirror of itself (i.e., symmetric around its center).",
      "examples": [
        {
          "input": {
            "val": 1,
            "left": {
              "val": 2,
              "left": {
                "val": 3,
                "left": null,
                "right": null
              },
              "right": {
                "val": 4,
                "left": null,
                "right": null
              }
            },
            "right": {
              "val": 2,
              "left": {
                "val": 4,
                "left": null,
                "right": null
              },
              "right": {
                "val": 3,
                "left": null,
                "right": null
              }
            }
          },
          "output": true
        }
      ],
      "test_cases": [
        {
          "input": {
            "val": 1,
            "left": {
              "val": 2,
              "left": null,
              "right": {
                "val": 3,
                "left": null,
                "right": null
              }
            },
            "right": {
              "val": 2,
              "left": null,
              "right": {
                "val": 3,
                "left": null,
                "right": null
              }
            }
          },
          "output": false
        }
      ]
    },
    {
      "id": 34,
      "title": "Reverse Linked List",
      "slug": "reverse-linked-list",
      "difficulty": "easy",
      "published": true,
      "problem_statement": "https://your-s3-bucket-url/reverse-linked-list-problem.mdx",
      "description": "Reverse a singly linked list.",
      "examples": [
        {
          "input": {
            "val": 1,
            "next": {
              "val": 2,
              "next": {
                "val": 3,
                "next": {
                  "val": 4,
                  "next": {
                    "val": 5,
                    "next": null
                  }
                }
              }
            }
          },
          "output": {
            "val": 5,
            "next": {
              "val": 4,
              "next": {
                "val": 3,
                "next": {
                  "val": 2,
                  "next": {
                    "val": 1,
                    "next": null
                  }
                }
              }
            }
          }
        }
      ],
      "test_cases": [
        {
          "input": {
            "val": 1,
            "next": null
          },
          "output": {
            "val": 1,
            "next": null
          }
        }
      ]
    },
    {
      "id": 35,
      "title": "Two Sum",
      "slug": "two-sum",
      "difficulty": "easy",
      "published": true,
      "problem_statement": "https://your-s3-bucket-url/two-sum-problem.mdx",
      "description": "Given an array of integers, return indices of the two numbers such that they add up to a specific target.",
      "examples": [
        {
          "input": {
            "nums": [2, 7, 11, 15],
            "target": 9
          },
          "output": [0, 1]
        }
      ],
      "test_cases": [
        {
          "input": {
            "nums": [3, 2, 4],
            "target": 6
          },
          "output": [1, 2]
        }
      ]
    },
    {
      "id": 36,
      "title": "Product of Array Except Self",
      "slug": "product-except-self",
      "difficulty": "medium",
      "published": true,
      "problem_statement": "https://your-s3-bucket-url/product-except-self-problem.mdx",
      "description": "Given an array nums, output an array where each element is the product of all the elements in the original array except itself.",
      "examples": [
        {
          "input": [1, 2, 3, 4],
          "output": [24, 12, 8, 6]
        }
      ],
      "test_cases": [
        {
          "input": [4, 5, 6, 7],
          "output": [210, 168, 140, 120]
        }
      ]
    },
    {
      "id": 37,
      "title": "Container With Most Water",
      "slug": "container-most-water",
      "difficulty": "medium",
      "published": true,
      "problem_statement": "https://your-s3-bucket-url/container-most-water-problem.mdx",
      "description": "Given n non-negative integers a1, a2, ..., an, where each represents a point at coordinate (i, ai). n vertical lines are drawn such that the two endpoints of the line i is at (i, ai) and (i, 0). Find two lines, which together with the x-axis forms a container, such that the container contains the most water.",
      "examples": [
        {
          "input": [1, 8, 6, 2, 5, 4, 8, 3, 7],
          "output": 49
        }
      ],
      "test_cases": [
        {
          "input": [1, 1],
          "output": 1
        }
      ]
    },
    {
      "id": 38,
      "title": "Find All Anagrams in a String",
      "slug": "find-anagrams-in-string",
      "difficulty": "medium",
      "published": true,
      "problem_statement": "https://your-s3-bucket-url/find-anagrams-in-string-problem.mdx",
      "description": "Given a string s and a non-empty string p, find all the start indices of p's anagrams in s.",
      "examples": [
        {
          "input": {
            "s": "cbaebabacd",
            "p": "abc"
          },
          "output": [0, 6]
        }
      ],
      "test_cases": [
        {
          "input": {
            "s": "abab",
            "p": "ab"
          },
          "output": [0, 1, 2]
        }
      ]
    },
    {
      "id": 40,
      "title": "Minimum Path Sum",
      "slug": "minimum-path-sum",
      "difficulty": "medium",
      "published": true,
      "problem_statement": "https://your-s3-bucket-url/minimum-path-sum-problem.mdx",
      "description": "Given a m x n grid filled with non-negative numbers, find a path from the top left to the bottom right which minimizes the sum of all numbers along its path.",
      "examples": [
        {
          "input": [
            [1, 3, 1],
            [1, 5, 1],
            [4, 2, 1]
          ],
          "output": 7
        }
      ],
      "test_cases": [
        {
          "input": [
            [1, 2, 3],
            [4, 5, 6]
          ],
          "output": 12
        }
      ]
    }  
]




export default async function Home() {
  const { getUser } = getKindeServerSession();
  const user = getUser();

  //  Checking whether the user is logged in
  if (!user || !user.id) {
    redirect("/auth-callback?origin=problems");
  }

  //  Checking whether the user is synced to db
  const dbuser = await db.user.findUnique({
    where: {
      id: user.id,
    },
  });

  if (!dbuser) {
    redirect("/auth-callback?origin=problems");
  }

  // If everything is fine, we can show the dashboard
  return <Problems problems={problems} />;
}
