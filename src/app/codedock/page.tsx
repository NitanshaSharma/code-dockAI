'use client'

import { useState } from 'react'

export default function CodeDockPage() {
  const [prompt, setPrompt] = useState('')
  const [response, setResponse] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [copied, setCopied] = useState(false)
  const [modelInfo, setModelInfo] = useState<{ model: string; usage?: any } | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!prompt.trim()) {
      setError('Please enter a prompt')
      return
    }
    if (!prompt.toLowerCase().match(/(code|component|api|script|route|html|css|function|class|typescript|react|express)/)) {
      setError('Please enter a code-related prompt.')
      return;
    }
    

    setIsLoading(true)
    setError('')
    setResponse('')
    setModelInfo(null)

    try {
      const res = await fetch('/api/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt }),
      })

      if (!res.ok) {
        throw new Error('Failed to generate response')
      }

      const data = await res.json()
      setResponse(data.response || data.message || 'Response generated successfully!')
      setModelInfo({
        model: data.model || 'gpt-3.5-turbo',
        usage: data.usage
      })
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
    } finally {
      setIsLoading(false)
    }
  }

  // Basic syntax highlighting function
  const highlightCode = (code: string) => {
    return code
      .replace(/(\/\/.*$)/gm, '<span class="text-green-400">$1</span>') // Comments
      .replace(/(#.*$)/gm, '<span class="text-green-400">$1</span>') // Python comments
      .replace(/(\b(?:function|const|let|var|if|else|for|while|return|import|export|from|default|class|extends|super|new|try|catch|finally|throw)\b)/g, '<span class="text-purple-400">$1</span>') // Keywords
      .replace(/(\b(?:true|false|null|undefined)\b)/g, '<span class="text-orange-400">$1</span>') // Literals
      .replace(/(\b\d+\b)/g, '<span class="text-yellow-400">$1</span>') // Numbers
      .replace(/(["'`])((?:\\.|(?!\1)[^\\])*?)\1/g, '<span class="text-blue-400">$1$2$1</span>') // Strings
      .replace(/(\b[A-Z][a-zA-Z0-9]*\b)/g, '<span class="text-cyan-400">$1</span>') // Class names
      .replace(/(\b[a-zA-Z_$][a-zA-Z0-9_$]*\s*\()/g, '<span class="text-yellow-300">$1</span>') // Function calls
  }

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(response)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Failed to copy: ', err)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Navigation Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <a href="/" className="flex items-center space-x-3 hover:opacity-80 transition-opacity">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                </svg>
              </div>
              <span className="text-lg font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                CodeDock AI
              </span>
            </a>
            <nav className="flex space-x-6">
              <a href="/" className="text-gray-600 hover:text-blue-600 transition-colors">Home</a>
              <a href="/codedock" className="text-blue-600 font-medium">Code Generator</a>
            </nav>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            CodeDock AI
          </h1>
        </div>

        {/* Form */}
        <div className="bg-white rounded-2xl shadow-xl border border-gray-200 p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="prompt" className="block text-sm font-medium text-gray-700 mb-2">
                Describe your coding task
              </label>
                             <textarea
                 id="prompt"
                 value={prompt}
                 onChange={(e) => setPrompt(e.target.value)}
                 placeholder="e.g., Create a React component that displays a user profile card with avatar, name, and bio..."
                 className="w-full h-32 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none text-gray-900"
                 disabled={isLoading}
               />
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <p className="text-red-600 text-sm">{error}</p>
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading || !prompt.trim()}
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-6 rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
            >
              {isLoading ? (
                <>
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  <span>Generating...</span>
                </>
              ) : (
                <span>Generate Code</span>
              )}
            </button>
          </form>

          {/* Response */}
          {response && (
            <div className="mt-8">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Generated Code:</h3>
              </div>
              <div className="bg-gray-900 border border-gray-700 rounded-lg overflow-hidden">
                <div className="bg-gray-800 px-4 py-2 border-b border-gray-700">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                    <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    <span className="text-gray-400 text-sm ml-2">CodeDock AI Generated</span>
                  </div>
                </div>
                <div className="p-4 overflow-x-auto">
                  <pre className="text-sm text-gray-100 font-mono leading-relaxed">
                    <code 
                      className="block min-w-max"
                      dangerouslySetInnerHTML={{ __html: highlightCode(response) }}
                    />
                  </pre>
                </div>
              </div>
              {/* Copy to clipboard button below code block */}
              <div className="flex items-center mt-4">
                <button
                  onClick={copyToClipboard}
                  className="flex items-center space-x-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-blue-400"
                >
                  {copied ? (
                    <>
                      <svg className="w-4 h-4 text-green-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span>Copied!</span>
                    </>
                  ) : (
                    <>
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                      </svg>
                      <span>Copy Code</span>
                    </>
                  )}
                </button>
                {copied && (
                  <span className="ml-3 text-green-600 text-sm transition-opacity duration-300">Code copied to clipboard!</span>
                )}
              </div>
              {modelInfo && (
                <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center space-x-4">
                      <span className="text-blue-700 font-medium">
                        Generated with {modelInfo.model}
                      </span>
                      {modelInfo.usage && (
                        <span className="text-blue-600">
                          Tokens: {modelInfo.usage.total_tokens || 'N/A'}
                        </span>
                      )}
                    </div>
                    <span className="text-blue-500 text-xs">
                      {new Date().toLocaleTimeString()}
                    </span>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

      </div>
    </div>
  )
} 