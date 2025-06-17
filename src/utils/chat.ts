import readlinePromises from "readline/promises";
import { RunnableInterface } from "@langchain/core/runnables";
import { Document } from "@langchain/core/documents";
import { ReadableStream } from "node:stream/web";

export type ChatHandler = (question: string) => Promise<{
  answer:
    | ReturnType<RunnableInterface["invoke"]>
    | ReturnType<RunnableInterface["stream"]>;

  sources?: string[];
  answerCallBack?: (answerText: string) => Promise<void>;
}>;

export const chat = async (handler: ChatHandler) => {
  const rl = readlinePromises.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  while (true) {
    const question = await rl.question("Human: ");
    const response = await handler(question);
    const answer = await response.answer;

    let answerText = "";

    if (answer instanceof ReadableStream) {
      process.stdout.write("AI:");

      let isFirstAnswerChunk = true;

      for await (const chunk of answer) {
        if (typeof chunk === "string") {
          process.stdout.write(`${chunk}`);
          answerText += chunk;
        } else {
          if (chunk.answer !== undefined) {
            if (isFirstAnswerChunk) {
              process.stdout.write("Answer: ");
              isFirstAnswerChunk = false;
            }
            process.stdout.write(`${chunk.answer}`);
            answerText += chunk.answer;
          } else {
            console.log(`${JSON.stringify(chunk)}`);

            if (chunk.context) {
              const docs: Document[] = chunk.context;

              const sources = docs.map((doc) => doc.metadata.source);

              console.log(`Sources:\n${sources.join("\n")}`);
            }
          }
        }
      }
      console.log("\n");
    } else if (typeof answer === "string") {
      console.log(`AI: ${answer.trimStart()}`);
      answerText = answer;
    } else {
      console.log(`AI: ${JSON.stringify(answer)}`);
    }

    if (response.sources) {
      console.log(`Sources:\n${response.sources.join("\n")}`);
    }

    if (response.answerCallBack) {
      await response.answerCallBack(answerText);
    }
  }
};
