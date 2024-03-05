import nlp from "compromise/two";

// export const extractTagsFromContent = (content: string) => {
//   const doc = nlp(content);
//   const tags = doc.match('#DT #Noun').out("text"); // Match all nouns in the content
//   return tags.slice(0, 5); // Return only the first 5 tags
// };

export const extractTagsFromContent = (content: string) => {
  // Tokenize the content
  const doc = nlp(content);

  // Tag the tokens
  doc.tag();

  // Extract the tags you're interested in
  const tags = doc.match("#Noun").out("array"); // You can customize this to match specific tags

  // Limit the number of tags to 5
  const limitedTags = tags.slice(0, 5);

  return limitedTags;
};
