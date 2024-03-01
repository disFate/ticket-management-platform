import { Component, DoCheck, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { User } from '../model/admin.model';
import { AuthService } from '../../../core/service/auth.service';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrl: './user-detail.component.css'
})
export class UserDetailComponent implements OnInit, OnChanges, DoCheck{
  @Input('user') input?: User;
  @Input('userId') id?: string;
  @Output('notify') notify: EventEmitter<string> = new EventEmitter<string>();

  user?: User;
  userId?: string;

  constructor(private _autheService: AuthService) {
  }

  ngOnInit(): void {
    // this.user = this.input;
    // this.userId = this.id;
  }

  ngOnChanges(changes: SimpleChanges): void {
    //if (changes['input'] !== null && changes['input'].currentValue !== null)
    //if (changes['input']?.currentValue)
    if (changes['input']?.currentValue) {
      this.user = changes['input'].currentValue;
    }
    if (changes['id']?.currentValue) {
      this.userId = changes['id'].currentValue;
    }
  }

  ngDoCheck(): void {
    if (!this.user) {
      this.user = this.input;
    } else if (this.user.id !== this.input?.id) {
      this.user = this.input;
    }
  }

  onNotify(): void {
    this._autheService.fetchCurrentUser()
      .subscribe((data) => {
        console.log(data);
      });
  }
}
