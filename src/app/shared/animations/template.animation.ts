import { trigger, sequence, state, animate, transition, style } from '@angular/animations';

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
  
    export const MatTableRowsAnimation = 
    trigger('animMatTable', [
      transition('void => *', [
        style({ height: '*', opacity: '0', transform: 'translateX(-550px)', 'box-shadow': 'none' }),
        sequence([
          animate(".35s ease", style({ height: '*', opacity: '.2', transform: 'translateX(0)', 'box-shadow': 'none'  })),
          animate(".35s ease", style({ height: '*', opacity: 1, transform: 'translateX(0)' }))
        ])
      ])
    ]);