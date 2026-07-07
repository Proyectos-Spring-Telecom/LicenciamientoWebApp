import { animate, style, transition, trigger } from '@angular/animations';

export const slideFadeAnimation = trigger('slideFade', [
  transition(':enter', [
    style({
      opacity: 0,
      transform: 'translateY(-16px)'
    }),
    animate('350ms cubic-bezier(0.35, 0, 0.25, 1)', style({
      opacity: 1,
      transform: 'translateY(0)'
    }))
  ]),
  transition(':leave', [
    animate('280ms cubic-bezier(0.35, 0, 0.25, 1)', style({
      opacity: 0,
      transform: 'translateY(-16px)'
    }))
  ])
]);
