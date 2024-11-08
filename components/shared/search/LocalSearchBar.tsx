"use client";
import React from "react";
import Image from "next/image";
import { Input } from "@/components/ui/input";

interface CustomInputProps {
  route: string;
  iconPosition: string;
  imgSrc: string;
  placeholder: string;
  otherClasses: string;
}

const LocalSearchBar = ({
  route,
  iconPosition,
  imgSrc,
  placeholder,
  otherClasses,
}: CustomInputProps) => {
  return (
    <div
      className={`background-light800_darkgradient flex min-h-[56px] grow items-center gap-4 rounded-[10px] px-4 ${otherClasses}`}
    >
      {iconPosition === "left" && (
        <Image
          width={24}
          height={24}
          src={imgSrc}
          alt={"search icon"}
          className="cursor-pointer"
        ></Image>
      )}
      <Input
        type="text"
        placeholder={placeholder}
        value={""}
        onChange={() => {}}
        className="no-focus paragraph-regular placeholder text-dark400_light700 border-none shadow-none outline-none"
      ></Input>

{iconPosition === "right" && (
        <Image
          width={24}
          height={24}
          src={imgSrc}
          alt={"search icon"}
          className="cursor-pointer"
        ></Image>
      )}
    </div>
  );
};

export default LocalSearchBar;
