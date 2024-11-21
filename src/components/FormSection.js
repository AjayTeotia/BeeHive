"use client";

import Image from "next/image";
import { Textarea } from "./ui/textarea";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { useState } from "react";
import { Loader2Icon } from "lucide-react";

export const FormSection = ({ selectedTemplate, userFormInput, loading }) => {
  const [formData, setFormData] = useState();
  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // console.log(formData);

    userFormInput(formData);
  };

  return (
    <div className="p-5 shadow-md rounded-lg border-2 bg-yellow-100">
      <Image
        src={selectedTemplate.icon}
        width={70}
        height={70}
        alt={selectedTemplate.name}
      />

      <h2 className="font-bold text-2xl text-primary mb-2">
        {selectedTemplate.name}
      </h2>

      <p className="text-gray-500 text-sm">{selectedTemplate.desc}</p>

      <form onSubmit={handleSubmit}>
        {selectedTemplate?.form?.map((form, index) => {
          return (
            <div key={index} className="my-2">
              <label className="font-bold">{form.label}</label>

              {form.field === "input" ? (
                <Input
                  type="text"
                  name={form?.name}
                  className="w-full bg-yellow-50"
                  required={form?.required}
                  onChange={handleInputChange}
                />
              ) : form.field === "textarea" ? (
                <Textarea
                  name={form?.name}
                  className="w-full bg-yellow-50"
                  required={form?.required}
                  onChange={handleInputChange}
                />
              ) : null}
            </div>
          );
        })}

        <Button
          type="submit"
          className="py-5 w-full flex items-center justify-center"
          disabled={loading}
        >
          {loading ? (
            <Loader2Icon className="animate-spin" />
          ) : (
            "Generate Content"
          )}
        </Button>
      </form>
    </div>
  );
};
