// CategoryColor.tsx
import React from "react";
import { Chip } from "@nextui-org/react";

interface CategoryColorProps {
  category: string;
}

const CategoryColor: React.FC<CategoryColorProps> = ({ category }) => {
  let color = "";
  let variant = "";
  let shadow = "";
  // let bordered = false;
  switch (category) {
    case "urgent":
      variant = "shadow";
      color = "danger";

      break;
    case "shift":
      color = "warning";
      variant = "faded"
      break;
    case "COMMON":
      color = "success";
      variant="bordered";
      break;
    default:
      color = "success";
  }

  return (
    <Chip
      variant={variant}
      className="uppercase font-roboto"
      size="sm"
      radius="sm"
      color={color}
    >
      {category}
    </Chip>
  );
};

export default CategoryColor;
