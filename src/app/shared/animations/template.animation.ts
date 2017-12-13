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

export const btnMenuAnimation =
    trigger('divMenu', [
      transition('void => *', [
          style({
            opacity: 0,
            transform: 'scale(0.2)'
          }),
          animate(400)
      ])
    ]);

export const btnHomeAnimation =
    trigger('divHome', [
      transition('void => *', [
          style({
            opacity: 0,
            transform: 'translateX(-100%)'
          }),
          animate(400)
      ])
    ]);