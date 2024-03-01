import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TagModule } from 'primeng/tag';

@Component({
  selector: 'app-status-card',
  standalone: true,
  imports: [CommonModule, TagModule],
  templateUrl: './status-card.component.html',
  styleUrl: './status-card.component.css',
})
export class StatusCardComponent {
  @Input() status: string | undefined;

  getStatusClass(status: string | undefined): string {
    if (status === 'Open') {
      return 'primary';
    }
    if (status === 'Taken') {
      return 'success';
    }
    if (status === 'Pending Reply') {
      return 'warning';
    }
    if (status === 'Closed') {
      return 'failure';
    }
    return 'primary';
  }
}
