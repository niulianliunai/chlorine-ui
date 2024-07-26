export function recursionTreeHidden(tree) {
  if (tree === undefined) {
    return
  }
  console.log(tree)
  tree = tree.filter(item => {
    return !item.hidden
  })
  console.log(tree)
  recursionTreeHidden(tree.children)
  return tree
}
