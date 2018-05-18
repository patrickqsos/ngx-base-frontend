import { trigger, useAnimation, transition } from '@angular/animations';
import { zoomIn, fadeInLeft, fadeIn, bounceIn, slideInLeft, tada, fadeInDown, lightSpeedIn, zoomOut, fadeOut } from 'ng-animate';

export const bounceAnim = trigger('bounceAnim', [transition(':enter', useAnimation(zoomIn, { params: { timing: 0.5 } }))]);
export const zoomInAnim = trigger('zoomInAnim', [transition(':enter', useAnimation(zoomIn, { params: { timing: 0.5 } }))]);
export const fadeInLeftAnim = trigger('fadeInLeftAnim', [transition(':enter', useAnimation(fadeInLeft, { params: { timing: 0.4 } }))]);
export const fadeInAnim = trigger('fadeInAnim', [transition(':enter', useAnimation(fadeIn, { params: { timing: 0.4 } }))]);
export const slideInLeftAnim = trigger('slideInLeftAnim', [transition(':enter', useAnimation(slideInLeft, { params: { timing: 0.4 } }))]);
export const tadaAnim = trigger('tadaAnim', [transition(':enter', useAnimation(tada, { params: { timing: 0.4 } }))]);
export const fadeInDownAnim = trigger('fadeInDownAnim', [transition(':enter', useAnimation(fadeInDown, { params: { timing: 0.4 } }))]);
export const lightSpeedInAnim = trigger('lightSpeedInAnim', [
    transition(':enter', useAnimation(lightSpeedIn, { params: { timing: 0.4 } }))
]);

export const breadItemAnim = trigger('breadItemAnim', [
    transition(':enter', useAnimation(zoomIn, { params: { timing: 0.5 } })),
    transition(':leave', useAnimation(zoomOut, { params: { timing: 0.5 } }))
]);

export const breadListAnim = trigger('breadListAnim', [
    transition(':enter', useAnimation(fadeIn, { params: { timing: 0.5 } })),
    transition(':leave', useAnimation(fadeOut, { params: { timing: 0.5 } }))
]);
