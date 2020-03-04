const translateRegex = /translate\((.+)px, (.+)px\)/;

const defaultValue = 'translate(0px, 0px)';

export function extractTransformPosition(nativeElement: HTMLElement): string[] {
  const [all, xTransform, yTransform] = (translateRegex.exec(nativeElement.style.transform || defaultValue) || ['0', '0', '0']);
  return [xTransform, yTransform];
}
