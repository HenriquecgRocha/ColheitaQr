import { Component } from '@angular/core';

import { AboutPage } from '../about/about';
import { ContactPage } from '../contact/contact';
import { HomePage } from '../home/home';
import { VisitaPage } from '../visita/visita';
import { BluetoothPage } from '../bluetooth/bluetooth';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = HomePage;
  tab2Root = AboutPage;
  tab3Root = ContactPage;
  tab4Root = VisitaPage;
  tab5Root = BluetoothPage;
  

  constructor() {

  }
}
