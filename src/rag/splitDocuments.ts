import { type Document } from "@langchain/core/documents";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";
import { loadDocuments } from "./loadDocuments";

export async function splitDocuments(
  rawDocuments: Document[]
): Promise<Document[]> {
  console.log("Splitting Documents...");

  const splitter = RecursiveCharacterTextSplitter.fromLanguage("html", {
    chunkSize: 500,
    chunkOverlap: 100,
  });

  const documentChunks = await splitter.splitDocuments(rawDocuments);

  console.log(
    `${rawDocuments.length} documents split into ${documentChunks.length} chunks.`
  );

  return documentChunks;
}

// // Example usage (commented out): IN ORDER TO RUN tsx src/rag/splitDocuments.ts
// const rawDocuments = await loadDocuments(); // Load documents from a source.
// await splitDocuments(rawDocuments); // Split those documents into chunks.
