import { loadDocuments } from "./loadDocuments";
import { splitDocuments } from "./splitDocuments";
import { OpenAIEmbeddings } from "@langchain/openai";
import { Pinecone } from "@pinecone-database/pinecone";
import { PineconeStore } from "@langchain/pinecone";
import cliProgress from "cli-progress";
import dotenv from "dotenv";

dotenv.config();

const rawDocuments = await loadDocuments();

const chunkedDocuments = await splitDocuments(rawDocuments);

const embeddingLLM = new OpenAIEmbeddings({
  model: "text-embedding-3-small",
});

const pinecone = new Pinecone();

const pineconeIndex = pinecone.index("langchain-docs");

console.log("Starting Vectorization...");
const progressBar = new cliProgress.SingleBar({});
progressBar.start(chunkedDocuments.length, 0);

for (let i = 0; i < chunkedDocuments.length; i = i + 100) {
  const batch = chunkedDocuments.slice(i, i + 100);

  await PineconeStore.fromDocuments(batch, embeddingLLM, {
    pineconeIndex: pineconeIndex as any,
  });

  progressBar.increment(batch.length);
}

progressBar.stop();
console.log("Chunked documents stored in Pinecone.");
