import { environment } from './../environments/environment';
import { Component, type OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  ngOnInit(): void {
    console.log('AppComponent initialized' + environment.envName);
  }
}
