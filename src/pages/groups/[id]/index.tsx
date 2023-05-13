import { useRouter } from "next/router"

function GroupDetailPage() {
  const router = useRouter()

  console.log({ teste: router.query })

  return <>GroupDetailPage</>
}

export default GroupDetailPage
