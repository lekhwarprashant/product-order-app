import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface Product {
  name: string;
  quantity: number;
}

@Injectable({
  providedIn: 'root'
})
export class ProductOrderService {
  private products = [
    'Product A', 'Product B', 'Product C', 'Product D', 'Product E',
    'Product F', 'Product G', 'Product H', 'Product I', 'Product J'
  ];

  private orderSubject = new BehaviorSubject<Product[]>([]);
  order$ = this.orderSubject.asObservable();

  constructor() {}

  getProducts(): string[] {
    return this.products;
  }

  updateOrder(order: Product[]): void {
    this.orderSubject.next(order);
  }

  readOrderAloud(order: Product[]): void {
    const text = order.map(item => `${item.quantity} ${item.name}`).join(', ');
    this.textToSpeech(text);
  }

  private textToSpeech(text: string): void {
    if (typeof responsiveVoice !== 'undefined') {
      responsiveVoice.speak(text, "UK English Male");
    } else {
      console.error('ResponsiveVoice library is not loaded.');
      alert('Text-to-speech service is unavailable.');
    }
  }
}
