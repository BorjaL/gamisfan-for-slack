class SlackMessageBadFormatException extends Error {
  constructor(public message: string) {
    super(message);
    this.name = "UnexpectedInput";
    this.stack = (new Error() as any).stack;
  }

}

export default SlackMessageBadFormatException;
