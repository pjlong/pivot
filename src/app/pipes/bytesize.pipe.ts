import { Pipe, PipeTransform } from '@angular/core';

type ByteIncrement = 'b' | 'kb' | 'mb' | 'gb' | 'tb';

/**
 * bytes | bytesize : 'mb'         (mb is destination, assume source is byte)
 * bytes | bytesize : 'kb' : 'mb'  (mb is destination, kb is source)
 */

@Pipe({
  name: 'bytesize',
})
export class BytesizePipe implements PipeTransform {
  private bytePower: ByteIncrement[] = ['b', 'kb', 'mb', 'gb', 'tb'];

  transform(
    value: number,
    firstUnit: ByteIncrement = 'b',
    secondUnit?: ByteIncrement
  ): string {
    let sourceUnit;
    let destinationUnit;

    if (!secondUnit) {
      sourceUnit = 'b';
      destinationUnit = firstUnit;
    } else {
      // both source and destination given
      sourceUnit = firstUnit;
      destinationUnit = secondUnit;
    }

    const powDiff =
      this.bytePower.indexOf(destinationUnit) -
      this.bytePower.indexOf(sourceUnit);
    const adjustedValue = value / Math.pow(1000, powDiff);

    return `${this.formatSize(adjustedValue)}${this.humanizeUnit(
      destinationUnit
    )}`;
  }

  private formatSize(value: number): string {
    if (value > 1) {
      return Math.round(value).toString();
    }
    return value.toFixed(3);
  }

  private humanizeUnit(unit: ByteIncrement): string {
    return `${unit.charAt(0)}${unit.charAt(1).toUpperCase()}`;
  }
}
