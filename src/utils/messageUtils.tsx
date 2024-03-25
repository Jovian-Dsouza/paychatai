export function getMessageObject(input, isSystemMessage) {
  return {
    role: isSystemMessage ? "assistant" : "user",
    content: input,
  };
}
