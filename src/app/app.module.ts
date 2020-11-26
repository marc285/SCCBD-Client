import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { TextComponent } from './components/text/text.component';
import { ReactiveFormsModule } from '@angular/forms';

import { HttpClientModule } from '@angular/common/http';
import { AESCriptoComponent } from './components/aes-cripto/aes-cripto.component';
import { RSACriptoComponent } from './components/rsa-cripto/rsa-cripto.component';
import { BsComponent } from './components/bs/bs.component';

@NgModule({
  declarations: [
    AppComponent,
    TextComponent,
    AESCriptoComponent,
    RSACriptoComponent,
    BsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
