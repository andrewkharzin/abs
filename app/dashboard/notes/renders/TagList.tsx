import React from 'react';

const Tag = ({ tag, color }) => {
  const tagStyle = {
    backgroundColor: color,
    padding: '0.2rem 0.5rem',
    borderRadius: '0.3rem',
    margin: '0.2rem',
    display: 'inline-block',
  };

  return <span style={tagStyle}>{tag}</span>;
};

const TagList = ({ tags }) => {
  // Split the tags by comma and trim whitespace from each phrase
  const tagPhrases = tags.split(',').map((tag) => tag.trim());
  const colors = ['#ff5733', '#33ff57', '#5733ff', '#ff33e6', '#00b7fa',]; // Set of colors

  return (
    <div>
      {tagPhrases.map((tag, index) => (

        <Tag
         key={index}
         tag={tag}
         color={colors[index % colors.length]}
         className="font-mono uppercase font-bold text-tiny"
          />
      ))}
    </div>
  );
};

export default TagList;
