import axios from 'axios';
import OpenAI from 'openai';

export const generateScenarios = async (whatIfStatement: string): Promise<string[]> => {
  try {
    const prompt = `Generate brief different imaginative possibilities (at least 2 to a maximum of 6) of universe where "${whatIfStatement}" happens. This is not a scientific project, rather a project made for fun. The possibilities can bend any logic, science fiction, and introduce random events to introduce unimaginable humor, sarcasm, and satire motivated by real-world events. The eventual aim is to determine how and when the first person to set foot on the moon will change in that multiverse. Each entry should be exactly three lines and last line should always be in the format "The first person (or creature) to set foot on Moon is _ in the year _.".`
    const response : any = await axios.post(
      'https://api.openai.com/v1/chat/completions',
      {
        model: 'gpt-3.5-turbo',
        messages: [
          {
            role: 'system',
            content: 'You are a helpful assistant.',
          },
          {
            role: 'user',
            content: prompt,
          },
        ],
      },
      {
        headers: {
          'Authorization': 'Bearer ' + '',
          'Content-Type': 'application/json',
        },
      }
    )

    if (response.data.choices && response.data.choices.length > 0) {
      return response.data.choices[0].message.content.split('\n').filter((line: any) => line);
    }
    return [];
  } catch (error) {
    console.error('Error calling OpenAI to generate scenarios:', error);
    return [];
  }
};


export const generateScenarioImages = async (scenario: string): Promise<{url: string, description: string}[]> => {
  try {
    const prompt = `Generate three images one for each line, with descriptions for a universe where "${scenario}"`

    const openai = new OpenAI({ apiKey: '', dangerouslyAllowBrowser: true });
    const response = await openai.images.generate({ model: "dall-e-2", prompt,n: 3,size: "1024x1024",});
    const image_urls = response.data as string[];
    const image_descs = scenario.split('.');
    console.log("URL",image_urls)
    console.log("DES",image_descs)
    const imgData = image_urls.map((url, index) => {
      return {
      url,
      description: image_descs[index]
      }
    })
    return imgData;
  } catch (error) {
    console.error('Error calling OpenAI to generate scenarios:', error);
    return [];
  }
};