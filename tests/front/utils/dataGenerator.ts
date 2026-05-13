export class EmailGenerator {

  static generateEmail(): string {
    const timestamp = Date.now(); 
    return `testuser${timestamp}@gmail.com`;
  }

}