"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"

import React from 'react'
import { QuestionsSchema } from "@/lib/validations"

const Question = () => {

    const form = useForm<z.infer<typeof QuestionsSchema>>({
        resolver: zodResolver(QuestionsSchema),
        defaultValues: {
          title: "",
          explanation:'',
          tags:[],
        },
      })
    
    
      function onSubmit(values: z.infer<typeof QuestionsSchema>) {
    
        console.log(values)
      }
  return (
    
    <Form {...form}>
    <form onSubmit={form.handleSubmit(onSubmit)} className="flex w-full flex-col gap-10">
      <FormField
        control={form.control}
        name="title"
        render={({ field }) => (
          <FormItem className="flex w-full flex-col">
            <FormLabel className="paragraph-semibold text-dark400_light800">Question Title <span className=" text-primary-500">*</span></FormLabel>
            <FormControl  className="mt-3.5 border-light-700">
              <Input className="no-focus paragraph-regular  background-light900_dark300 light-border-2 text-dark300_light700 min-h-[56px] border" {...field} />
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
            <FormLabel className="paragraph-semibold text-dark400_light800">Question Explanation <span className=" text-primary-500">*</span></FormLabel>
            <FormControl  className="mt-3.5 border-light-700">
              //editor
            </FormControl>
            <FormDescription className="body-regular mt-2.5 text-light-500">
              Introduse the problem and expand on what you put in the Title. Minimum 100 characters.
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
            <FormLabel className="paragraph-semibold text-dark400_light800">Tags<span className=" text-primary-500">*</span></FormLabel>
            <FormControl  className="mt-3.5 border-light-700">
              <Input className="no-focus paragraph-regular  background-light900_dark300 light-border-2 text-dark300_light700 min-h-[56px] border" placeholder="Add tags ..." {...field} />
            </FormControl>
            <FormDescription className="body-regular mt-2.5 text-light-500">
              Add some tags that describes your question. Press enter to add a tag.
            </FormDescription>
            <FormMessage className="text-red-600" />
          </FormItem>
        )}
      />
      <Button type="submit">Submit</Button>
    </form>
  </Form>
  )
}

export default Question