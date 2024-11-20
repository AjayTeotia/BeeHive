import Image from "next/image";

export const TemplateCard = (template) => {
  return (
    <div className="p-5 bg-gray-50 rounded-md border-2 shadow-md flex flex-col gap-3 cursor-pointer hover:scale-105 transition-all duration-300 ease-in-out">
      <Image src={template.icon} width={50} height={50} alt={template.name} />

      <h2 className="font-medium text-lg">{template.name}</h2>

      <p className="text-gray-500 line-clamp-3">{template.desc}</p>
    </div>
  );
};
