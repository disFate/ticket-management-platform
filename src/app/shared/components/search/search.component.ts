import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-search',
  imports: [CommonModule, FormsModule],
  standalone: true,
  templateUrl: './search.component.html',
  styleUrl: './search.component.css',
})
export class SearchComponent {
  @Input() placeholder = 'Search';
  @Input() header = 'Search';
  @Output() onSearch: EventEmitter<string> = new EventEmitter<string>();

  searchValue: string = '';
  onInputChange(): void {
    this.onSearch.emit(this.searchValue);
  }
}
