export default interface InputsRef {
  [key: string]: {
    concept: HTMLTextAreaElement | null;
    definition: HTMLTextAreaElement | null;
  };
}