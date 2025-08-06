import { MenuItem } from './page'

export function insertIntoTree(
  tree: MenuItem[],
  targetId: string,
  newItem: MenuItem
): MenuItem[] {
  return tree.map((node) => {
    if (node.id === targetId) {
      return {
        ...node,
        children: [...(node.children ?? []), newItem],
      }
    }

    if (node.children) {
      return {
        ...node,
        children: insertIntoTree(node.children, targetId, newItem),
      }
    }

    return node
  })
}

// ✅ 선택된 메뉴 및 하위 삭제
export function deleteFromTree(tree: MenuItem[], targetId: string): MenuItem[] {
  return tree
    .filter((node) => node.id !== targetId)
    .map((node) => ({
      ...node,
      children: node.children ? deleteFromTree(node.children, targetId) : [],
    }))
}