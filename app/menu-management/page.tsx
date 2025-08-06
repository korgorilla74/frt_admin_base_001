'use client'

import { useState } from 'react'
import TreeNode from './tree-node'
import AddMenuForm from './add-menu-form'

export type MenuItem = {
  id: string
  title: string
  children?: MenuItem[]
}

export default function MenuManagerPage() {
  const [tree, setTree] = useState<MenuItem[]>([])
  const [selectedId, setSelectedId] = useState<string | null>(null)

  // ✅ 선택 상태 단일화 및 토글 처리
  const handleSelect = (id: string) => {
    setSelectedId((prev) => (prev === id ? null : id))
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">메뉴 관리</h1>
      {tree.map((item) => (
        <TreeNode
          key={item.id}
          node={item}
          selectedId={selectedId}
          onSelect={handleSelect}
        />
      ))}
      <AddMenuForm
        tree={tree}
        setTree={setTree}
        selectedId={selectedId}
        setSelectedId={setSelectedId}
      />

    </div>
  )
}
