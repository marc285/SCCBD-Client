import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TextComponent } from 'src/app/components/text/text.component';
import { CriptoComponent } from 'src/app/components/cripto/cripto.component';

const routes: Routes = [
  { path: '', redirectTo: '/text', pathMatch: 'full' },
  { path: 'text', component: TextComponent },
  { path: 'cripto', component: CriptoComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
