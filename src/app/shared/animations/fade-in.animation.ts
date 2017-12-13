import { trigger, state, animate, transition, style } from '@angular/animations';

export const fadeInAnimation =
   trigger('fadeInAnimation', [
       transition(':enter', [
        style({
          opacity: 0,
          transform: 'scale(0.2)'
        }),
        animate(250)
      ])
   ]);