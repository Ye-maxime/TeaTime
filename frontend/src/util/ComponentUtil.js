import {
    brown_sugar_deerioca_fresh,
    cocoa_brown_sugar_deerioca,
    matcha_sugar_deerioca,
    creme_brulee_deerioca,
    snow_strawberry_lulu,
    orange_lulu
} from '../assets/bundle'

export function getCorrespondDrinkImage(image) {
    switch (image) {
        case 'brown_sugar_deerioca_fresh.png':
            return brown_sugar_deerioca_fresh
        case 'cocoa_brown_sugar_deerioca.png':
            return cocoa_brown_sugar_deerioca
        case 'matcha_sugar_deerioca.png':
            return matcha_sugar_deerioca
        case 'creme_brulee_deerioca.png':
            return creme_brulee_deerioca
        case 'snow_strawberry_lulu.png':
            return snow_strawberry_lulu
        case 'orange_lulu.png':
            return orange_lulu
        default:
            return brown_sugar_deerioca_fresh
    }
}