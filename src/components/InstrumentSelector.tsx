import * as React from 'react';
import InstrumentsDataSource from '../InstrumentsDataSource';
import Instrument from '../Instrument';

export interface State {
    selectedInstrumentName: string;
}
export interface Props {
    initialInstrumentName: string;
    onInstrumentChanged: (instrument: Instrument) => void;
}

class InstrumentSelector extends React.Component<Props, State> {

    private instruments: Array<Instrument>;

    constructor(props: Props) {
        super(props);
        this.instruments = InstrumentsDataSource.all;
        this.state = { selectedInstrumentName: props.initialInstrumentName };
    }

    onChanged(e: React.FormEvent<HTMLSelectElement>) {
        const selectedInstrument = this.instruments[e.currentTarget.selectedIndex];
        this.setState({ selectedInstrumentName: selectedInstrument.name });
        this.props.onInstrumentChanged(selectedInstrument);
    }

    render() {
        let options = [];
        for (let i = 0; i < this.instruments.length; i++) {
            options.push(<option key={'instruments_' + i}>{this.instruments[i].name}</option>);
        }
        return (
            <select onChange={(e) => this.onChanged(e)} value={this.state.selectedInstrumentName}>
                {options}
            </select>
        );
    }
}

export default InstrumentSelector;
