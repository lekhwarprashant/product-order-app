import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductOrderService, Product } from '../product-order.service';

@Component({
  selector: 'app-order-display',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './order-display.component.html',
  styleUrls: ['./order-display.component.css']
})

export class OrderDisplayComponent implements OnInit {
  order: Product[] = [];

  constructor(private productOrderService: ProductOrderService) {}

  ngOnInit(): void {
    this.productOrderService.order$.subscribe(order => {
      this.order = order;
    });
  }

  readOrder(): void {
    this.productOrderService.readOrderAloud(this.order);
  }
}