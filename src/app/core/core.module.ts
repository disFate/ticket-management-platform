import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar/navbar.component';
import { TabMenuModule } from 'primeng/tabmenu';
import { MenubarModule } from 'primeng/menubar';

@NgModule({
  declarations: [NavbarComponent],
  imports: [CommonModule, MenubarModule],
  exports: [NavbarComponent],
})
export class CoreModule {
  private myname: string = '';
}
