import {
  GoogleMaps,
  GoogleMap,
  GoogleMapsEvent,
  GoogleMapOptions,
  CameraPosition,
  MarkerOptions,
  Marker,
  LatLng
} from '@ionic-native/google-maps';
import { Component } from '@angular/core';
import { NavController, Platform } from 'ionic-angular';
import { ColheitaProvider } from '../../providers/colheita/colheita';
import { NativeStorage } from '@ionic-native/native-storage';
import { Geolocation } from '@ionic-native/geolocation';
import { DeviceOrientation, DeviceOrientationCompassHeading } from '@ionic-native/device-orientation';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  providers: [
    ColheitaProvider
  ]

})
export class HomePage {

  map: GoogleMap;
  orientacao: any;

  diario = new Array<any>();

  constructor(
    public navCtrl: NavController,
    public platform: Platform,
    public colheitaProvider: ColheitaProvider,
    private nativeStorage: NativeStorage,
    private geolocation: Geolocation,
    private deviceOrientation: DeviceOrientation,

  ) {
  }

  ionViewDidLoad() {
    this.loadMap();
  }

  loadMap() {


    let localizacaoinicial: LatLng;
    this.geolocation.getCurrentPosition().then((resp) => {
      localizacaoinicial = new LatLng(resp.coords.latitude, resp.coords.longitude);
    }).catch((error) => {
      alert("Não foi possível achar sua localização atual!");
    });

    let compassoinicial;
    this.deviceOrientation.getCurrentHeading().then(
      (data: DeviceOrientationCompassHeading) => compassoinicial = data.trueHeading,
      (error: any) => console.log(error)
    );

    // Atualiza conforme movimentos do compasso
    var compasso: any;
    this.deviceOrientation.watchHeading().subscribe(
      (data: DeviceOrientationCompassHeading) =>
        this.map.animateCamera({
          bearing: data.trueHeading,
          duration: 1000
        })
    )

    // Atualiza conforme movimentos da localizacao
    var localizacao: LatLng;
    this.geolocation.watchPosition().subscribe((data2) => {
      this.map.animateCamera({
        target: { lat: data2.coords.latitude, lng: data2.coords.longitude },
        duration: 1000
      });
    })

    let mapOptions: GoogleMapOptions = {

      controls: {
        compass: true,
        myLocationButton: true, // GEOLOCATION BUTTON 
        indoorPicker: true,
        zoom: true
      },
      gestures: {
        scroll: true,
        tilt: true,
        rotate: true,
        zoom: true
      },
      camera: {
        target: {
          lat: -23.5788453, // São Paulo
          lng: -46.6092952  // São Paulo
        },
        zoom: 12,
        tilt: 80,
        bearing: 0
      }
    };

    this.map = GoogleMaps.create('map_canvas', mapOptions);

    // Wait the MAP_READY before using any methods.
    this.map.one(GoogleMapsEvent.MAP_READY)
      .then(() => {

        // Habilita botão da minha localização
        this.map.setMyLocationEnabled(true);

        // Habilita o tráfego
        //this.map.setTrafficEnabled(true);

        this.map.animateCamera({
          target: localizacaoinicial,
          bearing: compassoinicial,
          zoom: 19,
          duration: 2000 // = 1 sec.
        });

        // Doadora
        this.map.addMarker({
          title: 'Doadora',
          icon: { url: "./assets/icon/doadora.png" },
          animation: 'DROP',
          position: {
            lat: -23.561184,
            lng: -46.567688
          }
        })
          .then(marker => {
            marker.on(GoogleMapsEvent.MARKER_CLICK)
              .subscribe(() => {
                confirm('Deseja iniciar uma visita neste local?');
              });
          });

        // Receptora
        this.map.addMarker({
          title: 'Receptora',
          icon: { url: "./assets/icon/receptora.png" },
          animation: 'DROP',
          position: {
            lat: -23.5401161,
            lng: -46.6242617
          }
        })
          .then(marker => {
            marker.on(GoogleMapsEvent.MARKER_CLICK)
              .subscribe(() => {
                confirm('Deseja iniciar uma visita neste local?');
              });
          });

      });
  }


  public salva() {
    this.nativeStorage.setItem('myitem', { property: 'value', anotherProperty: 'anotherValue' })
      .then(
        () => console.log('Stored item!'),
        error => console.error('Error storing item', error)
      );
  }

  public recupera() {
    this.nativeStorage.getItem('myitem')
      .then(
        data => console.log(data),
        error => console.error(error)
      );
  }

  public teste() {
    this.colheitaProvider.getInstituicoes().subscribe(
      data => {
        console.log(data)
      },
      error => {
        console.log(error)
      }
    )
  }

}
