import { Component } from '@angular/core';
import { BLE } from '@ionic-native/ble';
import { NavController, NavParams } from 'ionic-angular';


@Component({
    selector: 'page-bluetooth',
    templateUrl: 'bluetooth.html'
})
export class BluetoothPage {

    constructor(nav: NavController,
        public navParams: NavParams, private ble: BLE) {

            function stringToBytes(string) {
                var array = new Uint8Array(string.length);
                for (var i = 0, l = string.length; i < l; i++) {
                    array[i] = string.charCodeAt(i);
                 }
                 return array.buffer;
             }
             
             // ASCII only
             function bytesToString(buffer) {
                 return String.fromCharCode.apply(null, new Uint8Array(buffer));
             }
    }

}
