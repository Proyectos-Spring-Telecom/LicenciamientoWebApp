import { ChangeDetectionStrategy, ChangeDetectorRef, Component, HostBinding, OnDestroy, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { LIST_FADE_ANIMATION } from '../../../../@fury/shared/list.animation';
import { ThemeService } from 'src/@fury/services/theme.service';

@Component({
  selector: 'fury-toolbar-notifications',
  templateUrl: './toolbar-notifications.component.html',
  styleUrls: ['./toolbar-notifications.component.scss'],
  animations: [...LIST_FADE_ANIMATION],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ToolbarNotificationsComponent implements OnInit, OnDestroy {
  visible$ = this.themeService.config$.pipe(map(config => config.footerVisible));

  notifications: any[];
  isOpen: boolean;
  showOnMapa = false;
  private routerEventsSub: Subscription;

  @HostBinding('style.display')
  get hostDisplay(): string {
    return this.showOnMapa ? 'flex' : 'none';
  }

  constructor(
    private themeService: ThemeService,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {
  }

  ngOnInit() {
    this.updateMapaVisibility();
    this.cdr.markForCheck();
    this.routerEventsSub = this.router.events.pipe(
      filter((event): event is NavigationEnd => event instanceof NavigationEnd)
    ).subscribe(() => {
      this.updateMapaVisibility();
      if (!this.showOnMapa) {
        this.isOpen = false;
      }
      this.cdr.markForCheck();
    });
    this.notifications = [
      {
        icon: 'no_sim',
        name: 'Rechazo o sin respuesta',
        // read: true,
        color: 'button'
      },
      {
        icon: 'history',
        name: 'Revisión',
        // read: false,
        color: 'button_revision'
      },
      {
        icon: 'new_releases',
        name: 'Información Faltante',
        // read: false,
        color: 'button_faltante'
      },
      {
        icon: 'thumb_up',
        name: 'Datos Correctos',
        // read: false,
        color: 'button_correcto'
      },
    ];
  }

  // markAsRead(notification) {
  //   notification.read = true;
  // }

  // dismiss(notification, event) {
  //   event.stopPropagation();
  //   this.notifications.splice(this.notifications.indexOf(notification), 1);
  // }

  ngOnDestroy(): void {
    this.routerEventsSub?.unsubscribe();
  }

  toggleDropdown() {
    this.isOpen = !this.isOpen;
  }

  onClickOutside() {
    this.isOpen = false;
  }

  private updateMapaVisibility(): void {
    const url = this.router.url.split('?')[0].split('#')[0];
    this.showOnMapa = url === '/monitoreo/mapa' || url.startsWith('/monitoreo/mapa/');
  }

  // markAllAsRead() {
  //   this.notifications.forEach(notification => notification.read = true);
  // }
}
