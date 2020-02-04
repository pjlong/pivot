import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'obscure',
})
export class ObscurePipe implements PipeTransform {
  transform(value: string, num: number, char = '*'): any {
    if (num > 0) {
      return `${this.generateFiller(num, char)}${value.slice(num)}`;
    } else {
      const fillNum = value.length - Math.abs(num);
      return `${this.generateFiller(fillNum, char)}${value.slice(fillNum)}`;
    }
  }

  private generateFiller(num: number, char: string): string {
    return new Array(num).fill(char).join('');
  }
}
