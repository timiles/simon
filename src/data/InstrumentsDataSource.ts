import Instrument from '../types/Instrument';

export default class InstrumentsDataSource {

    static all: Array<Instrument> = [
        new Instrument('Piano', 48, 84),
        new Instrument('Alto sax', 49, 80, 3),
        new Instrument('Tenor sax', 44, 76, -2),
    ];

}