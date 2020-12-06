class StatisticalParamError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'Statistical Parameter Error';
  }
}

export default StatisticalParamError;
