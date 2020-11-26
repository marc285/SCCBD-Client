import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TextComponent } from 'src/app/components/text/text.component';
import { AESCriptoComponent } from 'src/app/components/aes-cripto/aes-cripto.component';
import { RSACriptoComponent } from './components/rsa-cripto/rsa-cripto.component';
import { BsComponent } from './components/bs/bs.component';

const routes: Routes = [
  { path: '', redirectTo: '/text', pathMatch: 'full' },
  { path: 'text', component: TextComponent },
  { path: 'cripto/AES', component: AESCriptoComponent },
  { path: 'cripto/RSA', component: RSACriptoComponent },
  { path: 'bs', component: BsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
