import { AfterViewInit, Component, ElementRef, Input, ViewChild } from '@angular/core';
import { LngLat, Map, Marker } from 'mapbox-gl';


@Component({
  selector: 'map-mini-map',
  templateUrl: './mini-map.component.html',
  styleUrl: './mini-map.component.css'
})
export class MiniMapComponent implements AfterViewInit{


  @Input() lngLat?: [number,number];
  @ViewChild('map') divMap?: ElementRef;

  public map?: Map;
  public zoom: number = 10;

  ngAfterViewInit(): void {
    if( !this.divMap?.nativeElement ) throw "Map Div not found";
    if( !this.lngLat) throw "LngLat can't be null";

    this.map = new Map({
      accessToken: 'pk.eyJ1IjoiZmVybmFuZG90cml2IiwiYSI6ImNtMWlkbXg4MzByMWEycXB4bnFlMnl1d24ifQ.WyuQshkB99vdD6ihWQIV_Q',
      container: this.divMap.nativeElement, // container ID
      style: 'mapbox://styles/mapbox/streets-v12', // style URL
      center: this.lngLat, // starting position [lng, lat]
      zoom: this.zoom, // starting zoom
      interactive: false,
    });

    new Marker().setLngLat( this. lngLat ).addTo( this.map );
  }


}
