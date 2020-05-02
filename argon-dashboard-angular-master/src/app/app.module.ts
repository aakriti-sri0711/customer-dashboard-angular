import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import {MatTooltipModule} from '@angular/material/tooltip';
import{ AdminLayoutModule} from 'src/app/layouts/admin-layout/admin-layout.module';
import{ AuthLayoutModule} from 'src/app/layouts/auth-layout/auth-layout.module'
import { AppComponent } from './app.component';
import { AdminLayoutComponent } from 'src/app/layouts/admin-layout/admin-layout.component';
import { AuthLayoutComponent } from 'src/app/layouts/auth-layout/auth-layout.component';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppRoutingModule } from './app.routing';
import { ComponentsModule } from './components/components.module';
import { DateFormatPipe } from './date-format.pipe';
import { SearchBoxComponent } from './pages/legal-entities/search-box/search-box.component';





@NgModule({
  imports: [
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    ComponentsModule,
    NgbModule,
    RouterModule,
    AppRoutingModule,
    AdminLayoutModule,
    AuthLayoutModule,
    MatTooltipModule
  ],
  declarations: [
    AppComponent,
    AdminLayoutComponent,
    AuthLayoutComponent,
    DateFormatPipe,
    SearchBoxComponent,
  
   
    
   
   
   
   
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
