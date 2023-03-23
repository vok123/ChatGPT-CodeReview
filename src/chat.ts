import { ChatGPTAPI } from 'chatgpt';
export class Chat {
  private chatAPI: ChatGPTAPI;

  constructor(apikey: string) {
    this.chatAPI = new ChatGPTAPI({
      apiKey: apikey,
      completionParams: {
        model: process.env.MODEL || 'gpt-3.5-turbo',
        temperature: +(process.env.temperature || 0) || 1,
        top_p: +(process.env.temperature || 0) || 1,
      },
    });
  }

  private generatePrompt = (patch: string) => {
    return `以下是代码补丁，请使用中文回答帮我进行简要的代码审查，欢迎指出任何错误风险和改进建议(风险可以使用红色或者粗体标明)。
    ${patch}
    `;
  };

  public codeReview = async (patch: string) => {
    if (!patch) {
      return '';
    }

    console.time('code-review cost');
    const prompt = this.generatePrompt(patch);

    const res = await this.chatAPI.sendMessage(prompt);

    console.timeEnd('code-review cost');
    return res.text;
  };
}
