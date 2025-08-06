'use client'


import { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { MenuItem } from './page'
import { insertIntoTree, deleteFromTree } from './tree-utils'

type AddMenuFormProps = {
  tree: MenuItem[]
  setTree: (t: MenuItem[]) => void
  selectedId: string | null
  setSelectedId: (id: string | null) => void
}

export default function AddMenuForm({
  tree,
  setTree,
  selectedId,
  setSelectedId,
}: AddMenuFormProps) {
  const [input, setInput] = useState("")

  const addMenu = () => {
    if (!input.trim()) return

    const newItem: MenuItem = {
      id: crypto.randomUUID(),
      title: input,
      children: [],
    }

    if (!selectedId) {
      setTree([...tree, newItem])
    } else {
      const updated = insertIntoTree(tree, selectedId, newItem)
      setTree(updated)
    }

    setInput("")
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      addMenu()
    }
  }

  const deleteMenu = () => {
    if (!selectedId) return
    const updated = deleteFromTree(tree, selectedId)
    setTree(updated)
    setSelectedId(null) // 선택 해제
  }

  return (
    <div className="mt-4 flex items-center gap-2">
      <Input
        className="w-1/4"
        placeholder="메뉴 이름 입력"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={handleKeyDown}
      />
      <Button onClick={addMenu}>메뉴 추가</Button>
      <Button variant="destructive" onClick={deleteMenu} disabled={!selectedId}>
        메뉴 삭제
      </Button>
    </div>
  )
}