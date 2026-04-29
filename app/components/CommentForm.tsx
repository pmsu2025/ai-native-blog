'use client'

import { useState } from 'react'

export type CommentData = {
  author: string
  content: string
  createdAt: Date
}

type CommentFormProps = {
  onSubmit: (comment: CommentData) => void
  isLoading?: boolean
  placeholder?: string
}

export function CommentForm({
  onSubmit,
  isLoading = false,
  placeholder = '댓글을 입력하세요...',
}: CommentFormProps) {
  const [author, setAuthor] = useState('')
  const [content, setContent] = useState('')
  const [touched, setTouched] = useState({ author: false, content: false })

  const authorError = touched.author && !author.trim() ? '작성자 이름을 입력해주세요.' : ''
  const contentError = touched.content && !content.trim() ? '댓글 내용을 입력해주세요.' : ''
  const isDisabled = !author.trim() || !content.trim() || isLoading

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setTouched({ author: true, content: true })
    if (!author.trim() || !content.trim()) return
    onSubmit({ author: author.trim(), content: content.trim(), createdAt: new Date() })
    setAuthor('')
    setContent('')
    setTouched({ author: false, content: false })
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow p-6 space-y-4">
      <h2 className="text-lg font-semibold text-neutral-900">댓글 작성</h2>

      <div>
        <label htmlFor="author" className="block text-sm font-medium text-neutral-700 mb-1">
          작성자
        </label>
        <input
          id="author"
          type="text"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          onBlur={() => setTouched((prev) => ({ ...prev, author: true }))}
          placeholder="이름을 입력하세요"
          className={`w-full border rounded-md px-3 py-2 text-sm outline-none transition focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
            authorError ? 'border-red-400' : 'border-neutral-300'
          }`}
        />
        {authorError && (
          <p className="mt-1 text-xs text-red-500">{authorError}</p>
        )}
      </div>

      <div>
        <label htmlFor="content" className="block text-sm font-medium text-neutral-700 mb-1">
          댓글
        </label>
        <textarea
          id="content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          onBlur={() => setTouched((prev) => ({ ...prev, content: true }))}
          placeholder={placeholder}
          rows={4}
          className={`w-full border rounded-md px-3 py-2 text-sm outline-none transition focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none ${
            contentError ? 'border-red-400' : 'border-neutral-300'
          }`}
        />
        {contentError && (
          <p className="mt-1 text-xs text-red-500">{contentError}</p>
        )}
      </div>

      <button
        type="submit"
        disabled={isDisabled}
        className="w-full bg-blue-600 text-white text-sm font-medium py-2 px-4 rounded-md hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isLoading ? '제출 중...' : '댓글 등록'}
      </button>
    </form>
  )
}
