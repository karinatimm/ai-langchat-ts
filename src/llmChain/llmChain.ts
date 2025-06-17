import { PromptTemplate } from "@langchain/core/prompts";
import { ChatOpenAI } from "@langchain/openai";
import dotenv from "dotenv";
import { StringOutputParser } from "@langchain/core/output_parsers";
import { RunnableSequence } from "@langchain/core/runnables";

dotenv.config();

await personalisedPitch("Generative AI", "Javascript Developer", 100);

async function personalisedPitch(
  course: string,
  role: string,
  wordLimit: number
) {
  const promptTemplate = new PromptTemplate({
    template:
      "Describe the importance of learning {course} for a {role}. Limit the output to {wordLimit} words.",
    inputVariables: ["course", "role", "wordLimit"],
  });

  const formattedPrompt = await promptTemplate.format({
    course,
    role,
    wordLimit,
  });

  console.log("Formatted Prompt: ", formattedPrompt);

  const llm = new ChatOpenAI({
    // temperature: 1,
    topP: 1,
    maxTokens: 150,
    model: "gpt-3.5-turbo-0125",
  });

  const outputParser = new StringOutputParser();

  const lcelChain = RunnableSequence.from([promptTemplate, llm, outputParser]);

  const lcelResponse = await lcelChain.invoke({
    course,
    role,
    wordLimit,
  });

  console.log("Answer from LCEL chain: ", lcelResponse);
}
