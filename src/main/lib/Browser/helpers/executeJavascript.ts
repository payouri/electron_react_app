import { WebContents } from 'electron';
import { fileLogger } from '../../Logger';
import { CustomResult } from '../../../utils/types';

export const executeJavascript = async <Result>(
  webContent: WebContents,
  code: string
): Promise<CustomResult<Result>> => {
  try {
    const result = await webContent.executeJavaScript(code);

    return {
      hasFailed: false,
      data: result,
    };
  } catch (error) {
    fileLogger.error("Couldn't execute javascript", error);

    return {
      hasFailed: true,
      message: "Couldn't execute javascript",
      error:
        error instanceof Error
          ? error
          : new Error("Couldn't execute javascript"),
    };
  }
};
