import { VectorStoreRetriever } from "@langchain/core/vectorstores";
import { OpenAIEmbeddings } from "@langchain/openai";
import { Pinecone } from "@pinecone-database/pinecone";
import { PineconeStore } from "@langchain/pinecone";
import dotenv from "dotenv";

dotenv.config();

export async function createRetriever(): Promise<VectorStoreRetriever> {
  const embeddingLLM = new OpenAIEmbeddings({
    model: "text-embedding-3-small",
  });

  const pinecone = new Pinecone();

  const pineconeIndex = pinecone.index("langchain-docs");

  const vectorStore = await PineconeStore.fromExistingIndex(embeddingLLM, {
    pineconeIndex: pineconeIndex as any,
  });

  const retriever = vectorStore.asRetriever();

  return retriever;
}

// // TEST TO RUN tsx src/rag/retriever.ts
// // Example test code showing how to use the retriever to query documents:
// const retrieverChain = await createRetriever();
// const context = await retrieverChain.invoke("What is langchain?");
// console.log(context);
