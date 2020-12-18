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
