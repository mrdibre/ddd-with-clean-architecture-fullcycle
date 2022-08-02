export type NotificationErrorProps = {
  message: string;
  context?: string;
};

export class Notification {
  private errors: Map<string, NotificationErrorProps[]> = new Map();

  constructor(private readonly defaultContext?: string) {}

  private getContext(error: NotificationErrorProps): string {
    return error.context || this.defaultContext || "";
  }

  private getMessagesForContext(context: string): string {
    const errors = this.errors.get(context)
        .filter(error => this.getContext(error) === context)
        .map(error => error.message)
        .join(", ");

    return `${context}: ${errors}`;
  }

  public addError(error: NotificationErrorProps): void {
    const context = this.getContext(error);

    const errors = [...(this.errors.get(context) || []), error];

    this.errors.set(context, errors);
  }

  public messages(context?: string): string {
    if (context) {
      return this.getMessagesForContext(context);
    }

    return [...this.errors.keys()].map((context) => this.getMessagesForContext(context)).join(", ");
  }

  public hasErrors(): boolean {
    return this.errors.size > 0;
  }

  public getErrors(): NotificationErrorProps[] {
    return [...this.errors.values()].reduce((acc, errors) => [...acc, ...errors], []);
  }
}
