'use client'

import { useState } from 'react'
import { Checkbox } from '@/components/ui/checkbox'
import { MenuItem } from './page'

export default function TreeNode({
  node,
  onSelect,
  selectedId,
}: {
  node: MenuItem
  onSelect: (id: string) => void
  selectedId: string | null
}) {
  const [expanded, setExpanded] = useState(true)

  const isChecked = node.id === selectedId

  return (
    <div className="ml-4 mt-2">
      <div className="flex items-center gap-2">
        <Checkbox
          checked={isChecked}
          onCheckedChange={() => onSelect(node.id)}
        />
        <button
          className="hover:underline"
          onClick={() => setExpanded(!expanded)}
        >
          {node.title}
        </button>
      </div>
      {expanded && node.children?.map((child) => (
        <TreeNode
          key={child.id}
          node={child}
          onSelect={onSelect}
          selectedId={selectedId}
        />
      ))}
    </div>
  )
}