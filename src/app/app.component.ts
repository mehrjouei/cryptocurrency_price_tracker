import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'cryptocurrency_price_tracker';
  menuVisibility = false;
  menuItems = [
    {
      url: '/cryptocurrencies/list',
      title: 'Cryptocurrencies List',
    },
    {
      url: '/favourites/list',
      title: 'Favourites',
    },
  ];
  constructor() {}
  ngOnInit() {}
  toggleMenu() {
    this.menuVisibility = !this.menuVisibility;
  }
}
