import React from 'react';
import { Chip } from '@nextui-org/react';
import clsx from 'clsx'; // Import clsx library

const TagList = ({ tags }) => {
  // Split the tags by comma and trim whitespace from each phrase
  const tagPhrases = tags.split(',').map((tag) => tag.trim());
  const transparentColors = [
    'bg-sky-600/20',   // Red with 50% transparency
    'bg-teal-600/40', // Green with 50% transparency
    'bg-cyan-600/30',  // Blue with 50% transparency
    'bg-pink-600/20',  // Magenta with 50% transparency
    'bg-slate-600/30',  // Cyan with 50% transparency
  ]; // Set of transparent colors

  return (
    <div>
      {tagPhrases.map((tag, index) => (
        <Chip
          key={index}
          variant="flat"
          radius="sm"
          size="sm"
          className={clsx(
            'font-roboto uppercase font-extralight text-sm',
            transparentColors[index % transparentColors.length], // Apply Tailwind CSS color class
            'mr-2', // Add Tailwind CSS margin class for horizontal gap
            'mb-2'  // Add Tailwind CSS margin class for vertical gap
          )}
        >
          {tag}
        </Chip>
      ))}
    </div>
  );
};

export default TagList;
