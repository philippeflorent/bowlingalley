import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms'; 
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

/* custom components */
/* main component */
import { BowlingAlleyComponent } from './components/bowling-alley/bowling-alley.component';
import { BowlingScreenComponent } from './components/bowling-screen/bowling-screen.component';
import { BowlingTableComponent } from './components/bowling-table/bowling-table.component';
/* sub components */
import { BowlingPinsComponent } from './components/bowling-pins/bowling-pins.component';

@NgModule({
  declarations: [
    AppComponent,
    BowlingAlleyComponent,
    BowlingScreenComponent,
    BowlingTableComponent,
    BowlingPinsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    /* added for reactive forms and ngModel usage */
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
