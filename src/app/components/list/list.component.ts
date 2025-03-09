import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface Item {
  title: string;
}

@Component({
  selector: 'app-list',
  imports: [CommonModule],
  templateUrl: './list.component.html',
  styleUrl: './list.component.css',
})
export class ListComponent {
  data = input.required<Item[]>();
}
