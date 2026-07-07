import { AfterViewInit, Component, Inject, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { GoogleMap } from '@angular/google-maps';

export interface SeleccionUbicacionData {
  lat?: number | string;
  lng?: number | string;
}

export interface SeleccionUbicacionResult {
  lat: number;
  lng: number;
}

const DEFAULT_CENTER: google.maps.LatLngLiteral = {
  lat: 18.92506594438654,
  lng: -99.22440748392435
};

const MARKER_ASPECT_RATIO = 739 / 1067;
const MARKER_DISPLAY_HEIGHT = 54;
const MARKER_DISPLAY_WIDTH = Math.round(MARKER_DISPLAY_HEIGHT * MARKER_ASPECT_RATIO);
const MARKER_PRIMARY_URL = 'assets/images/logos/marker_primary.png';

const MAP_STYLES_SIN_ESTABLECIMIENTOS: google.maps.MapTypeStyle[] = [
  { featureType: 'poi.business', stylers: [{ visibility: 'off' }] },
  { featureType: 'poi.medical', stylers: [{ visibility: 'off' }] },
  { featureType: 'poi.school', stylers: [{ visibility: 'off' }] },
  { featureType: 'poi.place_of_worship', stylers: [{ visibility: 'off' }] },
  { featureType: 'poi.sports_complex', stylers: [{ visibility: 'off' }] },
  { featureType: 'poi.attraction', stylers: [{ visibility: 'off' }] },
  { featureType: 'poi.government', stylers: [{ visibility: 'off' }] },
  { featureType: 'poi.park', elementType: 'labels.icon', stylers: [{ visibility: 'off' }] },
];

@Component({
  selector: 'app-seleccion-ubicacion-modal',
  templateUrl: './seleccion-ubicacion-modal.component.html',
  styleUrls: ['./seleccion-ubicacion-modal.component.scss']
})
export class SeleccionUbicacionModalComponent implements AfterViewInit {
  @ViewChild(GoogleMap) map!: GoogleMap;

  center: google.maps.LatLngLiteral;
  zoom = 14;
  markerPosition: google.maps.LatLngLiteral | null = null;

  mapOptions: google.maps.MapOptions = {
    mapTypeControl: false,
    streetViewControl: false,
    fullscreenControl: true,
    gestureHandling: 'greedy',
    styles: MAP_STYLES_SIN_ESTABLECIMIENTOS,
  };

  markerOptions: google.maps.MarkerOptions = {
    draggable: true,
  };

  constructor(
    private dialogRef: MatDialogRef<SeleccionUbicacionModalComponent, SeleccionUbicacionResult>,
    @Inject(MAT_DIALOG_DATA) data: SeleccionUbicacionData
  ) {
    const lat = parseFloat(String(data?.lat ?? ''));
    const lng = parseFloat(String(data?.lng ?? ''));

    if (!isNaN(lat) && !isNaN(lng)) {
      this.center = { lat, lng };
      this.markerPosition = { lat, lng };
    } else {
      this.center = { ...DEFAULT_CENTER };
    }

    this.markerOptions = this.buildMarkerOptions();
  }

  ngAfterViewInit(): void {
    setTimeout(() => this.refreshMap(), 350);
  }

  onMapClick(event: google.maps.MapMouseEvent): void {
    if (event.latLng) {
      this.markerPosition = event.latLng.toJSON();
    }
  }

  onMarkerDragEnd(event: google.maps.MapMouseEvent): void {
    if (event.latLng) {
      this.markerPosition = event.latLng.toJSON();
    }
  }

  cancelar(): void {
    this.dialogRef.close();
  }

  confirmar(): void {
    if (this.markerPosition) {
      this.dialogRef.close({
        lat: this.markerPosition.lat,
        lng: this.markerPosition.lng
      });
    }
  }

  private buildMarkerOptions(): google.maps.MarkerOptions {
    return {
      draggable: true,
      icon: {
        url: MARKER_PRIMARY_URL,
        scaledSize: new google.maps.Size(MARKER_DISPLAY_WIDTH, MARKER_DISPLAY_HEIGHT),
        anchor: new google.maps.Point(MARKER_DISPLAY_WIDTH / 2, MARKER_DISPLAY_HEIGHT),
      },
    };
  }

  private refreshMap(): void {
    const googleMap = this.map?.googleMap;
    if (googleMap) {
      google.maps.event.trigger(googleMap, 'resize');
      googleMap.setCenter(this.markerPosition || this.center);
    }
  }
}
