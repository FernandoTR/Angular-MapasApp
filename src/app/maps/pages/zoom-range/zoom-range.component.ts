import { AfterViewInit, Component, ElementRef, OnDestroy, ViewChild } from '@angular/core';
import { LngLat, Map } from 'mapbox-gl';

@Component({
  templateUrl: './zoom-range.component.html',
  styleUrl: './zoom-range.component.css'
})
export class ZoomRangeComponent implements AfterViewInit, OnDestroy{


  @ViewChild('map') divMap?: ElementRef;

  public zoom: number = 10;
  public map?: Map;
  public currentLngLat: LngLat = new LngLat(-103.386722,20.673513);


  ngAfterViewInit(): void {

    if ( !this.divMap ) throw 'El elemento HTML no fue encontrado';


    this.map = new Map({
      accessToken: 'pk.eyJ1IjoiZmVybmFuZG90cml2IiwiYSI6ImNtMWlkbXg4MzByMWEycXB4bnFlMnl1d24ifQ.WyuQshkB99vdD6ihWQIV_Q',
      container: this.divMap.nativeElement, // container ID
      style: 'mapbox://styles/mapbox/streets-v12', // style URL
      center: this.currentLngLat, // starting position [lng, lat]
      zoom: this.zoom, // starting zoom
    });

    this.mapListeners();
  }

  ngOnDestroy(): void {
    this.map?.remove();
  }

  mapListeners():void {

    if ( !this.map ) throw 'Mapa no inicializado';

    this.map.on('zoom', (ev) => {
      this.zoom = this.map!.getZoom();
    });

    this.map.on('zoomend', (ev) => {
      if ( this.map!.getZoom() < 18 ) return;
      this.map!.zoomTo(18);
    });

    this.map.on('move', () => {
      this.currentLngLat = this.map!.getCenter();
    });


  }

  zoomIn():void{
    this.map?.zoomIn();
  }

  zoomOut():void{
    this.map?.zoomOut();
  }

  zoomChanged( value: string ):void{
    this.zoom = Number(value);
    this.map?.zoomTo( this.zoom);
  }


}
