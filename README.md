# **AI-LangChat-TS**

**AI-LangChat-TS** is a command-line conversational chatbot built with **LangChain**, **Node.js**, and **TypeScript**.  
It showcases a full **Retrieval-Augmented Generation (RAG)** pipeline with features like **chat history**, **contextual question rewriting**, and **streamed OpenAI responses**, all running directly in your terminal.

This backend application was built entirely with **Node.js + TypeScript**, and as a **frontend developer**, working on it was an eye-opening journey into the backend world of AI.  
Rather than just using an API, I wanted to understand how AI apps actually work: how **prompts**, **embeddings**, **retrievers**, and **generation logic** all fit together.

Now I understand how to build **GPT-like**, real-time AI chat apps from scratch, including **embedding**, **RAG**, **prompt chaining**, **retrievers**, and **chat memory**.

> **Note:** This is a developer-focused project intended for educational and prototyping purposes. It runs locally and **requires an OpenAI API key**.  
> Use the provided `.env.example` file as a template:  
> Run `cp .env.example .env` and add your **OpenAI API key** to the new `.env` file.

---

## ✨ Features

### 🧠 AI & Chat Capabilities

- **RAG Pipeline:** Combines document retrieval with LLM-based answer generation.
- **Streaming OpenAI Responses:** See replies build in real time via token streaming.
- **Contextual Query Rewriting:** Rewrites follow-up questions using full chat history.
- **Chat History Handling:** Tracks and injects prior messages dynamically into prompts.
- **LangSmith Debugging:** Integrated visual debugging and traceability of LLM chains and data flow.

### ⚙️ Architecture & Design

- **Node.js + TypeScript:** Modern backend stack with type safety.
- **Prompt Engineering:** Custom templates for question rewriting, answer generation, and chat memory injection.
- **Document Preprocessing:** Crawling, cleaning, chunking, and embedding documents for effective retrieval.
- **Environment Config:** Easy setup with `.env` support (`.env.example` included).

---

## 📚 Documentation Crawling

This chatbot was designed to query LangChain documentation. To improve speed and efficiency, it uses a lightweight, trimmed-down version of the docs:

const LANGCHAIN_DOCS_HOME =
"https://learn-with-amit.github.io/genai-js/langchain/";
const LANGCHAIN_DOCS_PREFIX = "";

> **Note:** This avoids downloading the entire LangChain site, which is large and slow to crawl.

---

## 🧠 How It Works

1. **User sends a question.**
2. If it's a follow-up, the app uses a _Query Contextualization Chain_ to rewrite it into a self-contained version using the full chat history.
3. The rewritten (or original) question is passed to the _Generation Chain_.
4. Relevant documents are retrieved using vector embeddings.
5. The answer is generated using the retrieved context and the updated prompt with full chat history.
6. The question and answer are appended to the chat history for future context.

---

## 🛠️ Tech Stack

- **LangChain**: Framework for building modular LLM pipelines.
- **OpenAI**: GPT-based LLMs for question rewriting and answer generation.
- **Embeddings & Vector Store**: Used for semantic document retrieval.
- **Node.js + TypeScript**: Backend logic and type-safe development.
- **TSX (ESM Runtime)**: Executes the code with modern module support.

---

## 💻 Getting Started

### 1. Clone the repo

git clone https://github.com/karinatimm/ai-langchat-ts.git
cd ai-langchat-ts

### 2. Install dependencies

npm install

### 3. Setup environment

cp .env.example .env

Add your OpenAI API key to the .env file
If you don’t have one, create an account at https://platform.openai.com/ and purchase API access.

### 4. Run the chat

npx tsx src/rag/ragWithChatHistory.ts

---

## 🧪 Example Chat

You: What is LangChain?
Bot: LangChain is a framework for building applications with large language models...

You: How does memory work?
Bot: In LangChain, memory allows you to pass previous messages as context into the model...

## 🎓 What I Learned

- Building an AI pipeline from scratch, beyond just calling APIs.

- Document crawling, chunking, and embedding techniques.

- Orchestrating LangChain chains for contextual conversation.

- Designing prompts for query rewriting and answer generation.

- Streaming token-by-token LLM responses in a CLI environment.

- Debugging LLM chains visually with LangSmith.
