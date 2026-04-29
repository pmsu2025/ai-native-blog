'use client'

import { CommentForm, CommentData } from 'app/components/CommentForm'
import { useState } from 'react'

export function CommentSection() {
  const [isLoading, setIsLoading] = useState(false)

  async function handleSubmit(comment: CommentData) {
    setIsLoading(true)
    try {
      // TODO(ANB-4): POST /api/v1/posts/{postId}/comments 연동
      console.log('새 댓글:', comment)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="mt-12">
      <CommentForm
        onSubmit={handleSubmit}
        isLoading={isLoading}
        placeholder="이 게시물에 대한 생각을 남겨주세요."
      />
    </div>
  )
}
