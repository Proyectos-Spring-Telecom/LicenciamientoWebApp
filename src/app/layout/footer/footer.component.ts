import { Component, OnDestroy, OnInit } from '@angular/core';
import { ThemeService } from '../../../@fury/services/theme.service';
import { map } from 'rxjs/operators';
import { fadeInUpAnimation } from 'src/@fury/animations/fade-in-up.animation';
import { fadeInRightAnimation } from 'src/@fury/animations/fade-in-right.animation';

@Component({
  selector: 'fury-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
  animations: [fadeInRightAnimation, fadeInUpAnimation]
})
export class FooterComponent implements OnInit, OnDestroy {

  visible$ = this.themeService.config$.pipe(map(config => config.footerVisible));

  constructor(private themeService: ThemeService) {
  }

  ngOnInit() {
  }

  hide() {
    this.themeService.setFooterVisible(false);
  }

  ngOnDestroy(): void {}
}
