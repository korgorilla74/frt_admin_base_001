
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"

export default function NotFound() {
  const router = useRouter()

  const handleBack = () => {
    router.back()
  }

  return (
    <div className="text-center py-20 text-gray-500 flex flex-col items-center gap-6">
      <div>
        <h2 className="text-xl font-semibold">페이지를 찾을 수 없습니다</h2>
        <p className="mt-2">주소가 잘못되었거나 존재하지 않는 메뉴입니다.</p>
      </div>

      {/* ✅ 하단 버튼 추가 */}
      <Button onClick={handleBack} className="mt-4">
        이전 화면으로 돌아가기
      </Button>
    </div>
  )
}