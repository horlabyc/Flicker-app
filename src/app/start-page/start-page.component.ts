import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-start-page',
  templateUrl: './start-page.component.html',
  styleUrls: ['./start-page.component.scss']
})
export class StartPageComponent implements OnInit {
  searchControl = new FormControl('', [Validators.required])
  constructor() { }

  ngOnInit(): void {
  }

  reset(){
    this.searchControl.reset();
  }

  submit(){
    console.log(this.searchControl.value);
  }
}
