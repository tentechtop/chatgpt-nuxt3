import type {ChatMessage} from "assets/types";

export async function chat(messageList: ChatMessage[], apiKey: string) {
    const path1 = "https://api.openai.com/v1/chat/completions"
    const path2 = "https://api.chatanywhere.com.cn/v1/chat/completions"

    try {
        const result = await fetch(path2, {
            method: "post",
            /*      signal: AbortSignal.timeout(400),*/
            // 开启后到达设定时间会中断流式输出
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${apiKey}`,
            },
            body: JSON.stringify({
                model: "gpt-3.5-turbo",
                stream: true,
                messages: messageList,
            }),
        });
        return result;
    } catch (error) {
        throw error;
    }

}
