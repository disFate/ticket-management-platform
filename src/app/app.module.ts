import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
import { AppComponent } from './app.component'
import { DynamicDialogModule } from 'primeng/dynamicdialog'

@NgModule({
  imports: [
    BrowserModule,
    DynamicDialogModule
  ],

  declarations: [
    AppComponent
  ],
  providers: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
