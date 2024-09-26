import { Component, ElementRef, ViewChild } from '@angular/core';
import { LngLat, Map, Marker } from 'mapbox-gl';

interface MarkerAndColor{
    color: string;
    marker:Marker;
}

interface PlainMarker{
  color: string;
  lngLat: number[]
}

@Component({
  templateUrl: './markers-page.component.html',
  styleUrl: './markers-page.component.css'
})
export class MarkersPageComponent {
  @ViewChild('map') divMap?: ElementRef;

  public markers: MarkerAndColor[] = [];

  public map?: Map;
  public currentLngLat: LngLat = new LngLat(-103.386722,20.673513);


  ngAfterViewInit(): void {

    if ( !this.divMap ) throw 'El elemento HTML no fue encontrado';


    this.map = new Map({
      accessToken: 'pk.eyJ1IjoiZmVybmFuZG90cml2IiwiYSI6ImNtMWlkbXg4MzByMWEycXB4bnFlMnl1d24ifQ.WyuQshkB99vdD6ihWQIV_Q',
      container: this.divMap.nativeElement, // container ID
      style: 'mapbox://styles/mapbox/streets-v12', // style URL
      center: this.currentLngLat, // starting position [lng, lat]
      zoom: 13, // starting zoom
    });

    // const markerHtml = document.createElement('div');
    // markerHtml.innerHTML = 'Fernando Torres';

    // const marker = new Marker({
    //   color:'black'
    // }).setLngLat( this.currentLngLat ).addTo( this.map );

    this.readFromLocalStorage();
  }

  createMarker():void{
    if ( !this.map ) return;

    const color = '#xxxxxx'.replace(/x/g, y=>(Math.random()*16|0).toString(16));
    const lngLat = this.map.getCenter();

    this.addMarker( lngLat, color);

  }

  addMarker( lngLat: LngLat, color: string ): void {
    if ( !this.map) return;

    const marker = new Marker({
      color: color,
      draggable:true
    }).setLngLat( lngLat)
      .addTo( this.map );

    this.markers.push({ color, marker });
    this.saveToLocalStorage();

    marker.on('dragend', () => {
      this.saveToLocalStorage();
    });
  }

  deleteMarker( index: number): void {
    this.markers[index].marker.remove();
    this.markers.splice(index, 1);

    this.saveToLocalStorage();
  }

  flyTo ( marker: Marker): void {

    this.map?.flyTo({
      zoom:14,
      center:marker.getLngLat()
    });

  }

  saveToLocalStorage(): void {
    const plainMarker: PlainMarker[] = this.markers.map( ({ color, marker }) => {
      return {
        color,
        lngLat: marker.getLngLat().toArray()
      }
    });

    localStorage.setItem('plainMarkers', JSON.stringify( plainMarker ));
  }

  readFromLocalStorage(): void {

    const plainMarkersString = localStorage.getItem('plainMarkers') ?? '[]';
    const plainMarkers: PlainMarker[] = JSON.parse( plainMarkersString );

    plainMarkers.forEach( ({ color, lngLat }) => {
      const [lng, lat ] = lngLat;
      const coords = new LngLat(lng , lat);

      this.addMarker( coords, color);
    });

  }

}
