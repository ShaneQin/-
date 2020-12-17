// 翻转二叉树
function reverse(root) {
  if (root == null) return root;
  let left = reverse(root.left);
  let right = reverse(root.right);
  root.left = right;
  root.right = left;
  return root;
}
