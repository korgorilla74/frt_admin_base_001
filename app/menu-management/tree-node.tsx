"use client"

import { useState } from "react"
import { useDraggable, useDroppable } from "@dnd-kit/core"
import { CSS } from "@dnd-kit/utilities"
import { Checkbox } from "@/components/ui/checkbox"
import { MenuItem } from "./page"
import { GripVertical, ChevronDown, ChevronRight, Lock } from "lucide-react"

export default function TreeNode({
  node,
  onSelect,
  selectedId,
  depth = 0,
}: {
  node: MenuItem
  onSelect: (id: string) => void
  selectedId: string | null
  depth?: number
}) {
  const [expanded, setExpanded] = useState(true)
  const isChecked = node.id === selectedId
  const hasChildren = node.children && node.children.length > 0
  const isDraggable = !node.isTopLevel // 최상위 메뉴는 드래그 불가

  // 드래그 가능한 요소 설정
  const {
    attributes: dragAttributes,
    listeners: dragListeners,
    setNodeRef: setDragNodeRef,
    transform,
    isDragging,
  } = useDraggable({
    id: node.id,
    disabled: !isDraggable, // 최상위 메뉴는 드래그 비활성화
    data: {
      type: "menu-item",
      node,
      depth,
    },
  })

  // 드롭 가능한 영역 설정 - 3개 영역으로 분할
  const { setNodeRef: setDropNodeRef, isOver } = useDroppable({
    id: node.id,
    data: {
      type: "menu-item",
      node,
      depth,
    },
  })

  // 상단 드롭 존 (같은 레벨 위쪽 삽입)
  const { setNodeRef: setTopDropRef, isOver: isOverTop } = useDroppable({
    id: `${node.id}-top`,
    disabled: isDragging, // 자기 자신이 드래그 중일 때 비활성화
    data: {
      type: "insert-above",
      node,
      depth,
      position: "above",
    },
  })

  // 중앙 드롭 존 (하위 메뉴로 이동)
  const { setNodeRef: setCenterDropRef, isOver: isOverCenter } = useDroppable({
    id: `${node.id}-center`,
    disabled: isDragging, // 자기 자신이 드래그 중일 때 비활성화
    data: {
      type: "insert-child",
      node,
      depth,
      position: "child",
    },
  })

  // 하단 드롭 존 (같은 레벨 아래쪽 삽입)
  const { setNodeRef: setBottomDropRef, isOver: isOverBottom } = useDroppable({
    id: `${node.id}-bottom`,
    disabled: isDragging, // 자기 자신이 드래그 중일 때 비활성화
    data: {
      type: "insert-below",
      node,
      depth,
      position: "below",
    },
  })

  // 드래그 ref만 설정 (드롭은 별도 영역에서 처리)
  const setNodeRef = setDragNodeRef

  const style = {
    transform: CSS.Transform.toString(transform),
    opacity: isDragging ? 0.5 : 1,
  }

  return (
    <div className="select-none relative" style={{ marginLeft: `${depth * 20}px` }}>
      {/* 상단 드롭 존 - 위쪽에 삽입 */}
      <div
        ref={setTopDropRef}
        className={`
          absolute top-0 left-0 right-0 h-2 z-10
          ${isDragging ? "pointer-events-none opacity-0" : ""}
          ${isOverTop && !isDragging ? "bg-blue-400 opacity-75" : ""}
        `}
        style={{ height: "8px", marginTop: "-4px" }}
        title={isDragging ? "" : `${node.title} 위에 삽입`}
      />

      {/* 메인 메뉴 영역 */}
      <div ref={setNodeRef} style={style} className="relative">
        {/* 중앙 드롭 존 - 하위 메뉴로 이동 */}
        <div
          ref={setCenterDropRef}
          className={`
            flex items-center gap-2 p-2 rounded-md hover:bg-gray-50 transition-colors
            ${isDragging ? "bg-blue-50 shadow-lg border-2 border-blue-300 pointer-events-none" : ""}
            ${isOverCenter && !isDragging ? "bg-green-50 border-2 border-green-300" : ""}
            ${isChecked ? "bg-blue-100" : ""}
            ${node.isTopLevel ? "bg-gray-50 font-semibold" : ""}
          `}
          title={isDragging ? "" : `${node.title}의 하위로 이동`}
        >
          {/* 드래그 핸들 또는 잠금 아이콘 */}
          <div className="w-6 h-6 flex items-center justify-center">
            {isDraggable ? (
              <div
                {...dragAttributes}
                {...dragListeners}
                className="cursor-grab active:cursor-grabbing p-1 hover:bg-gray-200 rounded"
              >
                <GripVertical className="h-4 w-4 text-gray-400" />
              </div>
            ) : (
              <div className="p-1" title="최상위 메뉴는 이동할 수 없습니다">
                <Lock className="h-4 w-4 text-gray-400" />
              </div>
            )}
          </div>

          {/* 확장/축소 버튼 */}
          <button
            onClick={() => setExpanded(!expanded)}
            className="p-1 hover:bg-gray-200 rounded"
            disabled={!hasChildren}
          >
            {hasChildren ? (
              expanded ? (
                <ChevronDown className="h-4 w-4" />
              ) : (
                <ChevronRight className="h-4 w-4" />
              )
            ) : (
              <div className="h-4 w-4" />
            )}
          </button>

          {/* 체크박스 */}
          <Checkbox checked={isChecked} onCheckedChange={() => onSelect(node.id)} />

          {/* 메뉴 제목 */}
          <span
            className={`flex-1 text-sm ${node.isTopLevel ? "font-bold text-gray-800" : "font-medium"}`}
          >
            {node.title}
          </span>

          {/* 경로 표시 */}
          {node.path && (
            <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">{node.path}</span>
          )}

          {/* 자식 개수 표시 */}
          {hasChildren && (
            <span className="text-xs text-gray-500 bg-blue-100 px-2 py-1 rounded">
              {node.children!.length}
            </span>
          )}

          {/* 최상위 메뉴 표시 */}
          {node.isTopLevel && (
            <span className="text-xs text-blue-600 bg-blue-50 px-2 py-1 rounded font-medium">
              최상위
            </span>
          )}
        </div>
      </div>

      {/* 하단 드롭 존 - 아래쪽에 삽입 */}
      <div
        ref={setBottomDropRef}
        className={`
          absolute bottom-0 left-0 right-0 h-2 z-10
          ${isDragging ? "pointer-events-none opacity-0" : ""}
          ${isOverBottom && !isDragging ? "bg-blue-400 opacity-75" : ""}
        `}
        style={{ height: "8px", marginBottom: "-4px" }}
        title={isDragging ? "" : `${node.title} 아래에 삽입`}
      />

      {/* 자식 노드들 */}
      {expanded && hasChildren && (
        <div className="ml-4">
          {node.children!.map(child => (
            <TreeNode
              key={child.id}
              node={child}
              onSelect={onSelect}
              selectedId={selectedId}
              depth={depth + 1}
            />
          ))}
        </div>
      )}
    </div>
  )
}
