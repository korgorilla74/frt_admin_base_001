import { DragEndEvent } from "@dnd-kit/core"
import { MenuItem } from "./page"

export interface DragDropResult {
  newTree: MenuItem[]
  success: boolean
  message: string
}

// 트리에서 노드 찾기
function findNodeById(tree: MenuItem[], id: string): MenuItem | null {
  console.log("🔍 findNodeById 호출:", { id, treeSize: tree.length })

  for (const node of tree) {
    console.log(`🔍 검사: ${node.title} (ID: ${node.id})`)
    if (node.id === id) {
      console.log(`✅ 노드 발견: ${node.title}`)
      return node
    }
    if (node.children) {
      const found = findNodeById(node.children, id)
      if (found) return found
    }
  }

  console.log(`❌ 노드를 찾을 수 없음: ${id}`)
  return null
}

export function handleMenuDragDrop(event: DragEndEvent, tree: MenuItem[]): DragDropResult {
  const { active, over } = event

  if (!over) {
    return {
      newTree: tree,
      success: false,
      message: "이동할 위치가 없습니다.",
    }
  }

  const draggedId = active.id as string
  const overId = over.id as string
  const overData = over.data.current

  // 드롭 존 ID에서 실제 노드 ID 추출
  let actualTargetId = overId
  if (overId.includes("-top")) {
    actualTargetId = overId.replace("-top", "")
  } else if (overId.includes("-center")) {
    actualTargetId = overId.replace("-center", "")
  } else if (overId.includes("-bottom")) {
    actualTargetId = overId.replace("-bottom", "")
  }

  // 자기 자신에게 드롭하는 경우 처리
  if (active.id === actualTargetId) {
    console.log("🔄 자기 자신에게 드롭 - 위치 변경 없음:", {
      draggedId: active.id,
      targetId: actualTargetId,
      overId,
    })
    return {
      newTree: tree,
      success: false,
      message: "동일한 위치로는 이동할 수 없습니다.",
    }
  }

  // 드래그된 노드 찾기
  const draggedNode = findNodeById(tree, draggedId)
  if (!draggedNode) {
    return {
      newTree: tree,
      success: false,
      message: "드래그된 노드를 찾을 수 없습니다.",
    }
  }

  // 최상위 메뉴는 이동 불가
  if (draggedNode.isTopLevel) {
    return {
      newTree: tree,
      success: false,
      message: "최상위 메뉴는 이동할 수 없습니다.",
    }
  }

  // 드롭 존 타입에 따른 처리
  let targetNodeId = overId
  let dropType = "same-level" // 기본값

  // 드롭 존 ID에서 실제 노드 ID와 위치 정보 추출
  if (overId.includes("-top")) {
    targetNodeId = overId.replace("-top", "")
    dropType = "insert-above"
    console.log("🔼 상단 드롭 존 감지:", { overId, targetNodeId })
  } else if (overId.includes("-center")) {
    targetNodeId = overId.replace("-center", "")
    dropType = "insert-child"
    console.log("🟢 중앙 드롭 존 감지:", { overId, targetNodeId })
  } else if (overId.includes("-bottom")) {
    targetNodeId = overId.replace("-bottom", "")
    dropType = "insert-below"
    console.log("🔽 하단 드롭 존 감지:", { overId, targetNodeId })
  } else if (overData?.type) {
    dropType = overData.type
    console.log("📍 기타 드롭 존:", { overId, dropType })
  }

  // 타겟 노드 찾기
  const targetNode = findNodeById(tree, targetNodeId)
  if (!targetNode) {
    return {
      newTree: tree,
      success: false,
      message: "타겟 노드를 찾을 수 없습니다.",
    }
  }

  // 자기 자신의 하위로 이동하는 것 방지
  if (isDescendant(draggedNode, targetNodeId)) {
    return {
      newTree: tree,
      success: false,
      message: "자기 자신의 하위로는 이동할 수 없습니다.",
    }
  }

  console.log("🎯 드롭 타입:", dropType, "타겟:", targetNode.title, "타겟ID:", targetNodeId)
  console.log(
    "🌳 현재 트리 구조:",
    tree.map(n => ({ id: n.id, title: n.title, children: n.children?.length || 0 }))
  )

  let newTree: MenuItem[]
  let message: string

  switch (dropType) {
    case "insert-above":
      newTree = insertNodeAbove(tree, draggedId, targetNodeId)
      message = `"${draggedNode.title}"을(를) "${targetNode.title}" 위로 이동했습니다.`
      break

    case "insert-child":
      newTree = moveNodeToParent(tree, draggedId, targetNodeId)
      message = `"${draggedNode.title}"을(를) "${targetNode.title}" 하위로 이동했습니다.`
      break

    case "insert-below":
      newTree = insertNodeBelow(tree, draggedId, targetNodeId)
      message = `"${draggedNode.title}"을(를) "${targetNode.title}" 아래로 이동했습니다.`
      break

    default:
      newTree = moveNodeSameLevel(tree, draggedId, targetNodeId)
      message = `"${draggedNode.title}"의 위치를 변경했습니다.`
  }

  return {
    newTree,
    success: true,
    message,
  }
}

