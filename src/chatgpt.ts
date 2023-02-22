import { ChatGPTAPI } from 'chatgpt'

async function example() {
  const api = new ChatGPTAPI({
    apiKey: process.env.OPENAI_API_KEY
  })

  const res = await api.sendMessage('Hello World!')
  console.log(res.text)
}

const api = new ChatGPTAPI({
  apiKey: process.env.OPENAI_API_KEY,
  completion: {
    temperature: 0.5,
    topP: 0.8
  }
})

// send a message and wait for the response
let res = await api.sendMessage('What is OpenAI?')
console.log(res.text)

// send a follow-up
res = await api.sendMessage('Can you expand on that?', {
  conversationId: res.conversationId,
  messageId: res.messageId
})
console.log(res.text)

// send another follow-up
res = await api.sendMessage('What were we talking about?', {
  conversationId: res.conversationId,
  messageId: res.messageId
})
console.log(res.text)

const res2 = await api.sendMessage('Write a 500 word essay on frogs.', {
  // print the partial response as the AI is "typing"
  onProgress: (partialResponse) => console.log(partialResponse.text)
})

// print the full text at the end
console.log(res2.text)

// timeout after 2 minutes (which will also abort the underlying HTTP request)
const response = await api.sendMessage(
  'write me a really really long essay on frogs',
  {
    timeout: 2 * 60 * 1000
  }
)

const res3 = await api.sendMessage('what is the answer to the universe?', {
  prompt: `You are ChatGPT, a large language model trained by OpenAI. You answer as concisely as possible for each response. If you are generating a list, do not have too many items.
Current date: ${new Date().toISOString()}\n\n`
})
