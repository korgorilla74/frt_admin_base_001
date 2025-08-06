import { MenuItem } from "./page"

export function insertIntoTree(tree: MenuItem[], targetId: string, newItem: MenuItem): MenuItem[] {
  return tree.map(node => {
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
    .filter(node => node.id !== targetId)
    .map(node => ({
      ...node,
      children: node.children ? deleteFromTree(node.children, targetId) : [],
    }))
}

// 🎯 드래그 앤 드롭을 위한 유틸리티 함수들

// 트리에서 특정 노드 찾기
export function findNodeById(tree: MenuItem[], id: string): MenuItem | null {
  for (const node of tree) {
    if (node.id === id) return node
    if (node.children) {
      const found = findNodeById(node.children, id)
      if (found) return found
    }
  }
  return null
}

// 트리에서 노드 제거 (삭제와 다르게 노드 객체 반환)
export function removeNodeFromTree(
  tree: MenuItem[],
  id: string
): { tree: MenuItem[]; removedNode: MenuItem | null } {
  let removedNode: MenuItem | null = null

  const newTree = tree
    .filter(node => {
      if (node.id === id) {
        removedNode = node
        return false
      }
      return true
    })
    .map(node => {
      if (node.children) {
        const result = removeNodeFromTree(node.children, id)
        if (result.removedNode && !removedNode) {
          removedNode = result.removedNode
        }
        return {
          ...node,
          children: result.tree,
        }
      }
      return node
    })

  return { tree: newTree, removedNode }
}

// 특정 위치에 노드 삽입
export function insertNodeAtPosition(
  tree: MenuItem[],
  parentId: string | null,
  position: number,
  node: MenuItem
): MenuItem[] {
  if (parentId === null) {
    // 루트 레벨에 삽입
    const newTree = [...tree]
    newTree.splice(position, 0, node)
    return newTree
  }

  return tree.map(item => {
    if (item.id === parentId) {
      const children = [...(item.children || [])]
      children.splice(position, 0, node)
      return {
        ...item,
        children,
      }
    }

    if (item.children) {
      return {
        ...item,
        children: insertNodeAtPosition(item.children, parentId, position, node),
      }
    }

    return item
  })
}

// 드래그 앤 드롭 처리
export function moveNode(
  tree: MenuItem[],
  draggedId: string,
  targetId: string | null,
  position: number
): MenuItem[] {
  // 1. 드래그된 노드 제거
  const { tree: treeWithoutDragged, removedNode } = removeNodeFromTree(tree, draggedId)

  if (!removedNode) return tree

  // 2. 새 위치에 삽입
  return insertNodeAtPosition(treeWithoutDragged, targetId, position, removedNode)
}

// 트리를 평면 배열로 변환 (드래그 앤 드롭을 위해)
export function flattenTree(
  tree: MenuItem[],
  parentId: string | null = null
): Array<{
  id: string
  title: string
  parentId: string | null
  depth: number
}> {
  const result: Array<{
    id: string
    title: string
    parentId: string | null
    depth: number
  }> = []

  function traverse(nodes: MenuItem[], parent: string | null, depth: number) {
    nodes.forEach(node => {
      result.push({
        id: node.id,
        title: node.title,
        parentId: parent,
        depth,
      })

      if (node.children) {
        traverse(node.children, node.id, depth + 1)
      }
    })
  }

  traverse(tree, parentId, 0)
  return result
}
