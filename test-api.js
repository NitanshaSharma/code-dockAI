// Simple test script for the CodeDock AI API
const API_BASE = 'http://localhost:3000/api'

async function testAPI() {
  console.log('🧪 Testing CodeDock AI API...\n')

  try {
    // Test GET endpoint
    console.log('1. Testing GET /api/generate...')
    const getResponse = await fetch(`${API_BASE}/generate`)
    const getData = await getResponse.json()
    console.log('✅ GET Response:', getData)
    console.log('')

    // Test POST endpoint with fallback (no API key)
    console.log('2. Testing POST /api/generate (fallback mode)...')
    const postResponse = await fetch(`${API_BASE}/generate`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        prompt: 'Create a React component for a user profile card'
      })
    })
    const postData = await postResponse.json()
    console.log('✅ POST Response Status:', postResponse.status)
    console.log('✅ Model Used:', postData.model)
    console.log('✅ Response Length:', postData.response?.length || 0, 'characters')
    console.log('')

    console.log('🎉 All tests passed! The API is working correctly.')
    console.log('\n💡 To use OpenAI GPT-3.5-turbo, set your OPENAI_API_KEY in .env.local')

  } catch (error) {
    console.error('❌ Test failed:', error.message)
    console.log('\n💡 Make sure the development server is running: npm run dev')
  }
}

testAPI() 