// 노드가 다른 노드의 하위인지 확인
function isDescendant(parentNode: MenuItem, childId: string): boolean {
  if (!parentNode.children) return false

  for (const child of parentNode.children) {
    if (child.id === childId) return true
    if (isDescendant(child, childId)) return true
  }

  return false
}

// 노드를 다른 노드의 하위로 이동
function moveNodeToParent(tree: MenuItem[], draggedId: string, parentId: string): MenuItem[] {
  // 1. 드래그된 노드 제거
  const { tree: treeWithoutDragged, removedNode } = removeNodeFromTree(tree, draggedId)

  if (!removedNode) return tree

  // 2. 부모 노드의 children에 추가
  return treeWithoutDragged.map(node => {
    if (node.id === parentId) {
      return {
        ...node,
        children: [...(node.children || []), removedNode],
      }
    }

    if (node.children) {
      return {
        ...node,
        children: moveNodeToParentRecursive(node.children, parentId, removedNode),
      }
    }

    return node
  })
}

function moveNodeToParentRecursive(
  nodes: MenuItem[],
  parentId: string,
  nodeToAdd: MenuItem
): MenuItem[] {
  return nodes.map(node => {
    if (node.id === parentId) {
      return {
        ...node,
        children: [...(node.children || []), nodeToAdd],
      }
    }

    if (node.children) {
      return {
        ...node,
        children: moveNodeToParentRecursive(node.children, parentId, nodeToAdd),
      }
    }

    return node
  })
}

// 같은 레벨에서 순서 변경
function moveNodeSameLevel(tree: MenuItem[], draggedId: string, targetId: string): MenuItem[] {
  // 간단한 구현: 드래그된 노드를 타겟 노드 뒤로 이동
  const { tree: treeWithoutDragged, removedNode } = removeNodeFromTree(tree, draggedId)

  if (!removedNode) return tree

  // 타겟 노드를 찾아서 그 뒤에 삽입
  return insertAfterTarget(treeWithoutDragged, targetId, removedNode)
}

function insertAfterTarget(tree: MenuItem[], targetId: string, nodeToInsert: MenuItem): MenuItem[] {
  // 루트 레벨에서 찾기
  const targetIndex = tree.findIndex(node => node.id === targetId)
  if (targetIndex !== -1) {
    const newTree = [...tree]
    newTree.splice(targetIndex + 1, 0, nodeToInsert)
    return newTree
  }

  // 하위 레벨에서 재귀적으로 찾기
  return tree.map(node => {
    if (node.children) {
      const updatedChildren = insertAfterTarget(node.children, targetId, nodeToInsert)
      if (updatedChildren !== node.children) {
        return {
          ...node,
          children: updatedChildren,
        }
      }
    }
    return node
  })
}

// 노드를 타겟 위쪽에 삽입
function insertNodeAbove(tree: MenuItem[], draggedId: string, targetId: string): MenuItem[] {
  console.log("🔼 insertNodeAbove 호출:", { draggedId, targetId })

  // 드래그된 노드가 실제로 존재하는지 먼저 확인
  const draggedNode = findNodeById(tree, draggedId)
  if (!draggedNode) {
    console.error("❌ 드래그된 노드를 찾을 수 없음:", draggedId)
    return tree
  }

  const { tree: treeWithoutDragged, removedNode } = removeNodeFromTree(tree, draggedId)
  console.log("📤 노드 제거 결과:", {
    removedNode: removedNode?.title,
    treeSize: treeWithoutDragged.length,
  })

  if (!removedNode) {
    console.error("❌ 제거할 노드를 찾을 수 없음 - 원본 트리 반환")
    return tree
  }

  const result = insertNodeAtPosition(treeWithoutDragged, targetId, "above", removedNode)
  console.log("📥 노드 삽입 결과:", { resultSize: result.length })

  // 결과 검증
  const insertedNode = findNodeById(result, draggedId)
  if (!insertedNode) {
    console.error("❌ 삽입 후 노드를 찾을 수 없음 - 원본 트리 반환")
    return tree
  }

  return result
}

