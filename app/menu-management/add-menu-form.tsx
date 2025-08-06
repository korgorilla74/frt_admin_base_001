"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { MenuItem } from "./page"
import { insertIntoTree, deleteFromTree } from "./tree-utils"

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
  const [isAdding, setIsAdding] = useState(false)
  const [isComposing, setIsComposing] = useState(false) // IME 조합 상태
  const [lastAddTime, setLastAddTime] = useState(0) // 마지막 추가 시간

  const addMenu = () => {
    const now = Date.now()

    // 중복 호출 방지 (500ms 내 중복 호출 차단)
    if (isAdding || now - lastAddTime < 500) {
      console.log("⏳ 중복 호출 방지:", { isAdding, timeDiff: now - lastAddTime })
      return
    }

    const trimmedInput = input.trim()
    console.log("🔍 addMenu 호출됨:", { input, trimmedInput, isComposing })

    if (!trimmedInput) {
      console.log("❌ 빈 입력값으로 인해 메뉴 추가 취소")
      return
    }

    setIsAdding(true)
    setLastAddTime(now)

    const newItem: MenuItem = {
      id: crypto.randomUUID(),
      title: trimmedInput, // trim된 값 사용
      children: [],
    }

    console.log("✅ 새 메뉴 아이템 생성:", newItem)

    try {
      if (!selectedId) {
        console.log("📍 루트 레벨에 메뉴 추가")
        setTree([...tree, newItem])
      } else {
        console.log("📍 선택된 메뉴의 하위에 추가:", selectedId)
        const updated = insertIntoTree(tree, selectedId, newItem)
        setTree(updated)
      }

      setInput("") // 입력 필드 초기화
    } finally {
      setIsAdding(false)
    }
  }

  // IME 조합 시작
  const handleCompositionStart = () => {
    setIsComposing(true)
    console.log("🔤 IME 조합 시작")
  }

  // IME 조합 종료
  const handleCompositionEnd = () => {
    setIsComposing(false)
    console.log("🔤 IME 조합 종료")
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault() // 기본 동작 방지

      // IME 조합 중이면 메뉴 추가하지 않음
      if (isComposing) {
        console.log("⏳ IME 조합 중이므로 메뉴 추가 대기")
        return
      }

      // 약간의 지연을 두어 IME 조합이 완전히 끝나도록 함
      setTimeout(() => {
        if (!isComposing) {
          addMenu()
        }
      }, 10)
    }
  }

  const deleteMenu = () => {
    if (!selectedId) return
    const updated = deleteFromTree(tree, selectedId)
    setTree(updated)
    setSelectedId(null) // 선택 해제
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault() // 폼 제출 방지
    addMenu()
  }

  return (
    <form onSubmit={handleSubmit} className="mt-4">
      <div className="flex items-center gap-2">
        <Input
          className="w-1/4"
          placeholder="메뉴 이름 입력"
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          onCompositionStart={handleCompositionStart}
          onCompositionEnd={handleCompositionEnd}
        />
        <Button type="submit" disabled={isAdding || !input.trim()}>
          {isAdding ? "추가 중..." : "메뉴 추가"}
        </Button>
        <Button type="button" variant="destructive" onClick={deleteMenu} disabled={!selectedId}>
          메뉴 삭제
        </Button>
      </div>
    </form>
  )
}
