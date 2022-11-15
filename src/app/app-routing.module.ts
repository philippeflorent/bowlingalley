import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

/* custom components */
import { BowlingAlleyComponent } from './components/bowling-alley/bowling-alley.component';

const routes: Routes = [
 { path: '', component: BowlingAlleyComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
