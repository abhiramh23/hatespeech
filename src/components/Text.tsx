"use client";

import React, { useState } from "react";
import { Textarea, Button } from "@nextui-org/react";
import { useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import { classifyText } from "@/app/actions"; // Make sure this path is correct

type Inputs = {
  TextField: string;
};

const Text = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const [result, setResult] = useState<string | null>(null);
  const [classificationError, setClassificationError] = useState<string | null>(
    null
  );

  const onSubmit = async (data: Inputs) => {
    const classification = await classifyText({ text: data.TextField });

    if (classification.success) {
      setResult(classification.data.classification);
      setClassificationError(null);
    } else {
      setClassificationError(classification.error.message);
      setResult(null);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="grid grid-rows-3 place-items-center gap-4"
    >
      <Textarea
        required
        {...register("TextField")}
        className="row-start-1 justify-self-center max-w-xs"
        variant={"underlined"}
        label="Enter your text"
        labelPlacement="outside"
      />
      <ErrorMessage
        errors={errors}
        name="TextField"
        render={({ message }) => <p className="text-red-500">{message}</p>}
      />
      {classificationError && (
        <p className="text-red-500">{classificationError}</p>
      )}
      {result && <p className="text-green-500">Classification: {result}</p>}
      <Button
        className="row-start-2 justify-self-center"
        color="primary"
        size="lg"
        radius="full"
        variant="shadow"
        type="submit"
      >
        Submit
      </Button>
    </form>
  );
};

export default Text;
