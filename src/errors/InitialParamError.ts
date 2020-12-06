class InitialParamsError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'Initial Parameters Error';
  }
}

export default InitialParamsError;
