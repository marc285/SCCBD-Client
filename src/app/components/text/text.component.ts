import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

import { TextService } from 'src/app/services/text/text.service';

@Component({
  selector: 'app-text',
  templateUrl: './text.component.html',
  styleUrls: ['./text.component.css']
})
export class TextComponent implements OnInit {

  text: string;
  alert: string;

  textForm = new FormGroup ({
    textInput: new FormControl()
  });

  constructor(
    private textService: TextService
  ) { }

  ngOnInit(): void {
    this.text = ' ';
    this.alert = ' ';
  }

  public sendText(){
    let text: string = this.textForm.get('textInput').value;
    console.log(`Text to be sent: ${text}`);

    this.textService.postText(text)
    .subscribe(res => {
      console.log(res);

      this.text = res.text as string;
    });
  }

  public getTest(){
    this.textService.getText()
    .subscribe(res => {
      console.log(res);

      this.alert = res.text as string;
    });
  }

  //COMPONENT FUNCTIONS
  public reset(){
    this.text = ' ';
    this.alert = ' ';
  }

}