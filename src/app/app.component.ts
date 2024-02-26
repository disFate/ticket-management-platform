import { environment } from './../environments/environment';
import { Component, type OnInit } from '@angular/core'
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog'
import { ServerErrorComponent } from './shared/pop-ups/server-error/server-error.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {

  ngOnInit (): void {
    console.log('AppComponent initialized' + environment.envName)
  }
}
