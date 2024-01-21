import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent  {

  @Input()
  isDarkMode = false;

  @Output()
  readonly darkModeSwitched = new EventEmitter<boolean>();

  onDarkModeSwitched({ checked }: any) {
    this.darkModeSwitched.emit(checked);
  }
}
