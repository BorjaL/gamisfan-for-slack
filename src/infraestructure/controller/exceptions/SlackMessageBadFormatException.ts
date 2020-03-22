class SlackMessageBadFormatException extends Error {
  constructor(public message: string) {
    super(message);
    this.name = "UnexpectedInput";
    this.stack = (<any> new Error()).stack;
  }

}

export default SlackMessageBadFormatException;
