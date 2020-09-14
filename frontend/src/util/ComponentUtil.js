import {
    brownSugarDeeriocaFresh,
    cocoaBrownSugarDeerioca,
    matchaSugarDeerioca,
    cremeBruleeDeerioca,
    snowStrawberryLulu,
    orangeLulu,
} from '../assets/bundle'

// eslint-disable-next-line import/prefer-default-export
export function getCorrespondDrinkImage(image) {
    switch (image) {
    case 'brownSugarDeeriocaFresh.png':
        return brownSugarDeeriocaFresh
    case 'cocoaBrownSugarDeerioca.png':
        return cocoaBrownSugarDeerioca
    case 'matcha_sugar_deerioca.png':
        return matchaSugarDeerioca
    case 'cremeBruleeDeerioca.png':
        return cremeBruleeDeerioca
    case 'snowStrawberryLulu.png':
        return snowStrawberryLulu
    case 'orangeLulu.png':
        return orangeLulu
    default:
        return brownSugarDeeriocaFresh
    }
}
