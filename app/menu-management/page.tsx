"use client"

import { useState, useEffect } from "react"
import {
  DndContext,
  DragEndEvent,
  DragOverEvent,
  DragOverlay,
  DragStartEvent,
  PointerSensor,
  useSensor,
  useSensors,
  closestCorners,
} from "@dnd-kit/core"

import { toast } from "sonner"
import { GripVertical } from "lucide-react"
import TreeNode from "./tree-node"
import AddMenuForm from "./add-menu-form"
import { flattenTree } from "./tree-utils"
import { handleMenuDragDrop } from "./drag-drop-handler"
import { fetchMenuData } from "@/lib/fetch-menu"
import type { MenuItemData } from "@/lib/menu-data"

export type MenuItem = {
  id: string
  title: string
  path?: string
  icon?: string
  sectionName?: string
  children?: MenuItem[]
  isSubItem?: boolean
  isNested?: boolean
  isTopLevel?: boolean // 최상위 메뉴 여부
}

// 실제 메뉴 데이터를 MenuItem 타입으로 변환
function convertMenuData(menuData: MenuItemData[], parentId: string = ""): MenuItem[] {
  return menuData.map((item, index) => {
    const id = parentId ? `${parentId}-${index}` : `${index}`
    return {
      id,
      title: item.title,
      path: item.path,
      icon: item.icon?.displayName || item.icon?.name,
      sectionName: item.sectionName,
      isSubItem: item.isSubItem,
      isNested: item.isNested,
      isTopLevel: !parentId, // 최상위 메뉴 여부
      children: item.children ? convertMenuData(item.children, id) : undefined,
    }
  })
}

export default function MenuManagerPage() {
  const [tree, setTree] = useState<MenuItem[]>([])
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const [activeId, setActiveId] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)

  // 드래그 센서 설정
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 10, // 10px 이동해야 드래그 시작 (더 안정적)
      },
    })
  )

  // 실제 메뉴 데이터 로드
  useEffect(() => {
    const loadMenuData = async () => {
      try {
        const menuData = await fetchMenuData()
        const convertedData = convertMenuData(menuData)
        setTree(convertedData)
      } catch (error) {
        console.error("메뉴 데이터 로드 실패:", error)
        toast.error("메뉴 데이터를 불러오는데 실패했습니다.")
        // 폴백 데이터 사용
        setTree([
          {
            id: "0",
            title: "기본",
            isTopLevel: true,
            children: [
              { id: "0-0", title: "내 정보", path: "/" },
              { id: "0-1", title: "대시보드", path: "/dashboard" },
            ],
          },
          {
            id: "1",
            title: "사용자 관리",
            isTopLevel: true,
            children: [
              {
                id: "1-0",
                title: "사용자 조회",
                isNested: true,
                children: [
                  {
                    id: "1-0-0",
                    title: "전체 사용자 조회",
                    path: "/user-management/user-inquiry/all-users",
                    isSubItem: true,
                  },
                  {
                    id: "1-0-1",
                    title: "비활성 사용자 조회",
                    path: "/user-management/user-inquiry/inactive-users",
                    isSubItem: true,
                  },
                ],
              },
              { id: "1-1", title: "사용자 등록", path: "/user-management/user-registration" },
            ],
          },
        ])
      } finally {
        setLoading(false)
      }
    }

    loadMenuData()
  }, [])

  // ✅ 선택 상태 단일화 및 토글 처리
  const handleSelect = (id: string) => {
    setSelectedId(prev => (prev === id ? null : id))
  }

  // 드래그 시작
  const handleDragStart = (event: DragStartEvent) => {
    setActiveId(event.active.id as string)
  }

  // 드래그 중
  const handleDragOver = (event: DragOverEvent) => {
    // 필요시 드래그 중 미리보기 로직 추가
  }

  // 드래그 종료
  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event
    setActiveId(null)

    if (!over || active.id === over.id) {
      return
    }

    // 최상위 메뉴는 이동 불가
    const draggedNode = findNodeInTree(tree, active.id as string)
    if (draggedNode?.isTopLevel) {
      toast.error("최상위 메뉴는 이동할 수 없습니다.")
      return
    }

    // 고급 드래그 앤 드롭 로직 적용
    const result = handleMenuDragDrop(event, tree)

    if (result.success) {
      setTree(result.newTree)
      toast.success(result.message)
    } else {
      toast.error(result.message)
    }
  }

  // 트리에서 노드 찾기
  const findNodeInTree = (nodes: MenuItem[], id: string): MenuItem | null => {
    for (const node of nodes) {
      if (node.id === id) return node
      if (node.children) {
        const found = findNodeInTree(node.children, id)
        if (found) return found
      }
    }
    return null
  }

  // 평면화된 트리 (SortableContext용)
  const flatItems = flattenTree(tree)

  if (loading) {
    return (
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-6">메뉴 관리</h1>
        <div className="flex justify-center items-center h-64">
          <div className="text-gray-500">메뉴 데이터를 불러오는 중...</div>
        </div>
      </div>
    )
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">메뉴 관리</h1>

      <div className="mb-6 p-4 bg-blue-50 rounded-lg">
        <h2 className="font-semibold text-blue-800 mb-2">🎯 드래그 앤 드롭 기능</h2>
        <p className="text-sm text-blue-600">
          • 하위 메뉴만 드래그해서 순서를 변경할 수 있습니다
          <br />
          • 최상위 메뉴(기본, 사용자 관리 등)는 이동할 수 없습니다
          <br />• <strong>드롭 위치에 따른 동작:</strong>
          <br />
          &nbsp;&nbsp;- 메뉴 상단 1/3: 위쪽에 삽입 (같은 레벨)
          <br />
          &nbsp;&nbsp;- 메뉴 중앙 1/3: 하위 메뉴로 이동
          <br />
          &nbsp;&nbsp;- 메뉴 하단 1/3: 아래쪽에 삽입 (같은 레벨)
          <br />• 체크박스로 메뉴를 선택하고 새 하위 메뉴를 추가할 수 있습니다
        </p>
      </div>

      <DndContext
        sensors={sensors}
        collisionDetection={closestCorners}
        onDragStart={handleDragStart}
        onDragOver={handleDragOver}
        onDragEnd={handleDragEnd}
      >
        <div className="space-y-1 mb-6 border rounded-lg p-4 bg-white">
          {tree.map(item => (
            <TreeNode
              key={item.id}
              node={item}
              selectedId={selectedId}
              onSelect={handleSelect}
              depth={0}
            />
          ))}
        </div>

        <DragOverlay>
          {activeId ? (
            <div className="bg-white shadow-lg rounded-md p-3 border-2 border-blue-300 flex items-center gap-2">
              <GripVertical className="h-4 w-4 text-gray-400" />
              <span className="font-medium">
                {flatItems.find(item => item.id === activeId)?.title}
              </span>
            </div>
          ) : null}
        </DragOverlay>
      </DndContext>

      <AddMenuForm
        tree={tree}
        setTree={setTree}
        selectedId={selectedId}
        setSelectedId={setSelectedId}
      />
    </div>
  )
}
