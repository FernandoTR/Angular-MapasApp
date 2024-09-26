import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { FullScreenPageComponent } from './pages/full-screen-page/full-screen-page.component';
import { MapsLayoutComponent } from './layout/maps-layout/maps-layout.component';
import { MarkersPageComponent } from './pages/markers-page/markers-page.component';
import { PropertiesPageComponent } from './pages/properties-page/properties-page.component';
import { ZoomRangeComponent } from './pages/zoom-range/zoom-range.component';

const routes: Routes = [
  {
    path: '',
    component: MapsLayoutComponent,
    children: [
      { path: 'fullscreen', component: FullScreenPageComponent},
      { path: 'zoom-range', component: ZoomRangeComponent},
      { path: 'markers', component: MarkersPageComponent},
      { path: 'properties', component: PropertiesPageComponent},
      { path: '**', redirectTo: 'fullscreen'},

    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MapsRoutingModule { }
