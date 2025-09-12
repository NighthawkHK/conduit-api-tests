import test from "@playwright/test";

export function step<This, Args extends any[], Return>(message?: string) {
  return function actualDecorator(
    target: (this: This, ...args: Args) => Promise<Return>,
    context: ClassMethodDecoratorContext<This, (this: This, ...args: Args) => Promise<Return>>) {
    
      async function replacementMethod(this: This, ...args: Args): Promise<Return> {
      let name: string;

      if (message) {
        name = message.replace(/\{(\d+)\}/g, (_, index: string) => {
          const i = Number(index);
          return args[i] !== undefined ? String(args[i]) : `{${index}}`;
        });
      } else {
        const ctor = (this as any)?.constructor?.name ?? 'UnknownClass';
        name = `${ctor}.${String(context.name)}`;
      }

      return test.step(
        name,
        async () => target.apply(this, args),
        { box: true }
      );
    }
    return replacementMethod;
  };
}