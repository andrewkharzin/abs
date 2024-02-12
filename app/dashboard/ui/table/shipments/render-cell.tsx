import React from 'react';
import { Tooltip } from '@nextui-org/react';
import  AWBNumberCell  from './AWBNumberCell'; // Import the AWBNumberCell component

interface Props {
  value: string | null;
}

export const RenderAwbCell = ({ value }: Props) => {
  return (
    <Tooltip content="View AWB details">
      {/* Replace the placeholder button with the AWBNumberCell component */}
      {value ? (
        <AWBNumberCell value={value} />
      ) : (
        <p className="text-sm text-gray-400">N/A</p>
      )}
    </Tooltip>
  );
};
