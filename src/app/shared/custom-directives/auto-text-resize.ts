import { Directive, ElementRef, AfterViewInit, Renderer2 } from '@angular/core';

@Directive({
  selector: '[autoResizeText]',
})
export class AutoResizeTextDirective implements AfterViewInit {
  constructor(private el: ElementRef, private renderer: Renderer2) {}

  ngAfterViewInit() {
    const element = this.el.nativeElement;
    const lineHeight = parseFloat(getComputedStyle(element).lineHeight);
    const maxHeight = lineHeight * 2; // two lines

    // if (element.scrollHeight > maxHeight / 2) {
    this.renderer.setStyle(element, 'font-size', 'smaller');
    // }
  }
}
