import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TagModule } from 'primeng/tag';
import { BadgeModule } from 'primeng/badge';

@Component({
  selector: 'app-status-card',
  standalone: true,
  imports: [CommonModule, TagModule, BadgeModule],
  templateUrl: './status-card.component.html',
  styleUrl: './status-card.component.css',
})
export class StatusCardComponent {
  @Input() status?: string;
}
