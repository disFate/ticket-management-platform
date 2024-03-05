import {
  Component,
  Input,
  EventEmitter,
  Output,
  OnInit,
  OnChanges,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuItem } from 'primeng/api';
import { MenuItemContent } from 'primeng/menu';


@Component({
  selector: 'app-ticket-update',
  templateUrl: './ticket-update.component.html',
  styleUrl: './ticket-update.component.css',
})
export class TicketUpdateComponent implements OnChanges {
  ngOnChanges(): void {
    this.header = `update ${this.title}`;
    this.options.forEach((option) => {
      this.menuItem.push({
        label: option,
        command: () => {
          this.newValue = option;
        },
      });
    });
  }
  @Input() title = '';
  @Input() options: string[] = [];
  @Output() update: EventEmitter<string> = new EventEmitter<string>();

  menuItem: MenuItem[] = [];

  newValue?: string;
  header = `update ${this.title}`;

  onConfirm(): void {
    console.log('onConfirm', this.newValue);
    this.update.emit(this.newValue);
  }
}
