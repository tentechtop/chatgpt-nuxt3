//@ts-ignore
import { Ref } from "vue";

// Read the stream from the server
export const read = async (
  reader: any,
  target: Ref<string> | Ref<any[]>
): Promise<any> => {
  // TextDecoder is a built-in object that allows you to convert a stream of bytes into a string
  const decoder = new TextDecoder("utf-8");
  // Destructure the value returned by reader.read()
  const { done, value } = await reader.read();
  // If the stream is done reading, release the lock on the reader
  if (done) return reader.releaseLock();
  // Convert the stream of bytes into a string
  const chunk = decoder.decode(value, { stream: true });
  // Split the string into an array of strings
  const jsons = chunk
    .split("data:")
    .map((data) => {
      // Trim any whitespace
      const trimData = data.trim();
      // If the string is empty, return undefined
      if (trimData === "") return undefined;
      // If the string is [DONE], return undefined
      if (trimData === "[DONE]") return undefined;
      // Otherwise, parse the string as JSON
      return JSON.parse(data.trim());
    })
    // Filter out any undefined values
    .filter((data) => data);
  // Combine the data into a single string
  const streamMessage = jsons
    .map((jn) => jn.choices.map((choice: any) => choice.delta.content).join(""))
    .join("");
  // Update the ref to the target element with the new string
  const response = streamMessage;
  if (target.value instanceof Array) {
    target.value[target.value.length - 1].content += response;
  } else {
    target.value = target.value += response;
  }

  // Repeat the process
  return read(reader, target);
};


export const readCoze = async (
    reader: any,
    target: Ref<string> | Ref<any[]>
): Promise<any> => {
  const decoder = new TextDecoder("utf-8");
  const { done, value } = await reader.read();
  if (done) return reader.releaseLock();
  const chunk = decoder.decode(value, { stream: true });
  const jsons = chunk
      .split("data:")
      .map((data) => {
        const trimData = data.trim();
        if (trimData === "") return undefined;
        if (trimData === "[DONE]") return undefined;
        return JSON.parse(data.trim());
      }).filter((data) => data);

  const streamMessages = jsons.map((jn) => {
    if (jn.event === "message" && jn.message) {
      const message = jn.message;
      switch (message.type) {
        case "answer":
        case "follow_up":
        case "verbose":
          return { type: message.type, content: message.content };
        default:
          return null;
      }
    }
    return null;
  });


  for (const message of streamMessages) {
    if (message?.type == 'answer' && message.content && message.content.length > 0){
      let text = message.content;
      if (target.value instanceof Array) {
        target.value[target.value.length - 1].content += text;
      } else {
        target.value = target.value += text;
      }
    } else if (message?.type == 'follow_up' ){
      let text = message.content;
      if (target.value instanceof Array) {
        // 创建一个新的对象，包含 role 和 message
        const followUpItem = {
          role: "assistant", // 或者根据需要设置为其他值
          message: message.content
        };
        // 将新对象添加到数组的最后一个元素的 followUp 数组中
        target.value[target.value.length - 1].followUp.push(followUpItem);
      }
    }
  }




  // 递归调用 readCoze 继续读取数据
  return readCoze(reader, target);
};



// Count the number of code blocks and complete the last one if it is not completed
export const countAndCompleteCodeBlocks = (text: string) => {
  const codeBlocks = text.split("```").length - 1;
  if (codeBlocks && codeBlocks % 2 !== 0) {
    return text + "\n```\n";
  }
  return text;
};
