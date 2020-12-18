// 翻转二叉树
function reverse(root) {
  if (root == null) return root;
  let left = reverse(root.left);
  let right = reverse(root.right);
  root.left = right;
  root.right = left;
  return root;
}

// 深度优先遍历二叉树
function preorder(root) {
  if (!root) {
    return;
  }
  console.log('当前遍历的节点值时：', root.val);
  preorder(root.left);
  preorder(root.right);
}

// 广度优先遍历二叉树
function BFS(root) {
  const queue = [];
  queue.push(root);
  while (queue.length) {
    const top = queue.shift();
    console.log(top.val);
    if (top.left) {
      queue.push(top.left);
    }
    if (top.right) {
      queue.push(top.right);
    }
  }
}

// 数组元素全排列
const permute = function (nums) {
  const len = nums.length;
  const res = [];
  const visited = {};
  const temp = [];
  const DFS = (nth) => {
    if (nth === len) {
      return res.push([...temp]);
    }
    for (let i = 0; i < len; i++) {
      if (!visited[i]) {
        temp.push(nums[i]);
        visited[i] = true;
        DFS(nth + 1);
        temp.pop();
        visited[i] = false;
      }
    }
  }
  DFS(0);
  return res;
}

// 迭代算法实现先序遍历二叉树
const preorderTraversal = function (root) {
  const res = [];
  if (!root) {
    return res;
  }
  const stack = [];
  stack.push(root);
  while (stack.length) {
    const cur = stack.pop();
    res.push(cur.val);
    if (cur.right) {
      stack.push(cur.right);
    }
    if (cur.left) {
      stack.push(cur.left);
    }
  }
  return res;
}

// 迭代算法实现后序遍历二叉树
const postorderTraversal = function (root) {
  const res = [];
  if (!root) {
    return res;
  }
  const stack = [];
  stack.push(root);
  while (stack.length) {
    const cur = stack.pop();
    res.unshift(cur.val);
    if (cur.left) {
      stack.push(cur.left);
    }
    if (cur.right) {
      stack.push(cur.right);
    }
  }
  return res;
}
