import { AfterViewInit, Directive, Input, OnDestroy, ViewContainerRef } from '@angular/core';
import * as monaco from 'monaco-editor';
import { BehaviorSubject, Subscription } from 'rxjs';

interface ResizeObserverObserveOptions {
  box?: 'content-box' | 'border-box';
}

declare class ResizeObserver {
  constructor(callback: ResizeObserverCallback);

  disconnect: () => void;
  observe: (target: Element, options?: ResizeObserverObserveOptions) => void;
  unobserve: (target: Element) => void;
}

@Directive({
  selector: '[monaco-editor]',
})
export class EditorDirective implements AfterViewInit, OnDestroy {
  private resizeObserver: ResizeObserver;
  private instance: monaco.editor.IStandaloneCodeEditor | null = null;
  private $$: Subscription[] = [];

  @Input()
  model$ = new BehaviorSubject<monaco.editor.ITextModel | null>(null);

  constructor(private readonly viewContainerRef: ViewContainerRef) {
    this.resizeObserver = new ResizeObserver(() => {
      this.instance?.layout();
    });
  }

  getEditor() {
    if (!this.model$.getValue()) {
      throw new Error('editor.model is null');
    }
    if (!this.instance) {
      const element = this.viewContainerRef.element.nativeElement;
      this.instance = monaco.editor.create(element, {
        model: this.model$.getValue(),
        theme: 'vs-dark',
      });
    }
    return this.instance;
  }

  ngAfterViewInit() {
    const element = this.viewContainerRef.element.nativeElement;
    this.resizeObserver.observe(element);
    this.$$.push(
      this.model$.subscribe((model) => {
        if (model) {
          this.getEditor().setModel(model);
        }
      }),
    );
  }

  ngOnDestroy() {
    this.resizeObserver.disconnect();
    this.$$.forEach(($) => $.unsubscribe());
  }
}
