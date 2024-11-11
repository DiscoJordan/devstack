"use client";
import React, { useRef, useState } from "react";
import Image from "next/image";
import { Editor } from "@tinymce/tinymce-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { ControllerRenderProps, useForm } from "react-hook-form";
import { z } from "zod";
import { useRouter, usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import { QuestionsSchema } from "@/lib/validations";
import { Badge } from "../ui/badge";
import { createQuestion } from "@/lib/actions/question.action";
interface Props{
  mongoUserId:string;
}

const type:any = "create";

const Question = ({mongoUserId}:Props) => {
  const editorRef = useRef(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter()
  const pathname = usePathname()

  const form = useForm<z.infer<typeof QuestionsSchema>>({
    resolver: zodResolver(QuestionsSchema),
    defaultValues: {
      title: "",
      explanation: "",
      tags: [],
    },
  });

  async function onSubmit(values: z.infer<typeof QuestionsSchema>) {
    setIsSubmitting(true);

    try {
      await createQuestion({
        title:values.title,
        content:values.explanation,
        tags:values.tags,
        author: JSON.parse(mongoUserId)
      })
      router.push('/')
    } catch (error) {
      
    } finally{
      setIsSubmitting(false);
    }
  }

  function handleInputKeyDown(
    e: React.KeyboardEvent<HTMLInputElement>,
    field: any
  ) {
    if (e.key === "Enter" && field.name === "tags") {
      e.preventDefault();
      const tagInput = e.target as HTMLInputElement;
      const tagValue = tagInput.value.trim();
      if (tagValue !== "" && field.value.length < 3) {
        if (tagValue.length > 15) {
          return form.setError("tags", {
            type: "required",
            message: "Tag should not have more than 15 characters",
          });
        }
        if (!field.value.includes(tagValue as never)) {
          form.setValue("tags", [...field.value, tagValue]);
          tagInput.value = "";
          form.clearErrors("tags");
        } else {
          form.trigger();
        }
      }
    }
  }

  const handleTagRemove = (tag: string, field: any) => {
    const newTags = field.value.filter((t: string) => t !== tag);
    form.setValue("tags", newTags);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex w-full flex-col gap-10"
      >
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem className="flex w-full flex-col">
              <FormLabel className="paragraph-semibold text-dark400_light800">
                Question Title <span className=" text-primary-500">*</span>
              </FormLabel>
              <FormControl className="mt-3.5 border-light-700">
                <Input
                  className="no-focus paragraph-regular  background-light900_dark300 light-border-2 text-dark300_light700 min-h-[56px] border"
                  {...field}
                />
              </FormControl>
              <FormDescription className="body-regular mt-2.5 text-light-500">
                This is your title of a question.
              </FormDescription>
              <FormMessage className="text-red-600" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="explanation"
          render={({ field }) => (
            <FormItem className="flex w-full flex-col gap-3">
              <FormLabel className="paragraph-semibold text-dark400_light800">
                Question Explanation{" "}
                <span className=" text-primary-500">*</span>
              </FormLabel>
              <FormControl className="mt-3.5 border-light-700">
                <Editor
                  apiKey={process.env.NEXT_PUBLIC_TINY_EDITOR_API_KEY}
                  onInit={(_evt, editor) => {
                    // @ts-ignore
                    editorRef.curitrent = editor;
                  }}
                  onBlur={field.onBlur}
                  onEditorChange={(content)=>field.onChange(content)}
                  initialValue=""
                  init={{
                    height: 350,
                    menubar: false,
                    plugins: [
                      "advlist",
                      "autolink",
                      "lists",
                      "link",
                      "image",
                      "charmap",
                      "preview",
                      "anchor",
                      "searchreplace",
                      "visualblocks",
                      "codesample",
                      "fullscreen",
                      "insertdatetime",
                      "media",
                      "table",
                    ],
                    toolbar:
                      "undo redo | blocks |" +
                      "codesample  bold italic forecolor | alignleft aligncenter " +
                      "alignright alignjustify | bullist numlist outdent indent | ",
                    content_style: "body { font-family:Inter,Arial; font-size:16px }",
                  }}
                />
              </FormControl>
              <FormDescription className="body-regular mt-2.5 text-light-500">
                Introduse the problem and expand on what you put in the Title.
                Minimum 100 characters.
              </FormDescription>
              <FormMessage className="text-red-600" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="tags"
          render={({ field }) => (
            <FormItem className="flex w-full flex-col">
              <FormLabel className="paragraph-semibold text-dark400_light800">
                Tags<span className=" text-primary-500">*</span>
              </FormLabel>
              <FormControl className="mt-3.5 border-light-700">
                <>
                  <Input
                    className="no-focus paragraph-regular  background-light900_dark300 light-border-2 text-dark300_light700 min-h-[56px] border"
                    placeholder="Add tags ..."
                    onKeyDown={(e) => {
                      handleInputKeyDown(e, field);
                    }}
                  />
                  {field.value.length > 0 && (
                    <div className="flex-start mt-2.5 gap-2.5">
                      {field.value.map((tag: any) => (
                        <Badge
                          className="subtle-medium background-light800_dark300 text-light400_light500 flex items-center justify-center gap-2 rounded-[8px] border-none px-4 py-2 capitalize"
                          key={tag}
                          onClick={() => handleTagRemove(tag, field)}
                        >
                          {tag}
                          <Image
                            src={"/assets/icons/close.svg"}
                            alt={"Close icon"}
                            width={12}
                            height={12}
                            className="cursor-pointer object-contain invert-0 dark:invert"
                          ></Image>
                        </Badge>
                      ))}
                    </div>
                  )}
                </>
              </FormControl>
              <FormDescription className="body-regular mt-2.5 text-light-500">
                Add some tags that describes your question. Press enter to add a
                tag.
              </FormDescription>
              <FormMessage className="text-red-600" />
            </FormItem>
          )}
        />
        <Button
          className="primary-gradient w-fit !text-light-900 "
          disabled={isSubmitting}
          type="submit"
        >
          {isSubmitting ? (
            <>{type === "edit" ? "Editing..." : "Posting..."}</>
          ) : (
            <>{type === "edit" ? "Edit Question" : "Ask a Question"}</>
          )}
        </Button>
      </form>
    </Form>
  );
};

export default Question;
