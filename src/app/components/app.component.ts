import { Component } from '@angular/core';

/**
 * Doesn't do much more than holding the router-outlet, 
 * if one would implement a navigation bar or similar do it here
 */
@Component({
  selector: 'app-root',
  templateUrl: '../view/app.component.html'
})
export class AppComponent {

  constructor() {}

  ngOnInit() {}

  ngAfterViewInit(){}

}
