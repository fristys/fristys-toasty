import {Component, Input, OnInit} from '@angular/core';
import {ToastData, ToastyConfig, ToastyEvent, ToastyEventType, ToastyService} from '../toasty-service.service';
import {isFunction} from '../toasty.utils';

/**
 * Toasty is container for Toast components
 */
@Component({
  selector: 'ng2-toasty',
  templateUrl: './toasty-component.component.html'
})
export class ToastyComponent implements OnInit {
  /**
   * Set of constants definitions position of Toasty on the page.
   */
  static POSITIONS: string[] = ['bottom-right', 'bottom-left', 'top-right', 'top-left', 'top-center', 'bottom-center', 'center-center'];

  private _position = '';

  /**
   * The window position where the toast pops up. Possible values:
   * - bottom-right (default value from ToastConfig)
   * - bottom-left
   * - top-right
   * - top-left
   * - top-center
   * - bottom-center
   * - center-center
   */
  @Input() set position(value: string) {
    if (value) {
      let notFound = true;

      for (let i = 0; i < ToastyComponent.POSITIONS.length; i++) {
        if (ToastyComponent.POSITIONS[i] === value) {
          notFound = false;
          break;
        }
      }

      // Position was wrong - clear it here to use the one from config.
      if (notFound) {
        value = this.config.position;
      }
    } else {
      value = this.config.position;
    }

    this._position = `toasty-position-${value}`;
  }

  get position(): string {
    return this._position;
  }

  /**
   * The storage for toasts.
   */
  toasts: ToastData[] = [];

  constructor(
    private config: ToastyConfig,
    private toastyService: ToastyService
  ) {
    // Initialise position
    this.position = '';
  }

  /**
   * `ngOnInit` is called right after the directive's data-bound properties have been checked for the
   * first time, and before any of its children have been checked. It is invoked only once when the
   * directive is instantiated.
   */
  ngOnInit(): void {
    // We listen events from our service
    this.toastyService.events.subscribe((event: ToastyEvent) => {
      // Add the new one
      if (event.type === ToastyEventType.ADD) {
        this.add(event.value);
        // Clear the one by number
      } else if (event.type === ToastyEventType.CLEAR) {
        this.clear(event.value);
        // Lets clear all toasts
      } else if (event.type === ToastyEventType.CLEAR_ALL) {
        this.clearAll();
      }
    });
  }

  /**
   * Event listener of 'closeToast' event comes from ToastyComponent.
   * This method removes ToastComponent assosiated with this Toast.
   */
  closeToast(toast: ToastData): void {
    this.clear(toast.id);
  }

  /**
   * Add new Toast
   */
  add(toast: ToastData): void {
    // If we've gone over our limit, remove the earliest
    // one from the array
    if (this.toasts.length >= this.config.limit) {
      this.toasts.shift();
    }

    // Add toasty to array
    this.toasts.push(toast);

    // If there's a timeout individually or globally,
    // set the toast to timeout
    if (toast.timeout) {
      this._setTimeout(toast);
    }
  }

  /**
   * Clear individual toast by id
   * @param id is unique identifier of Toast
   */
  clear(id: number): void {
    if (id) {
      for (let key = 0; key < this.toasts.length; key++) {
        const value = this.toasts[key];

        if (value.id === id) {
          if (value.onRemove && isFunction(value.onRemove)) {
            value.onRemove.call(this, value);
          }

          this.toasts.splice(key, 1);
        }
      }
    } else {
      throw new Error('Please provide id of Toast to close');
    }
  }

  /**
   * Clear all toasts
   */
  clearAll(): void {
    for (let key = 0; key < this.toasts.length; key++) {
      const value = this.toasts[key];

      if (value.onRemove && isFunction(value.onRemove)) {
        value.onRemove.call(this, value);
      }
    }

    this.toasts = [];
  }

  /**
   * Custom setTimeout function for specific setTimeouts on individual toasts.
   */
  private _setTimeout(toast: ToastData): void {
    window.setTimeout(() => this.clear(toast.id), toast.timeout);
  }
}

