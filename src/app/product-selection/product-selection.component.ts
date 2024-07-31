import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProductOrderService, Product } from '../product-order.service';

@Component({
  selector: 'app-product-selection',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './product-selection.component.html',
  styleUrls: ['./product-selection.component.css']
})
export class ProductSelectionComponent {
  selections: Product[] = [{ name: '', quantity: 0 }];
  availableProducts: string[];

  constructor(private productOrderService: ProductOrderService) {
    this.availableProducts = this.productOrderService.getProducts();
  }

  addRow(): void {
    if (this.selections.length < 8) {
      this.selections.push({ name: '', quantity: 0 });
    }
  }

  removeRow(index: number): void {
    this.selections.splice(index, 1);
  }

  showOrder(): void {
    const validSelections = this.selections.filter(s => s.name && s.quantity > 0);
    this.productOrderService.updateOrder(validSelections);
  }

  onSelectionChange(index: number): void {
    const currentSelection = this.selections[index];
    if (currentSelection.name && currentSelection.quantity > 0) {
      if (index === this.selections.length - 1 && this.selections.length < 8) {
        this.addRow();
      }
    }
  }
}