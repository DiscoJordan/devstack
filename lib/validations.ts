import { z } from "zod";

export const QuestionsSchema = z.object({
  title: z
    .string()
    .min(5, {
      message: "Title must be at least 5 characters.",
    })
    .max(130, {
      message: "Title should not be more than 130 characters.",
    }),
  explanation: z
    .string()
    .min(100, {
      message: "Explanation must be at least 100 characters.",
    })
    .max(1000, {
      message: "Explanation should not be more than 1000 characters.",
    }),
  tags: z.array(
    z
      .string()
      .min(1, {
        message: "Tag must have at least 1 character.",
      })
      .max(15, {
        message: "Tag should not have more than 15 characters",
      })
  ).min(1, {
    message: "Add at least one Tag.",
  })
  .max(3, {
    message: "Max amout of tags is 3.",
  })
});
