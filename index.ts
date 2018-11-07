import {ModuleWithProviders, NgModule} from '@angular/core';

import {ToastComponent} from './src/app/toast-component/toast-component.component';
import {ToastyComponent} from './src/app/toasty-component/toasty-component.component';
import {SafeHtmlPipe} from './src/app/safe-html.pipe';
import {ToastyConfig, ToastyService, toastyServiceFactory} from './src/app/toasty-service.service';
import {CommonModule} from '@angular/common';

export {
  ToastOptions,
  ToastData,
  ToastyConfig,
  ToastyEvent,
  ToastyEventType,
  ToastyService
} from './src/app/toasty-service.service';

export {
  ToastyComponent
} from './src/app/toasty-component/toasty-component.component';

export {
  ToastComponent
} from './src/app/toast-component/toast-component.component';

export {
  SafeHtmlPipe
} from './src/app/safe-html.pipe';

export let providers = [
  ToastyConfig,
  {provide: ToastyService, useFactory: toastyServiceFactory, deps: [ToastyConfig]}
];

@NgModule({
  imports: [CommonModule],
  declarations: [
    ToastComponent,
    ToastyComponent,
    SafeHtmlPipe
  ],
  exports: [ToastComponent, ToastyComponent],
  providers
})
export class ToastyModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: ToastyModule,
      providers
    };
  }
}
