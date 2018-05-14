import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'rw-empty',
  template: '',
})
export class EmptyComponent implements OnInit {

  constructor() {
    console.log('EMPTY');
  }

  ngOnInit() {
    console.log('EMPTY INIT');
  }
}
