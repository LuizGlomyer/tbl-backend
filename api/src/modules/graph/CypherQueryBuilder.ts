class CypherQueryBuilder {
  private statements: string[] = [];
  private params: any = {};

  createNode(type: string, properties: any, handle: string) {
    const propertyParams = Object.keys(properties)
      .map((key) => `${key}: $${key}`)
      .join(', ');

    const createNodeStatement = `CREATE (${handle}:${type} { id: randomUUID(), createdAt: timestamp(), ${propertyParams} })`;
    this.statements.push(createNodeStatement);
    this.params = { ...this.params, ...properties };
  }

  returnSingleNode(handle: string) {
    const returnNodeStatement = `RETURN ${handle}`;
    this.statements.push(returnNodeStatement);
  }

  getQuery() {
    return this.statements.join('\n');
  }

  getParams() {
    return this.params;
  }

  build() {
    return { query: this.getQuery(), params: this.getParams() };
  }
}

export default CypherQueryBuilder;

export interface User {
  name: string;
}
