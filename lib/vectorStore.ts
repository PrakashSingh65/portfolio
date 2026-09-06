import { PineconeStore } from "@langchain/pinecone";
import { pinecone, indexName } from "./pinecone";
import { embeddings } from "./embedding";

let cachedStore: PineconeStore | null = null;

export const getVectorStore = async () => {
  if (cachedStore) return cachedStore;

  const pineconeIndex = pinecone.Index(indexName);

  cachedStore = await PineconeStore.fromExistingIndex(embeddings, {
    pineconeIndex,
    maxConcurrency: 5,
  });

  return cachedStore;
};

export interface RetrieveContextOptions {
  filter?: Record<string, any>;
  k?: number;
}

export const retrieveContext = async (query: string, options?: RetrieveContextOptions) => {
  try {
    const store = await getVectorStore();
    const k = options?.k !== undefined ? options?.k : 3;
    const filter = options?.filter;

    let docs = await store.similaritySearch(query, k, filter);
    
    // Fallback: If metadata filtering returned no results, retry without filter
    if ((!docs || docs.length === 0) && filter) {
      docs = await store.similaritySearch(query, k);
    }

    if (!docs || docs.length === 0) {
      return "No relevant data found in portfolio";
    }

    return docs.map((doc) => doc.pageContent).join("\n\n");

  } catch (error) {
    console.error("Vector search retrieval failed:", error);
    return "No relevant data found in portfolio";
  }
};