// 노드를 타겟 아래쪽에 삽입
function insertNodeBelow(tree: MenuItem[], draggedId: string, targetId: string): MenuItem[] {
  console.log("🔽 insertNodeBelow 호출:", { draggedId, targetId })

  // 드래그된 노드가 실제로 존재하는지 먼저 확인
  const draggedNode = findNodeById(tree, draggedId)
  if (!draggedNode) {
    console.error("❌ 드래그된 노드를 찾을 수 없음:", draggedId)
    return tree
  }

  const { tree: treeWithoutDragged, removedNode } = removeNodeFromTree(tree, draggedId)
  console.log("📤 노드 제거 결과:", {
    removedNode: removedNode?.title,
    treeSize: treeWithoutDragged.length,
  })

  if (!removedNode) {
    console.error("❌ 제거할 노드를 찾을 수 없음 - 원본 트리 반환")
    return tree
  }

  const result = insertNodeAtPosition(treeWithoutDragged, targetId, "below", removedNode)
  console.log("📥 노드 삽입 결과:", { resultSize: result.length })

  // 결과 검증
  const insertedNode = findNodeById(result, draggedId)
  if (!insertedNode) {
    console.error("❌ 삽입 후 노드를 찾을 수 없음 - 원본 트리 반환")
    return tree
  }

  return result
}

// 특정 위치에 노드 삽입
function insertNodeAtPosition(
  tree: MenuItem[],
  targetId: string,
  position: "above" | "below",
  nodeToInsert: MenuItem
): MenuItem[] {
  console.log("📍 insertNodeAtPosition 호출:", {
    targetId,
    position,
    nodeTitle: nodeToInsert.title,
  })
  console.log(
    "🔍 현재 트리:",
    tree.map(n => ({ id: n.id, title: n.title }))
  )

  // 재귀적으로 트리를 순회하면서 타겟 노드를 찾아 삽입
  function insertRecursive(
    nodes: MenuItem[],
    currentPath: string = "root"
  ): { nodes: MenuItem[]; inserted: boolean } {
    const newNodes: MenuItem[] = []
    let inserted = false

    for (let i = 0; i < nodes.length; i++) {
      const node = nodes[i]
      const nodePath = `${currentPath}/${node.title}`

      console.log(`🔍 검사 중: ${nodePath} (ID: ${node.id})`)

      // 타겟 노드를 찾았을 때
      if (node.id === targetId) {
        console.log(`✅ 타겟 발견: ${nodePath}`)

        if (position === "above") {
          // 타겟 위에 삽입
          console.log(`⬆️ ${nodeToInsert.title}을(를) ${node.title} 위에 삽입`)
          newNodes.push(nodeToInsert)
          newNodes.push(node)
        } else {
          // 타겟 아래에 삽입
          console.log(`⬇️ ${nodeToInsert.title}을(를) ${node.title} 아래에 삽입`)
          newNodes.push(node)
          newNodes.push(nodeToInsert)
        }
        inserted = true
      } else {
        // 타겟이 아닌 경우, 하위에서 찾기
        if (node.children && node.children.length > 0) {
          const result = insertRecursive(node.children, nodePath)
          if (result.inserted) {
            newNodes.push({
              ...node,
              children: result.nodes,
            })
            inserted = true
          } else {
            newNodes.push(node)
          }
        } else {
          newNodes.push(node)
        }
      }
    }

    return { nodes: newNodes, inserted }
  }

  const result = insertRecursive(tree)

  if (!result.inserted) {
    console.warn("⚠️ 타겟 노드를 찾을 수 없음:", targetId)
    console.log("🛡️ 안전장치 작동: 노드를 트리 끝에 추가")
    return [...tree, nodeToInsert]
  }

  console.log("✅ insertNodeAtPosition 완료")
  return result.nodes
}

function removeNodeFromTree(
  tree: MenuItem[],
  id: string
): { tree: MenuItem[]; removedNode: MenuItem | null } {
  console.log("🗑️ removeNodeFromTree 호출:", { id, treeSize: tree.length })

  let removedNode: MenuItem | null = null

  const newTree = tree
    .filter(node => {
      if (node.id === id) {
        removedNode = node
        console.log("✅ 루트 레벨에서 노드 제거:", node.title)
        return false
      }
      return true
    })
    .map(node => {
      if (node.children) {
        const result = removeNodeFromTree(node.children, id)
        if (result.removedNode && !removedNode) {
          removedNode = result.removedNode
          console.log("✅ 하위 레벨에서 노드 제거:", result.removedNode.title)
        }
        return {
          ...node,
          children: result.tree,
        }
      }
      return node
    })

  console.log("🗑️ removeNodeFromTree 완료:", {
    found: !!removedNode,
    newTreeSize: newTree.length,
  })

  return { tree: newTree, removedNode }
}
