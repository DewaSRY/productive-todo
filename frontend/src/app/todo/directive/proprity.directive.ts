import { Directive, Input, ElementRef, Renderer2, inject } from '@angular/core';
import { Priority } from '@app/todo/model/todo'

@Directive({
  selector: '[appProprity]',
})
export class ProprityDirective {

  @Input() set appProprity(priority: Priority | string) {
    this.setTailwindClassesBasedOnPriority(priority);
  }

  private readonly services = {
    el: inject(ElementRef),
    renderer: inject(Renderer2)
  }

  private setTailwindClassesBasedOnPriority(priority: Priority | string): void {
    const { el, renderer } = this.services

    renderer.addClass(el.nativeElement, 'text-slate-700');
    renderer.addClass(el.nativeElement, 'extra-small');
    renderer.addClass(el.nativeElement, 'hover:brightness-50');
    renderer.addClass(el.nativeElement, 'duration-300');
    renderer.addClass(el.nativeElement, 'ease-in-out');
    renderer.addClass(el.nativeElement, 'shadow-2xl');

    switch(priority) {
      case 'HIGHT':
        renderer.addClass(el.nativeElement, 'bg-priority-one/70');
        break;
      case 'MID':
        renderer.addClass(el.nativeElement, 'bg-priority-two/70');
        break;
      case 'LOW':
        renderer.addClass(el.nativeElement, 'bg-priority-three/70');
        break;
      default:
        renderer.addClass(el.nativeElement, 'border');
        renderer.addClass(el.nativeElement, 'border-text/10');
        renderer.addClass(el.nativeElement, 'bg-slate-700/10');
        break;
    }

  }

}
